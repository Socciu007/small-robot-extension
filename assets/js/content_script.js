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
		const inputEle = cName("el-input__inner");
		const searchEle = await cSelector("button.search-button");
		// check exist dom
		if (inputEle.length < 1 || !searchEle) {
			return false;
		}
		// typing start port
		await typeText(inputEle[0], port.startPort); //Shanghai, China
		await sleep(1000);

		// typing end port
		await typeText(inputEle[1], port.endPort); //Singapore, Singapore
		await sleep(1000);

		//selce
		const switchNums = cName('switchNums')[5];
		switchNums.click();
		await sleep(1000);


		// increase container size
		const number = "1";
		await typeNumber(inputEle[2], number);
		await sleep(1000);

		// click search button
		await clickElement(searchEle);
		await sleep(2000);

		return true;
	} catch (error) {
		return false;
	}
}

async function typeNumber(dom, number) {
	try {
		if (!dom) {
			console.error(`Element with selector "${dom}" not found.`);
			return;
		}
		dom.click();

		// wait for input click
		await sleep(1000);

		// focus input
		const focusEvent = new Event("focus", { bubbles: true });
		dom.dispatchEvent(focusEvent);

		const keydownEvent = new KeyboardEvent("keydown", {
			key: number,
			code: `Digit${number}`,
			keyCode: number.charCodeAt(0),
			which: number.charCodeAt(0),
			bubbles: true,
		});

		dom.value += number;
		dom.dispatchEvent(keydownEvent);

		const inputEvent = new Event("input", { bubbles: true });
		dom.dispatchEvent(inputEvent);
	} catch (error) {
		console.error("Err typing number ", error);
	}
}

async function typeText(elementSelector, text) {
	try {
		//节点, 要赋值的内容
		const inputElement = elementSelector;
		if (!inputElement) {
			console.error(`Element with selector "${elementSelector}" not found.`);
			return;
		}
		inputElement.click();

		// wait for input flash
		await sleep(1000);

		// focus input
		const focusEvent = new Event("focus", { bubbles: true });
		inputElement.dispatchEvent(focusEvent);

		// typing input
		for (let i = 0; i < text.length; i++) {
			const char = text[i];
			const event = new KeyboardEvent("keydown", {
				key: char,
				code: char.charCodeAt(0),
			});

			inputElement.value += char;
			inputElement.dispatchEvent(event);
		}

		// handle change input value
		const inputEvent = new Event("input", { bubbles: true });
		inputElement.dispatchEvent(inputEvent);
		await sleep(3000);

		// select option of menu
		const listPort = cName("city");
		await sleep(1000);
		for (let i = 0; i < listPort.length; i++) {
			if (listPort[i].innerText.includes(capitalizeFirstLetter(text))) {
				listPort[i].dispatchEvent(focusEvent);
				await sleep(1000);

				listPort[i].click();
				break;
			}
		}
	} catch (error) {
		console.error("Err typing text ", error);
	}
}

chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	const { action, data } = request;


	manifestRequest = data;
	if (action === "search") {
		console.log(data);
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

	if (action === "crawlData") {
		const data = await setManifestHtml();

		console.log('data', data);

		chrome.runtime.sendMessage(
			{ actionId: "crawlDataComplete", status: "OK", data: data },
			function (res) { }
		);
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
			var downEvt = new MouseEvent("mousedown", {
				bubbles: true,
				cancelable: true,
				view: window,
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
	var upEvt = new MouseEvent("mouseup", {
		bubbles: true,
		cancelable: true,
		view: window,
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

function capitalizeFirstLetter(string) {
	return string.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
		return match.toUpperCase();
	});
}

function crawlData() {
	let data = {};
	let index = {
		startPort: 0,
		endPort: 3,
		day: 0,
		tripCode: 0,
		shipName: 1,
		// tripName: 0,
		transPort: 2,
		tripDuration: 0,
		gp: 0,
	};
	const startPort = manifestRequest.startPort;
	const endPort = manifestRequest.endPort;

	//content search results
	const selectorResults = cName("product-content-card");

	let resultSearch = [];
	for (let i = 0; i < selectorResults.length; i++) {
		let shipName = document.querySelectorAll(".svvd > span");
		shipName = shipName[index.shipName].innerText.split(" ");
		const eleDay = document.querySelectorAll(".time-info > span:nth-child(1)");

		resultSearch.push({
			startPort: startPort ? startPort : cName("title blod")[index.startPort].innerText,
			endPort: endPort ? endPort : cName("title blod")[index.endPort].innerText,
			shipCompany: trimArray(shipName, 1, 2).join(" "),
			transferPort: cName("title blod")[index.transPort].innerText,
			startPortPier: "",
			endPortPier: "",
			routeName: manifestRequest.routeName || "",
			code: cName("serviceCode")[i].innerText,
			overTime: parseDateTime(eleDay[index.day + 3].innerText),
			use: 0,
			firstSupply: "", // 
			remark: "",
			remarkOp: "",
			range: cName('e-text')[index.tripDuration].innerText,
			sailingDay: parseDateTime(eleDay[index.day + 1].innerText),
			startTime: parseDateTime(eleDay[index.day].innerText),//
			schedule: getDayOfWeek(parseDateTime(eleDay[index.day + 1].innerText)),
			shippingSpace: "",
			gp20GP: convertStringToNumber(cName('e-single-number')[index.gp].innerText),
			gp40GP: convertStringToNumber(cName('e-single-number')[index.gp + 1].innerText),
			gp40HQ: convertStringToNumber(cName('e-single-number')[index.gp + 2].innerText),
		});

		index.startPort += 4;
		index.endPort += 4;
		index.day += 4;
		index.transPort += 4;
		index.shipName += 3;
		index.gp += 3;
		index.tripDuration += 5;
	}

	data = {
		search: {
			fromPort: document.querySelectorAll(".current-search .from-to .title")[0]
				.innerText,
			toPort: document.querySelectorAll(".current-search .from-to .title")[1]
				.innerText,
			cutoffDateStart: parseDateTime(document.querySelectorAll(
				".current-search .departure .text"
			)[0].innerText),
			cutoffDateEnd: parseDateTime(document.querySelectorAll(
				".current-search .departure .text"
			)[2].innerText),
			quantity: parseInt(document.querySelectorAll(
				".current-search .containers-count .text"
			)[0].innerText),
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

//slice array with first element and last element
function trimArray(arr, a, b) {
	if (arr.length <= a + b) {
		return [];
	}
	return arr.slice(a, arr.length - b);
}

//convert string to date
function parseDateTime(dateTimeStr) {
	// Extract the current year
	const currentYear = new Date().getFullYear();

	// Append the current year to the provided date string
	const dateTimeWithYear = `${dateTimeStr} ${currentYear}`;

	// Parse the date string into a Date object
	const dateObj = new Date(Date.parse(dateTimeWithYear));

	// Check if the Date object is valid
	if (isNaN(dateObj.getTime())) {
		throw new Error('Invalid date string');
	}

	return dateObj;
}

function convertStringToNumber(str) {
	// Remove commas from the string
	const cleanedStr = str.replace(/,/g, '');
	// Convert the cleaned string to a number
	const number = parseFloat(cleanedStr);
	return number;
}

function getDayOfWeek(date) {
	const options = { weekday: 'long' }; // 'long' for full name, 'short' for abbreviated
	return date.toLocaleDateString('en-US', options);
}

// startPort: startPort,
// 	endPort: endPort,
// 		startPortPier: startPortPier,
// 			endPortPier: endPortPier,
// 				transferPort: transferPort,
// 					routeName: routeName,
// 						code: code,
// 							overTime: overTime,
// 								use: use,
// 									firstSupply: firstSupply,
// 										remark: remark,
// 											remarkOp: remarkOp,
// 												range: range,
// 													sailingDay: sailingDay,
// 														startTime: startTime,
// 															schedule: schedule,
// 																shippingSpace: shippingSpace,
// 																	gp20GP: gp20GP,
// 																		gp40GP: gp40GP,
// 																			gp40HQ: gp40HQ
