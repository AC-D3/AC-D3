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

const bubbleConfig = {
  chartType: 'bubble',
  htmlAnchorID: 'vis1',
  diameter: window.innerWidth <= 640 ? 350 : 650,
  zoom: 2.5,
  resolutionThresholds: [250, 500],
  autoplay: false,
  loop: false,
  onDoubleClick: 'openNewWindow'
}

const newsBubbleConfig = {
  chartType: 'bubble',
  htmlAnchorID: 'vis1',
  diameter: window.innerWidth <= 640 ? 350 : 650,
  zoom: 1,
  resolutionThresholds: [300, 600],
  autoplay: false,
  loop: false,
  onDoubleClick: 'expandBubble'
}

const scatterConfig = {
    chartType: 'bubbleScatter',
    htmlAnchorID: 'vis2',
    zoom: 2.5,
    resolutionThresholds: [250, 500],
    autoplay: false,
    loop: false,
    onDoubleClick: 'openNewWindow',
    dateFormat: '%d-%b-%y',
    xIsDate: true,
    yIsDate: false,
    rIsDate: false,
    height: window.innerWidth <= 640 ? 300 : 600,
    width: window.innerWidth <= 640 ? 450 : 900,
    plottableAreaMargin: { top: 0,
                           right: 0,
                           bottom: window.innerWidth <= 640 ? 15 : 30,
                           left: window.innerWidth <= 640 ? 32.5 : 65 },
    plottableAreaPadding: { top: window.innerWidth <= 640 ? 60 : 120,
                            right: window.innerWidth <= 640 ? 50 : 100,
                            bottom: window.innerWidth <= 640 ? 40 : 80,
                            left: window.innerWidth <= 640 ? 30 : 60 },
    rLimits: { lower: window.innerWidth <= 640 ? 10 : 20,
               upper: window.innerWidth <= 640 ? 60 : 120 }
}



let visualization1 = new acd3(youtubeTrailers, bubbleConfig);
let visualization2 = new acd3(scatterData3, scatterConfig);

visualization1.createBubbleChart();
setTimeout(() => visualization2.createBubbleScatterChart(), 3000);

//playAll/pauseAll buttons:
$('#play-vis1').on('click', () => visualization1.playAll());
$('#pause-vis1').on('click', () => visualization1.pauseAll());
$('#play-vis2').on('click', () => visualization2.playAll());
$('#pause-vis2').on('click', () => visualization2.pauseAll());

//dataset buttons
//visualization1-data1:
$('#vis1-data1').on('click', () => {
  $('#vis1-title').text('Most Anticipated YouTube Summer Movie Trailers');
  $('.bubble-chart').remove();
  visualization1 = new acd3(youtubeTrailers, bubbleConfig);
  visualization1.createBubbleChart();
});
//visualization1-data2:
$('#vis1-data2').on('click', () => {
  $('#vis1-title').text('Vimeo Presents: The Top Videos of 2016');
  $('.bubble-chart').remove();
  visualization1 = new acd3(vimeoBestOf2016, bubbleConfig);
  visualization1.createBubbleChart();
});
//visualization1-data3:
$('#vis1-data3').on('click', () => {
  $('#vis1-title').text('Breaking News Stories');
  $('.bubble-chart').remove();
  visualization1 = new acd3(newsClips, newsBubbleConfig);
  visualization1.createBubbleChart();
});

$('.demo').on('click', () => {
  $(this).addClass('toggled');
  $('.demo').removeClass('toggled');
});
