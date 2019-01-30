export default function updateLayout() {
    this.nCharts = this.charts.length;
    this.charts.forEach((chart,i) => {
        chart.containers = {
            main: this.containers.main
                .append('div')
                .classed(`df-chart df-chart--${i}`, true)
        };
        chart.containers.head = chart.containers.main
            .append('div')
            .classed('df-chart__head', true);
        chart.containers.body = chart.containers.main
            .append('div')
            .classed('df-chart__body', true);
    });
}
