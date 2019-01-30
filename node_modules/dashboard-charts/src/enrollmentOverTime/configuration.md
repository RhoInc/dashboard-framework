The most straightforward way to customize the enrollment chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the enrollment chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to te enrollment chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each enrollment setting as of version 0.1.0.

## settings.site_name
`string`

site variable name

**default:** `"site_name"`



## settings.date
`string`

date variable name in YYYY-MM-DD format

**default:** `"date"`



## settings.status
`string`

participant count variable name

**default:** `"number_participants"`



## settings.site_filter
`boolean`

allow filtering of sites

**default:** `true`

# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{    resizable: false,    width: 500,    height: 350,    y: {        column: null, // set in syncSettings        type: 'linear',        behavior: 'firstfilter',        label: ''    },    x: {        column: null, // set in syncSettings        type: 'time',        label: '',        format: '%b-%y'    },    marks: [        {            type: 'line',            per: [], // set in syncSettings            summarizeY: 'sum',            tooltip: '$y'        }    ],    date_format: '%Y-%m-%d',    color_by: null, // set in syncSettings    colors: ['#2b8cbe', '#a6bddb'],    legend: {        label: ''    }}
```