import enforceChartSizing from './drawCharts/enforceChartSizing';
import { createControls, createChart } from 'webcharts';
import { csv } from 'd3';

export default function drawCharts() {
    this.charts.forEach(chart => {
        //Enforce chart sizing.
        enforceChartSizing.call(this, chart);

        //Set title.
        chart.containers.head.text(chart.title);

        //Define controls.
        if (Array.isArray(chart.controlInputs) && chart.controlInputs.length)
            chart.controls = new createControls(
                chart.containers.head.node(),
                {inputs: chart.controlInputs}
            );

        //Define chart.
        chart.webcharts = new createChart(
            chart.containers.body.node(),
            chart.settings,
            chart.controls
        );

        //Attach callbacks.
        if (chart.callbacks) {
            for (const callback in chart.callbacks)
                chart.webcharts.on(callback.substring(2).toLowerCase(), chart.callbacks[callback]);
        }

        //Intialize chart.
        if (typeof chart.data === 'string')
            csv(
                chart.data,
                d => {
                    return d;
                },
                data => {
                    chart.data = data;
                    chart.webcharts.init(data);
                }
            );
        else if (Array.isArray(chart.data))
            chart.webcharts.init(chart.data);
        else
            console.warn('addChart() requires a path to a .csv file or a data array.')
    });
}
