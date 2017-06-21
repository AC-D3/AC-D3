[![N|Solid](https://cldup.com/RjTksBwPWq.jpg)](https://nodesource.com/products/nsolid)

AC-D3 is a Javascript Library for building Audiovisual Charts in D3.

  - Build predefined visualizations
  - Use AC-D3 methods to add audiovisual elements to your D3 visualization
 

### Installation
***
```sh
$ npm install ac-d3 --save
```

### Using AC-D3
***
#### Pre-built visualizations

##### HTML
1. Create div with specific ID (Used in config object later)
```html
<div id='vis'></div>
```
2. Add script tags
```html
<script type="text/javascript" src="https://www.youtube.com/iframe_api"></script>
<script type="text/javascript" src="https://player.vimeo.com/api/player.js"></script>
<script type="text/javascript" src="https://d3js.org/d3.v4.min.js"></script>
```


##### Javascript
1. Require in library
```javascript
const acd3 = require('ac-d3');
```
2. Create data object

| Key | Value datatype | Note |
| :-- | :-- | :-- |
| src | string | Accepts paths to HTML5 <video> supported file types and vimeo and youtube embedded url links. |
| scalingParameter | number | Used to determine the relative size of each bubble. |
| v_id | string | Must be unique for each video. Can't be a string of a number ('21'). | 
| type | string | Either 'video' (for direct URL path), 'vimeo', or 'youtube'. |
```javascript
const data = {
    "children": [
      {
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU?enablejsapi=1',
        "scalingParameter": 36,
        "v_id": "vid1",
        "type": "youtube"
    },
    {
        "src": "https://player.vimeo.com/video/12868296?autopause=0",
        "scalingParameter": 12,
        "v_id": "vid4",
        "type": "vimeo"
    },
    {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 24,
        "v_id": "vid6",
        "type": "video"
    }]
}
```
3. Create config object

| Key | Value datatype | Note |
| :-- | :-- | :-- |
| htmlAnchorID | string | ID of the div where AC-D3 will append the visualization |
| diameter | number | Overall diameter of the visualization |
| zoom | number | Zoom level of each of the videos |
| resolutionThresholds | array | This sets the bounds for which video resolution to use depending on height of the video (in pixels) |

```javascript
const config = {
  htmlAnchorID: 'vis',
  diameter: 600,
  zoom: 1.5,
  resolutionThresholds: [250, 500],
}
```
4. Create a new chart instance and invode the createBubbleChart method
```javascript
const randomChart = new acd3(data, config);
randomChart.createBubbleChart();
```

#### For existing visualizations

Coming soon...
