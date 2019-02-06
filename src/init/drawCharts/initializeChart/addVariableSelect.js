import layout from './addVariableSelect/layout';
import update from './addVariableSelect/update';

export default function addVariableSelect(chart) {
    layout.call(this, chart);
    update.call(this, chart);
}
