export default function enforceChartSizing(chart) {
    delete chart.settings.width;
    delete chart.settings.height;
    chart.settings.aspect = this.settings.nColumns === 2
        ? 25/9
        : 16/9;
    chart.settings.resizable = false;
    chart.settings.scale_text = true;
}
