var manifestRequest = {};
var user = {
	name: "riverhe",
	password: "Fy112516",
};

//OOCL
async function setManifestHtml() {
	try {
		const data = await crawlData();
		await sleep(random(1000, 3000));

		//returns the search page after crawling
		const backEle = cName("el-page-header__back")[0];
		await sleep(random(1000, 3000));
		backEle.click();
		await sleep(random(1000, 3000));
		const inputEle = cName("el-input__inner");
		inputEle[0].click();
		await sleep(random(1000, 3000));
		inputEle[0].value = "";
		await sleep(random(1000, 3000));
		inputEle[1].value = "";
		await sleep(random(1000, 3000));

		return data;
	} catch (error) {
		return { resultsSearch: [] };
	}
}

//Search on the OOCL site
async function search(keyWord, isFirstInput) {
	try {
		// find dom and check exist dom
		const inputEle = cName("el-input__inner");
		const searchEle = await cSelector("button.search-button");
		if (inputEle.length < 1 || !searchEle) {
			return false;
		}

		// typing start port
		await typeText(inputEle[0], keyWord.startPort.nameEn); //Shanghai, China
		await sleep(1000);

		// typing end port
		await typeText(inputEle[1], keyWord.endPort.end); //Singapore, Singapore
		await sleep(1000);

		// Enter the parameters for the first import
		if (isFirstInput) {
			//select type dates port departure
			const switchNums = cName("switchNums")[5];
			switchNums.click();
			await sleep(1000);

			// input container size
			const number = "1";
			await typeNumber(inputEle[2], number);
			await sleep(random(1000, 3000));
			await typeNumber(inputEle[3], number);
			await sleep(random(1000, 3000));
			await typeNumber(inputEle[4], number);
			await sleep(random(1000, 3000));
		}

		// click search button
		await clickElement(searchEle);
		await sleep(random(1000, 3000));

		return true;
	} catch (error) {
		return false;
	}
}

chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	const { isFirstInput, data } = request;
	console.log('req', data);
	manifestRequest = data;

	const isSearch = await search(manifestRequest, isFirstInput);

	//loading search results
	await sleep(random(5000, 10000));
	if (isSearch) {
		const data = await setManifestHtml();
		console.log("data", data);
		// chrome.runtime.sendMessage({
		// 	action: "updateVariable",
		// 	newValue: true,
		// 	data: data
		// });
		chrome.runtime.sendMessage(
			{ actionId: "searchComplete", status: 1, data: data },
			function (res) { }
		);
	} else {
		chrome.runtime.sendMessage(
			{ actionId: "searchComplete", status: 0, data: {} },
			function (res) { }
		);
	}
});

async function typeNumber(dom, number) {
	try {
		// click input and wait for input click
		if (!dom) {
			console.error(`Element with selector "${dom}" not found.`);
			return;
		}
		dom.click();
		await sleep(1000);

		// focus input
		const focusEvent = new Event("focus", { bubbles: true });
		dom.dispatchEvent(focusEvent);

		// Enter the value into the input box
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
			await typeText(eleUserName, userName);
			await sleep(random(1000, 3000));
			await mClick(eleNext);
			await sleep(random(1000, 3000));

			const elePassword = await cSelector("input#login-password-input");
			const eleLogin = await cSelector('button[type="button"]');
			if (elePassword && eleLogin && elePassword.value === password) {
				await mClick(await cSelector('button[type="button"]'));
				isLogin = true;
			} else if (elePassword && eleLogin) {
				await typeText(elePassword, password, 1000);
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

//format data and crawl data from OOCL
async function crawlData() {
	let data = {};

	const startPortReq = manifestRequest.startPort.nameEnEB;
	const endPortReq = manifestRequest.endPort.endEB;

	const selectorResults = cName("product-content-card");//all data after searching
	let resultSearch = [];

	for (let i = 0; i < selectorResults.length; i++) {

		const showInfoEle = cName("unfold-hide-wrapper");// show detail data before crawl data
		if (showInfoEle.length > 0) {
			for (let j = 0; j < showInfoEle.length; j++) {
				showInfoEle[j].click();
				await sleep(random(2000, 3000));
			}

			// crawl data from OOCL
			const startPort = startPortReq ? startPortReq : selectorResults[i].getElementsByClassName("title blod")[0].innerText;
			const endPort = endPortReq ? endPortReq : selectorResults[i].getElementsByClassName("title blod")[3].innerText;
			const code = selectorResults[i].getElementsByClassName("serviceCode")[0].innerText;
			const overTime = selectorResults[i].querySelectorAll(".time-info > span:nth-child(1)")[4].innerText;
			const remarkOp_0 = selectorResults[i].getElementsByClassName("svvd")[1].innerText.split(" ");
			const remarkOp_1 = selectorResults[i].getElementsByClassName("svvd")[2].innerText.split(" ");
			const range = selectorResults[i].getElementsByClassName("e-text")[1].innerText;
			const sailingDay = selectorResults[i].querySelectorAll(".time-info > span:nth-child(1)")[1].innerText;
			const startTime = selectorResults[i].querySelectorAll(".time-info > span:nth-child(1)")[0].innerText;

			const tranferPortString = selectorResults[i].getElementsByClassName("title blod")[2].innerText;//handle tranferPort
			const endEBPortName = capitalizeFirstLetter(endPort);
			const endPortName = capitalizeFirstLetter(manifestRequest.endPort.end);
			const tranferPort = (tranferPortString.includes(endEBPortName) || tranferPortString.includes(endPortName)) ? endPort : tranferPortString.split("-")[0].trim();

			const gp20GPString = selectorResults[i].getElementsByClassName("e-single-price")[0].innerText; // handle price container
			const gp40GPString = selectorResults[i].getElementsByClassName("e-single-price")[1].innerText;
			const gp40HQString = selectorResults[i].getElementsByClassName("e-single-price")[2].innerText;
			const gp20GP = (gp20GPString.includes("***")) ? 88888 : selectorResults[i].getElementsByClassName("e-single-number")[0].innerText;
			const gp40GP = (gp40GPString.includes("***")) ? 88888 : selectorResults[i].getElementsByClassName("e-single-number")[1].innerText;
			const gp40HQ = (gp40HQString.includes("***")) ? 88888 : selectorResults[i].getElementsByClassName("e-single-number")[2].innerText;

			//format data and push it onto the array temp
			resultSearch.push({
				startPort: startPort,
				endPort: endPort,
				shipCompany: 'OOCL',
				transferPort: tranferPort,
				startPortPier: "",
				endPortPier: "",
				routeName: manifestRequest.route || "",
				code: code,
				overTime: parseDateTime(overTime),
				use: 0,
				firstSupply: "",
				remark: "",
				remarkOp: trimArray(remarkOp_0, 1, 0).join(" ") + ", " + trimArray(remarkOp_1, 1, 0).join(" "),
				range: extractNumberFromString(range),
				sailingDay: parseDateTime(sailingDay),
				startTime: parseDateTime(startTime),
				schedule: scheduleFun(parseDateTime(sailingDay)),
				shippingSpace: "",
				gp20GP: gp20GP,
				gp40GP: gp40GP,
				gp40HQ: gp40HQ,
			});
		} else {
			// crawl data from OOCL
			const startPort = startPortReq ? startPortReq : selectorResults[i].getElementsByClassName("title blod")[0].innerText;
			const endPort = endPortReq ? endPortReq : selectorResults[i].getElementsByClassName("title blod")[3].innerText;
			const routeName = manifestRequest.route || "";
			const code = selectorResults[i].getElementsByClassName("serviceCode")[0].innerText;
			const overTime = selectorResults[i].querySelectorAll(".time-info > span:nth-child(1)")[3].innerText;
			const remarkOp = selectorResults[i].getElementsByClassName("svvd")[0].innerText.split(" ");
			const range = selectorResults[i].getElementsByClassName("e-text")[0].innerText;
			const sailingDay = selectorResults[i].querySelectorAll(".time-info > span:nth-child(1)")[1].innerText;
			const startTime = selectorResults[i].querySelectorAll(".time-info > span:nth-child(1)")[0].innerText;

			const tranferPortString = selectorResults[i].getElementsByClassName("title blod")[2].innerText;//handle tranferPort
			const endEBPortName = capitalizeFirstLetter(endPort);
			const endPortName = capitalizeFirstLetter(manifestRequest.endPort.end);
			const tranferPort = (tranferPortString.includes(endEBPortName) || tranferPortString.includes(endPortName)) ? endPort : tranferPortString.split("-")[0].trim();

			const gp20GPString = selectorResults[i].getElementsByClassName("e-single-price")[0].innerText; // handle price container
			const gp40GPString = selectorResults[i].getElementsByClassName("e-single-price")[1].innerText;
			const gp40HQString = selectorResults[i].getElementsByClassName("e-single-price")[2].innerText;
			const gp20GP = (gp20GPString.includes("***")) ? 88888 : selectorResults[i].getElementsByClassName("e-single-number")[0].innerText;
			const gp40GP = (gp40GPString.includes("***")) ? 88888 : selectorResults[i].getElementsByClassName("e-single-number")[1].innerText;
			const gp40HQ = (gp40HQString.includes("***")) ? 88888 : selectorResults[i].getElementsByClassName("e-single-number")[2].innerText;

			//format data and push it onto the array temp
			resultSearch.push({
				startPort: startPort,
				endPort: endPort,
				shipCompany: 'OOCL',
				transferPort: tranferPort,
				startPortPier: "",
				endPortPier: "",
				routeName: routeName,
				code: code,
				overTime: parseDateTime(overTime),
				use: 0,
				firstSupply: "",
				remark: "",
				remarkOp: trimArray(remarkOp, 1, 0).join(" "),
				range: extractNumberFromString(range),
				sailingDay: parseDateTime(sailingDay),
				startTime: parseDateTime(startTime), //
				schedule: scheduleFun(parseDateTime(sailingDay)),
				shippingSpace: "",
				gp20GP: gp20GP,
				gp40GP: gp40GP,
				gp40HQ: gp40HQ,
			});
		}
	}

	data = { resultsSearch: resultSearch };
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
function parseDateTime(dateStr) {
	const date = new Date(dateStr);

	// get day, month from date object
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);

	// Format "xxxx-xx-xx"
	const formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}

//extract number from string
function extractNumberFromString(str) {
	// use regex to find number
	const matches = str.match(/\d+/);

	// check
	if (matches && matches.length > 0) {
		return parseInt(matches[0], 10);
	} else {
		return null;
	}
}

function convertStringToNumber(str) {
	// Remove commas from the string
	const cleanedStr = str.replace(/,/g, "");
	// Convert the cleaned string to a number
	const number = parseFloat(cleanedStr);
	return number;
}

// 船期处理
function scheduleFun(sch) {
	var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	return week[new Date(sch).getDay()];
}
