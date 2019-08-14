import { createControls } from 'webcharts';

export default function callCreateControls(chart) {
    chart.controls = new createControls(chart.containers.head.node(), {
        inputs: chart.controlInputs || []
    });
}
