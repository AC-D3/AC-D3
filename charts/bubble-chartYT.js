

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

// function onYouTubeIframeAPIReady() {
// console.log('helo')
//            youtubePlayer = new YT.Player('ytplayer', {
//                 events: {
//                     'onReady': onPlayerReady
//                 }
//             });
//             console.log(youtubePlayer)

//         }
let curplayer;
function onYouTubeIframeAPIReady() {
   
console.log('fuck this')
    for (var i = 0; i < data.children.length; i++) {
        var curplayer = createPlayer(data.children[i].playerID);
        
        
    }
    console.log(curplayer)
}
function createPlayer(playerInfo) {
    console.log(playerInfo)
    return new YT.Player(playerInfo, {
        events: {
            'onReady': onPlayerReady
        }
    })
}

function onPlayerReady(event) {
    console.log('event--->' ,event.target)
    
   event.target.playVideo().mute();
    // event.target.loadVideoById(videoID[currentVideoId])
    // youtubePlayer.playVideo();
    // Mute!
    // youtubePlayer.mute();
    // event.target.loadVideoById(video[ID]).mute();
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

const g = node.append('g')
    .attr("class", "node")
    .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

const foreignObject = g.append('foreignObject')
    .attr('width', (d) => d.r * 2)
    .attr('height', (d) => d.r * 2)
    .attr('x', (d) => -d.r)
    .attr('y', (d) => -d.r)
    .style('pointer-events', 'none');

const video = foreignObject
    .append('xhtml:iframe')
    .attr('src', (d) => d.data.src)
    .property('volume', '0.0')
    .attr('autoplay', '')
    .attr('loop', '')
    .attr('width', (d) => d.r * 2)
    .attr('height', (d) => d.r * 2)
    // .attr('id', (d, i) => i)
    // .attr('id', 'ytplayer')
    .attr('id', (d) => d.data.playerID)
    .style('position', 'fixed')
    .style('border-radius', '50%')
    .style('object-fit', 'cover')
    .style('width', '100%')
    .style('height', '100%');

//position circle below video bubble to handle mouse events
const circle = g.append("circle")
    .attr("r", (d) => d.r)
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave);






function handleMouseEnter(d, i) {
    console.log('enter')
    // let video = document.getElementById(i);
    // video.volume = 1

    //youtube API method
    // youtubePlayer.unMute()

    //vimeo API method
    // vimeoPlayer.setVolume(1)
}

function handleMouseLeave(d, i) {
    console.log('leave')
    // let video = document.getElementById(i);
    // video.volume = 0
    //youtube API method
    // youtubePlayer.mute()

    //vimeo API method
    // vimeoPlayer.setVolume(0)

}

