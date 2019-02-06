export default function addWarning(chart) {
    chart.containers.warning = chart.containers.dataCheck
        .append('strong')
        .classed('df-data-check__warning', true);
}
