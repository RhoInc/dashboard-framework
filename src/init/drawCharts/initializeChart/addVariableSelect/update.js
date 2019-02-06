import updateWarning from './update/updateWarning';
import updateSchema from './update/updateSchema';
import updateSubmit from './update/updateSubmit';

export default function update(chart) {
    updateWarning.call(this, chart);
    updateSchema.call(this, chart);
    updateSubmit.call(this, chart);
}
