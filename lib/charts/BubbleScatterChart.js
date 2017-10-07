class BubbleScatterChart {

  constructor(data, config) {
    this.playerStore = {};
    this.data = data;
    this.config = config;
    this.expanded = false;
    this.playersPopulated = false;
  }
//     this.setUpEnvironment();
//
//     const svg = d3.select(`#${this.config.htmlAnchorID}`)
//         .append('svg')
//         .classed('scatter-chart', true)
//         .attr('width', this.config.width)
//         .attr('height', this.config.height);
//
//     const dataGroup = svg.append('g')
//         .classed('data', true)
//     const axesGroup = svg.append('g')
//         .classed('axes', true)
//
//     const parseTime = d3.timeParse(this.config.dateFormat);
//
//     const xIsDate = this.config.xIsDate;
//     const yIsDate = this.config.yIsDate;
//     const rIsDate = this.config.rIsDate;
//
//     const width = this.config.width;
//     const height = this.config.height;
//     const margin = this.config.plottableAreaMargin;
//     const padding = this.config.plottableAreaPadding;
//
//     const plottableAreaWidth = width - margin.left - margin.right;
//     const plottableAreaHeight = height - margin.top - margin.bottom;
//
//     const rLowerLimit = this.config.rLimits.lower;
//     const rUpperLimit = this.config.rLimits.upper;
//
//     const timeOffset = d3.timeDay.offset;
//
//     this.data.forEach((d) => {
//         d.v_id = `id_${d.v_id}`;
//         xIsDate ? d.x = parseTime(d.x) : d.x = +d.x;
//         yIsDate ? d.y = parseTime(d.y) : d.y = +d.y;
//         rIsDate ? d.r = parseTime(d.r) : d.r = +d.r;
//     });
//
//     const minX = d3.min(this.data, (d) => d.x);
//     const maxX = d3.max(this.data, (d) => d.x);
//
//     const minY = d3.min(this.data, (d) => d.y);
//     const maxY = d3.max(this.data, (d) => d.y);
//
//     const minR = d3.min(this.data, (d) => d.r);
//     const maxR = d3.max(this.data, (d) => d.r);
//
//     // set the ranges
//     const xScaleFunc = xIsDate
//         ? d3.scaleTime()
//             .range([0 + margin.left + padding.left, width - padding.right - margin.right])
//             .domain([minX, maxX])
//         : d3.scaleLinear()
//             .range([0 + margin.left + padding.left, width - padding.right - margin.right])
//             .domain([minX, maxX]);
//
//     const yScaleFunc = yIsDate
//         ? d3.scaleTime()
//             .range([height - padding.bottom - margin.bottom, 0 + margin.top])
//             .domain([timeOffset(minY, -padding.bottom), timeOffset(maxY, padding.top)])
//         : d3.scaleLinear()
//             .range([height - padding.bottom - margin.bottom, 0 + padding.top])
//             .domain([minY, maxY]);
//
//     const rScaleFunc = rIsDate
//         ? d3.scaleTime()
//             .range([rLowerLimit, rUpperLimit])
//             .domain([minR, maxR])
//         : d3.scaleLinear()
//             .range([rLowerLimit, rUpperLimit])
//             .domain([minR, maxR]);
//
//     this.data.forEach((d) => d.data = Object.assign({}, d));
//
//     this.data.forEach((d) => {
//         d.x = xScaleFunc(d.data.x);
//         d.y = yScaleFunc(d.data.y);
//         d.r = rScaleFunc(d.data.r);
//     });
//
//     const node = dataGroup.selectAll('g')
//         .data(this.data)
//         .enter()
//         .append('g')
//
//     this.addBubble(node);
//     this.populatePlayerStore();
//
//     // Add the X Axis
//     const xAxis = axesGroup.append('g')
//         .attr('class', 'axis')
//         .attr('transform', `translate(0,${height - margin.bottom})`)
//         .call(d3.axisBottom(xScaleFunc));
//
//     // Add the Y Axis
//     const yAxis = axesGroup.append('g')
//         .attr('class', 'axis')
//         .attr('transform', `translate(${margin.left},${margin.top})`)
//         .call(d3.axisLeft(yScaleFunc));
}
