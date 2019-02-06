export default function updateSubmit(chart) {
    const missingRequiredVariables = chart.variables.schema
        .filter(variable => variable.required && variable.missing);
    chart.containers.submit
        .property('disabled', missingRequiredVariables.length > 0)
        .on('click', () => {
            if (!chart.initialized) {
                chart.webcharts.init(chart.data);
                chart.initialized = true;
            } else {
                chart.webcharts.wrap.classed('df-hidden', false);
                chart.webcharts.draw();
            }
            chart.containers.dataCheck.classed('df-hidden', true);
        });
}
