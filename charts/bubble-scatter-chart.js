// set the dimensions and margins of the graph
var margin = { top: 60, right: 60, bottom: 30, left: 60 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");


// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var r = d3.scaleLinear().range([20,60]);

/* x(input) = ((Jan, 2 2000)/(Jan, 1 2000))*input + 0 */
    // console.log(' parseTime("18-Apr-12") --> ', parseTime("1-Jan-00"))
    // console.log(' x(parseTime("18-Apr-12")) --> ', x(parseTime("1-Jan-00")))
    // console.log(' parseTime("18-Apr-12") --> ', parseTime("2-Jan-00"))
    // console.log(' x(parseTime("18-Apr-12")) --> ', x(parseTime("2-Jan-00")))

/* y(input) = -450*input + 450 */
    // console.log('y(0) --> ', y(0))
    // console.log('y(.5) --> ', y(.5))
    // console.log('y(1) --> ', y(1))

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


// Get the data
d3.csv("./charts/bubble-scatter-chart-data.csv", function (error, data) {

    console.log('data --> ', data)

    if (error) throw error;

    // format the data
    data.forEach(function (d) {
        d.date = parseTime(d.date);
        d.views = +d.views;
        d.popularity = +d.popularity;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) { return d.date; }));
    y.domain([0, d3.max(data, function (d) { return d.views; })]);
    r.domain(d3.extent(data, function (d) { return d.popularity; }));

    // Add the scatterplot
    const node = svg.selectAll("dot")
        .data(data)
        .enter().append("g")
        
    node.append("circle")
        .attr("r", function (d) { return r(d.popularity); })
        .attr("cx", function (d) { return x(d.date); })
        .attr("cy", function (d) { return y(d.views); })

    node.append("foreignObject")

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});