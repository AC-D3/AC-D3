const apiUtils = {

  appendAPIScripts: function() {
    let tag;
    let firstScriptTag;

    // append Vimeo player API script to HTML if not appended already
    if (!document.getElementById('vimeoScript')) {
      tag = document.createElement('script');
      tag.src = 'https://player.vimeo.com/api/player.js';
      tag.id = 'vimeoScript';
      firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // append YouTube player API script to HTML if not appended already
    if (!document.getElementById('youtubeScript')) {
      tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtubeScript';
      firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  },

  setupYouTubeAPI: function(visID) {
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {
        window.youTubeIframeAPIReady = true;
        this.populatePlayerStore();
      }
    }
  },

  populatePlayerStore: function() {
    if (window.youTubeIframeAPIReady) {
      Object.values(this.visStore).forEach(vis => {
        if (!vis.playersPopulated) {
          let data;
          if (vis.config.chartType === 'bubble') data = vis.data.children;
          if (vis.config.chartType === 'bubbleScatter') data = vis.data;
          data.forEach((item) => {
            let videoID = item.v_id;
            if (item.type === 'youtube') {
              vis.playerStore[videoID] = this.createYouTubePlayer(videoID, vis);
            } else if (item.type === 'video') {
              vis.playerStore[videoID] = document.getElementById(videoID);
            } else if (item.type === 'vimeo') {
              vis.playerStore[videoID] = this.createVimeoPlayer(videoID);
            } else console.log('invalid type')
          });
          vis.playersPopularted = true;
        }
      });
    }
  },

  createYouTubePlayer: function(id, vis) {
    const onYouTubePlayerReady = (event) => {
      if (vis.config.autoplay) event.target.playVideo().mute();
      // this.scaleResolution(event)
      let youtubeIframe = document.getElementById(event.target.a.id);
      if (youtubeIframe.height <= vis.config.resolutionThresholds[0]) {
        event.target.setPlaybackQuality('small')
      } else if (youtubeIframe.height > vis.config.resolutionThresholds[0]
        && youtubeIframe.height <= vis.config.resolutionThresholds[1]) {
          event.target.setPlaybackQuality('medium')
        } else {
          event.target.setPlaybackQuality('large')
        }
      }
      return new YT.Player(id, {
        events: { 'onReady': onYouTubePlayerReady }
      });
    },

    createVimeoPlayer: function(id, vis) {
        let vimeoPlayer = new Vimeo.Player(id);
        vimeoPlayer.ready().then(() => {
            if (vis.config.autoplay) {
                vimeoPlayer.play();
                vimeoPlayer.setVolume(0);
            }
            if (vis.config.loop) vimeoPlayer.setLoop(true);
        });
        return vimeoPlayer;
    }

}
