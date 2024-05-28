var FyApp = angular.module("FyApp", ["ui.bootstrap"]);

FyApp.controller("popupController", [
  "$scope",
  "$http",
  function popupController($scope, $http) {
    // var zl_manifest_url = "https://www.baidu.com/"; //目标网址
    var zl_manifest_url = "https://freightsmart.oocl.com/digital/product/search-result"
    $scope.working_tab_id = 0;
    $scope.pageLoaded = false;
    chrome.storage.local.get(["pageLoaded"], function (items) {
      $scope.pageLoaded = !!items.pageLoaded;
      $scope.$applyAsync();
    });

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
      $scope.$applyAsync();
    };
    $scope.showAlert = function (message, type) {
      $scope.alert_message = { show: true, type: type, message: message };
      $scope.$applyAsync();
    };
    // 定义变量，供popup页面弹窗使用
    $scope.inputValue = "";

    $scope.search = function (action) {
      setTimeout(() => {
        chrome.tabs.sendMessage(
          $scope.working_tab_id,
          { action: action, data: $scope.inputValue },
          (res) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              $scope.showAlert("Message failed: " + chrome.runtime.lastError.message, "danger");
              $scope.$applyAsync();
            }
          }
        );
      }, 1000);
    };

    $scope.runFile = function (action) {
      if (!$scope.pageLoaded) {
        return $scope.showAlert("请等待页面完全加载再操作", "danger");
      } else {
        chrome.tabs.executeScript($scope.working_tab_id, {
          file: "assets/js/content_script.js",
        }, function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            $scope.showAlert("Script injection failed: " + chrome.runtime.lastError.message, "danger");
            $scope.$applyAsync();
          } else {
            $scope.hadRunning = true;
            $scope.search(action);
          }
        });
      }
    };

    // content_script页面回传的数据处理
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.actionId === 'loadLoginPageComplete') {
        if (request.status === 'OK') {
          $scope.showAlert("Success", "success");
          setTimeout(() => {
            chrome.tabs.update($scope.working_tab_id, { url: 'https://freightsmart.oocl.com/digital/product/search-result' }, function () {
              chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === $scope.working_tab_id && changeInfo.status === 'complete') {
                  chrome.tabs.onUpdated.removeListener(listener);
                  $scope.closeAlert();
                  $scope.pageLoaded = true;
                  chrome.storage.local.set({ pageLoaded: true });
                  $scope.runFile('loginPage');
                  $scope.$applyAsync();
                }
              });
            });
          }, 1000);
          $scope.$applyAsync();
        } else {
          $scope.showAlert("Error", "danger");
        }
      } else if (request.actionId === 'loginComplete') {
        if (request.status === 'success') {
          $scope.showAlert("Next action completed successfully", "success");
        } else {
          $scope.showAlert("Next action failed", "danger");
        }
      }
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
          console.log("Error: " + err)
        },
      });
    });

    // 监听页面是否加载完成
    chrome.tabs.onUpdated.addListener(function (tabid, changeInfo, tab) {
      if (tabid !== $scope.working_tab_id) return;
      if (changeInfo.status === "complete") {
        $scope.closeAlert();
        $scope.pageLoaded = true;
        chrome.storage.local.set({ pageLoaded: true });
        $scope.$applyAsync();
      } else if (changeInfo.status === "loading") {
        $scope.pageLoaded = false;
        chrome.storage.local.set({ pageLoaded: false });
        $scope.$applyAsync();
      }
    });

    //判断目标页是否已经打开
    $scope.runWorkingStage = function (tab) {
      if (tab.url.indexOf(zl_manifest_url) === -1) {
        chrome.tabs.update(tab.id, { url: zl_manifest_url });
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
        $scope.runWorkingStage(tab);
      });
    });
  },
]);
