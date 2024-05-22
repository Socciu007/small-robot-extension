chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

// chrome.action.onClicked.addListener(() => {
//     chrome.tabs.create({ url: 'https://freightsmart.oocl.com/app/login' }, (tab) => {
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             files: ['content.js']
//         });
//     });
// });
