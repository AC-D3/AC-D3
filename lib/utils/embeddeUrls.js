const urlUtils {
  
  getEmbeddedURL: function(inputString, type) {
    /*
    type can be
    youtube
    vimeo
    video

    inputString can be
    embedded video link          --> https://www.youtube.com/embed/39udgGPyYMg
    non-embedded video link      --> https://www.youtube.com/watch?v=39udgGPyYMg
    video ID                     --> 39udgGPyYMg
    inputString can be from sources
    youtube                      --> https://www.youtube.com/embed/39udgGPyYMg
    vimeo                        --> https://player.vimeo.com/video/12788201
    direct link to video         --> http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv

    function returns
    for youtube and vimeo        ==> embedded video link
    for direct links to videos   ==> returns same link
    */

    const youtubeEmbeddedURLBase = 'https://www.youtube.com/embed/';
    const vimeoEmbeddedURLBase = 'https://player.vimeo.com/video/';

    if (type === 'video') {
      return inputString;
    } else if (type === 'youtube') {
      if (!inputString.includes('/')) {
        // handle if video ID is passed as input string
        return youtubeEmbeddedURLBase + inputString;
      } else if (inputString.includes('embed')) {
        // handle if embedded video url is passed as input string
        return inputString;
      } else if (inputString.includes('watch')) {
        // handle if non-embedded video url is passed as input string
        let arr = inputString.split('=');
        return youtubeEmbeddedURLBase + arr[arr.length - 1]
      }
    } else if (type === 'vimeo') {
      if (!inputString.includes('/')) {
        // handle if video ID is passed as input string
        return vimeoEmbeddedURLBase + inputString;
      } else if (inputString.includes('player')) {
        // handle if embedded video url is passed as input string
        return inputString;
      } else if (inputString.includes('https://vimeo.com/')) {
        // handle if non-embedded video url is passed as input string
        let arr = inputString.split('/');
        return vimeoEmbeddedURLBase + arr[arr.length - 1]
      }
    }
  },

  getNonEmbeddedURL: function(inputString, type) {
    const youtubeNonEmbeddedURLBase = 'https://www.youtube.com/watch?v=';
    const vimeoNonEmbeddedURLBase = 'https://vimeo.com/';

    if (type === 'video') {
      return inputString;
    } else if (type === 'youtube') {
      if (!inputString.includes('/')) {
        // handle if video ID is passed as input string
        return youtubeNonEmbeddedURLBase + inputString;
      } else if (inputString.includes('embed')) {
        // handle if embedded video url is passed as input string
        let arr = inputString.split('/');
        return youtubeNonEmbeddedURLBase + arr[arr.length - 1]
      } else if (inputString.includes('watch')) {
        // handle if non-embedded video url is passed as input string
        return inputString;
      }
    } else if (type === 'vimeo') {
      if (!inputString.includes('/')) {
        // handle if video ID is passed as input string
        return vimeoNonEmbeddedURLBase + inputString;
      } else if (inputString.includes('player')) {
        // handle if embedded video url is passed as input string
        let arr = inputString.split('/');
        return vimeoNonEmbeddedURLBase + arr[arr.length - 1]
      } else if (inputString.includes('https://vimeo.com/')) {
        // handle if non-embedded video url is passed as input string
        return inputString;
      }
    }
  }

}
