var FyApp = angular.module("FyApp", ["ui.bootstrap"]);

FyApp.controller("popupController", [
  "$scope",
  "$http",
  function popupController($scope, $http) {
    var zl_manifest_url =
      "https://freightsmart.oocl.com/digital/product/search-quote";
    var zl_manifest_url_0 =
      "https://freightsmart.oocl.com/digital/product/search-result";
    $scope.working_tab_id = 0;
    $scope.pageLoaded = false;
    $scope.hadRunning = false;
    chrome.storage.local.get(["pageLoaded"], function (items) {
      $scope.pageLoaded = !!items.pageLoaded;
    });

    //notification popup
    $scope.alert_message = {
      show: false,
      type: "success",
      message: "错误提示",
    };
    $scope.closeAlert = async function () {
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

    $scope.runFile = function (action) {
      //  判断页面是否加载完成
      if (!$scope.pageLoaded) {
        return $scope.showAlert("请等待页面完全加载再操作", "danger");
      } else {
        chrome.tabs.executeScript($scope.working_tab_id, {
          file: "assets/js/content_script.js",
        });
        $scope.hadRunning = true;
        $scope.search(action);
      }
    };

    $scope.search = function (action) {
      setTimeout(() => {
        chrome.tabs.sendMessage($scope.working_tab_id, {
          action: action,
          data: $scope.inputValue,
        });
      }, 1000);
    };

    // content_script页面回传的数据处理
    chrome.runtime.onMessage.addListener(async function (
      request,
      sender,
      sendResponse
    ) {
      //response from tabs
      const { actionId, status, data } = request;
      if (actionId === "searchComplete") {
        if (status === "OK") {
          console.log(actionId);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              var tab = tabs[0];
              // 目标页在浏览器中的id
              $scope.working_tab_id = tab.id;
              // $scope.runWorkingStage(tab, zl_manifest_url);
            }
          );

          $scope.search("crawlData");

          $scope.$apply();
        } else {
          $scope.showAlert("Error search", "danger");
        }
      } else if (request.actionId === "crawlDataComplete") {
        if (request.status === "OK") {
          console.log(actionId, data);
          // 处理从content_script的回传数据，可将数据通过外部接口进行传输
          for (var i = 0; i < data.resultsSearch.length; i++) {
            await $.ajax({
              url: "http://localhost:3000/moneyapi/createQuote",
              type: "POST",
              data: JSON.stringify(data.resultsSearch[i]),
              contentType: "application/json",
              success: function (res) {
                if (res.status === "OK") {
                  console.log("Quote created successfully:", res);
                } else {
                  console.error("Error creating quote:", res.message);
                }
              },
              error: function (err) {
                console.error("AJAX error:", err);
              },
            });
            await new Promise((resolve) => setTimeout(resolve, 3000));

          }
        } else {
          $scope.showAlert("Error crawl data", "danger");
        }
      }
    });

    // 监听页面是否加载完成
    chrome.tabs.onUpdated.addListener(function (tabid, changeInfo, tab) {
      if (tabid !== $scope.working_tab_id) return false;
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
    $scope.runWorkingStage = function (tab, urlMain) {
      if (tab.url.indexOf(urlMain) === -1) {
        chrome.tabs.update(tab.id, { url: urlMain });
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
        $scope.runWorkingStage(tab, zl_manifest_url);
      });
    });
  },
]);
