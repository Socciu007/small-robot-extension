// // 在 background.js 中监听消息
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "updateVariable") {
//         // 更新变量的值
//         updateVariable(message.newValue);
//     }
// });

// // 在 background.js 中定义需要更新的变量
// let sharedVariable = false;

// // 更新变量的值
// function updateVariable(newValue) {
//     sharedVariable = newValue;
// }

// // 获取变量的值
// function getVariable() {
//     return sharedVariable;
// }

// // 将函数添加到 window 对象，以便从其他脚本中访问
// window.updateVariable = updateVariable;
// window.getVariable = getVariable;
