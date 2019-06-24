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
            //Capture and clone default chart specification given specification identifier specified in chart settings.
            const specification = this.clone(specifications[chart.identifier]);

            //Attach specification identifier to specification -- seems recursive.
            specification.identifier = chart.identifier;

            //Attach chart data to specification.
            specification.data = chart.data;

            //Overwrite specification title with custom chart title.
            specification.title = chart.title || specification.schema.title;

            //Add a data callback that is called before the chart is initialized.
            if (chart.data_callback) specification.data_callback = chart.data_callback;

            //Merge default settings with custom settings.
            if (chart.settings)
                specification.settings = deepmerge(specification.settings, chart.settings, {
                    arrayMerge: (target, source) => [...source]
                });

            //Overwrite default controls with custom controls.
            if (chart.controlInputs) specification.controlInputs = chart.controlInputs;

            //Couple custom callbacks with default callbacks.
            if (chart.callbacks)
                for (const callback in chart.callbacks) {
                    const defaultCallback = specification.callbacks[callback];
                    const customCallback = chart.callbacks[callback];
                    specification.callbacks[callback] = function() {
                        if (defaultCallback) defaultCallback.call(this); // run default callback defined in specification
                        if (customCallback) customCallback.call(this); // run custom callback defined by user
                    };
                }

            //Add chart to dashboard framework.
            this.addChart(specification);
        } else {
            //Add chart to dashboard framework.
            this.addChart(chart.specification);
        }
    });
}
