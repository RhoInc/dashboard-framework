import { createChart } from 'webcharts';

export default function drawChart(chart) {
    chart.webcharts = new createChart(
        chart.container.node(),
        chart.settings,
    );
    if (typeof chart.data === 'string')
        d3.csv(
            chart.data,
            d => {
                return d;
            },
            data => {
                console.log(data);
                chart.data = data;
                chart.webcharts.init(data);
                console.log(chart.webcharts.wrap.node().offsetHeight);
                console.log(chart.container.node().offsetHeight);
            }
        );
    else if (Array.isArray(chart.data))
        chart.webcharts.init(chart.data);
    else
        console.warn('addChart() requires a path to a .csv file or a data array.')
}
