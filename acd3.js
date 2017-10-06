// const d3 = require('d3');
// const shortid = require('shortid');
// const BubbleChart = require('./BubbleChart');

const acd3 = {

  visStore: {},
  id: 0,

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

  addBubble(node, visID) {
      const vis = this.visStore[visID];
      let g;
      let foreignObject;
      let div;
      let video;
      let circle;

      g = node.append('g');
      //position circle below video bubble to handle mouse events

      circle = g.append('circle')
          .attr('class', `${vis.config.htmlAnchorID}-circle`)
          .attr('id', (d, i) => `${vis.config.htmlAnchorID}circleID_${i}`)
          .attr('r', (d) => d.r)
          .on('mouseenter', (d) => this.unmuteOnMouseEnter.call(vis, d.data))
          .on('mouseleave', (d) => this.muteOnMouseLeave.call(vis, d.data))
          .on('click', (d) => this.handleSingleClick.call(vis, d.data))
          .on('dblclick', (d, i) => {
              if (vis.config.onDoubleClick === 'openNewWindow') this.openNewWindow.call(vis, d.data);
              else if (vis.config.onDoubleClick === 'expandBubble') this.expandBubble.call(vis, d.data, i);
          });
      foreignObject = g.append('foreignObject')
          .style('pointer-events', 'none');

      //Firefox specific attributes:
      if (typeof InstallTrigger !== 'undefined') {
          g.attr('transform', (d) => `translate(${d.x},${d.y})`)
              .attr('id', (d, i) => `${vis.config.htmlAnchorID}gID_${i}`);

          foreignObject
              .attr('id', (d, i) => `${vis.config.htmlAnchorID}foreignID_${i}`)
              .attr('width', (d) => d.r * 2)
              .attr('height', (d) => d.r * 2)
              .attr('x', (d) => -d.r)
              .attr('y', (d) => -d.r);

          video = foreignObject.append((d) => {
              return d.data.type === 'video'
                  ? document.createElement('video')
                  : document.createElement('iframe');
          })

          video.attr('class', vis.config.htmlAnchorID + '-video')
              .style('border-radius', '50%')
              .style('object-fit', 'cover')
              .style('width', '100%')
              .style('height', '100%');
      }

      //specific attributes for other browsers (Chrome, Safari...):
      else {
          foreignObject
              .attr('id', (d, i) => `${vis.config.htmlAnchorID}foreignID_${i}`)
              .attr('x', (d) => d.x - d.r)
              .attr('y', (d) => d.y - d.r);

          div = foreignObject.append('xhtml:div')
              .attr('id', (d, i) => `${vis.config.htmlAnchorID}divID_${i}`)
              .style('width', (d) => `${(d.r * 2)}px`)
              .style('height', (d) => `${(d.r * 2)}px`)
              .style('border-radius', (d) => `${d.r}px`)
              .style('-webkit-mask-image', '-webkit-radial-gradient(circle, white 100%, black 100%)')
              .style('position', 'relative')

          video = div.append((d) => {
              return d.data.type === 'video'
                  ? document.createElement('video')
                  : document.createElement('iframe');
          })

          video.attr('class', `${vis.config.htmlAnchorID}-video`)
              .attr("xmlns", "http://www.w3.org/1999/xhtml")
              .style('object-fit', (d) => d.data.type === 'video' ? 'cover' : null)
              .style('width', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${vis.config.zoom * 100}%` : '100%')
              .style('height', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${vis.config.zoom * 100}%` : '100%')
              .style('top', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((vis.config.zoom - 1) * d.r) + 'px' : null)
              .style('left', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((vis.config.zoom - 1) * d.r) + 'px' : null)
              .style('position', 'absolute');

          circle.attr('cx', (d) => d.x)
              .attr('cy', (d) => d.y)
      }
      if (vis.config.autoplay) video.attr('autoplay', (d) => d.data.type === 'video' ? '' : null);
      if (vis.config.loop) video.attr('loop', (d) => d.data.type === 'video' ? '' : null);
      video.property('volume', (d) => d.data.type === 'video' ? '0.0' : null)
          .attr('playsinline', (d) => d.data.type === 'video' ? '' : null)
          .attr('frameborder', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? 0 : null)
          .attr('id', (d) => d.data.v_id)
          .attr('src', (d) => {
              if (d.data.type === 'youtube') {
                  let videoID = d.data.src.split('/').pop();
                  let params;
                  params += '?enablejsapi=1';
                  params += '&playsinline=1';
                  params += '&controls=0';
                  params += '&autohide=1';
                  params += '&disablekb=1';
                  params += '&fs=0';
                  params += '&modestbranding=0';
                  params += '&showinfo=0';
                  params += '&rel=0';
                  params += '&version=3';
                  params += `&playlist=${videoID}`;
                  if (vis.config.loop) params += '&loop=1';
                  return d.data.src + params;
              } else if (d.data.type === 'vimeo') {
                  return `${d.data.src}?autopause=0`;
              } else {
                  return d.data.src;
              }
          });
  },

  scaleResolution: function(event) {
      //implemented this here because we have direct access to player in playerStore, where as in
      //the createYoutubePlayerReady method, we had to access the player by the event
      let youtubeIframe = document.getElementById(event.a.id);
      if (youtubeIframe.height <= this.config.resolutionThresholds[0]) {
          event.setPlaybackQuality('small')
      } else if (youtubeIframe.height > this.config.resolutionThresholds[0]
          && youtubeIframe.height <= this.config.resolutionThresholds[1]) {
          event.setPlaybackQuality('medium')
      } else {
          event.setPlaybackQuality('large')
      }
  },

  playAll: function() {
      for (let key in this.playerStore) {
          let currentPlayer = this.playerStore[key];
          //logic to play all Vimeo videos:
          if (currentPlayer.origin === 'https://player.vimeo.com') {
              currentPlayer.play();
              currentPlayer.setVolume(0);
          }
          //logic to play all HTML5 videos:
          else if (currentPlayer.tagName === 'VIDEO') {
              currentPlayer.play();
              currentPlayer.volume = 0.0;
          }
          //logic to play all YouTube videos:
          else if (currentPlayer.playVideo) {
              currentPlayer.playVideo().mute();
          }
      }
  },

  unmuteOnMouseEnter: function(data) {
      let videoID = data.v_id;
      let videoType = data.type;
      if (videoType === 'vimeo') this.playerStore[videoID].setVolume(1);
      else if (videoType === 'youtube') this.playerStore[videoID].unMute();
      else this.playerStore[videoID].volume = 1;
  },

  muteOnMouseLeave: function(data) {
      let videoID = data.v_id;
      let videoType = data.type;
      if (videoType === 'vimeo') this.playerStore[videoID].setVolume(0);
      else if (videoType === 'youtube') this.playerStore[videoID].mute();
      else this.playerStore[videoID].volume = 0;
  },

  handleSingleClick: function(data) {
      let clickedPlayer = this.playerStore[data.v_id];
      //logic to play/pause individual YouTube videos:
      if (data.type === 'youtube') {
          const playerState = clickedPlayer.getPlayerState();
          if (playerState === -1 || playerState === 2 || playerState === 5) clickedPlayer.playVideo();
          else clickedPlayer.pauseVideo();
      }
      //logic to play/pause individual Vimeo videos:
      else if (data.type === 'vimeo') {
          clickedPlayer.getPaused().then((paused) => {
              if (paused) clickedPlayer.play();
              else clickedPlayer.pause();
          });
      }
      //logic to play/pause individual HTML5 videos:
      else if (data.type === 'video') {
          const paused = clickedPlayer.paused;
          if (paused) clickedPlayer.play();
          else clickedPlayer.pause();
      }
  },

  playSolo: function(data) {
      let clickedPlayer = this.playerStore[data.v_id];
      if (data.type === 'youtube') {
          clickedPlayer.playVideo();
      }
      else {
          clickedPlayer.play();
      }
  },

  openNewWindow: function(data) {
      window.open(data.src);
  },

  expandBubble: function(data, i) {

      let videoID = data.v_id;
      let clickedPlayer = this.playerStore[data.v_id];
      console.log(clickedPlayer)
      if (this.expanded === false) {
          if (typeof InstallTrigger !== 'undefined') this.expandBubbleFirefox(data, i, videoID);
          else this.expandBubbleChrome(data, i, videoID);
          if (data.type === 'youtube') clickedPlayer.setPlaybackQuality('hd1080');
          this.pauseAll();
          this.playSolo(data);
          this.expanded = true;
      } else {
          if (typeof InstallTrigger !== 'undefined') this.reduceBubbleFirefox(data, i, videoID);
          else this.reduceBubbleChrome(data, i, videoID);
          if(data.type === 'youtube') this.scaleResolution(clickedPlayer);
          this.expanded = false;
      }
  },

  expandBubbleChrome: function(data, i, videoID) {
      d3.selectAll('circle')
          .style('pointer-events', 'none');

      //give selected circle onhover event listener
      let circle = d3.select(`#${this.config.htmlAnchorID}circleID_${i}`)
          .attr('cx', `${this.config.diameter / 2}px`)
          .attr('cy', `${this.config.diameter / 2}px`)
          .attr('r', `${this.config.diameter / 2}px`)
          .style('pointer-events', 'auto');

      //select individual div and reassign z-index of individual div to 1. Also increase size.
      let div = d3.select(`#${this.config.htmlAnchorID}divID_${i}`)
          .style('z-index', '1')
          .style('border-radius', '50%')
          .style('width', `${this.config.diameter}px`)
          .style('height', `${this.config.diameter}px`);

      // select individual iframe that was clicked and increase it's size and center
      d3.select(`#${videoID}`)
          .transition()
          .style('top', `${-((this.config.zoom - 1) * (this.config.diameter / 2))}px`)
          .style('left', `${-((this.config.zoom - 1) * (this.config.diameter / 2))}px`)
          .style('width', `${this.config.zoom * this.config.diameter}px`)
          .style('height', `${this.config.zoom * this.config.diameter}px`);

      //select individual foreignObject which contains div and ifram and position it to desired location
      //also give pointer event(youtube controls) back to on hover
      d3.select(`#${this.config.htmlAnchorID}foreignID_${i}`)
          .transition()
          .attr('x', 0)
          .attr('y', 0);
  },

  expandBubbleFirefox: function(data, i, videoID) {
      let g = d3.select('#' + this.config.htmlAnchorID + 'gID_' + i)
          .attr('transform', (d) => 'translate(0,0)')

      d3.select('#' + this.config.htmlAnchorID + 'foreignID_' + i)
          .transition()
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', this.config.diameter)
          .attr('height', this.config.diameter)

      d3.selectAll('.' + this.config.htmlAnchorID + '-circle')
          .style('pointer-events', 'none')
          .style('visibility', 'hidden');

      d3.selectAll('.' + this.config.htmlAnchorID + '-video')
          .style('visibility', 'hidden');

      let circle = d3.select('#' + this.config.htmlAnchorID + 'circleID_' + i)
          .attr('cx', this.config.diameter / 2 + 'px')
          .attr('cy', this.config.diameter / 2 + 'px')
          .attr('r', this.config.diameter / 2 + 'px')
          .style('visibility', 'visible')
          .style('pointer-events', 'auto');

      d3.select('#' + videoID)
          .transition()
          .style('border-radius', '50%')
          .style('object-fit', 'cover')
          .style('width', '100%')
          .style('height', '100%')
          .style('visibility', 'visible');
  },

  reduceBubbleChrome: function(data, i, videoID) {
      let circle = d3.select(`#${this.config.htmlAnchorID}circleID_${i}`)
          .attr('r', (d) => d.r)
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);


      d3.select(`#${this.config.htmlAnchorID}divID_${i}`)
          .transition()
          .style('width', (d) => `${(d.r * 2)}px`)
          .style('height', (d) => `${(d.r * 2)}px`)
          .style('border-radius', (d) => `${d.r}px`)
          .style('z-index', '0');

      d3.select(`#${this.config.htmlAnchorID}foreignID_${i}`)
          .transition()
          .attr('x', (d) => d.x - d.r)
          .attr('y', (d) => d.y - d.r);

      d3.select('#' + videoID)
          .transition()
          .style('width', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${this.config.zoom * 100}%` : '100%')
          .style('height', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${this.config.zoom * 100}%` : '100%')
          .style('top', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((this.config.zoom - 1) * d.r) + 'px' : null)
          .style('left', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((this.config.zoom - 1) * d.r) + 'px' : null);

      let circles = d3.selectAll('circle')
          .style('pointer-events', 'auto');
  },

  reduceBubbleFirefox: function(data, i, videoID) {
      let circle = d3.select(`#${this.config.htmlAnchorID}circleID_${i}`)
          .attr('r', (d) => d.r)
          .attr('cy', 0)
          .attr('cx', 0);

      let g = d3.select(`#${this.config.htmlAnchorID}gID_${i}`)
          .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

      d3.select(`#${this.config.htmlAnchorID}foreignID_${i}`)
          .transition()
          .attr('width', (d) => d.r * 2)
          .attr('height', (d) => d.r * 2)
          .attr('x', (d) => -d.r)
          .attr('y', (d) => -d.r);

      d3.selectAll('.' + this.config.htmlAnchorID + '-circle')
          .style('pointer-events', 'auto')
          .style('visibility', 'visible');

      d3.selectAll('.' + this.config.htmlAnchorID + '-video')
          .style('visibility', 'visible');

      d3.select(`#${videoID}`)
          .transition()
          .style('border-radius', '50%')
          .style('object-fit', 'cover')
          .style('width', '100%')
          .style('height', '100%')
          .style('visibility', 'visible');
  },

  BubbleChart

};

// module.exports = acd3;
