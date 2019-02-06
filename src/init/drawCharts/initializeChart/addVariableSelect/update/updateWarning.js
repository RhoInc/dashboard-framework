export default function updateWarning(chart) {
    const missingVariables = chart.variables.schema.filter(variable => variable.missing);
    const missingRequiredVariables = missingVariables.filter(variable => variable.required);
    const missingOptionalVariables = missingVariables.filter(variable => !variable.required);
    chart.containers.warning
        .classed('df-hidden', missingVariables.length > 0)
        .text('All variables present.');
    chart.containers.warningRequired
        .classed('df-data-check__warning--missing', missingRequiredVariables.length > 0)
        .classed('df-hidden', missingVariables.length === 0)
        .text(
            missingRequiredVariables.length > 0
                ? `${missingRequiredVariables.length} required variable${
                      missingRequiredVariables.length === 1 ? '' : 's'
                  } missing.`
                : `All required variables present.`
        );
    chart.containers.warningOptional
        .classed('df-data-check__warning--missing', missingOptionalVariables.length > 0)
        .classed('df-hidden', missingVariables.length === 0)
        .text(
            missingOptionalVariables.length > 0
                ? `${missingOptionalVariables.length} optional variable${
                      missingOptionalVariables.length === 1 ? '' : 's'
                  } missing.`
                : `All optional variables present.`
        );
}
