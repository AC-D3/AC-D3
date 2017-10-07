const acd3 = {

  visStore: {},
  id: 0,

  //API UTILS
  appendAPIScripts: apiUtils.appendAPIScripts,
  setupYouTubeAPI: apiUtils.setupYouTubeAPI,
  populatePlayerStore: apiUtils.populatePlayerStore,
  createYouTubePlayer: apiUtils.createYouTubePlayer,
  createVimeoPlayer: apiUtils.createVimeoPlayer,

  //HANDLERS
  scaleResolution: handlers.scaleResolution,
  playAll: handlers.playAll,
  pauseAll: handlers.pauseAll,
  unmuteOnMouseEnter: handlers.unmuteOnMouseEnter,
  muteOnMouseLeave: handlers.muteOnMouseLeave,
  handleSingleClick: handlers.handleSingleClick,
  playSolo: handlers.playSolo,
  openNewWindow: handlers.openNewWindow,
  expandBubble: handlers.expandBubble,
  expandBubbleChrome: handlers.expandBubbleChrome,
  expandBubbleFireFox: handlers.expandBubbleFireFox,
  reduceBubbleChrome: handlers.reduceBubbleChrome,
  reduceBubbleFireFox: handlers.reduceBubbleCFireFox,

  //D3 CHARTING METHODS
  addBubble,
  BubbleChart,
  BubbleScatterChart //not working

};
