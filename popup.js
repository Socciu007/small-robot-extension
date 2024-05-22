// document.getElementById("loginButton").addEventListener("click", () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         const tab = tabs[0];
//         const url = tab.url;

//         if (url.startsWith("https://freightsmart.oocl.com/app/login")) {
//             chrome.scripting.executeScript({
//                 target: { tabId: tab.id },
//                 files: ['content.js']
//             });
//         } else {
//             alert("This extension only works on the FreightSmart login page.");
//         }
//     });
// });


document.getElementById("loginButton").addEventListener("click", () => {
    chrome.tabs.create({ url: 'https://freightsmart.oocl.com/app/login' }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        }).then(() => {
            console.log('Content script executed');
        }).catch((error) => {
            console.error('Error executing content script:', error);
        });
    });
});
