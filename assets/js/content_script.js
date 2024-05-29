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
		const inputEle = cName('el-input__inner')
		const searchEle = await cSelector("button.search-button");
		// check exist dom
		if (inputEle.length < 1 || !searchEle) {
			return false;
		}
		// typing start port
		await inputDemo(inputEle[0], port.startPort)
		await sleep(1000);

		// typing end port
		await inputDemo(inputEle[1], port.endPort); //Singapore, Singapore
		await sleep(1000);

		// const selectEndPort = await selectPort(port.endPort);
		// selectEndPort.click();

		// // increase container size
		// const numberEle = document.querySelectorAll('.el-input-number .el-input__inner');
		// await inputTyping(numberEle[0]);
		// await sleep(2000);

		// click search button
		await clickElement(searchEle);
		await sleep(2000);

		return true;
	} catch (error) {
		return false;
	}
}
async function inputDemo(dom, value) {
	const start = cName('el-input el-input--suffix input portDoorInput el-tooltip__trigger el-tooltip__trigger')[0]
	start.click()
	await sleep(1000)
	await typeText(dom, value)
}

async function typeText(elementSelector, text) { //节点, 要赋值的内容
	const inputElement = elementSelector
	if (!inputElement) {
		console.error(`Element with selector "${elementSelector}" not found.`);
		return;
	}
	inputElement.click();

	// wait for input flash
	await new Promise(resolve => setTimeout(resolve, 1000));

	// focus input
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

	// handle change input value 
	const inputEvent = new Event('input', { bubbles: true });
	inputElement.dispatchEvent(inputEvent);
	await sleep(2000);

	// select option of menu
	const option = cName('search-result-item')[0];
	await sleep(2000);
	option.dispatchEvent(focusEvent);
	await sleep(1000);

	option.click();
}
chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	const { action, data } = request;

	manifestRequest = data;
	if (action === "search") {
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

	if (request.action === 'crawlData') {
		const data = await setManifestHtml(request);
		console.log('data', data);
		chrome.runtime.sendMessage({ actionId: 'crawlDataComplete', status: 'OK', data: data }, function (res) { });
	}
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
	let index = {
		startPort: 0,
		endPort: 3,
		exportDate: 1,
		tripCode: 0,
		shipName: 0,
		tripName: 0,
		transPort: 2,
		tripDuration: 0,
		typeContainer: 0,
		price: 0,
	};


	// document.querySelectorAll("script").forEach((script) => script.remove());

	//content search results
	const selectorResults = document.querySelectorAll(
		".product-show-wrapper .product-content-card"
	);
	let resultSearch = [];
	const startPort = manifestRequest.startPort;
	const endPort = manifestRequest.endPort;
	for (let i = 0; i < selectorResults.length; i++) {
		resultSearch.push({
			startPort: startPort ? startPort : document.querySelectorAll(".product-show-wrapper .product-content-card .info-list .title.blod")[index.startPort].innerText,
			endPort: endPort ? endPort : document.querySelectorAll(".product-show-wrapper .product-content-card .info-list .title.blod")[index.endPort].innerText,
			exportDate: document.querySelectorAll(".product-show-wrapper .product-content-card .time-info > span:nth-child(1)")[index.exportDate].innerText,
			tripCode: document.querySelectorAll(".product-show-wrapper .product-content-card .serviceCode")[i].innerText,
			shipName: string,
			tripName: string,
			transPort: document.querySelectorAll(".product-show-wrapper .product-content-card .info-list .title.blod")[index.transPort].innerText,
			tripDuration: string,
			typeContainer: string,
			price: number,
		});

		index.startPort += 4;
		index.endPort += 4;
		index.exportDate += 4;
		index.transPort += 4;
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
