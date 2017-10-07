const data = [
  {

    "src": "https://player.vimeo.com/video/12788201",
    "scalingParameter": 7424591,
    "type": "vimeo"
  },
  {
    "src": "https://www.youtube.com/embed/39udgGPyYMg",
    "scalingParameter": 3495856,
    "type": "youtube"
  }
]

const config = {
  chartType: 'bubble',
  htmlAnchorID: 'vis1',
  diameter: window.innerWidth <= 640 ? 350 : 600,
  zoom: 2.5,
  resolutionThresholds: [250, 500],
  autoplay: false,
  loop: false,
  onDoubleClick: 'expandBubble'
}

const data2 = [
  {

    "src": "https://www.youtube.com/embed/39udgGPyYMg",
    "scalingParameter": 7424591,
    "v_id": "77",
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    "scalingParameter": 3495856,
    "v_id": "88",
    "type": "youtube"
  }
]

const config2 = {
  chartType: 'bubble',
  htmlAnchorID: 'vis2',
  diameter: window.innerWidth <= 640 ? 350 : 600,
  zoom: 2.5,
  resolutionThresholds: [250, 500],
  autoplay: false,
  loop: false,
  onDoubleClick: 'expandBubble'
}

const bubbleChart = new BubbleChart(data, config);
bubbleChart.init();

const bubbleChart2 = new BubbleChart(data2, config2);
bubbleChart2.init();
