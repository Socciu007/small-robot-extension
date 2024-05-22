// var manifestRequest = {};
// async function setManifestHtml() {
// 	console.log('进入目标页面');
// 	var request = manifestRequest;// 从popup.js页面获取的数据
// 	// 操作目标页面节点
// 	$('kw').value = request//给百度首页输入框赋值
// 	await sleep(1000)//等待1s
// 	$('su').click()//点击‘百度一下’查询按钮
// }


// // 鼠标点击事件
// function mClick(dom) {
// 	var event = new MouseEvent('click', {
// 		view: window,
// 		bubbles: true,
// 		cancelable: true
// 	});
// 	dom.dispatchEvent(event)
// }
// // 模拟键盘向下按键
// function mKeydown(dom) {
// 	var downEvt = new KeyboardEvent('keydown', {
// 		bubbles: true,
// 		cancelable: true,
// 		keyCode:40
// 	})
// 	dom.dispatchEvent(downEvt)
// }
// // 模拟键盘向上按键
// function mKeyUp(dom) {
// 	var downEvt = new KeyboardEvent('keyup', {
// 		bubbles: true,
// 		cancelable: true,
// 		keyCode:40
// 	})
// 	dom.dispatchEvent(downEvt)
// }
// // 模拟键盘回车按键
// function enterEvt(dom) {
// 	var enterEvt = new KeyboardEvent('keydown', {
// 		bubbles: true,
// 		cancelable: true,
// 		keyCode:13
// 	})
// 	dom.dispatchEvent(enterEvt)
// }

// function inputValue(dom, st) {
// 	var evt = new InputEvent('input', {
// 		inputType: 'insertText',
// 		data: st,
// 		dataTransfer: null,
// 		isComposing: false
// 	});
// 	dom.value = st;
// 	dom.dispatchEvent(evt);
// }

// function sleep(ms) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(true)
// 		}, ms);
// 	})
// }

// chrome.extension.onMessage.addListener(async function(request,sender,sendResponse){
// 	await sleep(1200);
// 	manifestRequest = request.data
// 	// console.log(request,'目标页接收的值');
// 	const data = await setManifestHtml()// 进行需求处理
// 	// // console.log(data);
// 	// await sleep(2000);
// 	// chrome.runtime.sendMessage({ 'data': data }, () => { })	 //回调 （将有需要的数据传回popup.js）
// });


// function $(id) {
//   return document.getElementById(id);
// }

// function cName(name) { 
// 	return document.getElementsByClassName(name)
// }
