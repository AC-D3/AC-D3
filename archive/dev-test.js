//multiple video types:
let data1 = [
    {
        "src": "https://player.vimeo.com/video/12868296",
        "scalingParameter": 1507944,
        "v_id": 1,
        "type": "vimeo"
    }, {
        "src": "https://www.youtube.com/embed/F-eMt3SrfFU",
        "scalingParameter": 1073553,
        "v_id": 2,
        "type": "youtube"
    }, {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 1507944,
        "v_id": 3,
        "type": "video"
    }
]

//demo trailer data:
let data2 = [
    {
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU',
        "scalingParameter": 21097531,
        "v_id": 11,
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns",
        "scalingParameter": 177639,
        "v_id": 12,
        "type": "youtube"
    }, {
        "src": "https://player.vimeo.com/video/12868296",
        "scalingParameter": 1507944,
        "v_id": 13,
        "type": "vimeo"
    }, {
        "src": "https://www.youtube.com/embed/5PSNL1qE6VY",
        "scalingParameter": 4223586,
        "v_id": 14,
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/gAUxw4umkdY",
        "scalingParameter": 3417742,
        "v_id": 15,
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/HKSZtp_OGHY",
        "scalingParameter": 882350,
        "v_id": 16,
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/7GqClqvlObY",
        "scalingParameter": 14084581,
        "v_id": 17,
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/GokKUqLcvD8",
        "scalingParameter": 35670361,
        "v_id": 18,
        "type": "youtube"
    }
]

const config1 = {
    htmlAnchorID: 'vis1',
    diameter: 600,
    zoom: 2,
    resolutionThresholds: [250, 500]
}

const config2 = {
    htmlAnchorID: 'vis2',
    diameter: 600,
    zoom: 2,
    resolutionThresholds: [250, 500]
}

const randomChart = new acd3(data1, config1);
randomChart.createBubbleChart();

const trailerChart = new acd3(data2, config2);
trailerChart.createBubbleChart();
