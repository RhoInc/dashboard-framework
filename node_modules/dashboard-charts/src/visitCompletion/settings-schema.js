export default {
    "title": "settings",
    "chart": "visitCompletion",
    "description": "JSON schema for the configuration of visit completion chart",
    "overview": "The most straightforward way to customize the visit completion chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the visit completion chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the visit completion chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the visit completion chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.",
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
        "visit_col": {
            "title": "Visit Variable",
            "description": "visit variable name",
            "type": "string",
            "default": "visit_name",
            "data-mapping": true,
            "data-type": "string",
            "required": true
        },
        "visit_number_col": {
            "title": "Visit Number Variable",
            "description": "visit number variable name (provides order for visits)",
            "type": "string",
            "default": "visit_number",
            "data-mapping": true,
            "data-type": "string",
            "required": true
        },
        "status_col": {
            "title": "Visit Status Variable",
            "description": "visit status variable name",
            "type": "string",
            "default": "visit_status",
            "data-mapping": true,
            "data-type": "string",
            "required": true
        }
    }
};
