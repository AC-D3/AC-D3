// set the dimensions and margins of the graph
var margin = { top: 60, right: 60, bottom: 30, left: 100 };
//calculates width and height of plottable area
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");


// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var r = d3.scaleLinear().range([20, 80]);



/* x(input) = ((Jan, 2 2000)/(Jan, 1 2000))*input + 0 */
// console.log(' parseTime("1-Jan-00") --> ', parseTime("1-Jan-00"))
// console.log(' x(parseTime("1-Jan-00")) --> ', x(parseTime("1-Jan-00")))
// console.log(' parseTime("18-Apr-12") --> ', parseTime("2-Jan-00"))
// console.log(' x(parseTime("18-Apr-12")) --> ', x(parseTime("2-Jan-00")))

/* y(input) = -450*input + 450 */
// console.log('y --> ', y)
// console.log('y(0) --> ', y(0))
// console.log('y(.5) --> ', y(.5))
// console.log('y(1) --> ', y(1))

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

var svg = d3.select("body").append("svg")
    //sets height and width of svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    //translates plottable area to make room for x and y scales
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("./datasets/bubble-scatter-data.csv", function (error, data) {
    // console.log('movie data1 --> ', data)

    data.forEach(function (d) {
        console.log('d1 --> ', d)
        d.productionBudget = +d.productionBudget.replace(/[$, ]/g,'');
        d.worldwideGross = +d.worldwideGross.replace(/[$, ]/g,'');
        d.releaseDate = parseTime(d.releaseDate);
        // d.releaseDate = new Date(d.releaseDate);
        console.log('d2 --> ', d)
    });

    // console.log('movie data2 --> ', data)


    /* playing around with dates in d3 */
    // const minDate1 = d3.min(data, function (d) { return d.date; })
    // console.log('minDate --> ', minDate1)
    // const offsetDate = d3.timeDay.offset(minDate1,-1)
    // console.log('offsetDate --> ', offsetDate)

    // Scale the domain of the data
    const minDate = d3.min(data, function (d) { return d.releaseDate; })
    const maxDate = d3.max(data, function (d) { return d.releaseDate; })

    const minBudget = d3.min(data, function (d) { return d.productionBudget; })
    const maxBudget = d3.max(data, function (d) { return d.productionBudget; })

    const minGross = d3.min(data, function (d) { return d.worldwideGross; })
    const maxGross = d3.max(data, function (d) { return d.worldwideGross; })

    const xPadding = 300;
    const yPadding = 30000000;


    // const yPadding = 0;

    x.domain([d3.timeDay.offset(minDate, -xPadding), d3.timeDay.offset(maxDate, +xPadding)]);
    y.domain([minBudget - yPadding, maxBudget + yPadding]);
    r.domain([minGross, maxGross]);







    // Add the scatterplot
    const node = svg.selectAll("dot")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d) => "translate(" + x(d.releaseDate) + "," + y(d.productionBudget) + ")")

    // Invoke addBubble here?
    console.log('node --> ', node)

    const circle = node.append("circle")
        .attr("r", function (d) { return r(d.worldwideGross); })

    const foreignObject = node.append("foreignObject")
        .attr('width', (d) => r(d.worldwideGross) * 2)
        .attr('height', (d) => r(d.worldwideGross) * 2)
        .attr('x', (d) => -r(d.worldwideGross))
        .attr('y', (d) => -r(d.worldwideGross))
        .style('pointer-events', 'none')

    const video = foreignObject.append('xhtml:video')
        .property('volume', '0.0')
        .attr('src', (d) => d.URL)
        .attr('autoplay', '')
        .attr('loop', '')
        .attr('width', (d) => r(d.worldwideGross) * 2)
        .attr('height', (d) => r(d.worldwideGross) * 2)
        .attr('id', (d, i) => i)
        .style('position', 'fixed')
        .style('border-radius', '50%')
        .style('width', '100%')
        .style('height', '100%');

    const text = node.append('text')
        .attr("x", (d) => r(d.worldwideGross))
        .attr("y", (d) => r(d.worldwideGross))
        .text((d) => d.movieName )

    // Add the X Axis
    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

});
