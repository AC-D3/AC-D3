//multiple video types:
let data1 = {
    "children": [
      {
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU?enablejsapi=1',
        "scalingParameter": 21097531,
        "v_id": "22",
        "type": "youtube"
    },
    {
        "src": "https://player.vimeo.com/video/12868296?autopause=0",
        "scalingParameter": 1507944,
        "v_id": "4",
        "type": "vimeo"
    },
    {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns?enablejsapi=1",
        "scalingParameter": 177639,
        "v_id": "2",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/nsrOCzUwcjE?enablejsapi=1",
        "scalingParameter": 1073553,
        "v_id": "3",
        "type": "youtube"
    },
    {
        "src": "https://player.vimeo.com/video/12788201?autopause=0",
        "scalingParameter": 26112988,
        "v_id": "5",
        "type": "vimeo"
    }, {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 1507944,
        "v_id": "6",
        "type": "video"
    }]
}

//demo trailer data:
let data2 = {
    "children": [{
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU?enablejsapi=1',
        "scalingParameter": 21097531,
        "v_id": "22",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/XI4Na5JW1ns?enablejsapi=1",
        "scalingParameter": 177639,
        "v_id": "2",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/nsrOCzUwcjE?enablejsapi=1",
        "scalingParameter": 1073553,
        "v_id": "3",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/GjwfqXTebIY?enablejsapi=1",
        "scalingParameter": 13652523,
        "v_id": "4",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/JDcAlo8i2y8?enablejsapi=1",
        "scalingParameter": 4289574,
        "v_id": "5",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/6Vtf0MszgP8?enablejsapi=1",
        "scalingParameter": 7972246,
        "v_id": "6",
        "type": "youtube"
    },
    {
        "src": "https://www.youtube.com/embed/39udgGPyYMg?enablejsapi=1",
        "scalingParameter": 7424591,
        "v_id": "7",
        "type": "youtube"
    },
    {
        "src": "https://www.youtube.com/embed/cPeqNTqZNN0?enablejsapi=1",
        "scalingParameter": 3495856,
        "v_id": "8",
        "type": "youtube"
    },
    {
        "src": "https://www.youtube.com/embed/1xv_FeBGzfk?enablejsapi=1",
        "scalingParameter": 6522727,
        "v_id": "9",
        "type": "youtube"
    },
    {
        "src": "https://www.youtube.com/embed/euz-KBBfAAo?enablejsapi=1",
        "scalingParameter": 19562920,
        "v_id": "10",
        "type": "youtube"
    }]
}

const config = {
  htmlAnchorID: 'vis',
  diameter: 600,
  zoom: 2,
  unmuteOnHover: true,
  shape: 'circle'
}

acd3.drawBubbleChart(data1, config);
