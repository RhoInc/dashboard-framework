import withSchema from './checkRequiredVariables/withSchema';
import withoutSchema from './checkRequiredVariables/withoutSchema';

export default function checkRequiredVariables(chart) {
    chart.variables = {
        actual: Object.keys(chart.data[0]),
        required: [],
        missing: []
    };
    if (chart.schema !== undefined) withSchema.call(this, chart);
    else withoutSchema.call(this, chart);
}
