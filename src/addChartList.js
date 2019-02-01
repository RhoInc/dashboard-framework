import { specifications } from 'dashboardCharts';

export default function addChartList(charts) {
    charts.forEach(chart => {
        if (dashboardCharts !== undefined && chart.hasOwnProperty('spec') && specifications[chart.spec] !== undefined) {
            const spec = specifications[chart.spec];
            this.addChart(spec.settings, chart.data, spec.schema.title, spec.controlInputs, spec.callbacks);
        } else if (chart.hasOwnProperty('settings')) {
            this.addChart(
                chart.settings,
                chart.data,
                chart.title || '',
                chart.controlInputs || [],
                chart.callbacks || {},
            );
        } else {
            console.warn('To render a chart provide settings and data.');
        }
    });
}
