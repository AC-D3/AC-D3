//multiple video types:
let data1 = [
        {
        "src": 'https://www.youtube.com/embed/nsrOCzUwcjE',
        "scalingParameter": 21097531,
        "v_id": "1",
        "type": "youtube"
    }, {
        "src": "https://player.vimeo.com/video/12868296",
        "scalingParameter": 1507944,
        "v_id": "4",
        "type": "vimeo"
    }, {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns",
        "scalingParameter": 177639,
        "v_id": "2",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/F-eMt3SrfFU",
        "scalingParameter": 1073553,
        "v_id": "3",
        "type": "youtube"
    }, {
        "src": "https://player.vimeo.com/video/12788201",
        "scalingParameter": 26112988,
        "v_id": "5",
        "type": "vimeo"
    }, {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 1507944,
        "v_id": "6",
        "type": "video"
    }
]

//demo trailer data:
let data2 = [{
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU',
        "scalingParameter": 21097531,
        "v_id": "22",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns",
        "scalingParameter": 177639,
        "v_id": "2",
        "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/nsrOCzUwcjE",
    //     "scalingParameter": 1073553,
    //     "v_id": "3",
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/GjwfqXTebIY",
    //     "scalingParameter": 13652523,
    //     "v_id": "4",
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/JDcAlo8i2y8",
    //     "scalingParameter": 4289574,
    //     "v_id": "5",
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/6Vtf0MszgP8",
    //     "scalingParameter": 7972246,
    //     "v_id": "6",
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/39udgGPyYMg",
    //     "scalingParameter": 7424591,
    //     "v_id": "7",
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    //     "scalingParameter": 3495856,
    //     "v_id": "8",
    //     "type": "youtube"

    // }, {
    //     "src": "https://www.youtube.com/embed/1xv_FeBGzfk",
    //     "scalingParameter": 6522727,
    //     "v_id": "9",
    //     "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/euz-KBBfAAo",
        "scalingParameter": 19562920,
        "v_id": "10",
        "type": "youtube"
    }]

const config1 = {
  htmlAnchorID: 'vis1',
  diameter: 600,
  zoom: 2,
  unmuteOnHover: true,
  shape: 'circle'
}

const config2 = {
  htmlAnchorID: 'vis2',
  diameter: 600,
  zoom: 2,
  resolutionThresholds: [250, 500]
}

const randomChart = new acd3(data2, config2);
randomChart.createBubbleChart();

// const trailerChart = new acd3(data2, config2);
// trailerChart.createBubbleChart();
