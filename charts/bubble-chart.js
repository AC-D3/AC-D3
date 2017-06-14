

let data = {
    "children": [{
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "views": 2
    }, {
        "src": "http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-85.mp4",
        "views": 2
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/f/f9/STS-132_Liftoff_Space_Shuttle_Atlantis.ogv",
        "views": 1
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/0/04/Play_fight_of_polar_bears_edit_1.ogv",
        "views": 2
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Enallagma_cyathigerum_2.ogv",
        "views": 3
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        "views": 1
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        "views": 1
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        "views": 1
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        "views": 1
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        "views": 1
    }, {
        "src": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sarychev_Peak_eruption_on_12_June_2009%2C_oblique_satellite_view.ogv",
        "views": 1
    }]
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

const video = foreignObject.append('xhtml:video')
    .attr('src', (d) => d.data.src)
    .property('volume', '0.0')
    .attr('autoplay', '')
    .attr('loop', '')
    .attr('width', (d) => d.r * 2)
    .attr('height', (d) => d.r * 2)
    .attr('id', (d, i) => i)
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
    let video = document.getElementById(i);
    video.volume = 1

    //youtube API method
    // youtubePlayer.unMute()

    //vimeo API method
    // vimeoPlayer.setVolume(1)
}

function handleMouseLeave(d, i) {
    console.log('leave')
    let video = document.getElementById(i);
    video.volume = 0
    //youtube API method
    // youtubePlayer.mute()

    //vimeo API method
    // vimeoPlayer.setVolume(0)

}
