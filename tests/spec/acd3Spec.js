const data1 = [
  {

    "src": "https://www.youtube.com/embed/39udgGPyYMg",
    "scalingParameter": 7424591,
    "v_id": "7",
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    "scalingParameter": 3495856,
    "v_id": "8",
    "type": "youtube"
  }
]

const bubbleConfig = {
  chartType: 'bubble',
  htmlAnchorID: 'vis1',
  diameter: window.innerWidth <= 640 ? 350 : 600,
  zoom: 2.5,
  resolutionThresholds: [250, 500],
  autoplay: false,
  loop: false,
  onDoubleClick: 'expandBubble'
}

const vis = new acd3(data1, bubbleConfig);

describe('Bubble Chart Tests', function () {

  beforeAll(function() {
    vis.createBubbleChart();
  });

  afterAll(function() {
    d3.selectAll('svg').remove();
  });

  describe('the bubble chart', function() {

    it('should be created', function () {
      expect(document.querySelector('.bubble-chart')).not.toBe(null);
    });

    it('should have the correct height', function() {
      expect(document.querySelector('.bubble-chart').getAttribute('height')).toBe('600');
    });

    it('should have the correct width', function() {
      expect(document.querySelector('.bubble-chart').getAttribute('width')).toBe('600');
    });

    it('should have the correct number of bubbles', function() {
      expect(document.querySelector('.bubble-chart').childElementCount).toBe(data1.length);
    });

  });

});
