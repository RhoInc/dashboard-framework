export default function enforceChartSizing(chart) {
    chart.settings.resizable = false;
    delete chart.settings.width;
    delete chart.settings.height;
    delete chart.settings.range_band;
    chart.settings.aspect = this.settings.nColumns === 2
        ? 25/9
        : 16/9;
    chart.settings.scale_text = true;
}
