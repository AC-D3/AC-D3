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
To include a complete visualization to your site, you need to feed a data object and a config object into the ac-d3 library.
```javascript
const acd3 = require('acd3');
const data = {
    "children": [
      {
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU?enablejsapi=1',
        "scalingParameter": 36,
        "v_id": "1",
        "type": "youtube"
    },
    {
        "src": "https://player.vimeo.com/video/12868296?autopause=0",
        "scalingParameter": 12,
        "v_id": "4",
        "type": "vimeo"
    },
    {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 24,
        "v_id": "6",
        "type": "video"
    }]
}

const config = {
  htmlAnchorID: 'vis',
  diameter: 600,
  zoom: 2,
  unmuteOnHover: true,
  shape: 'circle'
}

acd3.drawBubble(data, config);
```

#### For existing visualizations

