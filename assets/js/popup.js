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

    $scope.startPort = [
      { id: 0, nameEn: 'SHANGHAI', nameEnEB: 'SHANGHAI', name: 'Shanghai, China' },
      { id: 1, nameEn: 'SHEKOU', nameEnEB: 'SHENZHEN', name: 'Shekou, Shenzhen, Guangdong, China' },
      { id: 2, nameEn: 'YANTIAN', nameEnEB: 'SHENZHEN', name: 'Yantian, Shenzhen, Guangdong, China' },
      { id: 3, nameEn: 'DALIAN', nameEnEB: 'DALIAN', name: 'Dalian, Dalian, Liaoning, China' },
      { id: 4, nameEn: 'HUANGPU', nameEnEB: 'GUANGZHOU', name: 'Huangpu, Guangzhou, Guangdong, China' },
      { id: 5, nameEn: 'NANSHA', nameEnEB: 'GUANGZHOU', name: 'Nansha, Guangzhou, Guangdong, China' },
      { id: 6, nameEn: 'NINGBO', nameEnEB: 'NINGBO', name: 'Ningbo, Ningbo, Zhejiang, China' },
      { id: 7, nameEn: 'QINGDAO', nameEnEB: 'QINGDAO', name: 'Qingdao, Qingdao, Shandong, China' },
      { id: 8, nameEn: 'TAICANG', nameEnEB: 'TAICANG', name: 'Taicang, Suzhou, Jiangsu, China' },
      { id: 9, nameEn: 'WUHAN', nameEnEB: 'WUHAN', name: 'Wuhan, Wuhan, Hubei, China' },
      { id: 10, nameEn: 'XIAMEN', nameEnEB: 'XIAMEN', name: 'Xiamen, Xiamen, Fujian, China' },
      { id: 11, nameEn: 'XINGANG', nameEnEB: 'TIANJIN', name: 'Xingang, Tianjin, China' },
    ]
    $scope.startIndex = '0'

    $scope.routeLine = [
      //Shanghai
      [
        { value: 'Australian', id: 0 },
        { value: 'SoutheastAsia', id: 1 },
        { value: 'RedSea', id: 2 },
        { value: 'European', id: 3 },
        { value: 'IndiaPakistan', id: 4 },
        { value: 'MiddleEast', id: 5 },
      ],
      // not Shanghai
      [
        { value: 'African', id: 6 },
        { value: 'RedSea', id: 7 },
        { value: 'Canada', id: 8 },
        { value: 'American', id: 9 },
        { value: 'Japan', id: 10 },
        { value: 'European', id: 11 },
        { value: 'Mediterranean', id: 12 },
        { value: 'Taiwan', id: 13 },
        { value: 'NewZealand', id: 14 },
        { value: 'MiddleEast', id: 15 },
        { value: 'IndiaPakistan', id: 16 },
      ]
    ]
    $scope.route = ''

    $scope.endPort = [
      // shanghai
      [{
        end: 'ADELAIDE',
        endEB: 'ADELAIDE',
        routeName: 'Australian',
      },
      {
        end: 'BRISBANE',
        endEB: 'BRISBANE',
        routeName: 'Australian',
      },
      {
        end: 'FREMANTLE',
        endEB: 'FREMANTLE',
        routeName: 'Australian',
      },
      {
        end: 'MELBOURNE',
        endEB: 'MELBOURNE',
        routeName: 'Australian',
      },
      {
        end: 'SYDNEY',
        endEB: 'SYDNEY',
        routeName: 'Australian',
      },
      ],
      [
        {
          end: 'BANGKOK',
          endEB: 'BANGKOK',
          routeName: 'SoutheastAsia',
          name: ''
        },
        {
          end: 'BATAM',
          endEB: 'BATAM',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'BELAWAN',
          endEB: 'BELAWAN',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'CEBU',
          endEB: 'CEBU',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'HAI PHONG',
          endEB: 'HAIPHONG',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'Ho Chi Minh',
          endEB: 'HOCHIMINH',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'JAKARTA',
          endEB: 'JAKARTA',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'LAEM CHABANG',
          endEB: 'LAEM CHABANG',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'LAT KRABANG',
          endEB: 'LAT KRABANG',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'MANILA',
          endEB: 'MANILA',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'PASIR GUDANG',
          endEB: 'PASIR GUDANG',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'PENANG',
          endEB: 'PENANG',
          routeName: 'SoutheastAsia',
        }
        , {
          end: 'PERAWANG',
          endEB: 'PERAWANG',
          routeName: 'SoutheastAsia',
        }
        , {
          end: 'PHNOM PENH',
          endEB: 'PHNOM PENH',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'SEMARANG',
          endEB: 'SEMARANG',
          routeName: 'SoutheastAsia',
          name: 'Semarang, Jawa Tengah, Indonesia'
        }, {
          end: 'SIHANOUKVILLE',
          endEB: 'SIHANOUKVILLE',
          routeName: 'SoutheastAsia',
          name: 'Sihanoukville, Sihanoukville, Cambodia'
        },
        {
          end: 'SINGAPORE',
          endEB: 'SINGAPORE',
          routeName: 'SoutheastAsia',
          name: 'Singapore, Singapore'
        },
        {
          end: 'SURABAYA',
          endEB: 'SURABAYA',
          routeName: 'SoutheastAsia',
        }, {
          end: 'TANJUNG PELEPAS',
          endEB: 'TANJUNG PELEPAS',
          routeName: 'SoutheastAsia',
        }, {
          end: 'YANGON',
          endEB: 'YANGON',
          routeName: 'SoutheastAsia',
        },
        {
          end: 'port klang',
          endEB: 'PORT KELANG',
          routeName: 'SoutheastAsia'
        }
      ],
      [
        {
          end: 'JEDDAH',
          endEB: 'JEDDAH',
          routeName: 'RedSea',
        },
        {
          end: 'SOKHNA',
          endEB: 'SOKHNA',
          routeName: 'RedSea',
        },
        {
          end: 'DJIBOUTI',
          endEB: 'DJIBOUTI',
          routeName: 'RedSea',
        },
        {
          end: 'AQABA',
          endEB: 'AQABA',
          routeName: 'RedSea',
        },
      ],
      [
        {
          end: 'ANTWERP',
          endEB: 'ANTWERP',
          routeName: 'European',
        },
        {
          end: 'DUNKERQUE',
          endEB: 'DUNKERQUE',
          routeName: 'European',
        },
        {
          end: 'FELIXSTOWE',
          endEB: 'FELIXSTOWE',
          routeName: 'European',
        },
        {
          end: 'GDANSK',
          endEB: 'GDANSK',
          routeName: 'European',
        },
        {
          end: 'HAMBURG',
          endEB: 'HAMBURG',
          routeName: 'European',
        }, {
          end: 'LE HAVRE',
          endEB: 'LE HAVRE',
          routeName: 'European',
        },
        {
          end: 'ROTTERDAM',
          endEB: 'ROTTERDAM',
          routeName: 'European',
        }, {
          end: 'SOUTHAMPTON',
          endEB: 'SOUTHAMPTON',
          routeName: 'European',
        }, {
          end: 'ZEEBRUGGE',
          endEB: 'ZEEBRUGGE',
          routeName: 'European',
        }, {
          end: 'Sankt Peterburg',
          endEB: 'ST.PETERSBURG',
          routeName: 'European',
        },
      ],
      [
        {
          end: 'BANGALORE',
          endEB: 'BANGALORE',
          routeName: 'IndiaPakistan',
        }, {
          end: 'Kolkata',//
          endEB: 'CALCUTTA',
          routeName: 'IndiaPakistan',
        },
        {
          end: 'CHENNAI',
          endEB: 'CHENNAI',
          routeName: 'IndiaPakistan',
        }, {
          end: 'Chattogram',
          endEB: 'CHITTAGONG',
          routeName: 'IndiaPakistan',
        },
        {
          end: 'kochi',
          endEB: 'COCHIN',
          routeName: 'IndiaPakistan',
        }, {
          end: 'COLOMBO',
          endEB: 'COLOMBO',
          routeName: 'IndiaPakistan',
        }, {
          end: 'HALDIA',
          endEB: 'HALDIA',
          routeName: 'IndiaPakistan',
        }, {
          end: 'AHMEDABAD',//ICD AHMEDABAD
          endEB: 'ICD AHMEDABAD',
          routeName: 'IndiaPakistan',
        }, {
          end: 'Vadodara',//ICD BARODA
          endEB: 'ICD BARODA',
          routeName: 'IndiaPakistan',
        }, {
          end: 'BORKHEDI',//ICD BORKHEDI
          endEB: 'ICD BORKHEDI',
          routeName: 'IndiaPakistan',
        }, {
          end: 'DADRI',//ICD DADRI
          endEB: 'ICD DADRI',
          routeName: 'IndiaPakistan',
        }, {
          end: 'GARHI',
          endEB: 'ICD GARHI HARSARU',
          routeName: 'IndiaPakistan',
        }, {
          end: 'HYDERABAD',
          endEB: 'ICD HYDERABAD',
          routeName: 'IndiaPakistan',
        }, {
          end: 'KANPUR',
          endEB: 'ICD KANPUR',
          routeName: 'IndiaPakistan',
        }, {
          end: 'LUDHIANA',
          endEB: 'ICD LUDHIANA',
          routeName: 'IndiaPakistan',
        }, {
          end: 'MORADABAD',
          endEB: 'ICD MORADABAD',
          routeName: 'IndiaPakistan',
        }, {
          end: 'NAGPUR',
          endEB: 'ICD NAGPUR',
          routeName: 'IndiaPakistan',
        }, {
          end: 'TIHI',
          endEB: 'ICD TIHI',
          routeName: 'IndiaPakistan',
        }, {
          end: 'KARACHI',
          endEB: 'KARACHI',
          routeName: 'IndiaPakistan',
        }, {
          end: 'Kuwait',
          endEB: 'KHATUWAS',
          routeName: 'IndiaPakistan',
        }, {
          end: 'MANDIDEEP',
          endEB: 'MANDIDEEP',
          routeName: 'IndiaPakistan',
        }, {
          end: 'MONGLA',
          endEB: 'MONGLA',
          routeName: 'IndiaPakistan',
        }, {
          end: 'MUNDRA',
          endEB: 'MUNDRA',
          routeName: 'IndiaPakistan',
        }, {
          end: 'NHAVA SHEVA',
          endEB: 'NHAVA SHEVA',
          routeName: 'IndiaPakistan',
        }, {
          end: 'SANAND',
          endEB: 'SANAND',
          routeName: 'IndiaPakistan',
        }, {
          end: 'SONIPAT',
          endEB: 'SONIPAT',
          routeName: 'IndiaPakistan',
        }, {
          end: 'TUMB',
          endEB: 'TUMB',
          routeName: 'IndiaPakistan',
        }, {
          end: 'TUTICORIN',
          endEB: 'TUTICORIN',
          routeName: 'IndiaPakistan',
        }, {
          end: 'VISAKHAPATNAM',
          endEB: 'VISAKHAPATNAM',
          routeName: 'IndiaPakistan',
        },
        // {
        //   end: '新德里',
        //   endEB:'ICD FARIDABAD',
        //   routeName: 'IndiaPakistan',
        // },
      ],
      [
        {
          end: 'ABU DHABI',
          endEB: 'ABU DHABI',
          routeName: 'MiddleEast',
        },
        {
          end: 'AJMAN',
          endEB: 'AJMAN',
          routeName: 'MiddleEast',
        },
        // {
        //   end: 'BAHRAIN',
        //   endEB:'BAHRAIN',
        //   routeName: 'MiddleEast',
        //  }
        , {
          end: 'BASRAH',
          endEB: 'BASRAH',
          routeName: 'MiddleEast',
        },
        {
          end: 'DAMMAM',
          endEB: 'DAMMAM',
          routeName: 'MiddleEast',
        }, {
          end: 'HAMAD',
          endEB: 'HAMAD',
          routeName: 'MiddleEast',
        }, {
          end: 'JEBEL ALI',
          endEB: 'JEBEL ALI',
          routeName: 'MiddleEast',
        }, {
          end: 'KUWAIT',
          endEB: 'KUWAIT',
          routeName: 'MiddleEast',
        }, {
          end: 'Riyad',
          endEB: 'RIYADH',
          routeName: 'MiddleEast',
        }, {
          end: 'SHARJAH',
          endEB: 'SHARJAH',
          routeName: 'MiddleEast',
        }, {
          end: 'SOHAR',
          endEB: 'SOHAR',
          routeName: 'MiddleEast',
        }, {
          end: 'UMM QASR',
          endEB: 'UMM QASR',
          routeName: 'MiddleEast',
        },
      ],
      // Not shanghai
      [
        {
          end: 'MOMBASA',
          endEB: 'MOMBASA',
          routeName: 'African',
        },
        {
          end: 'TEMA',
          endEB: 'TEMA',
          routeName: 'African',
        },
        {
          end: 'LOME',
          endEB: 'LOME',
          routeName: 'African',
        },
        {
          end: 'CAPE TOWN',
          endEB: 'CAPE TOWN',
          routeName: 'African',
        },
        {
          end: 'COTONOU',
          endEB: 'COTONOU',
          routeName: 'African',
        },
        {
          end: 'ABIDJAN',
          endEB: 'ABIDJAN',
          routeName: 'African',
        },
        {
          end: 'ONNE',
          endEB: 'ONNE',
          routeName: 'African',
        },
        {
          end: 'TINCAN',
          endEB: 'TIN CAN',
          routeName: 'African',
        },
        {
          end: 'APAPA',
          endEB: 'APAPA',
          routeName: 'African',
        },
      ],
      [
        {
          end: 'PORT SUDAN',
          endEB: 'PORT SUDAN',
          routeName: 'RedSea',
        },
      ],
      [
        {
          end: 'HALIFAX',
          endEB: 'HALIFAX',
          routeName: 'Canada',
        },
        {
          end: 'TORONTO',
          endEB: 'TORONTO',
          routeName: 'Canada',
        },
        {
          end: 'VANCOUVER',
          endEB: 'VANCOUVER,BC,CA',
          routeName: 'Canada',
        },
        {
          end: 'PRINCE RUPERT',
          endEB: 'PRINCE RUPERT',
          routeName: 'Canada',
        },
        // {
        //   end: 'MONTREAL',
        //   endEB:'MONTREAL',
        //   routeName: 'Canada',
        // },
        {
          end: 'EDMONTON',
          endEB: 'EDMONTON',
          routeName: 'Canada',
        },
        {
          end: 'CALGARY',
          endEB: 'CALGARY',
          routeName: 'Canada',
        },
      ],
      [
        {
          end: 'LOS ANGELES',
          endEB: 'LOS ANGELES',
          routeName: 'American',
        },
        {
          end: 'AUCKLAND',
          endEB: 'OAKLAND',
          routeName: 'American',
        },
        {
          end: 'LONG BEACH',
          endEB: 'LONG BEACH',
          routeName: 'American',
        },
        {
          end: 'SEATTLE',
          endEB: 'SEATTLE,WA',
          routeName: 'American',
        },
        {
          end: 'TACOMA',
          endEB: 'TACOMA,WA',
          routeName: 'American',
        },
        {
          end: 'NEW YORK',
          endEB: 'NEW YORK,NY',
          routeName: 'American',
        },
        // {
        //   end: 'HOUSTON',
        //   endEB:'HOUSTON,TX',
        //   routeName: 'American',
        // },
        // {
        //   end: 'SAVANNAH',
        //   endEB:'SAVANNAH,GA',
        //   routeName: 'American',
        // },
        // {
        //   end: 'MIAMI',
        //   endEB:'MIAMI',
        //   routeName: 'American',
        // },
        {
          end: 'BALTIMORE',
          endEB: 'BALTIMORE',
          routeName: 'American',
        },
        // {
        //   end: 'NORFOLK',
        //   endEB:'NORFOLK,VA',
        //   routeName: 'American',
        // },
        {
          end: 'NEW ORLEANS',
          endEB: 'NEW ORLEANS,LA',
          routeName: 'American',
        },
        {
          end: 'MOBILE',
          endEB: 'MOBILE,AL',
          routeName: 'American',
        },
        // {
        //   end: 'DALLAS',
        //   endEB:'DALLAS,TX',
        //   routeName: 'American',
        // },
        {
          end: 'BOSTON',
          endEB: 'BOSTON',
          routeName: 'American',
        },
        {
          end: 'CHICAGO',
          endEB: 'CHICAGO,IL',
          routeName: 'American',
        },
        // {
        //   end: 'CLEVELAND',
        //   endEB:'CLEVELAND,OH',
        //   routeName: 'American',
        // },
      ],
      [
        {
          end: 'YOKOHAMA',
          endEB: 'YOKOHAMA',
          routeName: 'Japan',
        },
        {
          end: 'TOKYO',
          endEB: 'TOKYO',
          routeName: 'Japan',
        },
        {
          end: 'OSAKA',
          endEB: 'OSAKA',
          routeName: 'Japan',
        },
        {
          end: 'NAGOYA',
          endEB: 'NAGOYA',
          routeName: 'Japan',
        },
        {
          end: 'KOBE',
          endEB: 'KOBE',
          routeName: 'Japan',
        },
        {
          end: 'YOKKAICHI',
          endEB: 'YOKKAICHI',
          routeName: 'Japan',
        },
        {
          end: 'MOJI',
          endEB: 'MOJI',
          routeName: 'Japan',
        },
        {
          end: 'HAKATA',
          endEB: 'HAKATA',
          routeName: 'Japan',
        },
        {
          end: 'MIZUSHIMA',
          endEB: 'MIZUSHIMA',
          routeName: 'Japan',
        },
        {
          end: 'IMABARI',
          endEB: 'IMABARI',
          routeName: 'Japan',
        },
        {
          end: 'HIROSHIMA',
          endEB: 'HIROSHIMA',
          routeName: 'Japan',
        },
      ],
      [
        {
          end: 'WILHELMSHAVEN',
          endEB: 'WILHELMSHAVEN',
          routeName: 'European',
        },
        {
          end: 'FELIXSTOWE',
          endEB: 'FELIXSTOWE',
          routeName: 'European',
        },
        {
          end: 'HELSINKI',
          endEB: 'HELSINKI',
          routeName: 'European',
        },
        {
          end: 'GOTHENBURG',
          endEB: 'GOTHENBURG',
          routeName: 'European',
        },
        {
          end: 'FOS SUR MER',
          endEB: 'FOS SUR MER',
          routeName: 'European',
        },
        {
          end: 'TRIESTE',
          endEB: 'TRIESTE',
          routeName: 'European',
        },
        {
          end: 'RIJEKA',
          endEB: 'RIJEKA',
          routeName: 'European',
        },
        {
          end: 'KOPER',
          endEB: 'KOPER',
          routeName: 'European',
        },
        {
          end: 'HAMBURG',
          endEB: 'HAMBURG',
          routeName: 'European',
        },
        {
          end: 'GDANSK',
          endEB: 'GDANSK',
          routeName: 'European',
        },
      ],
      [
        {
          end: 'GENOVA',
          endEB: 'GENOVA',
          routeName: 'Mediterranean',
        },
        {
          end: 'BARCELONA',
          endEB: 'BARCELONA',
          routeName: 'Mediterranean',
        },
        // {
        //   end: 'VALENCIA',
        //   endEB:'VALENCIA',
        //   routeName: 'Mediterranean',
        // },
        {
          end: 'LA SPEZIA',
          endEB: 'LA SPEZIA',
          routeName: 'Mediterranean',
        },
        {
          end: 'IZMIT',
          endEB: 'IZMIT',
          routeName: 'Mediterranean',
        },
        {
          end: 'ISTANBUL',
          endEB: 'ISTANBUL',
          routeName: 'Mediterranean',
        },
        {
          end: 'PIRAEUS',
          endEB: 'PIRAEUS',
          routeName: 'Mediterranean',
        },
        {
          end: 'MARSAXLOKK',
          endEB: 'MARSAXLOKK',
          routeName: 'Mediterranean',
        },
        {
          end: 'PORT SAID',
          endEB: 'PORT SAID',
          routeName: 'Mediterranean',
        },
      ],
      [
        {
          end: 'KEELUNG',
          endEB: 'KEELUNG',
          routeName: 'Taiwan',
        },
        {
          end: 'KAOHSIUNG',
          endEB: 'KAOHSIUNG',
          routeName: 'Taiwan',
        },
        {
          end: 'TAICHUNG',
          endEB: 'TAICHUNG',
          routeName: 'Taiwan',
        },
      ],
      [
        // {
        //   end: 'WELLINGTON',
        //   endEB:'WELLINGTON',
        //   routeName: 'NewZealand',
        // },
        {
          end: 'TAURANGA',
          endEB: 'TAURANGA',
          routeName: 'NewZealand',
        },
        {
          end: 'NAPIER',
          endEB: 'NAPIER',
          routeName: 'NewZealand',
        },
        {
          end: 'LYTTELTON',
          endEB: 'LYTTELTON',
          routeName: 'NewZealand',
        },
        {
          end: 'AUCKLAND',
          endEB: 'AUCKLAND',
          routeName: 'NewZealand',
        },
      ],
      [
        {
          end: 'JEBEL ALI',
          endEB: 'JEBEL ALI',
          routeName: 'MiddleEast',
        },
        {
          end: 'DAMMAM',
          endEB: 'DAMMAM',
          routeName: 'MiddleEast',
        },
        {
          end: 'AJMAN',
          endEB: 'AJMAN',
          routeName: 'MiddleEast',
        },
        {
          end: 'Ar Riyad',
          endEB: 'RIYADH',
          routeName: 'MiddleEast',
        },
        {
          end: 'SHUAIBA',
          endEB: 'SHUAIBA',
          routeName: 'MiddleEast',
        },
        {
          end: 'SHUWAIKH',
          endEB: 'SHUWAIKH',
          routeName: 'MiddleEast',
        },
      ],
      [
        {
          end: 'MUNDRA',
          endEB: 'MUNDRA',
          routeName: 'IndiaPakistan',
        },
        {
          end: 'COLOMBO',
          endEB: 'COLOMBO',
          routeName: 'IndiaPakistan',
        },
        {
          end: 'DHAKA',
          endEB: 'DHAKA',
          routeName: 'IndiaPakistan',
        },
        {
          end: 'NHAVA SHEVA',
          endEB: 'NHAVA SHEVA',
          routeName: 'IndiaPakistan',
        },
        {
          end: 'PANGAON',
          endEB: 'PANGAON',
          routeName: 'IndiaPakistan',
        },
      ]
    ]
    $scope.valueEndPort = '0'

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
          data: {
            startPort: $scope.startPort[$scope.startIndex].name,
            routeName: $scope.startIndex == 0 ?
              $scope.routeLine[0][$scope.route].value
              :
              $scope.routeLine[1][$scope.route].value,
            endPort: $scope.valueEndPort
          },
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
