The most straightforward way to customize the visit completion chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the visit completion chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the visit completion chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the visit completion chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each visit setting as of version 0.1.0.

## settings.site_name
`string`

site variable name

**default:** `"site_name"`



## settings.visit_name
`string`

visit variable name

**default:** `"visit_name"`



## settings.visit_status
`string`

visit status variable name

**default:** `"visit_status"`



## settings.visit_number
`string`

visit number variable name (provides order for visits)

**default:** `"visit_number"`



## settings.site_filter
`boolean`

allow filtering of sites

**default:** `true`



## settings.y_toggle
`boolean`

allows for toggling between 'N' and '%' for the Y axis

**default:** `true`

# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{    resizable: false,    width: 500,    height: 350,    x: {        label: '',        type: 'ordinal',        column: null, // set in syncSettings        domain: [            'SCRN',            'RAND',            'V2',            'V3',            'V4',            'V5',            'V6',            'V7',            'V8',            'V9',            'V10',            'V11',            'V12',            'V13',            'V14'        ]    },    y: {        label: '',        type: 'linear',        column: null, // set in syncSettings        behavior: 'flex',        domain: [0, null]    },    marks: [        {            arrange: 'stacked',            split: null, // set in syncSettings            type: 'bar',            per: [], // set in syncSettings            attributes: { 'fill-opacity': 0.8 },            summarizeY: 'count',            tooltip: null // set in syncSettings        }    ],    color_dom: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed'],    color_by: null, // set in syncSettings    colors: ['rgb(102,194,165)', 'rgb(43,131,186)', '#fecc5c', '#E87F00', 'red', '#9933ff'],    legend: {        label: '',        order: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed']    }}
```