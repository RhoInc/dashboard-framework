export default function addContainer(chart) {
    chart.containers.dataCheck = chart.containers.body
        .append('div')
        .classed('df-data-check', true);
}
