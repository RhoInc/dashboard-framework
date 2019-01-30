export default function onResize() {
    var context = this;
    this.svg.selectAll('.y.axis .tick text').each(function(d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
    //Capture x/y coordinates of mouse.
    var timeFormat = d3.time.format('%d %b %Y');
    var width = this.plot_width;
    var x = this.x;
    var y = this.y;
    var decim = d3.format('.0f');

    var x_mark = this.svg
        .select('.x.axis')
        .append('g')
        .attr('class', 'hover-item hover-tick hover-tick-x')
        .style('display', 'none');
    x_mark.append('line').attr({
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0,
        stroke: '#ddd'
    });
    x_mark.append('text').attr({
        x: 0,
        y: 0,
        dx: '.5em',
        dy: '-.5em'
    });
    x_mark.select('line').attr('y1', -this.plot_height);

    this.svg
        .on('mousemove', function() {
            var mouse = this;

            context.current_data.forEach(function(e) {
                var line_data = e.values;
                var bisectDate = d3.bisector(function(d) {
                    return new Date(d.key);
                }).right;
                var x0 = context.x.invert(d3.mouse(mouse)[0]);
                var i = bisectDate(line_data, x0, 1, line_data.length - 1);
                var d0 = line_data[i - 1];
                var d1 = line_data[i];

                if (!d0 || !d1) return;

                var d = x0 - new Date(d0.key) > new Date(d1.key) - x0 ? d1 : d0;
                var hover_tick_x = context.svg.select('.hover-tick-x');
                var focus_enr = context.svg.selectAll('.focus').filter(function(f) {
                    return f.key === e.key;
                });

                hover_tick_x
                    .select('text')
                    .text(timeFormat(x0))
                    .attr('text-anchor', x(x0) > width / 2 ? 'end' : 'start')
                    .attr('dx', x(x0) > width / 2 ? '-.5em' : '.5em');

                var leg_item = context.wrap
                    .select('.legend')
                    .selectAll('.legend-item')
                    .filter(function(f) {
                        return f.label === e.key;
                    });

                leg_item
                    .select('.legend-mark-text')
                    .text(d.values.y || d.values.y === 0 ? decim(d.values.y) : null);
                hover_tick_x.attr('transform', 'translate(' + x(x0) + ',0)');
            });
        })
        .on('mouseover', function() {
            context.svg.selectAll('.hover-item').style('display', 'block');
            var leg_items = context.wrap.select('.legend').selectAll('.legend-item');
            leg_items.select('.legend-color-block').style('display', 'none');
            leg_items.select('.legend-mark-text').style('display', 'inline');
        })
        .on('mouseout', function() {
            context.svg.selectAll('.hover-item').style('display', 'none');
            var leg_items = context.legend.selectAll('.legend-item');
            leg_items.select('.legend-color-block').style('display', 'inline-block');
            leg_items.select('.legend-mark-text').style('display', 'none');
        });
}
