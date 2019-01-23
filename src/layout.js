import { select, selectAll } from 'd3';

export default function layout() {
    this.containers = {
        main: select(this.element)
            .append('div')
            .datum(this)
            .classed('dashboard-framework', true)
            .attr('id', `dashboard-framework${selectAll('.dashboard-framework').size() + 1}`)
    };
}
