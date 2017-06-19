const playerStore = {};

// youtube player

//create script tag for  API
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";



//append that script to DOM
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  for (var i = 0; i < data.children.length; i++) {
    let videoID = data.children[i].v_id;
    if (data.children[i].type === 'youtube') {
      playerStore[videoID] = createPlayer(data.children[i].v_id);
    }
  }
}

function createPlayer(id) {
  return new YT.Player(id, { events: { 'onReady': onPlayerReady }})
}

//when youtube player is ready, set playback quality based on size, play video, mute video
function onPlayerReady(event) {
  let youtubeIframe = document.getElementById(event.target.a.id);
  if (youtubeIframe.height <= 100) {
    event.target.setPlaybackQuality('small').playVideo().mute();
  } else if (youtubeIframe.height > 100 && youtubeIframe.height <= 200) {
    event.target.setPlaybackQuality('medium').playVideo().mute();
  } else {
    event.target.setPlaybackQuality('large').playVideo().mute();
  }
}

function populatePlayerStore() {
  for (let i = 0; i < data.children.length; i += 1) {
    let videoID = data.children[i].v_id;
    if (data.children[i].type === 'video') {
      playerStore[videoID] = document.getElementById(videoID);
    }
    else if (data.children[i].type === 'vimeo') {
      let vimeoPlayer = new Vimeo.Player(videoID);
      playerStore[videoID] = vimeoPlayer;

      vimeoPlayer.ready().then(function () {
          vimeoPlayer.play();
          vimeoPlayer.setVolume(0);
        });
      }
    }
  }
