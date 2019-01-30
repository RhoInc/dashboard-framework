export default function addChart(settings, data, title = '', controlInputs = [], callbacks = {}, row, col) {
    this.charts.push({
        settings,
        data,
        title,
        controlInputs,
        callbacks,
        row,
        col
    });
}
