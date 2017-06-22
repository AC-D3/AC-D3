class acd3 {


  constructor(data, config) {
    this.playerStore = {};
    this.data = data;
    this.config = config;
  }

  populatePlayerStore() {
    window.onYouTubeIframeAPIReady = () => {

      const createPlayer = (id) => {
        return new YT.Player(id, { events: { 'onReady': onPlayerReady }});
      }

      //when youtube player is ready, set playback quality based on size, play video, mute video
      const onPlayerReady = (event) => {
        let youtubeIframe = document.getElementById(event.target.a.id);
        if (youtubeIframe.height <= 100) {
          event.target.setPlaybackQuality('small')
                      .playVideo()
                      .mute();
        } else if (youtubeIframe.height > 100 && youtubeIframe.height <= 200) {
          event.target.setPlaybackQuality('medium')
                      .playVideo()
                      .mute();
        } else {
          event.target.setPlaybackQuality('large')
                      .playVideo()
                      .mute();
        }
      }

      this.data.children.forEach((item) => {
        let videoID = item.v_id;
        if (item.type === 'youtube') {
          this.playerStore[videoID] = createPlayer(item.v_id);
        }
      });

    }

    this.data.children.forEach((item) => {
      let videoID = item.v_id;
      if (item.type === 'video') {
        this.playerStore[videoID] = document.getElementById(videoID);
      }
      else if (item.type === 'vimeo') {
        let vimeoPlayer = new Vimeo.Player(videoID);
        this.playerStore[videoID] = vimeoPlayer;
        vimeoPlayer.ready().then(() => {
          vimeoPlayer.play();
          vimeoPlayer.setVolume(0);
        });
      }
    });
  }

  addBubble(node) {
    let g;
    let foreignObject;
    let div;
    let video;
    let circle;

    g = node.append('g');
    //position circle below video bubble to handle mouse events
    circle = g.append("circle")
        .attr("r", (d) => d.r)
        .on('mouseenter', (d) => {
          this.unmuteOnMouseEnter(d.data);
        })
        .on('mouseleave', (d) => {
          this.muteOnMouseLeave(d.data);
        })
        .on('click', (d)=>{
            this.handleClick(d.data)
        });

    foreignObject = g.append('foreignObject')
            .style('pointer-events', 'none');

    //firefox specific attributes:
    if (typeof InstallTrigger !== 'undefined') {
      console.log('firefox')
        g.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

        foreignObject.attr('width', (d) => d.r * 2)
            .attr('height', (d) => d.r * 2)
            .attr('x', (d) => -d.r)
            .attr('y', (d) => -d.r)

        video = foreignObject.append((d) => {
            return d.data.type === 'video'
                ? document.createElement('video')
                : document.createElement('iframe');
        })

        video.style('border-radius', '50%')
            .style('object-fit', 'cover')
            .style('width', '100%')
            .style('height', '100%');
    }

    //chrome specific attributes:
    else {
        foreignObject.attr('x', (d) => d.x - d.r)
            .attr('y', (d) => d.y - d.r)

        div = foreignObject.append('xhtml:div')
            .style('width', (d) => (d.r * 2) + 'px')
            .style('height', (d) => (d.r * 2) + 'px')
            .style('border-radius', (d) => d.r + 'px')
            .style('-webkit-mask-image', '-webkit-radial-gradient(circle, white 100%, black 100%)')
            .style('position', 'relative')

        video = div.append((d) => {
            return d.data.type === 'video'
                ? document.createElement('video')
                : document.createElement('iframe');
        })

       video.style('object-fit', (d) => d.data.type === 'video' ? 'cover' : null)
            .attr("xmlns", "http://www.w3.org/1999/xhtml")
            .style('width', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${this.config.zoom * 100}%` : '100%')
            .style('height', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${this.config.zoom * 100}%` : '100%')
            .style('top', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((this.config.zoom - 1) * d.r) + 'px' : null)
            .style('left', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((this.config.zoom - 1) * d.r) + 'px' : null)
            .style('position', 'absolute');

      circle.attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
    }

       video.property('volume', (d) => d.data.type === 'video' ? '0.0' : null)
            .attr('autoplay', (d) => d.data.type === 'video' ? '' : null)
            .attr('loop', (d) => d.data.type === 'video' ? '' : null)
            .attr('frameborder', (d) => d.data.type === 'iframe' ? 0 : null)
            .attr('id', (d)=> d.data.v_id)
            .attr('src', (d) => d.data.src)
  }

  unmuteOnMouseEnter(data) {
      console.log('enter')
      let videoID = data.v_id;
      let videoType = data.type;
      if (videoType === 'vimeo') this.playerStore[videoID].setVolume(1);
      else if (videoType === 'youtube') this.playerStore[videoID].unMute();
      else this.playerStore[videoID].volume = 1;
  }

  muteOnMouseLeave(data) {
      console.log('leave')
      let videoID = data.v_id;
      let videoType = data.type;
      console.log(videoID)
      if (videoType === 'vimeo') this.playerStore[videoID].setVolume(0);
      else if (videoType === 'youtube') this.playerStore[videoID].mute();
      else this.playerStore[videoID].volume = 0;
  }

   handleClick(data) {
            let videoID = data.v_id;
            console.log(videoID)
        // d.value = d.value *100
        //     let video = d3.selectAll('g')
        //     .data(d)
        //     .enter().append('circle')
        //     .attr("r", 1000)  

//         d3.select(this).on("click", function() {
//   d3.select(this).attr("r", 300);
  
  d3.select('#'+videoID).attr('height', diameter)
  

    }

  createBubbleChart() {
    
    this.data.forEach((d)=> d.v_id = 'id_' + d.v_id)
    this.data = {'children': this.data}
    console.log('data j ' , this.data)





    const bubble = d3.pack(this.data)
        .size([this.config.diameter, this.config.diameter])
        .padding(1.5);
    
    
    
        
    const svg = d3.select("#" + this.config.htmlAnchorID)
        .append("svg")
        .attr("width", this.config.diameter)
        .attr("height", this.config.diameter);

    //calculates radius, x and y positions for all child nodes
    const root = d3.hierarchy(this.data)
        .sum(function (d) { return d.scalingParameter; });

       

    const node = svg.selectAll("g")
        .data(bubble(root).descendants())
        .enter()
        //only keeps objects that don't have children property
        .filter((d) => !d.children);
        

    this.addBubble(node);
    this.populatePlayerStore();
  }

}

// module.exports = acd3;
