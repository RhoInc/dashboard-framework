export default function updateWarning(chart) {
    const missingRequiredVariables = chart.variables.schema
        .filter(variable => variable.required && variable.missing);
    chart.containers.warning
        .classed('df-data-check__warning--missing', missingRequiredVariables.length > 0)
        .text(
            missingRequiredVariables.length > 0
                ? `${
                        missingRequiredVariables.length
                    } required variable${
                        missingRequiredVariables.length === 1 ? '' : 's'
                    } missing:`
                : `All required variables present.`
        );
}
