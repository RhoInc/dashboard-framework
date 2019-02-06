import { createControls } from 'webcharts';

export default function callCreateControls(chart) {
    if (Array.isArray(chart.controlInputs) && chart.controlInputs.length)
        chart.controls = new createControls(chart.containers.head.node(), {
            inputs: chart.controlInputs
        });
}
