export default {
    "title": "settings",
    "chart": "forms",
    "description": "JSON schema for the configuration of forms chart",
    "overview": "The most straightforward way to customize forms chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the forms chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the forms chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the forms chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.",
    "version": "0.1.0",
    "type": "object",
    "properties": {
        "site_col": {
            "title": "Site Variable",
            "description": "site variable name",
            "type": "string",
            "default": "site_name",
            "data-mapping": true,
            "data-type": "string",
            "required": true
        },
        "status_col": {
            "title": "Form Status Variable",
            "description": "form status variable name",
            "type": "string",
            "default": "form_status",
            "data-mapping": true,
            "data-type": "string",
            "required": true
        }
    }
};
