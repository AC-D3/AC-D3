

let data = {
    "children": [{
        "src": 'https://www.youtube.com/embed/mnWY6TNLMq0?v=mnWY6TNLMq0?autoplay=1&enablejsapi=1',
        "views": 2,
        "playerID": "player1"
    }
        , {
        "src": "https://www.youtube.com/embed/jnjk_NGiihw?autoplay=1&enablejsapi=1",
        "views": 2,
        "playerID": "player2"
    }
        , {
        "src": "https://www.youtube.com/embed/rP0uuI80wuY?autoplay=1&enablejsapi=1",
        "views": 20,
        "playerID": "player3"
    }
        // , {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/0/04/Play_fight_of_polar_bears_edit_1.ogv",
        //     "views": 2
        // }, {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Enallagma_cyathigerum_2.ogv",
        //     "views": 3
        // }, {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        //     "views": 1
        // }, {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        //     "views": 1
        // }, {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        //     "views": 1
        // }, {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        //     "views": 1
        // }, {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        //     "views": 1
        // }, {
        //     "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        //     "views": 1
        // }
    ]
}

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let curplayer;
function onYouTubeIframeAPIReady() {
    for (var i = 0; i < data.children.length; i++) {
        curplayer = createPlayer(data.children[i].playerID);
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
   event.target.playVideo().mute();
}

const diameter = 600;

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
    .sum(function (d) { return d.views; });

const node = svg.selectAll(".node")
    .data(bubble(root).descendants())
    .enter()
    //only keeps objects that don't have children property
    .filter((d) => !d.children)

// const g = node.append('g')
//     .attr("class", "node")
//     .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

// const foreignObject = g.append('foreignObject')
//     .attr('width', (d) => d.r * 2)
//     .attr('height', (d) => d.r * 2)
//     .attr('x', (d) => -d.r)
//     .attr('y', (d) => -d.r)
//     .style('pointer-events', 'none');


    //1st solution:
    // const video = foreignObject
    //     .append('xhtml:iframe')
    //     .attr('src', (d) => d.data.src)
    //     .attr('width', (d) => d.r * 2)
    //     .attr('height', (d) => d.r * 2)
    //     .attr('id', (d) => d.data.playerID)
    //     .attr('frameborder', 0)
    //     .style('border-radius', '50%')
    //     .style('position', 'fixed')
    //     .style('width', '100%')
    //     .style('height', '100%');

    //2nd solution:
    // const div = foreignObject
    //     .append('xhtml:div')
    //     .attr('width', (d) => d.r * 2)
    //     .attr('height', (d) => d.r * 2)
    //     .attr('border-radius', '50%')
    //     .attr('overflow', 'hidden');
    //
    // const video = div
    //     .append('xhtml:iframe')
    //     .attr('src', (d) => d.data.src)
    //     .attr('width', (d) => d.r * 2)
    //     .attr('height', (d) => d.r * 2)
    //     .attr('id', (d) => d.data.playerID)
    //     .attr('frameborder', 0)
    //     .style('position', 'fixed');

    const foreignObject = node.append('foreignObject')
        // .attr('width', (d) => d.r * 2)
        // .attr('height', (d) => d.r * 2)
        // .attr('x', (d) => -d.r)
        // .attr('y', (d) => -d.r)
        // .style('pointer-events', 'none');

    const div = foreignObject
        .append('xhtml:div')
        .style('top', (d) => (d.y - d.r) + 'px')
        .style('left', (d) => (d.x - d.r) + 'px')
        .style('width', (d) => (d.r * 2) + 'px')
        .style('height', (d) => (d.r * 2) + 'px')
        .style('border-radius', (d) => d.r + 'px')
        .style('-webkit-mask-image', '-webkit-radial-gradient(circle, white 100%, black 100%)')
        .style('position', 'relative')
        // .attr('overflow', 'hidden');

    const video = div
        .append('xhtml:iframe')
        .attr("xmlns", "http://www.w3.org/1999/xhtml")
        .attr('src', (d) => d.data.src)
        .style('width', (d) => (d.r * 2) + 'px')
        .style('height', (d) => (d.r * 2) + 'px')
        .attr('id', (d) => d.data.playerID)
        .attr('frameborder', 0)
        // .style('top', (d) => -d.r + 'px')
        // .style('left', (d) => -d.r + 'px')
        .style('position', 'absolute');

//position circle below video bubble to handle mouse events
// const circle = g.append("circle")
//     .attr("r", (d) => d.r)
//     .on('mouseenter', handleMouseEnter)
//     .on('mouseleave', handleMouseLeave);

function handleMouseEnter(d, i) {
    console.log('enter')
    // let video = document.getElementById(i);
    // video.volume = 1
    // console.log(curplayer)
    //youtube API method
    curplayer.unMute()

    //vimeo API method
    // vimeoPlayer.setVolume(1)
}

function handleMouseLeave(d, i) {
    console.log('leave')
    // let video = document.getElementById(i);
    // video.volume = 0
    //youtube API method
    curplayer.mute()

    //vimeo API method
    // vimeoPlayer.setVolume(0)

}
