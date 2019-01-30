import configuration from './configuration/index';
import { createControls, createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function enrollment(element = 'body', settings = {}) {
    //Sync settings.
    const mergedSettings = Object.assign({}, configuration.settings, settings);
    const syncedSettings = configuration.syncSettings(mergedSettings);
    const syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs(), syncedSettings);

    //Define controls and chart.
    const controls = createControls(
        element,
        {
            location: 'top',
            inputs: syncedControlInputs
        }
    );
    const chart = createChart(
        element,
        syncedSettings,
        controls
    );

    //Attach callbacks to chart.
    for (const callback in callbacks)
        chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    return chart;
}
