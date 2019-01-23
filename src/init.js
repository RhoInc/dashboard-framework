import updateLayout from './init/updateLayout';
import drawChart from './init/drawChart';

export default function init() {
    updateLayout.call(this);
    this.charts.forEach(chart => {
        drawChart.call(this, chart);
    });
}
