let data = {
    "children": [{
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU?autoplay=1&enablejsapi=1',
        "viewcount": 21097531,
        "v_id": "22",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns?autoplay=1&enablejsapi=1",
        "viewcount": 177639,
        "v_id": "2",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/nsrOCzUwcjE?autoplay=1&enablejsapi=1",
        "viewcount": 1073553,
        "v_id": "3",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/AjCebKn4iic?autoplay=1&enablejsapi=1",
        "viewcount": 1507944,
        "v_id": "4",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/DiTECkLZ8HM?autoplay=1&enablejsapi=1",
        "viewcount": 26112988,
        "v_id": "5",
        "type": "iframe"
    }, {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "viewcount": 1507944,
        "v_id": "6",
        "type": "video"
    }]
}


const diameter = 600;
let g;
let foreignObject;
let div;
let video;
let circle;

// d3.csv("./datasets/bubble-data.csv", function (error, data1) {
//     console.log('movie data --> ', data1)

    const bubble = d3.pack(data)
        .size([diameter, diameter])
        .padding(1.5);

    const svg = d3.select("#vis")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    //calculates radius, x and y positions for all child nodes
    const root = d3.hierarchy(data)
        .sum(function (d) { return d.viewcount; });

    const node = svg.selectAll(".node")
        .data(bubble(root).descendants())
        .enter()
        //only keeps objects that don't have children property
        .filter((d) => !d.children)

    //support for firefox
    if (typeof InstallTrigger !== 'undefined') {
        g = node.append('g')
            .attr("class", "node")
            .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

        foreignObject = g.append('foreignObject')
            .attr('width', (d) => d.r * 2)
            .attr('height', (d) => d.r * 2)
            .attr('x', (d) => -d.r)
            .attr('y', (d) => -d.r)
            .style('pointer-events', 'none');

        video = foreignObject.append((d) => {
            //check src to determine whether element should be html5 video or iframe

            return d.data.type === 'video'
                ? document.createElement('video')
                : document.createElement('iframe');
        })

            //html5 video attributes
            .property('volume', (d) => d.data.type === 'video' ? '0.0' : null)
            .attr('autoplay', (d) => d.data.type === 'video' ? '' : null)
            .attr('loop', (d) => d.data.type === 'video' ? '' : null)

            //iframe attributes
            .attr('frameborder', (d) => d.data.type === 'iframe' ? 0 : null)

            //shared attributes
            .attr('id', (d) => d.data.v_id)
            .attr('src', (d) => d.data.src)
            .style('border-radius', '50%')
            .style('object-fit', 'cover')
            .style('width', '100%')
            .style('height', '100%');

        //position circle below video bubble to handle mouse events
        circle = g.append("circle")
            .attr("r", (d) => d.r)
            .on('mouseenter', handleMouseEnter)
            .on('mouseleave', handleMouseLeave);
    }

    //support for chrome
    else {
        g = node.append('g')

        foreignObject = g.append('foreignObject')
            .attr('x', (d) => d.x - d.r)
            .attr('y', (d) => d.y - d.r)
            .style('pointer-events', 'none');

        div = foreignObject.append('xhtml:div')
            .style('width', (d) => (d.r * 2) + 'px')
            .style('height', (d) => (d.r * 2) + 'px')
            .style('border-radius', (d) => d.r + 'px')
            .style('-webkit-mask-image', '-webkit-radial-gradient(circle, white 100%, black 100%)')
            .style('position', 'relative')

        video = div.append((d) => {
            //check src to determine whether element should be html5 video or iframe
            return d.data.type === 'video'
                ? document.createElement('video')
                : document.createElement('iframe');
        })

            //html5 video attributes
            .property('volume', (d) => d.data.type === 'video' ? '0.0' : null)
            .attr('autoplay', (d) => d.data.type === 'video' ? '' : null)
            .attr('loop', (d) => d.data.type === 'video' ? '' : null)
            .style('object-fit', (d) => d.data.type === 'video' ? 'cover' : null)

            //iframe attributes
            .attr('frameborder', (d) => d.data.type === 'iframe' ? 0 : null)

            //shared attributes
            .attr('id', (d) => d.data.v_id)
            .attr("xmlns", "http://www.w3.org/1999/xhtml")
            .attr('src', (d) => d.data.src)
            .style('width', '100%')
            .style('height', '100%')
            .style('position', 'absolute');

        //position circle below video bubble to handle mouse events
        circle = g.append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", (d) => d.r)
            .on('mouseenter', handleMouseEnter)
            .on('mouseleave', handleMouseLeave);
    }

    // youtube player
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let playerName;
    let playerArr = [];
    let count = 0
    let videoElement;

    let idArray = [];
    for (let i = 0; i < data.children.length; i++) {
        idArray.push(data.children[i].v_id)
    }

    function onYouTubeIframeAPIReady() {
        for (var i = 0; i < data.children.length; i++) {
            if (data.children[i].type === 'iframe') {
            playerName = createPlayer(data.children[i].v_id);
            playerArr.push(playerName)
            }
        }
    }

    function createPlayer(playerInfo) {
        return new YT.Player(playerInfo, {
            events: {
                'onReady': onPlayerReady
            }
        })
    }

    function onPlayerReady(event) {
        //if statement here checking data pertinent to size of circle. If it's smaller(circle is smaller),
        //then less playback quality
        videoElement = document.getElementById(idArray[count])

        if (videoElement.height <= 100) {
            event.target.setPlaybackQuality('small').playVideo().mute();
        } else if (videoElement.height > 100 && videoElement.height <= 200) {
            event.target.setPlaybackQuality('medium').playVideo().mute();
        } else {
            event.target.setPlaybackQuality('large').playVideo().mute();
        }
        count++;
    }



    //event handlers
    function handleMouseEnter(d, i) {
        console.log('enter')
        if (d.data.type === 'video') document.getElementById(idArray[i]).volume = 1;
        else if (d.data.type === 'iframe') playerArr[i].unMute();
    }

    function handleMouseLeave(d, i) {
        console.log('leave')
        if (d.data.type === 'video') document.getElementById(idArray[i]).volume = 0;
        else if (d.data.type === 'iframe') playerArr[i].mute()
    }

// })