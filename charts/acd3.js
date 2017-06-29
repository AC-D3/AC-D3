class acd3 {

    constructor(data, config) {
        this.playerStore = {};
        this.data = data;
        this.config = config;
        this.playerCreated = false;
        this.clicked = false;
    }

    playAll() {
        for (let key in this.playerStore) {
            let currentPlayer = this.playerStore[key];
            //vimeo:
            if (currentPlayer.origin === "https://player.vimeo.com") {
                currentPlayer.play();
                currentPlayer.setVolume(0);
            }
            //html5 video
            else if (currentPlayer.tagName === 'VIDEO') {
                currentPlayer.play();
                currentPlayer.volume = 0.0;
            }
            //youtube
            else if (currentPlayer.playVideo) {
                currentPlayer.playVideo().mute();
            }
        }
    }

    pauseAll() {
        for (let key in this.playerStore) {
            let currentPlayer = this.playerStore[key];
            //vimeo and html5 video:
            if (currentPlayer.origin === "https://player.vimeo.com" || currentPlayer.tagName === 'VIDEO') {
                currentPlayer.pause();
            }
            //youtube
            else if (currentPlayer.pauseVideo) {
                currentPlayer.pauseVideo();
            }
        }
    }

    populatePlayerStore() {

        const l = console.log

        // l('in populatePlayerStore')
        // l('window.youTubeIframeAPIReady --> ', window.youTubeIframeAPIReady)
        // l('window.visStore --> ', window.visStore)

        if (!document.getElementById('youtubeScript')) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.id = "youtubeScript";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        if (!window.onYouTubeIframeAPIReady) {
            window.onYouTubeIframeAPIReady = () => {
                window.youTubeIframeAPIReady = true;
                this.populatePlayerStore();
            }
        }

        if (window.youTubeIframeAPIReady) {
            // visStore.forEach((vis) => {
            while (visStore.length) {
                let vis = visStore.shift()
                vis.data.children.forEach((item) => {
                    let videoID = item.v_id;
                    if (item.type === 'youtube') {
                        vis.playerStore[videoID] = this.createYouTubePlayer(videoID);
                    } else if (item.type === 'video') {
                        vis.playerStore[videoID] = document.getElementById(videoID);
                    } else if (item.type === 'vimeo') {
                        vis.playerStore[videoID] = this.createVimeoPlayer(videoID);
                    } else console.log('invalid type')
                });
            }
            // })
        }
    }


    createVimeoPlayer(id) {
        let vimeoPlayer = new Vimeo.Player(id);
        vimeoPlayer.ready().then(() => {
            if (this.config.autoplay) {
                vimeoPlayer.play();
                vimeoPlayer.setVolume(0);
            }
            if (this.config.loop) vimeoPlayer.setLoop(true);
        });
        return vimeoPlayer;
    }

    createYouTubePlayer(id) {
        const onYouTubePlayerReady = (event) => {
            if (this.config.autoplay) event.target.playVideo().mute();
            let youtubeIframe = document.getElementById(event.target.a.id);
            if (youtubeIframe.height <= this.config.resolutionThresholds[0]) {
                event.target.setPlaybackQuality('small')
            } else if (youtubeIframe.height > this.config.resolutionThresholds[0]
                && youtubeIframe.height <= this.config.resolutionThresholds[1]) {
                event.target.setPlaybackQuality('medium')
            } else {
                event.target.setPlaybackQuality('large')
            }
        }
        return new YT.Player(id, {
            events: { 'onReady': onYouTubePlayerReady }
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
            .attr('id', (d, i) => this.config.htmlAnchorID + "circleID_" + i)
            .attr("r", (d) => d.r)
            .on('mouseenter', (d) => {
                this.unmuteOnMouseEnter(d.data);
            })
            .on('mouseleave', (d) => {
                this.muteOnMouseLeave(d.data);
            })


        foreignObject = g.append('foreignObject')
            .style('pointer-events', 'none');

        //firefox specific attributes:
        if (typeof InstallTrigger !== 'undefined') {
            console.log('firefox')
            circle
                .on('click', (d, i) => {
                    this.handleClickFirefox(d.data, i)
                });
            g.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
                .attr('id', (d, i) => this.config.htmlAnchorID + 'gID_' + i)

            foreignObject
                .attr('id', (d, i) => this.config.htmlAnchorID + 'foreignID_' + i)
                .attr('width', (d) => d.r * 2)
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
            circle
                .on('click', (d, i) => {
                    this.handleClickChrome(d.data, i)
                });
            foreignObject
                .attr('id', (d, i) => this.config.htmlAnchorID + 'foreignID_' + i)
                .attr('x', (d) => d.x - d.r)
                .attr('y', (d) => d.y - d.r);

            div = foreignObject.append('xhtml:div')
                .attr('id', (d, i) => this.config.htmlAnchorID + 'divID_' + i)
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
        if (this.config.autoplay) video.attr('autoplay', (d) => d.data.type === 'video' ? '' : null);
        if (this.config.loop) video.attr('loop', (d) => d.data.type === 'video' ? '' : null);
        video.property('volume', (d) => d.data.type === 'video' ? '0.0' : null)
            .attr('frameborder', (d) => d.data.type === 'iframe' ? 0 : null)

            .attr('id', (d) => d.data.v_id)
            .attr('src', (d) => {
                if (d.data.type === 'youtube') {
                    let videoID = d.data.src.split('/').pop();
                    let params = `?enablejsapi=1&controls=0&autohide=1&disablekb=1&fs=0&modestbranding=0&showinfo=0&rel=0&version=3&playlist=${videoID}`;
                    if (this.config.looop) params += '&loop=1';
                    return d.data.src + params;
                } else if (d.data.type === 'vimeo') {
                    return d.data.src + '?' + 'autopause=0';
                } else {
                    return d.data.src;
                }
            });
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
        if (videoType === 'vimeo') this.playerStore[videoID].setVolume(0);
        else if (videoType === 'youtube') this.playerStore[videoID].mute();
        else this.playerStore[videoID].volume = 0;
    }

    handleClickFirefox(data, i) {
        let videoID = data.v_id;
        if (this.clicked === false) {
            let g = d3.select('#' + this.config.htmlAnchorID + 'gID_' + i)
                .attr("transform", (d) => "translate(" + 0 + "," + 0 + ")")
            
            d3.select('#' + this.config.htmlAnchorID + 'foreignID_' + i)
                .transition()
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', this.config.diameter)
                .attr('height', this.config.diameter)

            d3.selectAll('circle')
                .style('pointer-events', 'none')
                .style('visibility', 'hidden');

            d3.selectAll('iframe')
                .style('visibility', 'hidden');

            let circle = d3.select('#' + this.config.htmlAnchorID + 'circleID_' + i)
                .attr('cx', this.config.diameter / 2 + 'px')
                .attr('cy', this.config.diameter / 2 + 'px')
                .attr('r', this.config.diameter / 2 + 'px')
                .style('visibility', 'visible')
                .style('pointer-events', 'auto')

            d3.select('#' + videoID)
                .transition()
                .style('border-radius', '50%')
                .style('object-fit', 'cover')
                .style('width', '100%')
                .style('height', '100%')
                .style('visibility', 'visible')

            this.clicked = true;

        } else {

            let circle = d3.select('#' + this.config.htmlAnchorID + 'circleID_' + i)
                .attr('r', (d) => d.r)
                .attr('cy', 0)
                .attr('cx', 0);

             let g = d3.select('#' + this.config.htmlAnchorID + 'gID_' + i)
                .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
            
            d3.select('#' + this.config.htmlAnchorID + 'foreignID_' + i)
                .transition()
                .attr('width', (d) => d.r * 2)
                .attr('height', (d) => d.r * 2)
                .attr('x', (d) => -d.r)
                .attr('y', (d) => -d.r);

            d3.selectAll('circle')
                .style('pointer-events', 'auto')
                .style('visibility', 'visible');

            d3.selectAll('iframe')
                .style('visibility', 'visible');

            d3.select('#' + videoID)
                .transition()
                .style('border-radius', '50%')
                .style('object-fit', 'cover')
                .style('width', '100%')
                .style('height', '100%')
                .style('visibility', 'visible');

            this.clicked = false;
        }
    }

    handleClickChrome(data, i) {
        let videoID = data.v_id;

        if (this.clicked === false) {
            console.log('click was false')
            //give all circles no events so on hover will not work
            d3.selectAll('circle')
                .style('pointer-events', 'none');

            //give selected circle onhover event listener
            let circle = d3.select('#' + this.config.htmlAnchorID + 'circleID_' + i)
                .attr('cx', this.config.diameter / 2 + 'px')
                .attr('cy', this.config.diameter / 2 + 'px')
                .attr('r', this.config.diameter / 2 + 'px')
                .style('pointer-events', 'auto');

            //select individual div and reassign z-index of individual div to 1. Also increase size.
            let div = d3.select('#' + this.config.htmlAnchorID + 'divID_' + i)
                .style('z-index', '1')
                // .style('top', 0 + 'px')
                // .style('left', 0 + 'px')
                .style('border-radius', '50%')
                .style('width', this.config.diameter + 'px')
                .style('height', this.config.diameter + 'px');

            // select individual iframe that was clicked and increase it's size and center
            d3.select('#' + videoID)
                .transition()
                // .style('z-index', '1')
                .style('top', -((this.config.zoom - 1) * (this.config.diameter / 2)) + 'px')
                .style('left', -((this.config.zoom - 1) * (this.config.diameter / 2)) + 'px')
                .style('width', this.config.zoom * this.config.diameter + 'px')
                .style('height', this.config.zoom * this.config.diameter + 'px');

            //select individual foreignObject which contains div and ifram and position it to desired location
            //also give pointer event(youtube controls) back to on hover
            d3.select('#' + this.config.htmlAnchorID + 'foreignID_' + i)
                .transition()
                .attr('x', 0)
                .attr('y', 0);

            this.clicked = true;

        } else {
            console.log('click was true')
            //same logic when elements were originally created
            let circle = d3.select('#' + this.config.htmlAnchorID + 'circleID_' + i)
                .attr('r', (d) => d.r)
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y);


            d3.select('#' + this.config.htmlAnchorID + 'divID_' + i)
                .transition()
                .style('width', (d) => (d.r * 2) + 'px')
                .style('height', (d) => (d.r * 2) + 'px')
                .style('border-radius', (d) => d.r + 'px')
                .style('z-index', '0');

            d3.select('#' + this.config.htmlAnchorID + 'foreignID_' + i)
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

            this.clicked = false;
        }
    }

    createBubbleChart() {

        if (!window.visStore) window.visStore = [this];
        else window.visStore.push(this);

        this.data.forEach((d) => d.v_id = 'id_' + d.v_id)
        this.data = { 'children': this.data }

        const bubble = d3.pack(this.data)
            .size([this.config.diameter, this.config.diameter])
            .padding(1.5);

        const svg = d3.select("#" + this.config.htmlAnchorID)
            .append("svg")
            .classed("bubble-chart", true)
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
