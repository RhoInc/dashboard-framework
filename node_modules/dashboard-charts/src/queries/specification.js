import schema from './settings-schema';
import configuration from './configuration/index';
import callbacks from './callbacks/index';

export default function specification() {
    const syncedSettings = configuration.syncSettings(configuration.settings);
    const syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs(), syncedSettings);

    return {
        schema,
        settings: syncedSettings,
        controlInputs: syncedControlInputs,
        callbacks,
    };
}
