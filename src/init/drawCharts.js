import setTitle from './drawCharts/setTitle';
import callCreateControls from './drawCharts/callCreateControls';
import enforceSizing from './drawCharts/enforceSizing';
import callCreateChart from './drawCharts/callCreateChart';
import attachCallbacks from './drawcharts/attachCallbacks';
import initializeChart from './drawcharts/initializeChart';

export default function drawCharts() {
    this.charts.forEach(chart => {
        setTitle.call(this, chart);
        callCreateControls.call(this, chart);
        enforceSizing.call(this, chart);
        callCreateChart.call(this, chart);
        attachCallbacks.call(this, chart);
        initializeChart.call(this, chart);
    });
}
