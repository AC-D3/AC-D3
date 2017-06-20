const acd3 = {

    playerStore: {},
    diameter: 600,
    zoom: 1,

    populatePlayerStore: function () {



        //appends youtube api script
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

        //appends vimeo api script
      


        
     
            
        
            window.onYouTubeIframeAPIReady = function () {

                function createPlayer(id) {
                    return new YT.Player(id, { events: { 'onReady': onPlayerReady } })
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

                for (var i = 0; i < data.children.length; i++) {
                    let videoID = data.children[i].v_id;
                    if (data.children[i].type === 'youtube') {
                        acd3.playerStore[videoID] = createPlayer(data.children[i].v_id);
                    }
                }
            }

            for (let i = 0; i < data.children.length; i += 1) {
                let videoID = data.children[i].v_id;
                if (data.children[i].type === 'video') {
                    acd3.playerStore[videoID] = document.getElementById(videoID);
                }else if (data.children[i].type === 'vimeo') {

                let vimeoPlayer = new Vimeo.Player(videoID);
                acd3.playerStore[videoID] = vimeoPlayer;
                vimeoPlayer.ready().then(function () {
                    vimeoPlayer.play();
                    vimeoPlayer.setVolume(0);
                });
            }

            }
        },

        addBubble: function (node) {

            let g;
            let foreignObject;
            let div;
            let video;
            let circle;

            g = node.append('g');
            //position circle below video bubble to handle mouse events
            circle = g.append("circle")
                .attr("r", (d) => d.r)
                .on('mouseenter', this.handleMouseEnter)
                .on('mouseleave', this.handleMouseLeave)
                .on('click', this.handleClick);

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
                    .style('width', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${this.zoom * 100}%` : '100%')
                    .style('height', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${this.zoom * 100}%` : '100%')
                    .style('top', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((this.zoom - 1) * d.r) + 'px' : null)
                    .style('left', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((this.zoom - 1) * d.r) + 'px' : null)
                    .style('position', 'absolute');

                circle.attr("cx", (d) => d.x)
                    .attr("cy", (d) => d.y)
            }

            video.property('volume', (d) => d.data.type === 'video' ? '0.0' : null)
                .attr('autoplay', (d) => d.data.type === 'video' ? '' : null)
                .attr('loop', (d) => d.data.type === 'video' ? '' : null)
                .attr('frameborder', (d) => d.data.type === 'iframe' ? 0 : null)
                .attr('id', (d) => d.data.v_id)
                .attr('src', (d) => d.data.src)
        },

        handleMouseEnter: function (d, i) {
            console.log('enter')
            let videoID = data.children[i].v_id;
            if (d.data.type === 'vimeo') acd3.playerStore[videoID].setVolume(1);
            else if (d.data.type === 'youtube') acd3.playerStore[videoID].unMute();
            else acd3.playerStore[videoID].volume = 1;
        },

        handleMouseLeave: function (d, i) {
            console.log('leave')
            let videoID = data.children[i].v_id;
            if (d.data.type === 'vimeo') acd3.playerStore[videoID].setVolume(0);
            else if (d.data.type === 'youtube') acd3.playerStore[videoID].mute();
            else acd3.playerStore[videoID].volume = 0;
        },
        handleClick: function(d, i) {
            console.log(d)
            let videoID = data.children[i].v_id;
            let video = document.getElementById(videoID)
            document.getElementById(videoID)
            let div = d3.select('div')
            .transition()
            .style('width', 500 + 'px')
            .style('height', 500 + 'px')
            
            console.log(video)
            let circle = d3.select(this)
            .transition()
            .style('r', 300 +'px')
            
            console.log(circle)
        },

        drawBubble: function (data, config) {

            this.diameter = config.diameter;
            this.zoom = config.zoom;

            const bubble = d3.pack(data)
                .size([this.diameter, this.diameter])
                .padding(1.5);
                console.log('bubble ',bubble)
            const svg = d3.select("#" + config.htmlAnchorID)
                .append("svg")
                .attr("width", this.diameter)
                .attr("height", this.diameter);

            //calculates radius, x and y positions for all child nodes
            const root = d3.hierarchy(data)
                .sum(function (d) { return d.scalingParameter; });
                console.log('root ' , root)
            const node = svg.selectAll("g")
                .data(bubble(root).descendants())
                .enter()
                //only keeps objects that don't have children property
                .filter((d) => !d.children);
                console.log('node ', node)
            this.addBubble(node);
            this.populatePlayerStore();

        }

    }

// module.exports = acd3;
