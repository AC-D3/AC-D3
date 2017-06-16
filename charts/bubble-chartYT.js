let data = {
    "children": [{
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU?autoplay=1&enablejsapi=1',
        "views": 21097531,
        "playerID": "player1"
    }, {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns?autoplay=1&enablejsapi=1",
        "views": 177639,
        "playerID": "player2"
    }, {
        "src": "https://www.youtube.com/embed/nsrOCzUwcjE?autoplay=1&enablejsapi=1",
        "views": 1073553,
        "playerID": "player3"
    }, {
            "src": "https://www.youtube.com/embed/AjCebKn4iic?autoplay=1&enablejsapi=1",
            "views": 1507944,
            "playerID": "player4"
    }, {
        "src": "https://www.youtube.com/embed/DiTECkLZ8HM?autoplay=1&enablejsapi=1",
        "views": 26112988,
        "playerID": "player5"
    }]
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

  video = foreignObject.append('xhtml:iframe')
      .attr('src', (d) => d.data.src)
      .attr('width', (d) => d.r * 2)
      .attr('height', (d) => d.r * 2)
      .attr('id', (d) => d.data.playerID)
      .attr('frameborder', 0)
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

  div = foreignObject
      .append('xhtml:div')
      .style('width', (d) => (d.r * 2) + 'px')
      .style('height', (d) => (d.r * 2) + 'px')
      .style('border-radius', (d) => d.r + 'px')
      .style('-webkit-mask-image', '-webkit-radial-gradient(circle, white 100%, black 100%)')
      .style('position', 'relative')

  video = div
      .append('xhtml:iframe')
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .attr('src', (d) => d.data.src)
      .attr('id', (d) => d.data.playerID)
      .attr('frameborder', 0)
      .style('width', (d) => (d.r * 2) + 'px')
      .style('height', (d) => (d.r * 2) + 'px')
      .style('position', 'absolute');

  //position circle below video bubble to handle mouse events
  circle = g.append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .on('mouseenter', handleMouseEnter)
      .on('mouseleave', handleMouseLeave);
}

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let playerName;
let playerArr = [];
let count=1
let videoElement;

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
   //if statement here checking data pertinent to size of circle. If it's smaller(circle is smaller),
   //then less playback quality
  videoElement = document.getElementById('player'+count)
  console.log(videoElement.height)

   if(videoElement.height<=100){
       console.log(event.target)
       event.target.setPlaybackQuality('small').playVideo().mute();
   }else if(videoElement.height>100&&videoElement.height<=200){
       event.target.setPlaybackQuality('medium').playVideo().mute();
       }else{
   event.target.setPlaybackQuality('large').playVideo().mute();
   }
   count++;
}


function handleMouseEnter(d, i) {
  console.log('enter')
   playerArr[i].unMute()

}

function handleMouseLeave(d, i) {
  console.log('leave')
   playerArr[i].mute()
}
