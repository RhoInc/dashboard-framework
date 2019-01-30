import specifications from '../../dashboard-charts/src/specifications';

export default function createDashboard(charts) {
    charts.forEach(chart => {
        if (chart.hasOwnProperty('spec')) {
            const spec = specifications[chart.spec];
            console.log(spec);
            if (spec !== undefined)
                this.addChart(spec.settings, chart.data, spec.schema.title, spec.controlInputs, spec.callbacks);
        } else if (chart.hasOwnProperty('settings')) {
            this.addChart(chart.settings, chart.data);
        }
    });
}
