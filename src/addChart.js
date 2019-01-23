export default function addChart(settings, data, row, column) {
    this.charts.push({
        settings,
        data,
        row,
        column
    });
}
