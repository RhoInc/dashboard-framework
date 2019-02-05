export default function setTitle(chart) {
    chart.containers.title = chart.containers.head
        .append('span')
        .classed('df-chart-title', true)
        .text(chart.title);
    chart.containers.settingsToggle = chart.containers.title
        .append('span')
        .classed('df-settings-toggle df-hidden', true)
        .html(' &#x2699;')
        .attr('title', 'View chart settings.');
    chart.containers.title
        .on('mouseover', () => {
            chart.containers.settingsToggle
                .classed('df-hidden', false);
        })
        .on('mouseout', () => {
            chart.containers.settingsToggle
                .classed('df-hidden', true);
        });
    chart.containers.settingsToggle
        .on('click', () => {
            if (chart.containers.dataCheck.classed('df-hidden')) {
                chart.containers.dataCheck
                    .classed('df-hidden', false);
                chart.webcharts.wrap
                    .classed('df-hidden', true);
                chart.containers.settingsToggle
                    .attr('title', 'View chart.');
            } else {
                chart.containers.dataCheck
                    .classed('df-hidden', true);
                chart.webcharts.wrap
                    .classed('df-hidden', false);
                chart.containers.settingsToggle
                    .attr('title', 'View chart settings.');
            }
        });
}
