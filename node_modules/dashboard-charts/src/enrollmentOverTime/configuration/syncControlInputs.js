export default function syncControlInputs(controlInputs, settings) {
    controlInputs.find(controlInput => controlInput.label === 'Site').value_col = settings.site_col;

    return controlInputs;
}
