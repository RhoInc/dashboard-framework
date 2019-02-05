export default function addSubmit(chart) {
    chart.containers.submit = chart.containers.dataCheck
        .append('button')
        .classed('df-data-check__submit', true)
        .text('View chart')
        .property('disabled', true)
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
