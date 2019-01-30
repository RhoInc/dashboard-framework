export default {
    "enrollment": {
        "schema": {
            "title": "settings",
            "chart": "enrollment",
            "description": "JSON schema for the configuration of screening and randomization chart",
            "overview": "The most straightforward way to customize the screening and randomization chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the screening and randomization chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the screening and randomization chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the screening and randomization chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.",
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
                    "title": "Status Variable",
                    "description": "status variable name",
                    "type": "string",
                    "default": "status",
                    "data-mapping": true,
                    "data-type": "string",
                    "required": true
                }
            }
        },
        "settings": {
            "colors": [
                "#2b8cbe",
                "#a6bddb"
            ],
            "resizable": false,
            "width": 500,
            "height": 350,
            "y": {
                "label": "",
                "type": "ordinal",
                "column": "site_name"
            },
            "x": {
                "label": "",
                "type": "linear",
                "column": "status",
                "behavior": "firstfilter",
                "domain": [
                    0,
                    null
                ],
                "format": "1d"
            },
            "marks": [
                {
                    "arrange": "nested",
                    "split": "status",
                    "type": "bar",
                    "per": [
                        "site_name"
                    ],
                    "attributes": {
                        "fill-opacity": 0.8
                    },
                    "summarizeX": "count",
                    "tooltip": "[status]: $x"
                }
            ],
            "color_by": "status",
            "color_dom": [
                "Randomized",
                "Screened"
            ],
            "legend": {
                "label": "",
                "order": [
                    "Randomized",
                    "Screened"
                ]
            },
            "site_col": "site_name",
            "status_col": "status"
        },
        "controlInputs": [],
        "callbacks": {}
    },
    "visitCompletion": {
        "schema": {
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
        },
        "settings": {
            "resizable": false,
            "width": 500,
            "height": 350,
            "x": {
                "label": "",
                "type": "ordinal",
                "column": "visit_name"
            },
            "y": {
                "label": "",
                "type": "linear",
                "column": "visit_status",
                "behavior": "flex",
                "domain": [
                    0,
                    null
                ]
            },
            "marks": [
                {
                    "arrange": "stacked",
                    "split": "visit_status",
                    "type": "bar",
                    "per": [
                        "visit_name"
                    ],
                    "summarizeY": "count",
                    "tooltip": "[visit_status]: $y"
                }
            ],
            "color_dom": [
                "In Window",
                "Expected",
                "Out of Window",
                "Overdue",
                "Missed"
            ],
            "color_by": "visit_status",
            "colors": [
                "rgb(102,194,165)",
                "rgb(43,131,186)",
                "#fecc5c",
                "#E87F00",
                "red",
                "#9933ff"
            ],
            "legend": {
                "label": "",
                "order": [
                    "In Window",
                    "Expected",
                    "Out of Window",
                    "Overdue",
                    "Missed"
                ]
            },
            "margin": {
                "left": 50
            },
            "site_col": "site_name",
            "visit_col": "visit_name",
            "visit_number_col": "visit_number",
            "status_col": "visit_status"
        },
        "controlInputs": [
            {
                "type": "subsetter",
                "value_col": "site_name",
                "label": "Site",
                "require": true
            },
            {
                "label": "",
                "type": "radio",
                "option": "marks[0].summarizeY",
                "values": [
                    "percent",
                    "count"
                ],
                "relabels": [
                    "%",
                    "N"
                ]
            }
        ],
        "callbacks": {}
    },
    "queries": {
        "schema": {
            "title": "settings",
            "chart": "queries",
            "description": "JSON schema for the configuration of queries chart",
            "overview": "The most straightforward way to customize queries chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the query chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the query chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the query chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.",
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
                    "title": "Query Status Variable",
                    "description": "query status variable name",
                    "type": "string",
                    "default": "query_status",
                    "data-mapping": true,
                    "data-type": "string",
                    "required": true
                }
            }
        },
        "settings": {
            "resizable": false,
            "width": 500,
            "height": 350,
            "y": {
                "type": "linear",
                "behavior": "firstfilter",
                "format": "1d"
            },
            "x": {
                "column": "site_name",
                "type": "ordinal",
                "label": ""
            },
            "marks": [
                {
                    "arrange": "stacked",
                    "split": "query_status",
                    "type": "bar",
                    "per": [
                        "site_name"
                    ],
                    "summarizeY": "percent",
                    "tooltip": "$y"
                }
            ],
            "color_by": "query_status",
            "colors": [
                "rgb(102,194,165)",
                "#fecc5c",
                "#e34a33"
            ],
            "legend": {
                "label": "",
                "order": [
                    "Resolved",
                    "Outstanding <= 90 days",
                    "Outstanding > 90 days"
                ]
            },
            "margin": {
                "left": 50
            },
            "site_col": "site_name",
            "status_col": "query_status"
        },
        "controlInputs": [
            {
                "label": "",
                "type": "radio",
                "option": "marks[0].summarizeY",
                "values": [
                    "percent",
                    "count"
                ],
                "relabels": [
                    "%",
                    "N"
                ]
            }
        ],
        "callbacks": {}
    },
    "enrollmentOverTime": {
        "schema": {
            "title": "settings",
            "description": "JSON schema for the configuration of enrollment chart",
            "overview": "The most straightforward way to customize the enrollment chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the enrollment chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to te enrollment chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.",
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
                "date_col": {
                    "title": "Date Variable",
                    "description": "date variable name in YYYY-MM-DD format",
                    "type": "string",
                    "default": "date",
                    "data-mapping": true,
                    "data-type": "string",
                    "required": true
                },
                "status_col": {
                    "title": "Status Variable",
                    "description": "status variable name",
                    "type": "string",
                    "default": "status",
                    "data-mapping": true,
                    "data-type": "string",
                    "required": true
                },
                "number_participants_col": {
                    "title": "Participant Count Variable",
                    "description": "participant count variable name",
                    "type": "string",
                    "default": "number_participants",
                    "data-mapping": true,
                    "data-type": "string",
                    "required": true
                }
            }
        },
        "settings": {
            "resizable": false,
            "width": 500,
            "height": 350,
            "y": {
                "column": "number_participants",
                "type": "linear",
                "behavior": "firstfilter",
                "label": ""
            },
            "x": {
                "column": "date",
                "type": "time",
                "label": "",
                "format": "%b-%y"
            },
            "marks": [
                {
                    "type": "line",
                    "per": [
                        "status"
                    ],
                    "summarizeY": "sum",
                    "tooltip": "$y"
                }
            ],
            "date_format": "%Y-%m-%d",
            "color_by": "status",
            "colors": [
                "#2b8cbe",
                "#a6bddb"
            ],
            "legend": {
                "label": ""
            },
            "site_col": "site_name",
            "date_col": "date",
            "status_col": "status",
            "number_participants_col": "number_participants"
        },
        "controlInputs": [
            {
                "type": "subsetter",
                "value_col": "site_name",
                "label": "Site",
                "require": true
            }
        ],
        "callbacks": {}
    },
    "forms": {
        "schema": {
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
        },
        "settings": {
            "resizable": false,
            "width": 500,
            "height": 350,
            "y": {
                "type": "linear",
                "behavior": "firstfilter"
            },
            "x": {
                "column": "site_name",
                "type": "ordinal",
                "label": ""
            },
            "marks": [
                {
                    "arrange": "stacked",
                    "split": "form_status",
                    "type": "bar",
                    "per": [
                        "site_name"
                    ],
                    "summarizeY": "percent",
                    "tooltip": "$y"
                }
            ],
            "color_by": "form_status",
            "colors": [
                "rgb(102,194,165)",
                "#fecc5c",
                "#e34a33"
            ],
            "legend": {
                "label": "",
                "order": [
                    "Received",
                    "Outstanding <= 90 days",
                    "Outstanding > 90 days"
                ]
            },
            "margin": {
                "left": 50
            },
            "site_col": "site_name",
            "status_col": "form_status"
        },
        "controlInputs": [
            {
                "label": "",
                "type": "radio",
                "option": "marks[0].summarizeY",
                "values": [
                    "percent",
                    "count"
                ],
                "relabels": [
                    "%",
                    "N"
                ]
            }
        ],
        "callbacks": {}
    }
};
