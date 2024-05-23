
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
