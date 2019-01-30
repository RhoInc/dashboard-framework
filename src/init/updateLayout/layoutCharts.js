export default function layoutCharts() {
    this.charts.forEach((chart,i) => {
        const row = Math.ceil((i + 1)/this.settings.nColumns);
        const col = (i + 1)%this.settings.nColumns || this.settings.nColumns;
        chart.containers = {
            main: this.containers[`row${row}`]
                .append('div')
                .classed(`df-chart df-chart--row${row} df-chart--col${col} df-chart--${i}`, true)
        };
        chart.containers.head = chart.containers.main
            .append('div')
            .classed('df-chart__head', true);
        chart.containers.body = chart.containers.main
            .append('div')
            .classed('df-chart__body', true);
    });
}
