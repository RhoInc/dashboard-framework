import { select } from 'd3';
import updateWarning from './updateWarning';
import updateSubmit from './updateSubmit';

export default function updateSchema(chart) {
    const context = this;

    chart.containers.schemaContainers.classed(
        'df-data-check__variable-select--missing',
        d => chart.variables.missing.map(variable => variable.key).indexOf(d.key) > -1
    );
    chart.containers.schemaOptions.property('selected', function(d) {
        const dropdown = select(this.parentNode);
        return dropdown.datum().current === d;
    });
    chart.containers.schemaDropdowns.on('change', function(d) {
        const schemaContainer = select(this.parentNode);
        const dropdown = select(this);
        const option = dropdown.selectAll('option:checked').text();

        //user selects variable
        if (option !== 'None selected') {
            //update class
            schemaContainer.classed('df-data-check__variable-select--missing', false);

            //update schema
            const variableSchema = chart.variables.schema.find(variable => variable.key === d.key);
            variableSchema.current = option;
            variableSchema.missing = false;

            //update warning
            updateWarning.call(context, chart);

            //update and sync settings
            if (chart.configuration) {
                chart.settings[d.key] = option;
                chart.settings = chart.configuration.syncSettings(chart.settings);
                chart.controlInputs = chart.configuration.syncControlInputs(
                    chart.controlInputs,
                    chart.settings
                );
            } else {
                context.stringAccessor(chart.settings, d.key, option);
            }
        }
        //user deselects variable
        else {
            //update class
            schemaContainer.classed('df-data-check__variable-select--missing', true);

            //update schema
            const variableSchema = chart.variables.schema.find(variable => variable.key === d.key);
            variableSchema.current = null;
            variableSchema.missing = true;

            //update warning
            updateWarning.call(context, chart);

            //update and sync settings
            if (chart.configuration) {
                chart.settings[d.key] = null;
                chart.settings = chart.configuration.syncSettings(chart.settings);
                chart.controlInputs = chart.configuration.syncControlInputs(
                    chart.controlInputs,
                    chart.settings
                );
            }
        }

        //update submit button
        updateSubmit.call(context, chart);
    });
}
