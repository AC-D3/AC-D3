let data = {
    "children": [{
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU?autoplay=1&enablejsapi=1',
        "views": 21097531,
        "playerID": "player1",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns?autoplay=1&enablejsapi=1",
        "views": 177639,
        "playerID": "player2",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/nsrOCzUwcjE?autoplay=1&enablejsapi=1",
        "views": 1073553,
        "playerID": "player3",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/AjCebKn4iic?autoplay=1&enablejsapi=1",
        "views": 1507944,
        "playerID": "player4",
        "type": "iframe"
    }, {
        "src": "https://www.youtube.com/embed/DiTECkLZ8HM?autoplay=1&enablejsapi=1",
        "views": 26112988,
        "playerID": "player5",
        "type": "iframe"
    }, {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "views": 1507944,
        // "playerID": "player4",
        "type": "video"
    }]
}

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let playerName;
let playerArr = [];
function onYouTubeIframeAPIReady() {
    for (var i = 0; i < data.children.length; i++) {
        playerName = createPlayer(data.children[i].playerID);
        playerArr.push(playerName)
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
let g;
let foreignObject;
let div;
let video;
let circle;

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
        .attr('id', (d, i) => d.data.type === 'iframe' ? d.data.playerID : 'video' + i)
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
    console.log('other')
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
        .attr('id', (d, i) => d.data.type === 'iframe' ? d.data.playerID : 'video' + i)
        .attr("xmlns", "http://www.w3.org/1999/xhtml")
        .attr('src', (d) => d.data.src)
        // .style('width', (d) => (d.r * 2) + 'px')
        // .style('height', (d) => (d.r * 2) + 'px')
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

//event handlers
function handleMouseEnter(d, i) {
  console.log('enter')
  if (d.data.type === 'video') document.getElementById('video' + i).volume = 1;
  else if (d.data.type === 'iframe') playerArr[i].unMute();
}

function handleMouseLeave(d, i) {
  console.log('leave')
  if (d.data.type === 'video') document.getElementById('video' + i).volume = 0;
  else if (d.data.type === 'iframe') playerArr[i].mute()
}
