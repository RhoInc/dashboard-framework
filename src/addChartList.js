import checkArguments from './addChartList/checkArguments';
import { specifications } from 'dashboardCharts';

export default function addChartList(charts) {
    checkArguments.call(this, charts);
    charts.forEach(chart => {
        if (dashboardCharts !== undefined && chart.hasOwnProperty('identifier') && specifications[chart.identifier] !== undefined) {
            const specification = this.clone(specifications[chart.identifier]);
            specification.data = chart.data;
            specification.title = specification.schema.title;
            this.addChart(specification);
        } else if (chart.hasOwnProperty('specification')) {
            this.addChart(chart.specification);
        } else {
            console.warn('To render a chart provide either a chart specification identifier or a chart settings object, and a data path or array.');
        }
    });
}
