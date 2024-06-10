var FyApp = angular.module("FyApp", ["ui.bootstrap"]);

FyApp.controller("popupController", [
  "$scope",
  "$http",
  function popupController($scope, $http) {
    var zl_manifest_url =
      "https://freightsmart.oocl.com/digital/product/search-quote";
    $scope.working_tab_id = 0;
    $scope.workingStage = "";
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

    //start port
    $scope.startPort = [
      { id: 0, nameEn: "SHANGHAI", nameEnEB: "SHANGHAI", name: "上海" },
      { id: 1, nameEn: "SHEKOU", nameEnEB: "SHENZHEN", name: "深圳-蛇口" },
      { id: 2, nameEn: "YANTIAN", nameEnEB: "SHENZHEN", name: "深圳-盐田" },
      { id: 3, nameEn: "DALIAN", nameEnEB: "DALIAN", name: "大连" },
      { id: 4, nameEn: "HUANGPU", nameEnEB: "GUANGZHOU", name: "广州-黄埔" },
      { id: 5, nameEn: "NANSHA", nameEnEB: "GUANGZHOU", name: "广州-南沙" },
      { id: 6, nameEn: "NINGBO", nameEnEB: "NINGBO", name: "宁波" },
      { id: 7, nameEn: "QINGDAO", nameEnEB: "QINGDAO", name: "青岛" },
      { id: 8, nameEn: "TAICANG", nameEnEB: "TAICANG", name: "太仓" },
      { id: 9, nameEn: "WUHAN", nameEnEB: "WUHAN", name: "武汉" },
      { id: 10, nameEn: "XIAMEN", nameEnEB: "XIAMEN", name: "厦门" },
      { id: 11, nameEn: "XINGANG", nameEnEB: "TIANJIN", name: "天津-新港" },
    ];
    $scope.startPortIndex = "0";

    $scope.route = [
      [
        { value: "澳洲线", id: 0 },
        { value: "东南亚线", id: 1 },
        { value: "红海线", id: 2 },
        { value: "欧洲线", id: 3 },
        { value: "印巴线", id: 4 },
        { value: "中东线", id: 5 },
      ],
      [
        { value: "非洲线", id: 6 },
        { value: "红海线", id: 7 },
        { value: "加拿大", id: 8 },
        { value: "美国线", id: 9 },
        { value: "日本线", id: 10 },
        { value: "欧洲线", id: 11 },
        { value: "地中海线", id: 12 },
        { value: "台湾线", id: 13 },
        { value: "新西兰", id: 14 },
        { value: "中东线", id: 15 },
        { value: "印巴线", id: 16 },
      ],
    ];
    $scope.routeIndex = "0";

    $scope.endPort = [
      // 上海 6
      [
        {
          end: "ADELAIDE",
          endEB: "ADELAIDE",
          routeName: "澳洲线",
        },
        {
          end: "BRISBANE",
          endEB: "BRISBANE",
          routeName: "澳洲线",
        },
        {
          end: "FREMANTLE",
          endEB: "FREMANTLE",
          routeName: "澳洲线",
        },
        {
          end: "MELBOURNE",
          endEB: "MELBOURNE",
          routeName: "澳洲线",
        },
        {
          end: "SYDNEY",
          endEB: "SYDNEY",
          routeName: "澳洲线",
        },
      ],
      [
        // {
        //   end: 'BANGKOK',
        //   endEB:'BANGKOK',
        //   routeName: '东南亚线',
        //  },
        //  {
        //   end: 'BATAM',
        //   endEB:'BATAM',
        //   routeName: '东南亚线',
        //  },
        //  {
        //   end: 'BELAWAN',
        //   endEB:'BELAWAN',
        //   routeName: '东南亚线',
        //  },
        //  {
        //   end: 'CEBU',
        //   endEB:'CEBU',
        //   routeName: '东南亚线',
        //  },
        // {
        //   end: 'HAI PHONG',
        //   endEB:'HAIPHONG',
        //   routeName: '东南亚线',
        // },
        {
          end: "Ho Chi Minh",
          endEB: "HOCHIMINH",
          routeName: "东南亚线",
        },
        // {
        //   end: 'JAKARTA',
        //   endEB:'JAKARTA',
        //   routeName: '东南亚线',
        //  },
        //  {
        //   end: 'LAEM CHABANG',
        //   endEB:'LAEM CHABANG',
        //   routeName: '东南亚线',
        //  },
        //  {
        //   end: 'LAT KRABANG',
        //   endEB:'LAT KRABANG',
        //   routeName: '东南亚线',
        //  },
        // {
        //   end: 'MANILA',
        //   endEB:'MANILA',
        //   routeName: '东南亚线',
        // },
        // {
        //   end: 'PASIR GUDANG',
        //   endEB:'PASIR GUDANG',
        //   routeName: '东南亚线',
        //  },
        // {
        //   end: 'PENANG',
        //   endEB:'PENANG',
        //   routeName: '东南亚线',
        //  }
        //  ,{
        //   end: 'PERAWANG',
        //   endEB:'PERAWANG',
        //   routeName: '东南亚线',
        //  }
        // , {
        //   end: 'PHNOM PENH',
        //   endEB:'PHNOM PENH',
        //   routeName: '东南亚线',
        // },
        // {
        //   end: 'SEMARANG',
        //   endEB:'SEMARANG',
        //   routeName: '东南亚线',
        //  },{
        //   end: 'SIHANOUKVILLE',
        //   endEB:'SIHANOUKVILLE',
        //   routeName: '东南亚线',
        //  },
        // {
        //   end: 'SINGAPORE',
        //   endEB:'SINGAPORE',
        //   routeName: '东南亚线',
        // },
        // {
        //   end: 'SURABAYA',
        //   endEB:'SURABAYA',
        //   routeName: '东南亚线',
        //  },{
        //   end: 'TANJUNG PELEPAS',
        //   endEB:'TANJUNG PELEPAS',
        //   routeName: '东南亚线',
        //  },{
        //   end: 'YANGON',
        //   endEB:'YANGON',
        //   routeName: '东南亚线',
        // },
        // {
        //   end: 'port klang',
        //   endEB: 'PORT KELANG',
        //   routeName: '东南亚线'
        //  }
      ],
      [
        {
          end: "JEDDAH",
          endEB: "JEDDAH",
          routeName: "红海线",
        },
        {
          end: "SOKHNA",
          endEB: "SOKHNA",
          routeName: "红海线",
        },
        {
          end: "DJIBOUTI",
          endEB: "DJIBOUTI",
          routeName: "红海线",
        },
        {
          end: "AQABA",
          endEB: "AQABA",
          routeName: "红海线",
        },
      ],
      [
        {
          end: "ANTWERP",
          endEB: "ANTWERP",
          routeName: "欧洲线",
        },
        {
          end: "DUNKERQUE",
          endEB: "DUNKERQUE",
          routeName: "欧洲线",
        },
        {
          end: "FELIXSTOWE",
          endEB: "FELIXSTOWE",
          routeName: "欧洲线",
        },
        {
          end: "GDANSK",
          endEB: "GDANSK",
          routeName: "欧洲线",
        },
        {
          end: "HAMBURG",
          endEB: "HAMBURG",
          routeName: "欧洲线",
        },
        {
          end: "LE HAVRE",
          endEB: "LE HAVRE",
          routeName: "欧洲线",
        },
        {
          end: "ROTTERDAM",
          endEB: "ROTTERDAM",
          routeName: "欧洲线",
        },
        {
          end: "SOUTHAMPTON",
          endEB: "SOUTHAMPTON",
          routeName: "欧洲线",
        },
        {
          end: "ZEEBRUGGE",
          endEB: "ZEEBRUGGE",
          routeName: "欧洲线",
        },
        {
          end: "Sankt Peterburg",
          endEB: "ST.PETERSBURG",
          routeName: "欧洲线",
        },
      ],
      [
        {
          end: "BANGALORE",
          endEB: "BANGALORE",
          routeName: "印巴线",
        },
        {
          end: "Kolkata", //
          endEB: "CALCUTTA",
          routeName: "印巴线",
        },
        {
          end: "CHENNAI",
          endEB: "CHENNAI",
          routeName: "印巴线",
        },
        {
          end: "Chattogram",
          endEB: "CHITTAGONG",
          routeName: "印巴线",
        },
        {
          end: "kochi",
          endEB: "COCHIN",
          routeName: "印巴线",
        },
        {
          end: "COLOMBO",
          endEB: "COLOMBO",
          routeName: "印巴线",
        },
        {
          end: "HALDIA",
          endEB: "HALDIA",
          routeName: "印巴线",
        },
        {
          end: "AHMEDABAD", //ICD AHMEDABAD
          endEB: "ICD AHMEDABAD",
          routeName: "印巴线",
        },
        {
          end: "Vadodara", //ICD BARODA
          endEB: "ICD BARODA",
          routeName: "印巴线",
        },
        {
          end: "BORKHEDI", //ICD BORKHEDI
          endEB: "ICD BORKHEDI",
          routeName: "印巴线",
        },
        {
          end: "DADRI", //ICD DADRI
          endEB: "ICD DADRI",
          routeName: "印巴线",
        },
        {
          end: "GARHI",
          endEB: "ICD GARHI HARSARU",
          routeName: "印巴线",
        },
        {
          end: "HYDERABAD",
          endEB: "ICD HYDERABAD",
          routeName: "印巴线",
        },
        {
          end: "KANPUR",
          endEB: "ICD KANPUR",
          routeName: "印巴线",
        },
        {
          end: "LUDHIANA",
          endEB: "ICD LUDHIANA",
          routeName: "印巴线",
        },
        {
          end: "MORADABAD",
          endEB: "ICD MORADABAD",
          routeName: "印巴线",
        },
        {
          end: "NAGPUR",
          endEB: "ICD NAGPUR",
          routeName: "印巴线",
        },
        {
          end: "TIHI",
          endEB: "ICD TIHI",
          routeName: "印巴线",
        },
        {
          end: "KARACHI",
          endEB: "KARACHI",
          routeName: "印巴线",
        },
        {
          end: "Kuwait",
          endEB: "KHATUWAS",
          routeName: "印巴线",
        },
        {
          end: "MANDIDEEP",
          endEB: "MANDIDEEP",
          routeName: "印巴线",
        },
        {
          end: "MONGLA",
          endEB: "MONGLA",
          routeName: "印巴线",
        },
        {
          end: "MUNDRA",
          endEB: "MUNDRA",
          routeName: "印巴线",
        },
        {
          end: "NHAVA SHEVA",
          endEB: "NHAVA SHEVA",
          routeName: "印巴线",
        },
        {
          end: "SANAND",
          endEB: "SANAND",
          routeName: "印巴线",
        },
        {
          end: "SONIPAT",
          endEB: "SONIPAT",
          routeName: "印巴线",
        },
        {
          end: "TUMB",
          endEB: "TUMB",
          routeName: "印巴线",
        },
        {
          end: "TUTICORIN",
          endEB: "TUTICORIN",
          routeName: "印巴线",
        },
        {
          end: "VISAKHAPATNAM",
          endEB: "VISAKHAPATNAM",
          routeName: "印巴线",
        },
        // {
        //   end: '新德里',
        //   endEB:'ICD FARIDABAD',
        //   routeName: '印巴线',
        // },
      ],
      [
        {
          end: "ABU DHABI",
          endEB: "ABU DHABI",
          routeName: "中东线",
        },
        {
          end: "AJMAN",
          endEB: "AJMAN",
          routeName: "中东线",
        },
        ,
        // {
        //   end: 'BAHRAIN',
        //   endEB:'BAHRAIN',
        //   routeName: '中东线',
        //  }
        {
          end: "BASRAH",
          endEB: "BASRAH",
          routeName: "中东线",
        },
        {
          end: "DAMMAM",
          endEB: "DAMMAM",
          routeName: "中东线",
        },
        {
          end: "HAMAD",
          endEB: "HAMAD",
          routeName: "中东线",
        },
        {
          end: "JEBEL ALI",
          endEB: "JEBEL ALI",
          routeName: "中东线",
        },
        {
          end: "KUWAIT",
          endEB: "KUWAIT",
          routeName: "中东线",
        },
        {
          end: "Riyad",
          endEB: "RIYADH",
          routeName: "中东线",
        },
        {
          end: "SHARJAH",
          endEB: "SHARJAH",
          routeName: "中东线",
        },
        {
          end: "SOHAR",
          endEB: "SOHAR",
          routeName: "中东线",
        },
        {
          end: "UMM QASR",
          endEB: "UMM QASR",
          routeName: "中东线",
        },
      ],
      // 非上海 10
      [
        {
          end: "MOMBASA",
          endEB: "MOMBASA",
          routeName: "非洲线",
        },
        {
          end: "TEMA",
          endEB: "TEMA",
          routeName: "非洲线",
        },
        {
          end: "LOME",
          endEB: "LOME",
          routeName: "非洲线",
        },
        {
          end: "CAPE TOWN",
          endEB: "CAPE TOWN",
          routeName: "非洲线",
        },
        {
          end: "COTONOU",
          endEB: "COTONOU",
          routeName: "非洲线",
        },
        {
          end: "ABIDJAN",
          endEB: "ABIDJAN",
          routeName: "非洲线",
        },
        {
          end: "ONNE",
          endEB: "ONNE",
          routeName: "非洲线",
        },
        {
          end: "TINCAN",
          endEB: "TIN CAN",
          routeName: "非洲线",
        },
        {
          end: "APAPA",
          endEB: "APAPA",
          routeName: "非洲线",
        },
      ],
      [
        {
          end: "PORT SUDAN",
          endEB: "PORT SUDAN",
          routeName: "红海线",
        },
      ],
      [
        {
          end: "HALIFAX",
          endEB: "HALIFAX",
          routeName: "加拿大",
        },
        {
          end: "TORONTO",
          endEB: "TORONTO",
          routeName: "加拿大",
        },
        {
          end: "VANCOUVER",
          endEB: "VANCOUVER,BC,CA",
          routeName: "加拿大",
        },
        {
          end: "PRINCE RUPERT",
          endEB: "PRINCE RUPERT",
          routeName: "加拿大",
        },
        // {
        //   end: 'MONTREAL',
        //   endEB:'MONTREAL',
        //   routeName: '加拿大',
        // },
        {
          end: "EDMONTON",
          endEB: "EDMONTON",
          routeName: "加拿大",
        },
        {
          end: "CALGARY",
          endEB: "CALGARY",
          routeName: "加拿大",
        },
      ],
      [
        {
          end: "LOS ANGELES",
          endEB: "LOS ANGELES",
          routeName: "美国线",
        },
        {
          end: "AUCKLAND",
          endEB: "OAKLAND",
          routeName: "美国线",
        },
        {
          end: "LONG BEACH",
          endEB: "LONG BEACH",
          routeName: "美国线",
        },
        {
          end: "SEATTLE",
          endEB: "SEATTLE,WA",
          routeName: "美国线",
        },
        {
          end: "TACOMA",
          endEB: "TACOMA,WA",
          routeName: "美国线",
        },
        {
          end: "NEW YORK",
          endEB: "NEW YORK,NY",
          routeName: "美国线",
        },
        // {
        //   end: 'HOUSTON',
        //   endEB:'HOUSTON,TX',
        //   routeName: '美国线',
        // },
        // {
        //   end: 'SAVANNAH',
        //   endEB:'SAVANNAH,GA',
        //   routeName: '美国线',
        // },
        // {
        //   end: 'MIAMI',
        //   endEB:'MIAMI',
        //   routeName: '美国线',
        // },
        {
          end: "BALTIMORE",
          endEB: "BALTIMORE",
          routeName: "美国线",
        },
        // {
        //   end: 'NORFOLK',
        //   endEB:'NORFOLK,VA',
        //   routeName: '美国线',
        // },
        {
          end: "NEW ORLEANS",
          endEB: "NEW ORLEANS,LA",
          routeName: "美国线",
        },
        {
          end: "MOBILE",
          endEB: "MOBILE,AL",
          routeName: "美国线",
        },
        // {
        //   end: 'DALLAS',
        //   endEB:'DALLAS,TX',
        //   routeName: '美国线',
        // },
        {
          end: "BOSTON",
          endEB: "BOSTON",
          routeName: "美国线",
        },
        {
          end: "CHICAGO",
          endEB: "CHICAGO,IL",
          routeName: "美国线",
        },
        // {
        //   end: 'CLEVELAND',
        //   endEB:'CLEVELAND,OH',
        //   routeName: '美国线',
        // },
      ],
      [
        {
          end: "YOKOHAMA",
          endEB: "YOKOHAMA",
          routeName: "日本线",
        },
        {
          end: "TOKYO",
          endEB: "TOKYO",
          routeName: "日本线",
        },
        {
          end: "OSAKA",
          endEB: "OSAKA",
          routeName: "日本线",
        },
        {
          end: "NAGOYA",
          endEB: "NAGOYA",
          routeName: "日本线",
        },
        {
          end: "KOBE",
          endEB: "KOBE",
          routeName: "日本线",
        },
        {
          end: "YOKKAICHI",
          endEB: "YOKKAICHI",
          routeName: "日本线",
        },
        {
          end: "MOJI",
          endEB: "MOJI",
          routeName: "日本线",
        },
        {
          end: "HAKATA",
          endEB: "HAKATA",
          routeName: "日本线",
        },
        {
          end: "MIZUSHIMA",
          endEB: "MIZUSHIMA",
          routeName: "日本线",
        },
        {
          end: "IMABARI",
          endEB: "IMABARI",
          routeName: "日本线",
        },
        {
          end: "HIROSHIMA",
          endEB: "HIROSHIMA",
          routeName: "日本线",
        },
      ],
      [
        {
          end: "WILHELMSHAVEN",
          endEB: "WILHELMSHAVEN",
          routeName: "欧洲线",
        },
        {
          end: "FELIXSTOWE",
          endEB: "FELIXSTOWE",
          routeName: "欧洲线",
        },
        {
          end: "HELSINKI",
          endEB: "HELSINKI",
          routeName: "欧洲线",
        },
        {
          end: "GOTHENBURG",
          endEB: "GOTHENBURG",
          routeName: "欧洲线",
        },
        {
          end: "FOS SUR MER",
          endEB: "FOS SUR MER",
          routeName: "欧洲线",
        },
        {
          end: "TRIESTE",
          endEB: "TRIESTE",
          routeName: "欧洲线",
        },
        {
          end: "RIJEKA",
          endEB: "RIJEKA",
          routeName: "欧洲线",
        },
        {
          end: "KOPER",
          endEB: "KOPER",
          routeName: "欧洲线",
        },
        {
          end: "HAMBURG",
          endEB: "HAMBURG",
          routeName: "欧洲线",
        },
        {
          end: "GDANSK",
          endEB: "GDANSK",
          routeName: "欧洲线",
        },
      ],
      [
        {
          end: "GENOVA",
          endEB: "GENOVA",
          routeName: "地中海线",
        },
        {
          end: "BARCELONA",
          endEB: "BARCELONA",
          routeName: "地中海线",
        },
        // {
        //   end: 'VALENCIA',
        //   endEB:'VALENCIA',
        //   routeName: '地中海线',
        // },
        {
          end: "LA SPEZIA",
          endEB: "LA SPEZIA",
          routeName: "地中海线",
        },
        {
          end: "IZMIT",
          endEB: "IZMIT",
          routeName: "地中海线",
        },
        {
          end: "ISTANBUL",
          endEB: "ISTANBUL",
          routeName: "地中海线",
        },
        {
          end: "PIRAEUS",
          endEB: "PIRAEUS",
          routeName: "地中海线",
        },
        {
          end: "MARSAXLOKK",
          endEB: "MARSAXLOKK",
          routeName: "地中海线",
        },
        {
          end: "PORT SAID",
          endEB: "PORT SAID",
          routeName: "地中海线",
        },
      ],
      [
        {
          end: "KEELUNG",
          endEB: "KEELUNG",
          routeName: "台湾线",
        },
        {
          end: "KAOHSIUNG",
          endEB: "KAOHSIUNG",
          routeName: "台湾线",
        },
        {
          end: "TAICHUNG",
          endEB: "TAICHUNG",
          routeName: "台湾线",
        },
      ],
      [
        // {
        //   end: 'WELLINGTON',
        //   endEB:'WELLINGTON',
        //   routeName: '新西兰',
        // },
        {
          end: "TAURANGA",
          endEB: "TAURANGA",
          routeName: "新西兰",
        },
        {
          end: "NAPIER",
          endEB: "NAPIER",
          routeName: "新西兰",
        },
        {
          end: "LYTTELTON",
          endEB: "LYTTELTON",
          routeName: "新西兰",
        },
        {
          end: "AUCKLAND",
          endEB: "AUCKLAND",
          routeName: "新西兰",
        },
      ],
      [
        {
          end: "JEBEL ALI",
          endEB: "JEBEL ALI",
          routeName: "中东线",
        },
        {
          end: "DAMMAM",
          endEB: "DAMMAM",
          routeName: "中东线",
        },
        {
          end: "AJMAN",
          endEB: "AJMAN",
          routeName: "中东线",
        },
        {
          end: "Ar Riyad",
          endEB: "RIYADH",
          routeName: "中东线",
        },
        {
          end: "SHUAIBA",
          endEB: "SHUAIBA",
          routeName: "中东线",
        },
        {
          end: "SHUWAIKH",
          endEB: "SHUWAIKH",
          routeName: "中东线",
        },
      ],
      [
        {
          end: "MUNDRA",
          endEB: "MUNDRA",
          routeName: "印巴线",
        },
        {
          end: "COLOMBO",
          endEB: "COLOMBO",
          routeName: "印巴线",
        },
        {
          end: "DHAKA",
          endEB: "DHAKA",
          routeName: "印巴线",
        },
        {
          end: "NHAVA SHEVA",
          endEB: "NHAVA SHEVA",
          routeName: "印巴线",
        },
        {
          end: "PANGAON",
          endEB: "PANGAON",
          routeName: "印巴线",
        },
      ],
    ];
    $scope.runningPort = false;
    $scope.finish = false;
    $scope.finishTxt = "";
    $scope.opPort = [];
    $scope.allCrawlData = [];

    $scope.runFile = function (isFirstInput) {
      //  判断页面是否加载完成
      if (!$scope.pageLoaded) {
        return $scope.showAlert("请等待页面完全加载再操作", "danger");
      }

      $scope.opPort = JSON.parse(JSON.stringify($scope.endPort));
      if ($scope.startPortIndex == "") {
        return $scope.showAlert("Please select departure port", "danger");
      } else if ($scope.routeIndex == "") {
        return $scope.showAlert("Please select route", "danger");
      } else {
        chrome.tabs.executeScript($scope.working_tab_id, {
          file: "assets/js/content_script.js",
        });
        $scope.runningPort = true;
        //update allCrawlData when running end port new
        $scope.allCrawlData = [];
        $scope.search(
          $scope.startPort[$scope.startPortIndex],
          $scope.opPort[$scope.routeIndex][0],
          isFirstInput
        );
      }
    };

    $scope.search = function (startP, endP, isFirstInput = false) {
      setTimeout(() => {
        chrome.tabs.sendMessage($scope.working_tab_id, {
          data: {
            startPort: startP,
            endPort: endP,
            route:
              $scope.startPortIndex == "0"
                ? $scope.route[0][$scope.startPortIndex].value
                : $scope.route[1][$scope.startPortIndex].value,
          },
          isFirstInput: isFirstInput,
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
      const { status, data } = request;
      console.log("req", request);
      $scope.opPort[$scope.routeIndex].shift();

      if (status === 0) {
        $scope.runningPort = false;
        $scope.finish = true;
        $scope.finishTxt = "哎呦! 出错了~~~";
        $scope.$apply();
      } else if (status === 1 && data.resultsSearch.length > 0) {
        $scope.allCrawlData = $scope.allCrawlData.concat(...data.resultsSearch);
        if ($scope.opPort[$scope.routeIndex].length > 0) {
          $scope.search(
            $scope.startPort[$scope.startPortIndex],
            $scope.opPort[$scope.routeIndex][0]
          );
        }
      } else {
        if ($scope.opPort[$scope.routeIndex].length > 0) {
          $scope.search(
            $scope.startPort[$scope.startPortIndex],
            $scope.opPort[$scope.routeIndex][0]
          );
        }
      }

      if ($scope.opPort[$scope.routeIndex].length == 0) {
        if ($scope.allCrawlData.length > 0) {
          // Copy and remove duplicates
          const newAllCrawData = $scope.allCrawlData.filter(
            (item, index, self) => {
              return (
                self.findIndex(
                  (otherItem) =>
                    item.startPort === otherItem.startPort &&
                    item.range === otherItem.range &&
                    item.endPort === otherItem.endPort &&
                    item.transferPort === otherItem.transferPort &&
                    item.shipCompany === otherItem.shipCompany &&
                    item.startPortPier === otherItem.startPortPier &&
                    item.endPortPier === otherItem.endPortPier &&
                    item.routeName === otherItem.routeName &&
                    item.sailingDay === otherItem.sailingDay &&
                    item.firstSupply === otherItem.firstSupply &&
                    item.code === otherItem.code &&
                    item.schedule === otherItem.schedule
                ) === index
              );
            }
          );
          // send crawl data to API interface
          await $.ajax({
            url: "http://localhost:3000/moneyapi/crawlDataOOCL",
            type: "POST",
            data: JSON.stringify({ results: newAllCrawData }),
            contentType: "application/json",
            success: function (res) {
              if (res.status === 1) {
                console.log("Quote created successfully:", res);
                $scope.runningPort = false;
                $scope.allCrawlData = [];
                $scope.finish = true;
                const item = $scope.route
                  .flat()
                  .find((item) => item.id === Number($scope.routeIndex));
                $scope.finishTxt =
                  $scope.startPort[$scope.startPortIndex].nameEnEB +
                  " * " +
                  item.value +
                  " 操作完成";
                $scope.$apply();
              } else {
                console.error("Error creating quote:", res.message);
                $scope.runningPort = false;
                $scope.finish = true;
                $scope.finishTxt = res.message;
                $scope.$apply();
              }
            },
            error: function (err) {
              console.error("AJAX error:", err.responseJSON.errors);
              $scope.allCrawlData = [];
              $scope.runningPort = false;
              $scope.finish = true;
              $scope.finishTxt = err.responseJSON.errors;
              $scope.$apply();
            },
          });
        }
      }
    });

    // 监听页面是否加载完成
    // chrome.tabs.onUpdated.addListener(function (tabid, changeInfo, tab) {
    //   if (tabid !== $scope.working_tab_id) return false;
    //   if (changeInfo.status === "complete") {
    //     $scope.closeAlert();
    //     $scope.pageLoaded = true;
    //     chrome.storage.local.set({ pageLoaded: true });
    //   } else if (changeInfo.status === "loading") {
    //     $scope.pageLoaded = false;
    //     chrome.storage.local.set({ pageLoaded: false });
    //   }
    //   $scope.$apply();
    // });

    // 监听页面是否加载完成
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      console.log("changeInfo", tabId, changeInfo, tab);
      if (tabId !== $scope.working_tab_id) return false;

      if (changeInfo.status === "complete") {
        if (
          tab.url &&
          tab.url.includes("https://freightsmart.oocl.com/app/prebooking")
        ) {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              var activeTab = tabs[0];
              // 目标页在浏览器中的id
              $scope.working_tab_id = activeTab.id;
              $scope.runWorkingStage(
                activeTab,
                "https://freightsmart.oocl.com/app/prebooking"
              );

              chrome.tabs.executeScript(
                $scope.working_tab_id,
                { file: "assets/js/content_script.js" },
                function () {
                  setTimeout(() => {
                    chrome.tabs.sendMessage($scope.working_tab_id, {
                      status: 1,
                      updateTab: true,
                    });
                  }, 1000);
                }
              );
            }
          );
        }

        $scope.closeAlert();
        $scope.pageLoaded = true;
        chrome.storage.local.set({ pageLoaded: true });
      } else if (changeInfo.status === "loading") {
        $scope.pageLoaded = false;
        chrome.storage.local.set({ pageLoaded: false });
      }
      // Áp dụng các thay đổi của AngularJS
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

    // 监听目标页是否加载完成
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
