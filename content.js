var eventRegex = /metrilo\.(track|event|pageview|identify|purchase|ping)\((.*?)\)/g;

var resultArray = [];

$('head').find('script').each(function() {
  var content = $(this);
  if (content[0].innerHTML.indexOf('metrilo.') > -1) {
    var inner = content[0].innerHTML;
    var arr = eventRegex.exec(inner);

    if (arr) {
      var parsedParams = JSON.parse('[' + arr[2] + ']');
      resultArray.push({ method: arr[1], params: parsedParams });
    }
  }
});

chrome.runtime.sendMessage({
    'metrilo_events': resultArray
});
