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
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        console.log($(this));
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
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
    }, {
        "src": "https://www.youtube.com/embed/1xv_FeBGzfk",
        "scalingParameter": 3495856,
        "v_id": 9,
        "type": "youtube"
    }, {
        "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
        "scalingParameter": 3495856,
        "v_id": 8,
        "type": "youtube"
    }]

const youtubeTrailers = [{
    "src": 'https://www.youtube.com/embed/F-eMt3SrfFU',
    "scalingParameter": 21097531,
    "v_id": 1,
    "type": "youtube"
},
{
    "src": "https://www.youtube.com/embed/XI4Na5JW1ns",
    "scalingParameter": 177639,
    "v_id": 2,
    "type": "youtube"
}, {
    "src": "https://www.youtube.com/embed/nsrOCzUwcjE",
    "scalingParameter": 1073553,
    "v_id": 3,
    "type": "youtube"
}, {
    "src": "https://www.youtube.com/embed/GjwfqXTebIY",
    "scalingParameter": 13652523,
    "v_id": 4,
    "type": "youtube"
}, {
    "src": "https://www.youtube.com/embed/JDcAlo8i2y8",
    "scalingParameter": 4289574,
    "v_id": 5,
    "type": "youtube"
}, {
    "src": "https://www.youtube.com/embed/6Vtf0MszgP8",
    "scalingParameter": 7972246,
    "v_id": 6,
    "type": "youtube"
}, {
    "src": "https://www.youtube.com/embed/39udgGPyYMg",
    "scalingParameter": 7424591,
    "v_id": 7,
    "type": "youtube"
}, {
    "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    "scalingParameter": 3495856,
    "v_id": 8,
    "type": "youtube"
}, {
    "src": "https://www.youtube.com/embed/1xv_FeBGzfk",
    "scalingParameter": 6522727,
    "v_id": 9,
    "type": "youtube"
},
{
    "src": "https://www.youtube.com/embed/euz-KBBfAAo",
    "scalingParameter": 19562920,
    "v_id": 10,
    "type": "youtube"
}]

const vimeoBestOf2016 = [
  {
        "src": "https://player.vimeo.com/video/167054481",
        "scalingParameter": 1,
        "v_id": 11,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/173524321",
        "scalingParameter": 2,
        "v_id": 12,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/179936903",
        "scalingParameter": 3,
        "v_id": 13,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/185717440",
        "scalingParameter": 4,
        "v_id": 14,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/166807261",
        "scalingParameter": 5,
        "v_id": 15,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/169599296",
        "scalingParameter": 6,
        "v_id": 16,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/183252171",
        "scalingParameter": 7,
        "v_id": 17,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/175629655",
        "scalingParameter": 8,
        "v_id": 18,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/172431736",
        "scalingParameter": 9,
        "v_id": 19,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/193391700",
        "scalingParameter": 10,
        "v_id": 20,
        "type": "vimeo"
    }]

let scatterData1 = [{
    "src": "https://player.vimeo.com/video/12788201",
    "v_id": 3,
    "type": "vimeo",
    'x': '18-Dec-09',
    'y': 34983948,
    "r": 46112988
}, {
    "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
    "v_id": 4,
    "type": "video",
    'x': '18-Dec-11',
    'y': 53849833,
    "r": 26112988
}, {
    "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    "v_id": 9,
    "type": "youtube",
    'x': '19-Dec-10',
    'y': 93948576,
    "r": 86112988
}]




let scatterData2 = [{
    x: '18-Dec-09',
    y: 34983948,
    r: 26112988,
    data: {
        "src": "https://player.vimeo.com/video/12788201",
        "v_id": 3,
        "type": "vimeo"
    }
}]

let scatterData3 =
    [
        {
            "productionBudgetRank": 1,
            "wordlwideGrossRank": 1,
            "v_id": 19,
            "type": "youtube",
            "movieName": "Avatar",
            "src": "https://www.youtube.com/embed/5PSNL1qE6VY",
            "x": "18-Dec-09",
            "y": 425000000,
            "r": 2783918982
        },
        {
            "productionBudgetRank": 2,
            "wordlwideGrossRank": 2,
            "v_id": 20,
            "type": "youtube",
            "movieName": "Star Wars: The Force Awakens Official Trailer ",
            "src": "https://www.youtube.com/embed/gAUxw4umkdY",
            "x": "18-Dec-15",
            "y": 306000000,
            "r": 2058662225
        },
        {
            "productionBudgetRank": 3,
            "wordlwideGrossRank": 5,
            "v_id": 21,
            "type": "youtube",
            "movieName": "Pirates of the Caribbean: At World's End",
            "src": "https://www.youtube.com/embed/HKSZtp_OGHY",
            "x": "24-May-07",
            "y": 300000000,
            "r": 963420425
        },
        {
            "productionBudgetRank": 4,
            "wordlwideGrossRank": 7,
            "v_id": 22,
            "type": "youtube",
            "movieName": "Spectre",
            "src": "https://www.youtube.com/embed/7GqClqvlObY",
            "x": "6-Nov-15",
            "y": 300000000,
            "r": 879620923
        },
        {
            "productionBudgetRank": 5,
            "wordlwideGrossRank": 4,
            "v_id": 23,
            "type": "youtube",
            "movieName": "The Dark Knight Rises",
            "src": "https://www.youtube.com/embed/GokKUqLcvD8",
            "x": "20-Jul-12",
            "y": 275000000,
            "r": 1084439099
        },
        {
            "productionBudgetRank": 7,
            "wordlwideGrossRank": 9,
            "v_id": 24,
            "type": "youtube",
            "movieName": "John Carter",
            "src": "https://www.youtube.com/embed/nlvYKl1fjBI",
            "x": "9-Mar-12",
            "y": 275000000,
            "r": 282778100
        },
        {
            "productionBudgetRank": 6,
            "wordlwideGrossRank": 10,
            "v_id": 25,
            "type": "youtube",
            "movieName": "The Lone Ranger",
            "src": "https://www.youtube.com/embed/JjFsNSoDZK8",
            "x": "2-Jul-13",
            "y": 275000000,
            "r": 260002115
        },
        {
            "productionBudgetRank": 8,
            "wordlwideGrossRank": 8,
            "v_id": 26,
            "type": "youtube",
            "movieName": "Tangled",
            "src": "https://www.youtube.com/embed/2f516ZLyC6U",
            "x": "24-Nov-10",
            "y": 260000000,
            "r": 586581936
        },
        {
            "productionBudgetRank": 9,
            "wordlwideGrossRank": 6,
            "v_id": 27,
            "type": "youtube",
            "movieName": "Spider-Man 3",
            "src": "https://www.youtube.com/embed/MTIP-Ih_GR0",
            "x": "4-May-07",
            "y": 258000000,
            "r": 890875303
        },
        {
            "productionBudgetRank": 10,
            "wordlwideGrossRank": 3,
            "v_id": 28,
            "type": "youtube",
            "movieName": "Avengers: Age of Ultron",
            "src": "https://www.youtube.com/embed/tmeOjFno6Do",
            "x": "5-Jan-15",
            "y": 250000000,
            "r": 1404705868
        }
    ]

const bubbleConfig = {
  chartType: 'bubble',
  htmlAnchorID: 'vis1',
  diameter: 650,
  zoom: 2.5,
  resolutionThresholds: [250, 500],
  autoplay: false,
  loop: false
}

const scatterConfig = {
    chartType: 'bubbleScatter',
    htmlAnchorID: 'Vis2',
    zoom: 2.5,
    resolutionThresholds: [250, 500],
    autoplay: false,
    loop: false,
    dateFormat: '%d-%b-%y',
    xIsDate: true,
    yIsDate: false,
    rIsDate: false,
    height: 600,
    width: 900,
    plottableAreaMargin: { top: 0, right: 0, bottom: 30, left: 65 },
    plottableAreaPadding: { top: 120, right: 100, bottom: 80, left: 60 },
    rLimits: { lower: 20, upper: 120 }
}

const vis1 = new acd3(data1, bubbleConfig);
const vis2 = new acd3(scatterData3, scatterConfig);

vis1.createBubbleChart();
vis2.createBubbleScatterChart();

//playAll/pauseAll buttons:
$('#play-vis1').on('click', () => vis1.playAll());
$('#pause-vis1').on('click', () => vis1.pauseAll());
$('#play-vis2').on('click', () => vis2.playAll());
$('#pause-vis2').on('click', () => vis2.pauseAll());

//dataset buttons
//vis1-data1:
$('#vis1-data1').on('click', () => {
  $('#vis1-title').text('Vimeo Presents: The Top Videos of 2016');
  $('.bubble-chart').remove();
  vis1 = new acd3(data2, bubbleConfig);
  vis1.createBubbleChart();
});

//vis1-data1:
$('#vis1-data2').on('click', () => {
  $('#vis1-title').text('Most Anticipated YouTube Summer Movie Trailers');
  $('.bubble-chart').remove();
  vis1 = new acd3(youtubeTrailers, bubbleConfig);
  vis1.createBubbleChart();
});

//vis1-data2:
$('#vis1-data3').on('click', () => {
  $('#vis1-title').text('Dummy Text Here');
  $('.bubble-chart').remove();
  vis1 = new acd3(data1, bubbleConfig);
  vis1.createBubbleChart();
});


// $('#vis1-data2').on('click', () => );
// $('#vis1-data3').on('click', () => );
//
// $('#vis2-data1').on('click', () => );
// $('#vis2-data2').on('click', () => );
// $('#vis2-data3').on('click', () => );

$('.demo').on('click', () => {
  $(this).addClass('toggled');
  $('.demo').removeClass('toggled');
});
