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
		// find dom
		let inputEle = document.querySelectorAll(
			".right > .el-tooltip__trigger input"
		);
		const searchEle = await cSelector("button.search-button");

		if (inputEle.length < 1 || !searchEle) {
			return false;
		}
		await inputDemo(port.startPort)
		//typing start port
		// const focus = await focusOnInput(inputEle[0]);
		// console.log('focus', focus);
		// await sleep(1000);

		// await clickElement(inputEle[0]);
		// await sleep(1000);

		// await inputTyping(inputEle[0], port.startPort, 500); //Shanghai, China
		// await sleep(2000);

		// await inputEle[0].focus();
		// await sleep(2000);
		// await clickElement(inputEle[0]);

		// // const selectStartPort = await selectPort(port.startPort);
		// // console.log(selectStartPort);
		// // await mClick(selectStartPort);
		// await sleep(2000);

		// // typing end port
		// await clickElement(inputEle[1]);
		// await sleep(2000);
		// await inputTyping(inputEle[1], port.endPort, 500); //Singapore, Singapore
		// await sleep(2000);
		// await clickElement(inputEle[1]);
		// await sleep(2000);
		// // const selectEndPort = await selectPort(port.endPort);
		// // selectEndPort.click();

		// // increase container size
		// const numberEle = document.querySelectorAll('.el-input-number .el-input__inner');
		// await inputTyping(numberEle[0]);
		// await sleep(2000);

		// // click search button
		// await clickElement(searchEle);
		// await sleep(2000);

		return true;
	} catch (error) {
		return false;
	}
}
async function inputDemo(value) { 
	const start = cName('el-input el-input--suffix input portDoorInput el-tooltip__trigger el-tooltip__trigger')[0]
	start.click()
	await sleep(1000)
	const startInput = cName('el-input__inner')[0]
	await sleep(1000)
	await typeText(startInput, value)
}

async function typeText(elementSelector, text) { //节点, 要赋值的内容
	// const inputElement = document.querySelector(elementSelector);
	const inputElement = elementSelector
	if (!inputElement) {
	  console.error(`Element with selector "${elementSelector}" not found.`);
	  return;
	}
	inputElement.click();
  
	// 等待一段时间，以确保光标已经在输入框中闪烁
	await new Promise(resolve => setTimeout(resolve, 100));
  
	// 创建一个 focus 事件并触发，以模拟光标在输入框中的焦点
	const focusEvent = new Event('focus', { bubbles: true });
	inputElement.dispatchEvent(focusEvent);
	for (let i = 0; i < text.length; i++) {
	  const char = text[i];
	  const event = new KeyboardEvent('keydown', {
		key: char,
		code: char.charCodeAt(0),
	  });
  
	  inputElement.value += char;
	  inputElement.dispatchEvent(event);
	}
  
	// 触发 input 事件以通知页面文本已更改
	const inputEvent = new Event('input', { bubbles: true });
	inputElement.dispatchEvent(inputEvent);
  }
chrome.runtime.onMessage.addListener(async function (
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
				{ actionId: "searchComplete", status: "OK" },
				function (res) { }
			);
		} else {
			await chrome.runtime.sendMessage(
				{ actionId: "searchComplete", status: "ERR" },
				function (res) { }
			);
		}
	}

	// if (request.action === 'crawlData') {
	// 	const data = await setManifestHtml(request);
	// 	console.log('data', data);
	// 	chrome.runtime.sendMessage({ actionId: 'crawlDataComplete', status: 'OK', data: data }, function (res) { });
	// }
});

//focus dom
function focusOnInput(dom) {
	return new Promise((resolve, reject) => {
		if (dom) {
			dom.focus();
			resolve("Input focused");
		} else {
			reject(new Error("Input element not found"));
		}
	});
}

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
			resolve(true);
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
			element.click();
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

// 模拟鼠标按下事件
function mouseDown(dom) {
	return new Promise((resolve, reject) => {
		try {
			var downEvt = new MouseEvent('mousedown', {
				bubbles: true,
				cancelable: true,
				view: window
			});
			dom.dispatchEvent(downEvt);
			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
}


// 模拟鼠标抬起事件
function mouseUp(dom) {
	var upEvt = new MouseEvent('mouseup', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	dom.dispatchEvent(upEvt);
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

function inputTyping(dom, text, ms = 1000) {
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

				dom.value += char;
				dom.dispatchEvent(keyEvent);
				index++;
				setTimeout(typeNextCharacter, ms);
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
function selectPort(port) {
	const start = document.querySelectorAll(".search-result-item .title");
	if (start.length > 0) {
		for (let i = 0; i < start.length; i++) {
			if (start[i].innerText === port) {
				return start[i];
			}
		}
	} else {
		console.log("Error not found select");
	}
}
