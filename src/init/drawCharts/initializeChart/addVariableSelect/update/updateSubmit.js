import callCreateControls from '../../../callCreateControls';
import enforceSizing from '../../../enforceSizing';
import callCreateChart from '../../../callCreateChart';
import attachCallbacks from '../../../attachCallbacks';

export default function updateSubmit(chart) {
    const missingRequiredVariables = chart.variables.schema.filter(
        variable => variable.required && variable.missing
    );
    chart.containers.submit
        .property('disabled', missingRequiredVariables.length > 0)
        .on('click', () => {
            if (chart.initialized) chart.webcharts.destroy();
            callCreateControls.call(this, chart);
            enforceSizing.call(this, chart);
            callCreateChart.call(this, chart);
            attachCallbacks.call(this, chart);
            chart.webcharts.init(chart.data);
            chart.initialized = true;
            chart.containers.dataCheck.classed('df-hidden', true);
        });
}
