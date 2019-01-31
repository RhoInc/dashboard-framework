//import specifications from '../../dashboard-charts/src/specifications';
import { specifications } from 'dashboard-charts';

export default function addChartList(charts) {
    console.log(specifications);
    charts.forEach(chart => {
        if (chart.hasOwnProperty('spec')) {
            const spec = specifications[chart.spec];
            if (spec !== undefined)
                this.addChart(spec.settings, chart.data, spec.schema.title, spec.controlInputs, spec.callbacks);
        } else if (chart.hasOwnProperty('settings')) {
            this.addChart(
                chart.settings,
                chart.data,
                chart.title || '',
                chart.controlInputs || [],
                chart.callbacks || {},
            );
        }
    });
}
