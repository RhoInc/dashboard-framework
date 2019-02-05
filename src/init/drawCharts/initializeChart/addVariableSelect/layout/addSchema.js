export default function addSchema(chart) {
    const context = this;

    chart.containers.schema = chart.containers.dataCheck
        .selectAll('div.df-data-check__variable-select')
            .data(chart.variables.schema)
            .enter()
        .append('div')
        .classed('df-data-check__variable-select', true)
        .classed('df-data-check__variable-select--missing', d => chart.variables.missing.map(variable => variable.key).indexOf(d.key) > -1)
        .each(function(d) {
            const variableSelect = d3.select(this);
            variableSelect
                .append('div')
                .classed('df-data-check__variable-select__title', true)
                .html(`${d.title}${d.required ? ' (<strong>required</strong>)' : ''}`);
            variableSelect
                .append('div')
                .classed('df-data-check__variable-select__action', true)
                .html(`Choose another variable:`);
            variableSelect
                .append('div')
                .classed('df-data-check__variable-select__current', true)
                .html(`Currently: <em>${d.current}<em>`);
            if (d.missing)
                chart.settings[d.key] = null;
            const dropdown = variableSelect
                .append('select')
                .classed('df-data-check__variable-select__dropdown', true);
            dropdown
                .selectAll('option')
                    .data(['None selected'].concat(chart.variables.actual))
                    .enter()
                .append('option')
                .text(di => di)
                .property('selected', di => d.current === di);
            dropdown.on('change', function(dii) {
                const option = dropdown.selectAll('option:checked').text();
                if (option !== 'None selected') {
                    variableSelect.classed('df-data-check__variable-select--missing', false);
                    chart.variables.schema.find(variable => variable.key === d.key).missing = false;
                    if (chart.configuration) {
                        chart.settings[d.key] = option;
                        chart.settings = chart.configuration.syncSettings(chart.settings);
                    } else {
                        console.log(d.key);
                        context.stringAccessor(chart.settings, d.key, option);
                    }
                    chart.webcharts.config = chart.settings;
                } else {
                    variableSelect.classed('df-data-check__variable-select--missing', true);
                }

                if (chart.variables.schema.every(variable => !(variable.required && variable.missing)))
                    chart.containers.submit.property('disabled', false);
            });
        });
}
