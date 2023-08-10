// Log all open tabs
chrome.tabs.query({}, function(tabs) {
    console.log("All Open Tabs:");
    tabs.forEach(function(tab) {
      console.log(tab.title, tab.url);
    });
  });
  
  // Log the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      var activeTab = tabs[0];
      console.log("Active Tab:", activeTab.title, activeTab.url);
    }
  });
  