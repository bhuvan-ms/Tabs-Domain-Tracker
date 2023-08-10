// popup.js
document.addEventListener('DOMContentLoaded', function() {
    // Query all open tabs
    chrome.tabs.query({}, function(tabs) {
        var tabList = document.getElementById('tabList');
      
        tabs.forEach(function(tab) {
          var listItem = document.createElement('li');
      
          // Use the URL API to extract the domain name
          var tabUrl = new URL(tab.url);
          var domainName = tabUrl.hostname;
      
          listItem.textContent = tab.title + ' - ' + domainName; 
          tabList.appendChild(listItem);
        });
    });
      
  
    // Query the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        var activeTabInfo = document.createElement('p');
      
        // Use the URL API to extract the domain name
        var tabUrl = new URL(activeTab.url);
        var domainName = tabUrl.hostname;
      
        activeTabInfo.textContent = activeTab.title + ' - ' + domainName; // Display domain name
        document.body.appendChild(activeTabInfo);
      });
  });
  