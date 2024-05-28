var FyApp = angular.module("FyApp", ["ui.bootstrap"]);

FyApp.controller("popupController", [
  "$scope",
  "$http",
  function popupController($scope, $http) {
    var zl_manifest_url_0 =
      "https://freightsmart.oocl.com/digital/product/search-quote";
    var zl_manifest_url =
      "https://freightsmart.oocl.com/digital/product/search-result";
    $scope.working_tab_id = 0;
    $scope.pageLoaded = false;
    chrome.storage.local.get(["pageLoaded"], function (items) {
      $scope.pageLoaded = !!items.pageLoaded;
    });

    //notification popup
    $scope.alert_message = {
      show: false,
      type: "success",
      message: "错误提示",
    };
    $scope.closeAlert = function () {
      $scope.alert_message = {
        show: false,
        type: "success",
        message: "没有错误",
      };
    };
    $scope.showAlert = function (message, type) {
      $scope.alert_message = { show: true, type: type, message: message };
    };

    // 定义变量，供popup页面弹窗使用
    $scope.inputValue = {
      startPort: "",
      endPort: "",
    };

    $scope.search = function (action) {
      // setTimeout(() => {
      chrome.tabs.sendMessage(
        $scope.working_tab_id,
        { action: action, data: $scope.inputValue },
        (res) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            $scope.showAlert(
              "Message failed: " + chrome.runtime.lastError.message,
              "danger"
            );
          } else {
            console.success("Message sent successfully", res);
          }
        }
      );
      // }, 1000);
    };

    $scope.runFile = function (action) {
      if (!$scope.pageLoaded) {
        return $scope.showAlert("请等待页面完全加载再操作", "danger");
      } else {
        chrome.tabs.executeScript(
          $scope.working_tab_id,
          {
            file: "assets/js/content_script.js",
          },
          function () {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              $scope.showAlert(
                "Script injection failed: " + chrome.runtime.lastError.message,
                "danger"
              );
              $scope.$apply();
            } else {
              $scope.hadRunning = true;
              $scope.search(action);
            }
          }
        );
      }
    };

    // content_script页面回传的数据处理
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      const { actionId, status } = request;
      if (actionId === "searchComplete") {
        if (status === "OK") {
          //notification success search
          $scope.showAlert("Success", "success");
          //action next
          setTimeout(async () => {
            const activeTabURL = await getActiveTabURL();

            $scope.working_tab_id = activeTabURL.id;
            $scope.runWorkingStage(activeTabURL, zl_manifest_url);
            // execute script
            await chrome.tabs.executeScript(
              $scope.working_tab_id,
              {
                file: "assets/js/content_script.js",
              },
              function () {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError.message);
                  $scope.showAlert(
                    "Script injection failed: " +
                      chrome.runtime.lastError.message,
                    "danger"
                  );
                  $scope.$apply();
                } else {
                  $scope.hadRunning = true;
                  chrome.tabs.sendMessage($scope.working_tab_id, {
                    action: "crawlData",
                  });
                }
              }
            );
          }, 1000);
          $scope.$apply();
        } else {
          $scope.showAlert("Error search", "danger");
        }
      } else if (request.actionId === "crawlDataComplete") {
        if (request.status === "OK") {
          //action
          // 处理从content_script的回传数据，可将数据通过外部接口进行传输
          $.ajax({
            url: "接口地址",
            type: "接口类型：GET/POST==",
            data: JSON.stringify({
              results: request.results,
            }),
            contentType: "application/json",
            success: function (res) {
              // 处理页面展示效果
            },
            error: function (err) {
              //  接口响应失败，处理页面展示效果
              console.log("Error: " + err);
            },
          });
        } else {
          $scope.showAlert("Error", "danger");
        }
      }
    });

    // 监听页面是否加载完成
    chrome.tabs.onUpdated.addListener(function (tabid, changeInfo, tab) {
      if (tabid !== $scope.working_tab_id) return;
      if (changeInfo.status === "complete") {
        $scope.closeAlert();
        $scope.pageLoaded = true;
        chrome.storage.local.set({ pageLoaded: true });
      } else if (changeInfo.status === "loading") {
        $scope.pageLoaded = false;
        chrome.storage.local.set({ pageLoaded: false });
      }
      $scope.$apply();
    });

    //判断目标页是否已经打开
    $scope.runWorkingStage = function (tab, url) {
      if (tab.url.indexOf(url) === -1) {
        chrome.tabs.update(tab.id, { url: url });
      } else {
        $scope.closeAlert();
      }
      $scope.$apply();
    };

    $(function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        // 目标页在浏览器中的id
        $scope.working_tab_id = tab.id;
        $scope.runWorkingStage(tab, zl_manifest_url_0);
      });
    });
  },
]);
