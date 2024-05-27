var manifestRequest = {};
async function setManifestHtml(request) {
	try {
		const eleFrom = await $('el-id-6884-24')
		console.log(eleFrom);
		await inputValue(eleFrom, "Shanghai, China")
		await sleep(2000);
		//Shanghai, China
		//Singapore, Singapore

		const eleTo = await $('el-id-6884-25');
		await inputValue(eleTo, "Singapore, Singapore");
		await sleep(2000);

		const eleQuantity = await $('el-id-6884-25');
		await inputValue(eleQuantity, 1);
		await sleep(2000);

		const eleSearch = await cSelector('button.search-button');
		await mClick(eleSearch);

		chrome.runtime.sendMessage({ actionId: 'searchComplete', status: 'OK' });
	} catch (error) {
		chrome.runtime.sendMessage({ actionId: 'searchComplete', status: 'ERR' });
	}
}

chrome.extension.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	if (request.action === 'search') {
		await setManifestHtml(request);
		await sleep(2000);
	}

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
	return document.getElementById(id);
}

function cSelector(selector) {
	return document.querySelector(selector);
}

function cName(name) {
	return document.getElementsByClassName(name)
}

async function clickLogin() {
	try {
		await mClick(await cSelector('a[href="/zh-hans/login/"]'));
		await sleep(3000);
		chrome.runtime.sendMessage({ actionId: 'loginPageLoadComplete', status: 'success' })
	} catch (error) {
		chrome.runtime.sendMessage({ actionId: 'loginPageLoadComplete', status: 'error' })
	}
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