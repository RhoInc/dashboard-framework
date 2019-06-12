export default function withSchema(chart) {
    //Update settings before checking schema.
    chart.settings = chart.configuration.syncSettings(chart.settings);
    chart.controlInputs = chart.configuration.syncControlInputs(
        chart.controlInputs,
        chart.settings
    );

    //Check schema against specified data mappings.
    chart.variables.schema = Object.keys(chart.schema.properties)
        .map(key => {
            const property = chart.schema.properties[key];
            property.key = key;
            property.current = chart.settings[property.key];
            property.missing = chart.variables.actual.indexOf(property.current) < 0;
            return property;
        })
        .filter(property => property['data-mapping'] === true);

    //Capture list of required variables.
    chart.variables.required = chart.variables.schema.filter(
        property => property.required === true
    );

    //Capture list of missing variables.
    chart.variables.missing = chart.variables.schema.filter(variable => variable.missing);
}
