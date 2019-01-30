The most straightforward way to customize forms chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the forms chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the forms chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the forms chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each forms setting as of version 0.1.0.

## settings.site_name
`string`

site variable name

**default:** `"site_name"`



## settings.form_status
`string`

form status variable name

**default:** `"form_status"`



## settings.y_toggle
`boolean`

allows for toggling between 'N' and '%' for the Y axis

**default:** `true`

# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{    resizable: false,    width: 500,    height: 350,    y: {        type: 'linear',        behavior: 'firstfilter'    },    x: {        column: null, // set in syncSettings        type: 'ordinal',        label: ''        //      "domain": ["Boston", "MUSC", "UCLA", "Pittsburgh", "Houston", "Michigan", "HSS", "Georgetown"]    },    marks: [        {            arrange: 'stacked',            split: null, // set in syncSettings            type: 'bar',            per: [], // set in syncSettings            summarizeY: 'percent',            tooltip: '$y'        }    ],    color_by: null, // set in syncSettings    colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],    legend: {        label: '',        order: ['Received', 'Outstanding <= 90 days', 'Outstanding > 90 days']    }}
```