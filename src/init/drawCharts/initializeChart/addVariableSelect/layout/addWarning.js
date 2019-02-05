export default function addWarning(chart) {
    chart.containers.warning = chart.containers.dataCheck
        .append('strong')
        .classed('df-data-check__warning', true)
        .text(
            `${
                chart.variables.missing.length
            } variable${
                chart.variables.missing.length === 1 ? '' : 's'
            } missing:`
        );
}
