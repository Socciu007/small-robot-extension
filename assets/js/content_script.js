var manifestRequest = {};
const users = {
	name: "riverhe",
	password: "Fy112516",
};
// let popupPort;
async function setManifestHtml() {
	try {
		var request = manifestRequest; // 从popup.js页面获取的数据
		// active automation
		await mClick(await cSelector('a[href="/zh-hans/login/"]'));
		console.log("click1");
		await sleep(random(5000, 10000));
		await loginOOCL(users.name, users.password);
		console.log("Login completed");
		// const isLogin = await isLoggedIn();
		// console.log('isLogin', isLogin);
		// if (isLogin) {
		// 	console.log("auto");

		// } else {
		// 	await loginOOCL(users.name, users.password);
		// 	console.log("Login completed");
		// }
	} catch (error) {

	}
}

//establish connection to popup
// chrome.runtime.onConnect.addListener(function (port) {
// 	if (port.name === "popup") {
// 		popupPort = port;
// 		port.onDisconnect.addListener(function () {
// 			popupPort = null;
// 		});
// 	}
// });

chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	await sleep(5000);
	manifestRequest = request.data;
	console.log(manifestRequest, "目标页接收的值");

	// 进行需求处理
	await setManifestHtml();
	await sleep(2000);

	//回调 （将有需要的数据传回popup.js
	// setTimeout(() => {
	// 	chrome.runtime.sendMessage(
	// 		{ data: data },
	// 		function (response) { }
	// 	);
	// }, 1000);

	// sendResponse({ status: 200, message: "OK", data: data })
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
				key: "Enter",
				code: "Enter",
				keyCode: 13,
				which: 13,
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
	return document.querySelector(selector);
}

function cName(name) {
	return document.getElementsByClassName(name)
}

function isLoggedIn() {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith('token=')) {
			return true;
		}
	}
	return false;
}

async function loginOOCL(userName, password) {
	let isLogin = false
	try {
		const eleUserName = await cSelector('input[class="el-input__inner"]');
		const eleNext = await cSelector('button[type="button"]');
		if (eleUserName && eleNext) {
			await inputTyping(eleUserName, userName);
			await sleep(random(1000, 3000));
			await mClick(eleNext);
			await sleep(random(1000, 3000));

			const elePassword = await cSelector('input#login-password-input');
			const eleLogin = await cSelector('button[type="button"]');
			if (elePassword && eleLogin && elePassword.value === password) {
				await mClick(await cSelector('button[type="button"]'));
				isLogin = true;
			} else if (elePassword && eleLogin) {
				await inputTyping(elePassword, password, 1000)
				await sleep(random(1000, 3000));
				await mClick(eleLogin);
				isLogin = true;
			} else {
				isLogin = false;
			}
		} else {
			return isLogin
		}
		return isLogin

	} catch (error) {
		return isLogin;
	}
}

function crawlData() {
	let data = {};
	document.querySelectorAll("script").forEach((script) => script.remove());
	data = {
		// html: document.documentElement.outerHTML,
		text: document.body.innerText.split("\n"),
		// content: cSelector("div#wrapper_wrapper").textContent.split("\n"),
	};
	return data;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}