var items = [];

var domainFrequency = {};

var newDomains = [];

var newVisists = [];

const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).getTime();

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Query the browsing history to get the most visited site
    chrome.history.search({ 'text': '', 'startTime': oneDayAgo, 'maxResults': 0 }, function (historyItems) {

        // Process the history items and populate the domainFrequency object
        for (var i = 0; i < historyItems.length; i++) {
        var historyItem = historyItems[i];
        var url = new URL(historyItem.url);
        var domain = url.hostname;
        var visitCount = historyItem.visitCount;

        if (domainFrequency[domain]) {
            domainFrequency[domain] += visitCount;
        } else {
            domainFrequency[domain] = visitCount;
        }
        }

        // Display the domain frequency data
        for (const domain in domainFrequency) {
        var historyObject = {
            Domain: domain,
            VisitCount: domainFrequency[domain]
        };
        items.push(historyObject);
        }

        // Now the items array contains the domain and visit count information
    //
        items.sort((a,b) => {return b.VisitCount - a.VisitCount});

        for(let i = 0; i< 5; i++)
        {
            newDomains.push(items[i].Domain);
            newVisists.push(items[i].VisitCount);
        }

        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: newDomains,
            datasets: [{
              label: 'Number of visits',
              data: newVisists,
              borderWidth: 1,
            }],
            color:"Red"
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
    });

});







