import specifications from '../../dashboard-charts/src/specifications';

export default function addChartList(charts) {
    charts.forEach(chart => {
        if (chart.hasOwnProperty('spec')) {
            const spec = specifications[chart.spec];
            if (spec !== undefined)
                this.addChart(spec.settings, chart.data, spec.schema.title, spec.controlInputs, spec.callbacks);
        } else if (chart.hasOwnProperty('settings')) {
            chart.title = chart.title || '';
            chart.controlInputs = chart.controlInputs || [];
            chart.callbacks = chart.callbacks || {};
            this.addChart(chart.settings, chart.data, chart.title, chart.controlInputs, chart.callbacks);
        }
    });
}
