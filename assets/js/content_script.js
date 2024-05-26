var manifestRequest = {};
async function setManifestHtml() {
  //   console.log("进入目标页面");
  var request = manifestRequest; // 从popup.js页面获取的数据
  // 操作目标页面节点
  // $('kw').value = request//给百度首页输入框赋值
  await inputTyping(await $("kw"), request, 1000);
  await sleep(1000); //等待1s
  // $('su').click()//点击‘百度一下’查询按钮
  await mClick(await $("su"));
  await sleep(3000);
  await mClick(
    await cSelector(
      "#s_tab > div > a.s-tab-item.s-tab-item_1CwH-.s-tab-wenku_GwhrW.s-tab-wenku"
    )
  );
  await sleep(10000);
  const data = await crawlData();
  return data;
}

chrome.extension.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  await sleep(1200);
  manifestRequest = request.data;
  console.log(manifestRequest, "目标页接收的值");
  const data = await setManifestHtml(); // 进行需求处理
  console.log(data);
  // await sleep(2000);
  // chrome.runtime.sendMessage({ 'data': data }, () => { })	 //回调 （将有需要的数据传回popup.js）
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
      resolve("Event dispatched successfully");
    } catch (error) {
      reject(error);
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
  return new Promise((resolve, reject) => {
    try {
      var enterEvt = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "Enter", // 'key' là giá trị chuỗi đại diện cho phím được nhấn
        code: "Enter", // 'code' là giá trị chuỗi đại diện cho mã phím
        keyCode: 13, // 'keyCode' là mã số phím được nhấn
        which: 13, // 'which' là mã số phím được nhấn (giống như keyCode)
      });
      dom.dispatchEvent(enterEvt);
      resolve("Event dispatched successfully");
    } catch (error) {
      reject(error);
    }
  });
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
  return new Promise((resolve, reject) => {
    const element = document.getElementById(id);
    if (element) {
      resolve(element);
    } else {
      reject(new Error(`Element with id "${id}" not found`));
    }
  });
}

function cSelector(selector) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
    } else {
      reject(new Error(`Select with selector ${selector} not found`));
    }
  });
}

function cName(name) {
  return new Promise((resolve, reject) => {
    const element = document.getElementsByClassName(name);
    if (element) {
      resolve(element);
    } else {
      reject(new Error(`Elemeny with name "${name}" not found`));
    }
  });
}

// function cName(name) {
// 	return document.getElementsByClassName(name)
// }

function crawlData() {
  let data = {};
  data = {
    // html: document.documentElement.outerHTML,
    // text: document.body.textContent.split("\n"),
    content: cSelector(".search-center-left").textContent.split("\n"),
  };

  return data;
}
