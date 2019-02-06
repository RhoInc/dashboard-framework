export default function addSchema(chart) {
    chart.containers.schemaContainers = chart.containers.dataCheck
        .selectAll('div.df-data-check__variable-select')
            .data(chart.variables.schema)
            .enter()
        .append('div')
        .classed('df-data-check__variable-select', true);
    chart.containers.schemaTitles = chart.containers.schemaContainers
        .append('div')
        .classed('df-data-check__variable-select__title', true)
        .html(d => `${d.title}${d.required ? ' (<strong>required</strong>)' : ''}`);
    chart.containers.schemaMessages = chart.containers.schemaContainers
        .append('div')
        .classed('df-data-check__variable-select__action', true)
        .html(d => `Choose another variable:`);
    chart.containers.schemaSettings = chart.containers.schemaContainers
        .append('div')
        .classed('df-data-check__variable-select__current', true)
        .html(d => `Currently: <em>${d.current}<em>`);
    chart.containers.schemaDropdowns = chart.containers.schemaContainers
        .append('select')
        .classed('df-data-check__variable-select__dropdown', true);
    chart.containers.schemaOptions = chart.containers.schemaDropdowns
        .selectAll('option')
            .data(['None selected'].concat(chart.variables.actual))
            .enter()
        .append('option')
        .text(di => di);
}
