async function getActiveTabURL() {
  await chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      return tabs[0];
    }
  );
}

window.getActiveTabURL = getActiveTabURL;
