function onPageDetailsReceived(metrilo_events)  {
    var eventRows = '';

    for (i = 0; i < metrilo_events.length; i++) {
        var metrilo_event = metrilo_events[i];

        eventRows += '<tr>';
        eventRows += '<td>' + metrilo_event.method + '</td>';
        eventRows += '<td>';
        eventRows += '<ol>';

        for (j = 0; j < metrilo_event.params.length; j++) {
            var parsedParam;

            if (metrilo_event.params[j]) {
                parsedParam = JSON.stringify(metrilo_event.params[j], null, 4);
            }

            eventRows += '<li>' + parsedParam + '</li>';
        }
        eventRows += '</ol>';
        eventRows += '</td>';
        eventRows += '</tr>';
    }

    $('#met-holder-table').append(eventRows);

}

function onSessionModeChange() {
  var sessionModeOn = $('#session_track_switcher').prop('checked');

  if (!sessionModeOn) {
    chrome.storage.local.remove('mp_session_events');
    chrome.storage.local.set({ 'mp_session_mode_on': false }, function(storageSize) {});
  } else {
    chrome.storage.local.set({ 'mp_session_mode_on': true }, function(storageSize) {});
  }
}

window.addEventListener('load', function(evt) {
    // Initial state for switcher
    chrome.runtime.getBackgroundPage(function(eventPage) {
      eventPage.getPageDetails(onPageDetailsReceived);
      $('#session_track_switcher').change(onSessionModeChange);

      chrome.storage.local.get({ 'mp_session_mode_on': false }, function (cache) {
        $('#session_track_switcher').prop('checked', cache.mp_session_mode_on);
      });

      $('#session_track_switcher').change(onSessionModeChange);
    });
});
