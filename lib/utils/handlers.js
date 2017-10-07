const handlers = {

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

    pauseAll() {
        for (let key in this.playerStore) {
            let currentPlayer = this.playerStore[key];
            //logic to pause all Vimeo and HTML5 videos:
            if (currentPlayer.origin === 'https://player.vimeo.com' || currentPlayer.tagName === 'VIDEO') {
                currentPlayer.pause();
            }
            //logic to pause all YouTube videos:
            else if (currentPlayer.pauseVideo) {
                currentPlayer.pauseVideo();
            }
        }
    },

    unmuteOnMouseEnter: function(data) {
      let videoID = data.v_id;
      let videoType = data.type;
      if (videoType === 'vimeo') {
        this.playerStore[videoID].setVolume(1);
      }
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
      if (this.expanded === false) {
        if (typeof InstallTrigger !== 'undefined') acd3.expandBubbleFirefox.call(this, data, i, videoID);
        else acd3.expandBubbleChrome.call(this, data, i, videoID);
        if (data.type === 'youtube') clickedPlayer.setPlaybackQuality('hd1080');
        acd3.pauseAll.call(this);
        acd3.playSolo.call(this, data);
        this.expanded = true;
      } else {
        if (typeof InstallTrigger !== 'undefined') acd3.reduceBubbleFirefox.call(this, data, i, videoID);
        else acd3.reduceBubbleChrome.call(this, data, i, videoID);
        if(data.type === 'youtube') acd3.scaleResolution.call(this, clickedPlayer);
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
    }

}
