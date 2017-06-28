class acd3 {

    constructor(data, config) {
        this.playerStore = {};
        this.data = data;
        this.config = config;
    }

    setUpEnvironment() {
        if (!window.visStore) window.visStore = [this];
        else window.visStore.push(this);

        if (!document.getElementById('vimeoScript')) {
            var tag = document.createElement('script');
            tag.src = "https://player.vimeo.com/api/player.js";
            tag.id = "vimeoScript";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

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
    }

    createBubbleChart() {

        this.setUpEnvironment();

        this.data.forEach((d) => d.v_id = 'id_' + d.v_id);
        this.data = { 'children': this.data };

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
        if (window.youTubeIframeAPIReady) this.populatePlayerStore();
    }

    createBubbleScatterChart() {
        this.setUpEnvironment();

        const svg = d3.select(`#${this.config.htmlAnchorID}`)
            .append("svg")
            .classed("scatter-chart", true)
            .attr("width", this.config.width)
            .attr("height", this.config.height);
        
        const dataGroup = svg.append("g")
            .classed("data",true)
        const axesGroup = svg.append("g")
            .classed("axes",true)

        const parseTime = d3.timeParse(this.config.dateFormat);

        const xIsDate = this.config.xIsDate;
        const yIsDate = this.config.yIsDate;
        const rIsDate = this.config.rIsDate;

        const width = this.config.width;
        const height = this.config.height;
        const margin = this.config.plottableAreaMargin;
        const padding = this.config.plottableAreaPadding;

        const plottableAreaWidth = width - margin.left - margin.right;
        const plottableAreaHeight = height - margin.top - margin.bottom;

        const rLowerLimit = this.config.rLimits.lower;
        const rUpperLimit = this.config.rLimits.upper;

        const timeOffset = d3.timeDay.offset;

        this.data.forEach((d) => {
            d.v_id = `id_${d.v_id}`;
            xIsDate ? d.x = parseTime(d.x) : d.x = +d.x;
            yIsDate ? d.y = parseTime(d.y) : d.y = +d.y;
            rIsDate ? d.r = parseTime(d.r) : d.r = +d.r;
        });

        const minX = d3.min(this.data, (d) => d.x);
        const maxX = d3.max(this.data, (d) => d.x);

        const minY = d3.min(this.data, (d) => d.y);
        const maxY = d3.max(this.data, (d) => d.y);

        const minR = d3.min(this.data, (d) => d.r);
        const maxR = d3.max(this.data, (d) => d.r);

        // set the ranges
        const xScaleFunc = xIsDate
            ? d3.scaleTime()
                .range([0 + margin.left + padding.left, width - padding.right - margin.right])
                .domain([minX, maxX])
            : d3.scaleLinear()
                .range([0 + margin.left + padding.left, width - padding.right - margin.right])
                .domain([minX, maxX]);

        const yScaleFunc = yIsDate
            ? d3.scaleTime()
                .range([height - padding.bottom - margin.bottom, 0 + margin.top])
                .domain([timeOffset(minY, -padding.bottom), timeOffset(maxY, padding.top)])
            : d3.scaleLinear()
                .range([height - padding.bottom - margin.bottom, 0 + padding.top])
                .domain([minY , maxY]);

        const rScaleFunc = rIsDate
            ? d3.scaleTime()
                .range([rLowerLimit, rUpperLimit])
                .domain([minR, maxR])
            : d3.scaleLinear()
                .range([rLowerLimit, rUpperLimit])
                .domain([minR, maxR]);

        this.data.forEach((d) => d.data = Object.assign({}, d));

        this.data.forEach((d) => {
            d.x = xScaleFunc(d.data.x);
            d.y = yScaleFunc(d.data.y);
            d.r = rScaleFunc(d.data.r);
        });


        const node = dataGroup.selectAll("g")
            .data(this.data)
            .enter()
            .append("g")

        this.addBubble(node);
        this.populatePlayerStore();

        // Add the X Axis
        const xAxis = axesGroup.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height-margin.bottom})`)
            .call(d3.axisBottom(xScaleFunc));

        // Add the Y Axis
        const yAxis = axesGroup.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .call(d3.axisLeft(yScaleFunc));

        // const chartArea = svg.append("rect")
        //     .classed("rect",true)
        //     .attr("height",height)
        //     .attr("width",width)
        //     .attr("fill-opacity", "0.3")
        //     .style('fill', 'green');

        // const plotArea = svg.append("rect")
        //     .classed("rect",true)
        //     .attr("x",margin.left)
        //     .attr("y",margin.top)
        //     .attr("height",height-margin.top-margin.bottom)
        //     .attr("width",width-margin.left-margin.right)
        //     .attr("fill-opacity", "0.3")
        //     .style('fill', 'blue');
        
        // const dataArea = svg.append("rect")
        //     .classed("rect",true)
        //     .attr("x",margin.left+padding.left)
        //     .attr("y",margin.top+padding.top)
        //     .attr("height",height-margin.top-margin.bottom-padding.top-padding.bottom)
        //     .attr("width",width-margin.left-margin.right-padding.left-padding.right)
        //     .attr("fill-opacity", "0.3")
        //     .style('fill', 'red');
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
            .on('mouseenter', (d) => this.unmuteOnMouseEnter(d.data))
            .on('mouseleave', (d) => this.muteOnMouseLeave(d.data))
            .on('click', (d) => this.handleClick(d.data));

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

    populatePlayerStore() {
        if (window.youTubeIframeAPIReady) {
            while (visStore.length) {

                let vis = visStore.shift()
                let data;
                if (vis.config.chartType === 'bubble') data = vis.data.children;
                if (vis.config.chartType === 'bubbleScatter') data = vis.data;

                data.forEach((item) => {
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

    handleClick(data) {
        let videoID = data.v_id;
        //does not work right now
        d3.select('div').attr('height', this.diameter)
        d3.select('div').attr('width', this.diameter)
        d3.select('#' + videoID).attr('height', this.diameter)
    }
}
