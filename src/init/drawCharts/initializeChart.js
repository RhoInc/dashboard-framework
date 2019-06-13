import { csv } from 'd3';
import checkRequiredVariables from './initializeChart/checkRequiredVariables';
import addVariableSelect from './initializeChart/addVariableSelect';

export default function initializeChart(chart) {
    //Intialize chart.
    if (typeof chart.data === 'string') {
        csv(
            chart.data,
            d => {
                return d;
            },
            data => {
                if (chart.data_callback) chart.data_callback(data);
                chart.data = data;
                checkRequiredVariables.call(this, chart);
                addVariableSelect.call(this, chart);

                if (
                    chart.variables.schema.filter(variable => variable.required && variable.missing)
                        .length === 0
                ) {
                    chart.containers.dataCheck.classed('df-hidden', true);
                    chart.webcharts.init(data);
                    chart.initialized = true;
                }
            }
        );
    } else if (Array.isArray(chart.data)) {
        if (chart.data_callback) chart.data_callback(data);
        checkRequiredVariables.call(this, chart);
        addVariableSelect.call(this, chart);

        if (
            chart.variables.schema.filter(variable => variable.required && variable.missing)
                .length === 0
        ) {
            chart.containers.dataCheck.classed('df-hidden', true);
            chart.webcharts.init(data);
            chart.initialized = true;
        }
    } else console.warn('addChart() requires a path to a .csv file or a data array.');
}
