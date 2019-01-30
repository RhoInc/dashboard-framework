import updateLayout from './init/updateLayout';
import drawCharts from './init/drawCharts';

export default function init() {
    updateLayout.call(this);
    drawCharts.call(this);
}
