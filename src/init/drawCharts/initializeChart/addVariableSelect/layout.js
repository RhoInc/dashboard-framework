import addContainer from './layout/addContainer';
import addWarning from './layout/addWarning';
import addSchema from './layout/addSchema';
import addSubmit from './layout/addSubmit';

export default function layout(chart) {
    addContainer.call(this, chart);
    addWarning.call(this, chart);
    addSchema.call(this, chart);
    addSubmit.call(this, chart);
}
