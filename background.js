var data = [];

// Query the browsing history
chrome.history.search({ text: '', maxResults: 1000 }, function(historyItems) {
  // Process the history items
  for (var i = 0; i < historyItems.length; i++) {
    var historyItem = historyItems[i];
    var url = new URL(historyItem.url);
    var title = historyItem.title;
    var visitCount = historyItem.visitCount;
    var lastVisitTime = new Date(historyItem.lastVisitTime);

    

    // Do something with the history data, such as storing or displaying it
    //Title: ${title}, Visit Count: ${visitCount},
    console.log(` Domain: ${url.hostname},  LastVist: ${lastVisitTime}`);

    var historyObject = {
      Domain: `${url.hostname}`,
      LastVisit: `${lastVisitTime}`
    }

    data.push(historyObject);
  }
});


var groupedData = data.reduce(function(result, current) {
  var existingGroup = result.find(item => item.domain === current.domain);

  if (existingGroup) {
      existingGroup.lastVisitTime += parseInt(current.lastVisitTime);
  } else {
      result.push({
          domain: current.Phase,
          Value: parseInt(current.Value)
      });
  }

  return result;
}, []);

var newData = data.reduce(function(result, currentVal){
   var existingGroup = result.find(item => item.Domain === currentVal.Domain);

   if(existingGroup)
   {
    // time subtraction logic goes here
   }
   else
   {
    //if the group doesn't exisit then add it to the resulting array
   }
}, []);

console.log(groupedData);