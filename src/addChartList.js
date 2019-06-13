import checkArguments from './addChartList/checkArguments';
import { specifications } from 'dashboardCharts';
import deepmerge from './util/deepmerge';

export default function addChartList(charts) {
    checkArguments.call(this, charts);
    charts.forEach(chart => {
        if (
            window &&
            window.dashboardCharts !== undefined &&
            chart.hasOwnProperty('identifier') &&
            specifications[chart.identifier] !== undefined
        ) {
            const specification = this.clone(specifications[chart.identifier]);
            specification.identifier = chart.identifier;
            specification.data = chart.data;
            specification.title = chart.title || specification.schema.title;
            if (chart.settings)
                specification.settings = deepmerge(specification.settings, chart.settings, {
                    arrayMerge: (target, source) => [...source]
                });
            if (chart.controlInputs) specification.controlInputs = chart.controlInputs;
            if (chart.callbacks)
                for (const callback in chart.callbacks)
                    specification.callbacks[callback] = chart.callbacks[callback];
            if (chart.data_callback) specification.data_callback = chart.data_callback;
            this.addChart(specification);
        } else this.addChart(chart.specification);
    });
}
