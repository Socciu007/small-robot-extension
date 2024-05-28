export async function getActiveTabURL() {
  const tabs = chorm.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0];
}
