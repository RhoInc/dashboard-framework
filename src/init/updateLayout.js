export default function updateLayout() {
    this.nCharts = this.charts.length;
    this.charts.forEach((chart,i) => {
        chart.container = this.containers.main
            .append('div')
            .classed(`df-chart df-chart--${i}`, true);
    });
}
