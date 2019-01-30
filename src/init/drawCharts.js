import { createControls, createChart } from 'webcharts';

export default function drawCharts() {
    this.charts.forEach(chart => {
        //Set title.
        chart.containers.head.text(chart.title);

        //Define controls.
        if (Array.isArray(chart.controlInputs) && chart.controlInputs.length)
            chart.controls = new createControls(
                chart.containers.head.node(),
                {inputs: chart.controlInputs}
            );

        //Define chart.
        chart.settings.aspect = this.settings.nColumns === 2
            ? 25/9
            : 16/9;
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
            d3.csv(
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
