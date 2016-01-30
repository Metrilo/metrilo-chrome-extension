function getPageDetails(callback) {
  chrome.tabs.executeScript(null, { file: 'jquery.min.js' });
  chrome.tabs.executeScript(null, { file: 'content.js' });

  chrome.runtime.onMessage.addListener(function(message)  {
    chrome.storage.local.get({ 'mp_session_mode_on': false, 'mp_session_events': [] }, function(cached) {
      if (cached.mp_session_mode_on) {
          var currentEvents = message.metrilo_events.concat(cached.mp_session_events);

          currentEvents = currentEvents.slice(0, 25);

          chrome.storage.local.set( { 'mp_session_events': currentEvents }, function (cachedSize) {
            callback(currentEvents);
          });
      } else {
        callback(message.metrilo_events);
      }
    });
  });
};
