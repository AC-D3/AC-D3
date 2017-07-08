![N|Solid](https://cldup.com/T1GZ3rpADs.jpg)


AC-D3 is a Javascript Library for building Audiovisual Charts in D3.

  - Build predefined visualizations
  - Use AC-D3 methods to add audiovisual elements to your D3 visualization

![N|Solid](https://media.giphy.com/media/xUOrw4gNfvx4k0rAhG/giphy.gif)
![N|Solid](https://media.giphy.com/media/xUOrwfCu58HtK1R2HC/giphy.gif)



### Installation
***
```sh
$ npm install ac-d3 --save
```

### Using AC-D3
***
##### HTML
1) Create div with specific ID (Used in config object later)
```html
<div id='vis1'></div>
```
2) Add script tag
```html
<script type="text/javascript" src="https://d3js.org/d3.v4.min.js"></script>
```


##### Javascript
1) Require in library
```javascript
const acd3 = require('ac-d3');
```
2) Create data array
###### Bubble Chart:

| Key | Value datatype | Note |
| :-- | :-- | :-- |
| src | string | Accepts paths to HTML5 <video> supported file types and Vimeo and YouTube embedded URL links. |
| scalingParameter | number | Used to determine the relative size of each bubble. |
| v_id | string | Must be unique for each video. |
| type | string | Either 'video' (for direct URL path), 'vimeo', or 'youtube'. |
```javascript
const bubbleChartData = [
      {
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU',
        "scalingParameter": 36,
        "v_id": "vid1",
        "type": "youtube"
    },
    {
        "src": "https://player.vimeo.com/video/12868296",
        "scalingParameter": 12,
        "v_id": "vid2",
        "type": "vimeo"
    },
    {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 24,
        "v_id": "vid3",
        "type": "video"
    }]
```
###### Bubble Scatter Chart:

| Key | Value datatype | Note |
| :-- | :-- | :-- |
| src | string | Accepts paths to HTML5 <video> supported file types and Vimeo and YouTube embedded URL links. |
| v_id | string | Must be unique for each video. |
| type | string | Either 'video' (for direct URL path), 'vimeo', or 'youtube'. |
| x | number or date string | Used to determine the x position of the center of bubble. |
| y | number or date string | Used to determine the y position of the center of bubble. |
| r | number or date string | Used to determine the relative size of each bubble. |
```javascript
const bubbleScatterChartData = [
      {
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU',
        "v_id": "vid4",
        "type": "youtube",
        "x": "18-Dec-09",
        "y": 425000000,
        "r": 2783918982
    },
    {
        "src": "https://player.vimeo.com/video/12868296",
        "v_id": "vid5",
        "type": "vimeo",
        "x": "24-May-07",
        "y": 306000000,
        "r": 2058662225
    },
    {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "v_id": "vid6",
        "type": "video",
        "x": "6-Nov-15",
        "y": 425000000,
        "r": 2783918982
    }]
```
3) Create config object
###### Bubble Chart Config Options:
| Key | Value datatype | Note |
| :-- | :-- | :-- |
| chartType | string | Type of chart to create (current options are 'bubble' and 'bubbleScatter') |
| htmlAnchorID | string | ID of the div where AC-D3 will append the visualization |
| diameter | number | Overall diameter of the visualization in pixels |
| zoom | number | Zoom level of each of the videos |
| resolutionThresholds | array | This sets the bounds for which video resolution to use depending on height of the video (in pixels) |
| autoplay | boolean | This specifies whether the videos will begin playing automatically or not |
| loop | boolean | This specifies whether videos will start over again, every time it is finished |
| onDoubleClick | string | This specifies which event handler to invoke on dblclick (current options are 'openNewWindow', a function that opens the video in a new window, and 'expandBubble', a function that expands the size of the bubbe to fill the entire visualization) |

```javascript
const bubbleConfig = {
  chartType: 'bubble',
  htmlAnchorID: 'vis1',
  diameter: 600,
  zoom: 1.5,
  resolutionThresholds: [250, 500],
  autoplay: false,
  loop: false,
  onDoubleClick: 'expandBubble'
}
```
###### Bubble Scatter Chart Config Options:
| Key | Value datatype | Note |
| :-- | :-- | :-- |
| chartType | string | Type of chart to create (current options are 'bubble' and 'bubbleScatter') |
| htmlAnchorID | string | ID of the div where AC-D3 will append the visualization |
| height | number | Overall height of the visualization in pixels |
| width | number | Overall width of the visualization in pixels|
| zoom | number | Zoom level of each of the videos |
| resolutionThresholds | array | This sets the bounds for which video resolution to use depending on height of the video (in pixels) |
| autoplay | boolean | This specifies whether the videos will begin playing automatically or not |
| loop | boolean | This specifies whether videos will start over again, every time it is finished |
| onDoubleClick | string | This specifies which event handler to invoke on dblclick (current options are 'openNewWindow', a function that opens the video in a new window, and 'expandBubble', a function that expands the size of the bubbe to fill the entire visualization) |
| dateFormat | string | This specifies the date format used |
| xIsDate | boolean | This specifies whether the data for the x position is a date |
| yIsDate | boolean | This specifies whether the data for the y position is a date |
| rIsDate | boolean | This specifies whether the data for the r dimension is a date |
| plottableAreaMargin | object | See example and diagram below |
| plottableAreaPadding | object | See example and diagram below |
| rLimits | object | See example and diagram below |

```javascript
const bubbleScatterConfig = {
  chartType: 'bubbleScatter',
  htmlAnchorID: 'vis2',
  height: 600,
  height: 900,
  zoom: 1.5,
  resolutionThresholds: [250, 500],
  autoplay: false,
  loop: false,
  onDoubleClick: 'openNewWindow',
  dateFormat: '%d-%b-%y',
  xIsDate: true,
  yIsDate: false,
  rIsDate: false,
  plottableAreaMargin: { top: 0, right: 0, bottom: 30, left: 65 },
  plottableAreaPadding: { top: 120, right: 100, bottom: 80, left: 60 },
  rLimits: { lower: 20, upper: 120 }
}
```
![N|Solid](https://cldup.com/8xZwIdimrY.jpg)
4) Create a new chart instance and invoke the createBubbleChart or createBubbleScatterChart method
```javascript
const chart1 = new acd3(data, config);
chart1.createBubbleChart();
const chart2 = new acd3(data, config);
chart2.createBubbleScatterChart();
```
