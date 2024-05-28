var manifestRequest = {};
var user = {
  name: "riverhe",
  password: "Fy112516",
};
async function setManifestHtml() {
  try {
    const data = await crawlData();
    return data;
  } catch (error) {
    return false;
  }
}

async function search(port) {
  try {
    await sleep(3000);
    const inputEle = document.querySelectorAll(
      ".right > .el-tooltip__trigger input"
    );
    const increaseEle = document.querySelectorAll(".el-input-number__increase");
    const searchEle = await cSelector("button.search-button");

    if (inputEle.length < 1 || increaseEle.length < 1 || !searchEle) {
      return false;
    }
    //typing start and end port
    await inputTyping(inputEle[0], port.startPort, 500); //Shanghai, China
    await sleep(2000);
    await clickElement(inputEle[0]);
    console.log("y", await clickElement(inputEle[0]));
    await sleep(2000);
    const ele = await cSelector(".el-card__header");
    console.log("c", ele);
    await clickElement(ele);

    await sleep(2000);
    // const selectStartPort = await selectPort(port.startPort);
    // console.log(selectStartPort);
    // await mClick(selectStartPort);
    // await sleep(2000);

    await inputValue(inputEle[1], port.endPort); //Singapore, Singapore
    await sleep(2000);
    mClick(inputEle[1]);
    await sleep(2000);
    const selectEndPort = await selectPort(port.endPort);
    selectEndPort.click();
    // increase container size
    mClick(increaseEle[0]);
    await sleep(2000);
    // click search button
    mClick(searchEle);
    await sleep(2000);

    return true;
  } catch (error) {
    return false;
  }
}

chrome.extension.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const { action, data } = request;

  if (action === "search") {
    manifestRequest = data;
    const isSearch = await search(manifestRequest);
    if (isSearch) {
      await chrome.runtime.sendMessage(
        { actionId: "searchComplete", status: "OK", data: data },
        function (res) {}
      );
    } else {
      await chrome.runtime.sendMessage(
        { actionId: "searchComplete", status: "ERR", data: data },
        function (res) {}
      );
    }
  }

  // if (request.action === 'crawlData') {
  // 	const data = await setManifestHtml(request);
  // 	console.log('data', data);
  // 	chrome.runtime.sendMessage({ actionId: 'crawlDataComplete', status: 'OK', data: data }, function (res) { });
  // }
});

// 鼠标点击事件
function mClick(dom) {
  return new Promise((resolve, reject) => {
    try {
      var event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      dom.dispatchEvent(event);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
function clickElement(element) {
  return new Promise(async (resolve) => {
    try {
      setTimeout(() => {
        resolve(true);
      }, 2000);
      await element.click();
      resolve(true);
    } catch (err) {
      console.log(err);
    }
  });
}

// 模拟键盘向下按键
function mKeydown(dom) {
  var downEvt = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    keyCode: 40,
  });
  dom.dispatchEvent(downEvt);
}
// 模拟键盘向上按键
function mKeyUp(dom) {
  var downEvt = new KeyboardEvent("keyup", {
    bubbles: true,
    cancelable: true,
    keyCode: 40,
  });
  dom.dispatchEvent(downEvt);
}
// 模拟键盘回车按键
function enterEvt(dom) {
  var enterEvt = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    which: 13,
  });
  dom.dispatchEvent(enterEvt);
}

function inputValue(dom, st) {
  var evt = new InputEvent("input", {
    inputType: "insertText",
    data: st,
    dataTransfer: null,
    isComposing: false,
  });
  dom.value = st;
  dom.dispatchEvent(evt);
}

function inputTyping(dom, text, interval = 1000) {
  return new Promise((resolve, reject) => {
    if (!dom || !(dom instanceof HTMLElement)) {
      return reject(new Error("Invalid DOM element"));
    }

    let index = 0;

    function typeNextCharacter() {
      if (index < text.length) {
        let char = text[index];
        let keyEvent = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: char,
          code: `Key${char.toUpperCase()}`,
          charCode: char.charCodeAt(0),
          keyCode: char.charCodeAt(0),
          which: char.charCodeAt(0),
        });

        dom.value += char; // Thêm ký tự vào giá trị của input
        dom.dispatchEvent(keyEvent); // Kích hoạt sự kiện 'keydown'
        index++;
        setTimeout(typeNextCharacter, interval); // Chờ một khoảng thời gian trước khi gõ ký tự tiếp theo
      } else {
        resolve("Typing simulation completed");
      }
    }

    typeNextCharacter();
  });
}

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

function $(id) {
  return document.getElementById(id);
}

function cSelector(selector) {
  return document.querySelector(selector);
}

function cName(name) {
  return document.getElementsByClassName(name);
}

function isLoggedIn() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
      return true;
    }
  }
  return false;
}

async function loginOOCL(userName, password) {
  let isLogin = false;
  try {
    const eleUserName = await cSelector('input[class="el-input__inner"]');
    const eleNext = await cSelector('button[type="button"]');
    if (eleUserName && eleNext) {
      await inputTyping(eleUserName, userName);
      await sleep(random(1000, 3000));
      await mClick(eleNext);
      await sleep(random(1000, 3000));

      const elePassword = await cSelector("input#login-password-input");
      const eleLogin = await cSelector('button[type="button"]');
      if (elePassword && eleLogin && elePassword.value === password) {
        await mClick(await cSelector('button[type="button"]'));
        isLogin = true;
      } else if (elePassword && eleLogin) {
        await inputTyping(elePassword, password, 1000);
        await sleep(random(1000, 3000));
        await mClick(eleLogin);
        isLogin = true;
      } else {
        isLogin = false;
      }
    } else {
      return isLogin;
    }
    return isLogin;
  } catch (error) {
    return isLogin;
  }
}

function crawlData() {
  let data = {};
  document.querySelectorAll("script").forEach((script) => script.remove());

  //content search results
  const selectorResults = document.querySelectorAll(
    ".product-show-wrapper .product-content-card"
  );
  let resultSearch = [];
  for (let i = 0; i < selectorResults.length; i++) {
    resultSearch.push(selectorResults[i].innerText.split("\n"));
  }

  data = {
    search: {
      from: document.querySelectorAll(".current-search .from-to .title")[0]
        .innerText,
      to: document.querySelectorAll(".current-search .from-to .title")[1]
        .innerText,
      cutoffDateStart: document.querySelectorAll(
        ".current-search .departure .text"
      )[0].innerText,
      cutoffDateEnd: document.querySelectorAll(
        ".current-search .departure .text"
      )[2].innerText,
      quantity: document.querySelectorAll(
        ".current-search .containers-count .text"
      )[0].innerText,
      typeContainer: document.querySelectorAll(
        ".current-search .containers-count .text"
      )[2].innerText,
    },
    resultsSearch: resultSearch,
  };
  return data;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 港口处理
async function selectPort(port) {
  const start = await cSelector(".search-result-item .title");
  for (let i = 0; i < start.length; i++) {
    if (start[i].innerText === port) {
      return start[i];
    }
  }
}
