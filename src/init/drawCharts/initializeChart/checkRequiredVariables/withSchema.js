export default function withSchema(chart) {
    chart.variables.schema = Object.keys(chart.schema.properties)
        .map(key => {
            const property = chart.schema.properties[key];
            property.key = key;
            property.current = chart.settings[property.key];
            property.missing = chart.variables.actual.indexOf(property.default) < 0;
            return property;
        })
        .filter(property => property['data-mapping'] === true);
    chart.variables.required = chart.variables.schema.filter(
        property => property.required === true
    );
    chart.variables.missing = chart.variables.schema.filter(variable => variable.missing);
}
