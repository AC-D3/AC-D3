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
          data.forEach(item => {
            let videoID = item.v_id;
            if (item.type === 'youtube') {
              this.createYouTubePlayer(videoID, vis)
              .then(player => vis.playerStore[videoID] = player)
              .catch(err => console.log(err));
            } else if (item.type === 'video') {
              this.createHTML5Player(videoID)
              .then(player => vis.playerStore[videoID] = player)
              .catch(err => console.log(err));
            } else if (item.type === 'vimeo') {
              this.createVimeoPlayer(videoID, vis)
              .then(player => {
                vis.playerStore[videoID] = player;
                player.ready().then(() => {
                  if (vis.config.autoplay) {
                    player.play();
                    player.setVolume(0);
                  }
                  if (vis.config.loop) vimeoPlayer.setLoop(true);
                })
              })
              .catch(err => console.log(err));
            } else console.log('invalid type')
          });
          vis.playersPopulated = true;
        }
      });
    }
  },

  createYouTubePlayer: function(id, vis) {
    return new Promise((resolve, reject) => {
      const onYouTubePlayerReady = (event) => {
        // console.log('this in YTReady', this)
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
        const YTplayer = new YT.Player(id, {
          events: { 'onReady': onYouTubePlayerReady }
        });
        resolve(YTplayer);
        reject('Error creating YouTube player...');
    });
    },

    createVimeoPlayer: function(id, vis) {
      return new Promise((resolve, reject) => {
        let vimeoPlayer = new Vimeo.Player(id);
        resolve(vimeoPlayer);
        reject('Error creating Vimeo player...')
      })
    },

    createHTML5Player: function(id) {
      return new Promise((resolve, reject) => {
        resolve(document.getElementById(videoID));
        reject('Error creating HTML5 video player...')
      });
    }

}
