export default function addWarning(chart) {
    chart.containers.warning = chart.containers.dataCheck
        .append('strong')
        .classed('df-data-check__warning', true);
    chart.containers.warningRequired = chart.containers.dataCheck
        .append('strong')
        .classed('df-data-check__warning df-data-check__warning--required', true);
    chart.containers.warningOptional = chart.containers.dataCheck
        .append('em')
        .classed('df-data-check__warning df-data-check__warning--optional', true);
}
