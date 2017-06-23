// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
      console.log($(this));
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $(".navbar-collapse").collapse('hide');
});

////////////////////////////////////////////////////////////////////////
//////////////////// DEMO VISUALIZATIONS //////////////////////////////
///////////////////////////////////////////////////////////////////////

let data1 = [{
        "src": "https://www.youtube.com/embed/39udgGPyYMg",
        "scalingParameter": 7424591,
        "v_id": "7",
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
        "scalingParameter": 3495856,
        "v_id": "8",
        "type": "youtube"
    }]

let data2 = [{
        "src": "https://player.vimeo.com/video/12788201",
        "scalingParameter": 26112988,
        "v_id": 3,
        "type": "vimeo"
    }, {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 1507944,
        "v_id": 4,
        "type": "video"
    }]

const youtubeTrailers = [{
        "src": 'https://www.youtube.com/embed/F-eMt3SrfFU',
        "scalingParameter": 21097531,
        "v_id": 1,
        "type": "youtube"
    },
    // {
    //     "src": "https://www.youtube.com/embed/XI4Na5JW1ns",
    //     "scalingParameter": 177639,
    //     "v_id": 2,
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/nsrOCzUwcjE",
    //     "scalingParameter": 1073553,
    //     "v_id": 3,
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/GjwfqXTebIY",
    //     "scalingParameter": 13652523,
    //     "v_id": 4,
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/JDcAlo8i2y8",
    //     "scalingParameter": 4289574,
    //     "v_id": 5,
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/6Vtf0MszgP8",
    //     "scalingParameter": 7972246,
    //     "v_id": 6,
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/39udgGPyYMg",
    //     "scalingParameter": 7424591,
    //     "v_id": 7,
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    //     "scalingParameter": 3495856,
    //     "v_id": 8,
    //     "type": "youtube"
    // }, {
    //     "src": "https://www.youtube.com/embed/1xv_FeBGzfk",
    //     "scalingParameter": 6522727,
    //     "v_id": 9,
    //     "type": "youtube"
    // },
    {
        "src": "https://www.youtube.com/embed/euz-KBBfAAo",
        "scalingParameter": 19562920,
        "v_id": 10,
        "type": "youtube"
    }]

const vimeoBestOf2016 = [{
        "src": "https://player.vimeo.com/video/167054481",
        "scalingParameter": 1,
        "v_id": 11,
        "type": "vimeo"
    },
    // {
    //     "src": "https://player.vimeo.com/video/173524321",
    //     "scalingParameter": 2,
    //     "v_id": 12,
    //     "type": "vimeo"
    // },
    // {
    //     "src": "https://player.vimeo.com/video/179936903",
    //     "scalingParameter": 3,
    //     "v_id": 13,
    //     "type": "vimeo"
    // },
    // {
    //     "src": "https://player.vimeo.com/video/185717440",
    //     "scalingParameter": 4,
    //     "v_id": 14,
    //     "type": "vimeo"
    // },
    // {
    //     "src": "https://player.vimeo.com/video/166807261",
    //     "scalingParameter": 5,
    //     "v_id": 15,
    //     "type": "vimeo"
    // },
    // {
    //     "src": "https://player.vimeo.com/video/169599296",
    //     "scalingParameter": 6,
    //     "v_id": 16,
    //     "type": "vimeo"
    // },
    // {
    //     "src": "https://player.vimeo.com/video/183252171",
    //     "scalingParameter": 7,
    //     "v_id": 17,
    //     "type": "vimeo"
    // },
    // {
    //     "src": "https://player.vimeo.com/video/175629655",
    //     "scalingParameter": 8,
    //     "v_id": 18,
    //     "type": "vimeo"
    // },
    // {
    //     "src": "https://player.vimeo.com/video/172431736",
    //     "scalingParameter": 9,
    //     "v_id": 19,
    //     "type": "vimeo"
    // },
    {
        "src": "https://player.vimeo.com/video/193391700",
        "scalingParameter": 10,
        "v_id": 20,
        "type": "vimeo"
    }]

const config1 = {
  htmlAnchorID: 'vis1',
  diameter: 700,
  zoom: 2.5,
  resolutionThresholds: [250, 500],
  autoplay: true,
  loop: true
}

const config2 = {
  htmlAnchorID: 'vis2',
  diameter: 700,
  zoom: 2.5,
  resolutionThresholds: [250, 500],
  autoplay: true,
  loop: true
}

const vis1 = new acd3(data1, config1);
const vis2 = new acd3(youtubeTrailers, config2);
// vis1.createBubbleChart();
// vis2.createBubbleChart();

$('#vis1-placeholder').on('click', () => {
  $('#vis1-placeholder').remove();
  vis1.createBubbleChart();
});

$('#vis2-placeholder').on('click', () => {
  $('#vis2-placeholder').remove();
  vis2.createBubbleChart();
});


$('.play').on('click', () => {
  console.log('works')
  // if($('#vis2-placeholder')) $('#vis2-placeholder').remove();
  // vis2.playAll();
});

$('.pause').on('click', () => {
  console.log('works')
  // if($('#vis2-placeholder')) $('#vis2-placeholder').remove();
  // vis2.pauseAll();
});
