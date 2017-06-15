// set the dimensions and margins of the graph
var margin = { top: 60, right: 60, bottom: 30, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");
var parseTime2 = d3.timeParse("%b/%d/%y");


// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var r = d3.scaleLinear().range([20, 60]);

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


d3.csv("./datasets/dataset-1a_movies.csv", function (error, data) {
    console.log('movie data --> ', data)

    data.forEach(function (d) {
        d.productionBudget = +d.productionBudget.replace(/[$, ]/g,'');
        d.worldwideGross = +d.worldwideGross.replace(/[$, ]/g,'');
        d.releaseDate = parseTime(d.releaseDate);
    });

    /* playing around with dates in d3 */
    // const minDate1 = d3.min(data, function (d) { return d.date; })
    // console.log('minDate --> ', minDate1)
    // const offsetDate = d3.timeDay.offset(minDate1,-1)
    // console.log('offsetDate --> ', offsetDate)

    // Scale the range of the data
    const minDate = d3.min(data, function (d) { return d.releaseDate; })
    const maxDate = d3.max(data, function (d) { return d.releaseDate; })
    const minBudget = d3.min(data, function (d) { return d.productionBudget; })
    const maxBudget = d3.max(data, function (d) { return d.productionBudget; })
    const minGross = d3.min(data, function (d) { return d.worldwideGross; })
    const maxGross = d3.max(data, function (d) { return d.worldwideGross; })
    const xPadding = 300;
    const yPadding = 30000000;
    x.domain([d3.timeDay.offset(minDate, -xPadding), d3.timeDay.offset(maxDate, +xPadding)]);
    y.domain([minBudget - yPadding, maxBudget + yPadding]);
    r.domain([minGross, maxGross]);

    // Add the scatterplot
    const node = svg.selectAll("dot")
        .data(data)
        .enter().append("g")
        .attr("transform", (d) => "translate(" + x(d.releaseDate) + "," + y(d.productionBudget) + ")")

    node.append("circle")
        .attr("r", function (d) { return r(d.worldwideGross); })


    const foreignObject = node.append("foreignObject")
        .attr('width', (d) => r(d.worldwideGross) * 2)
        .attr('height', (d) => r(d.worldwideGross) * 2)
        .attr('x', (d) => -r(d.worldwideGross))
        .attr('y', (d) => -r(d.worldwideGross))
        .style('pointer-events', 'none')

    foreignObject.append('xhtml:video')
        .property('volume', '0.0')
        .attr('src', (d) => d.URL)
        .attr('autoplay', '')
        .attr('loop', '')
        .attr('width', (d) => r(d.worldwideGross) * 2)
        .attr('height', (d) => r(d.worldwideGross) * 2)
        .attr('id', (d, i) => i)
        .style('position', 'fixed')
        .style('border-radius', '50%')
        .style('object-fit', 'cover')
        .style('width', '100%')
        .style('height', '100%');

    node.append('text')
        .attr("x", (d) => r(d.worldwideGross))
        .attr("y", (d) => r(d.worldwideGross))
        .text((d) => d.movieName )

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});