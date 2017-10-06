class BubbleChart {

  constructor(data, config) {
    this.playerStore = {};
    this.data = data;
    this.config = config;
    this.expanded = false;
    this.playersPopulated = false;
  }

  init() {
    const visID = this.config.htmlAnchorID;
    acd3.visStore[visID] = this;
    acd3.appendAPIScripts();
    acd3.setupYouTubeAPI(visID);
    acd3.populatePlayerStore();
    this.createChart();
  }

  createChart() {
    this.data.forEach((d) => d.v_id = `id_${acd3.id++}`);
    this.data = { 'children': this.data };

    const bubble = d3.pack(this.data)
        .size([this.config.diameter, this.config.diameter])
        .padding(1.5);

    const svg = d3.select(`#${this.config.htmlAnchorID}`)
        .append('svg')
        .classed('bubble-chart', true)
        .attr('width', this.config.diameter)
        .attr('height', this.config.diameter);

    const root = d3.hierarchy(this.data)
        .sum((d) => d.scalingParameter);

    const node = svg.selectAll('g')
        .data(bubble(root).descendants())
        .enter()
        .filter((d) => !d.children);
    acd3.addBubble(node, this.config.htmlAnchorID);
  }

}
