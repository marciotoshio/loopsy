var onFail = function(e) {
  console.log('Rejected!', e);
};

var onSuccess = function(s) {
  var context = new webkitAudioContext();
  var mediaStreamSource = context.createMediaStreamSource(s);
  recorder = new Recorder(mediaStreamSource);
  recorder.record();
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var recorder;

function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }
}

function stopRecording(track_id) {
  recorder.stop();
  recorder.exportWAV(function(s) {
    var audio = document.getElementById('audio_track_' + track_id);
    audio.src = window.URL.createObjectURL(s);
  });
}