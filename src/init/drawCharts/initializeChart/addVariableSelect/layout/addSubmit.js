export default function addSubmit(chart) {
    chart.containers.submit = chart.containers.dataCheck
        .append('button')
        .classed('df-data-check__submit', true)
        .text('View chart');
}
