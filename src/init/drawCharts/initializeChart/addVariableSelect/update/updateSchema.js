import updateWarning from './updateWarning';
import updateSubmit from './updateSubmit';

export default function updateSchema(chart) {
    const context = this;

    chart.containers.schemaContainers
        .classed('df-data-check__variable-select--missing', d => chart.variables.missing.map(variable => variable.key).indexOf(d.key) > -1);
    chart.containers.schemaOptions
        .property('selected', function(d) {
            const dropdown = d3.select(this.parentNode);
            return dropdown.datum().current === d;
        });
    chart.containers.schemaDropdowns
        .on('change', function(d) {
            const schemaContainer = d3.select(this.parentNode);
            const dropdown = d3.select(this);
            const option = dropdown.selectAll('option:checked').text();
            if (option !== 'None selected') {
                schemaContainer.classed('df-data-check__variable-select--missing', false);
                const variableSchema = chart.variables.schema
                    .find(variable => variable.key === d.key);
                variableSchema.current = option;
                variableSchema.missing = false;
                updateWarning.call(context, chart);
                if (chart.configuration) {
                    chart.settings[d.key] = option;
                    chart.settings = chart.configuration.syncSettings(chart.settings);
                } else {
                    context.stringAccessor(chart.settings, d.key, option);
                }
                chart.webcharts.config = chart.settings;
            } else {
                schemaContainer.classed('df-data-check__variable-select--missing', true);
                const variableSchema = chart.variables.schema
                    .find(variable => variable.key === d.key);
                variableSchema.current = null;
                variableSchema.missing = true;
                updateWarning.call(context, chart);
            }

            updateSubmit.call(context, chart);
        });
}
