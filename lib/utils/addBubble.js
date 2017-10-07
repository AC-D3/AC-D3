function addBubble (node, visID) {
    const vis = this.visStore[visID];
    let g;
    let foreignObject;
    let div;
    let video;
    let circle;

    g = node.append('g');
    //position circle below video bubble to handle mouse events

    circle = g.append('circle')
        .attr('class', `${vis.config.htmlAnchorID}-circle`)
        .attr('id', (d, i) => `${vis.config.htmlAnchorID}circleID_${i}`)
        .attr('r', (d) => d.r)
        .on('mouseenter', (d) => this.unmuteOnMouseEnter.call(vis, d.data))
        .on('mouseleave', (d) => this.muteOnMouseLeave.call(vis, d.data))
        .on('click', (d) => this.handleSingleClick.call(vis, d.data))
        .on('dblclick', (d, i) => {
            if (vis.config.onDoubleClick === 'openNewWindow') this.openNewWindow.call(vis, d.data);
            else if (vis.config.onDoubleClick === 'expandBubble') this.expandBubble.call(vis, d.data, i);
        });
    foreignObject = g.append('foreignObject')
        .style('pointer-events', 'none');

    //Firefox specific attributes:
    if (typeof InstallTrigger !== 'undefined') {
        g.attr('transform', (d) => `translate(${d.x},${d.y})`)
            .attr('id', (d, i) => `${vis.config.htmlAnchorID}gID_${i}`);

        foreignObject
            .attr('id', (d, i) => `${vis.config.htmlAnchorID}foreignID_${i}`)
            .attr('width', (d) => d.r * 2)
            .attr('height', (d) => d.r * 2)
            .attr('x', (d) => -d.r)
            .attr('y', (d) => -d.r);

        video = foreignObject.append((d) => {
            return d.data.type === 'video'
                ? document.createElement('video')
                : document.createElement('iframe');
        })

        video.attr('class', vis.config.htmlAnchorID + '-video')
            .style('border-radius', '50%')
            .style('object-fit', 'cover')
            .style('width', '100%')
            .style('height', '100%');
    }

    //specific attributes for other browsers (Chrome, Safari...):
    else {
        foreignObject
            .attr('id', (d, i) => `${vis.config.htmlAnchorID}foreignID_${i}`)
            .attr('x', (d) => d.x - d.r)
            .attr('y', (d) => d.y - d.r);

        div = foreignObject.append('xhtml:div')
            .attr('id', (d, i) => `${vis.config.htmlAnchorID}divID_${i}`)
            .style('width', (d) => `${(d.r * 2)}px`)
            .style('height', (d) => `${(d.r * 2)}px`)
            .style('border-radius', (d) => `${d.r}px`)
            .style('-webkit-mask-image', '-webkit-radial-gradient(circle, white 100%, black 100%)')
            .style('position', 'relative')

        video = div.append((d) => {
            return d.data.type === 'video'
                ? document.createElement('video')
                : document.createElement('iframe');
        })

        video.attr('class', `${vis.config.htmlAnchorID}-video`)
            .attr("xmlns", "http://www.w3.org/1999/xhtml")
            .style('object-fit', (d) => d.data.type === 'video' ? 'cover' : null)
            .style('width', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${vis.config.zoom * 100}%` : '100%')
            .style('height', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? `${vis.config.zoom * 100}%` : '100%')
            .style('top', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((vis.config.zoom - 1) * d.r) + 'px' : null)
            .style('left', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? -((vis.config.zoom - 1) * d.r) + 'px' : null)
            .style('position', 'absolute');

        circle.attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
    }
    if (vis.config.autoplay) video.attr('autoplay', (d) => d.data.type === 'video' ? '' : null);
    if (vis.config.loop) video.attr('loop', (d) => d.data.type === 'video' ? '' : null);
    video.property('volume', (d) => d.data.type === 'video' ? '0.0' : null)
        .attr('playsinline', (d) => d.data.type === 'video' ? '' : null)
        .attr('frameborder', (d) => d.data.type === 'youtube' || d.data.type === 'vimeo' ? 0 : null)
        .attr('id', (d) => d.data.v_id)
        .attr('src', (d) => {
            if (d.data.type === 'youtube') {
                let videoID = d.data.src.split('/').pop();
                let params;
                params += '?enablejsapi=1';
                params += '&playsinline=1';
                params += '&controls=0';
                params += '&autohide=1';
                params += '&disablekb=1';
                params += '&fs=0';
                params += '&modestbranding=0';
                params += '&showinfo=0';
                params += '&rel=0';
                params += '&version=3';
                params += `&playlist=${videoID}`;
                if (vis.config.loop) params += '&loop=1';
                return d.data.src + params;
            } else if (d.data.type === 'vimeo') {
                return `${d.data.src}?autopause=0`;
            } else {
                return d.data.src;
            }
        });
}
