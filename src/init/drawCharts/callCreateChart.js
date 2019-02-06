import { createChart } from 'webcharts';

export default function callCreateChart(chart) {
    chart.webcharts = new createChart(chart.containers.body.node(), chart.settings, chart.controls);
}
