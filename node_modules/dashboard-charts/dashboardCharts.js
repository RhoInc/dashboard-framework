(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['webcharts'], factory) :
	(global.dashboardCharts = factory(global.webCharts));
}(this, (function (webcharts) { 'use strict';

if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }

            return to;
        },
        writable: true,
        configurable: true
    });
}

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, 'length')).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

var schema = {
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
};

function rendererSettings() {
    return {
        site_col: 'site_name',
        status_col: 'status'
    };
}

function webchartsSettings() {
    return {
        colors: ['#2b8cbe', '#a6bddb'],
        resizable: false,
        width: 500,
        height: 350,

        y: {
            label: '',
            type: 'ordinal',
            column: null // set in syncSettings
        },
        x: {
            label: '',
            type: 'linear',
            column: null, // set in syncSettings
            behavior: 'firstfilter',
            domain: [0, null],
            format: '1d'
        },
        marks: [{
            arrange: 'nested',
            split: null, // set in syncSettings
            type: 'bar',
            per: [], // set in syncSettings
            attributes: { 'fill-opacity': 0.8 },
            summarizeX: 'count',
            tooltip: '' // set in syncSettings status
        }],
        color_by: null, // set in syncSettings
        color_dom: ['Randomized', 'Screened'],
        legend: {
            label: '',
            order: ['Randomized', 'Screened']
        }
    };
}

function syncSettings(settings) {
    settings.x.column = settings.status_col;
    settings.y.column = settings.site_col;
    settings.marks[0].split = settings.status_col;
    settings.marks[0].per[0] = settings.site_col;
    settings.marks[0].tooltip = '[' + settings.status_col + ']: $x';
    settings.color_by = settings.status_col;

    return settings;
}

function controlInputs() {
    return [];
}

function syncControlInputs(controlInputs, settings) {
    return controlInputs;
}

var configuration = {
    rendererSettings: rendererSettings,
    webchartsSettings: webchartsSettings,
    settings: Object.assign({}, webchartsSettings(), rendererSettings()),
    syncSettings: syncSettings,
    controlInputs: controlInputs,
    syncControlInputs: syncControlInputs
};

function onInit() {}

function onLayout() {}

function onPreprocess() {}

function onDatatransform() {}

function onDraw() {}

function onResize() {
    var context = this;

    //Add population totals to legend labels.
    this.wrap.selectAll('.legend-label').each(function (d) {
        d3.select(this).text(d.label + ' (' + context.raw_data.filter(function (di) {
            return di.status === d.label;
        }).length + ')');
    });
}

function onDestroy() {}

var callbacks = {
    onInit: onInit,
    onLayout: onLayout,
    onPreprocess: onPreprocess,
    onDatatransform: onDatatransform,
    onDraw: onDraw,
    onResize: onResize,
    onDestroy: onDestroy
};

function specification() {
    var syncedSettings = configuration.syncSettings(configuration.settings);
    var syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs(), syncedSettings);

    return {
        schema: schema,
        settings: syncedSettings,
        controlInputs: syncedControlInputs,
        callbacks: callbacks
    };
}

var schema$1 = {
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

function rendererSettings$1() {
    return {
        site_col: 'site_name',
        visit_col: 'visit_name',
        visit_number_col: 'visit_number',
        status_col: 'visit_status'
    };
}

function webchartsSettings$1() {
    return {
        resizable: false,
        width: 500,
        height: 350,

        x: {
            label: '',
            type: 'ordinal',
            column: null // set in syncSettings
        },
        y: {
            label: '',
            type: 'linear',
            column: null, // set in syncSettings
            behavior: 'flex',
            domain: [0, null]
        },
        marks: [{
            arrange: 'stacked',
            split: null, // set in syncSettings
            type: 'bar',
            per: [], // set in syncSettings
            summarizeY: 'count',
            tooltip: null // set in syncSettings
        }],
        color_dom: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed'],
        color_by: null, // set in syncSettings
        colors: ['rgb(102,194,165)', 'rgb(43,131,186)', '#fecc5c', '#E87F00', 'red', '#9933ff'],
        legend: {
            label: '',
            order: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed']
        },
        margin: {
            left: 50
        }
    };
}

function syncSettings$1(settings) {
    settings.x.column = settings.visit_col;
    settings.y.column = settings.status_col;
    settings.marks[0].split = settings.status_col;
    settings.marks[0].per[0] = settings.visit_col;
    settings.marks[0].tooltip = '[' + settings.status_col + ']: $y';
    settings.color_by = settings.status_col;

    return settings;
}

function controlInputs$1() {
    return [{
        type: 'subsetter',
        value_col: null, // set in syncControlInputs()
        label: 'Site',
        require: true
    }, {
        label: '',
        type: 'radio',
        option: 'marks[0].summarizeY',
        values: ['percent', 'count'],
        relabels: ['%', 'N']
    }];
}

function syncControlInputs$1(controlInputs, settings) {
    controlInputs.find(function (controlInput) {
        return controlInput.label === 'Site';
    }).value_col = settings.site_col;
    return controlInputs;
}

var configuration$1 = {
    rendererSettings: rendererSettings$1,
    webchartsSettings: webchartsSettings$1,
    settings: Object.assign({}, webchartsSettings$1(), rendererSettings$1()),
    syncSettings: syncSettings$1,
    controlInputs: controlInputs$1,
    syncControlInputs: syncControlInputs$1
};

function onInit$1() {}

function onLayout$1() {}

function onPreprocess$1() {}

function onDatatransform$1() {}

function onDraw$1() {
    var summarizeY = this.config.marks[0].summarizeY;
    if (summarizeY === 'count') this.config.y.format = '1d';else if (summarizeY === 'percent') this.config.y.format = '%';else this.config.y.format = null;
}

function onResize$1() {}

function onDestroy$1() {}

var callbacks$1 = {
    onInit: onInit$1,
    onLayout: onLayout$1,
    onPreprocess: onPreprocess$1,
    onDatatransform: onDatatransform$1,
    onDraw: onDraw$1,
    onResize: onResize$1,
    onDestroy: onDestroy$1
};

function specification$1() {
    var syncedSettings = configuration$1.syncSettings(configuration$1.settings);
    var syncedControlInputs = configuration$1.syncControlInputs(configuration$1.controlInputs(), syncedSettings);

    return {
        schema: schema$1,
        settings: syncedSettings,
        controlInputs: syncedControlInputs,
        callbacks: callbacks$1
    };
}

var schema$2 = {
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
};

function rendererSettings$2() {
    return {
        site_col: 'site_name',
        status_col: 'query_status'
    };
}

function webchartsSettings$2() {
    return {
        resizable: false,
        width: 500,
        height: 350,

        y: {
            type: 'linear',
            behavior: 'firstfilter',
            format: '1d'
        },
        x: {
            column: null, // set in syncSettings
            type: 'ordinal',
            label: ''
        },
        marks: [{
            arrange: 'stacked',
            split: null, // set in syncSettings
            type: 'bar',
            per: [], // set in syncSettings
            summarizeY: 'percent',
            tooltip: '$y'
        }],
        color_by: null, // set in syncSettings
        colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
        legend: {
            label: '',
            order: ['Resolved', 'Outstanding <= 90 days', 'Outstanding > 90 days']
        },
        margin: {
            left: 50
        }
    };
}

function syncSettings$2(settings) {
    settings.x.column = settings.site_col;
    settings.marks[0].split = settings.status_col;
    settings.marks[0].per[0] = settings.site_col;
    settings.color_by = settings.status_col;

    return settings;
}

function controlInputs$2() {
    return [{
        label: '',
        type: 'radio',
        option: 'marks[0].summarizeY',
        values: ['percent', 'count'],
        relabels: ['%', 'N']
    }];
}

function syncControlInputs$2(controlInputs, settings) {
    return controlInputs;
}

var configuration$2 = {
    rendererSettings: rendererSettings$2,
    webchartsSettings: webchartsSettings$2,
    settings: Object.assign({}, webchartsSettings$2(), rendererSettings$2()),
    syncSettings: syncSettings$2,
    controlInputs: controlInputs$2,
    syncControlInputs: syncControlInputs$2
};

function onInit$2() {}

function onLayout$2() {}

function onPreprocess$2() {}

function onDatatransform$2() {}

function onDraw$2() {
    var summarizeY = this.config.marks[0].summarizeY;
    if (summarizeY === 'count') this.config.y.format = '1d';else if (summarizeY === 'percent') this.config.y.format = '%';else this.config.y.format = null;
}

function onResize$2() {}

function onDestroy$2() {}

var callbacks$2 = {
    onInit: onInit$2,
    onLayout: onLayout$2,
    onPreprocess: onPreprocess$2,
    onDatatransform: onDatatransform$2,
    onDraw: onDraw$2,
    onResize: onResize$2,
    onDestroy: onDestroy$2
};

function specification$2() {
    var syncedSettings = configuration$2.syncSettings(configuration$2.settings);
    var syncedControlInputs = configuration$2.syncControlInputs(configuration$2.controlInputs(), syncedSettings);

    return {
        schema: schema$2,
        settings: syncedSettings,
        controlInputs: syncedControlInputs,
        callbacks: callbacks$2
    };
}

var schema$3 = {
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
};

function rendererSettings$3() {
    return {
        site_col: 'site_name',
        date_col: 'date',
        status_col: 'status',
        number_participants_col: 'number_participants'
    };
}

function webchartsSettings$3() {
    return {
        resizable: false,
        width: 500,
        height: 350,

        y: {
            column: null, // set in syncSettings
            type: 'linear',
            behavior: 'firstfilter',
            label: ''
        },
        x: {
            column: null, // set in syncSettings
            type: 'time',
            label: '',
            format: '%b-%y'
        },
        marks: [{
            type: 'line',
            per: [], // set in syncSettings
            summarizeY: 'sum',
            tooltip: '$y'
        }],
        date_format: '%Y-%m-%d',
        color_by: null, // set in syncSettings
        colors: ['#2b8cbe', '#a6bddb'],
        legend: {
            label: ''
        }
    };
}

function syncSettings$3(settings) {
    settings.x.column = settings.date_col;
    settings.y.column = settings.number_participants_col;
    settings.marks[0].per[0] = settings.status_col;
    settings.color_by = settings.status_col;

    return settings;
}

function controlInputs$3() {
    return [{
        type: 'subsetter',
        value_col: null, // set in syncControlInputs()
        label: 'Site',
        require: true
    }];
}

function syncControlInputs$3(controlInputs, settings) {
    controlInputs.find(function (controlInput) {
        return controlInput.label === 'Site';
    }).value_col = settings.site_col;

    return controlInputs;
}

var configuration$3 = {
    rendererSettings: rendererSettings$3,
    webchartsSettings: webchartsSettings$3,
    settings: Object.assign({}, webchartsSettings$3(), rendererSettings$3()),
    syncSettings: syncSettings$3,
    controlInputs: controlInputs$3,
    syncControlInputs: syncControlInputs$3
};

function onInit$3() {}

function onLayout$3() {}

function onPreprocess$3() {}

function onDatatransform$3() {}

function onDraw$3() {}

function onResize$3() {
    var context = this;
    this.svg.selectAll('.y.axis .tick text').each(function (d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
    //Capture x/y coordinates of mouse.
    var timeFormat = d3.time.format('%d %b %Y');
    var width = this.plot_width;
    var x = this.x;
    var decim = d3.format('.0f');

    var x_mark = this.svg.select('.x.axis').append('g').attr('class', 'hover-item hover-tick hover-tick-x').style('display', 'none');
    x_mark.append('line').attr({
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0,
        stroke: '#ddd'
    });
    x_mark.append('text').attr({
        x: 0,
        y: 0,
        dx: '.5em',
        dy: '-.5em'
    });
    x_mark.select('line').attr('y1', -this.plot_height);

    this.svg.on('mousemove', function () {
        var mouse = this;

        context.current_data.forEach(function (e) {
            var line_data = e.values;
            var bisectDate = d3.bisector(function (d) {
                return new Date(d.key);
            }).right;
            var x0 = context.x.invert(d3.mouse(mouse)[0]);
            var i = bisectDate(line_data, x0, 1, line_data.length - 1);
            var d0 = line_data[i - 1];
            var d1 = line_data[i];

            if (!d0 || !d1) return;

            var d = x0 - new Date(d0.key) > new Date(d1.key) - x0 ? d1 : d0;
            var hover_tick_x = context.svg.select('.hover-tick-x');
            var focus_enr = context.svg.selectAll('.focus').filter(function (f) {
                return f.key === e.key;
            });

            hover_tick_x.select('text').text(timeFormat(x0)).attr('text-anchor', x(x0) > width / 2 ? 'end' : 'start').attr('dx', x(x0) > width / 2 ? '-.5em' : '.5em');

            var leg_item = context.wrap.select('.legend').selectAll('.legend-item').filter(function (f) {
                return f.label === e.key;
            });

            leg_item.select('.legend-mark-text').text(d.values.y || d.values.y === 0 ? decim(d.values.y) : null);
            hover_tick_x.attr('transform', 'translate(' + x(x0) + ',0)');
        });
    }).on('mouseover', function () {
        context.svg.selectAll('.hover-item').style('display', 'block');
        var leg_items = context.wrap.select('.legend').selectAll('.legend-item');
        leg_items.select('.legend-color-block').style('display', 'none');
        leg_items.select('.legend-mark-text').style('display', 'inline');
    }).on('mouseout', function () {
        context.svg.selectAll('.hover-item').style('display', 'none');
        var leg_items = context.legend.selectAll('.legend-item');
        leg_items.select('.legend-color-block').style('display', 'inline-block');
        leg_items.select('.legend-mark-text').style('display', 'none');
    });
}

function onDestroy$3() {}

var callbacks$3 = {
    onInit: onInit$3,
    onLayout: onLayout$3,
    onPreprocess: onPreprocess$3,
    onDatatransform: onDatatransform$3,
    onDraw: onDraw$3,
    onResize: onResize$3,
    onDestroy: onDestroy$3
};

function specification$3() {
    var syncedSettings = configuration$3.syncSettings(configuration$3.settings);
    var syncedControlInputs = configuration$3.syncControlInputs(configuration$3.controlInputs(), syncedSettings);

    return {
        schema: schema$3,
        settings: syncedSettings,
        controlInputs: syncedControlInputs,
        callbacks: callbacks$3
    };
}

var schema$4 = {
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

function rendererSettings$4() {
    return {
        site_col: 'site_name',
        status_col: 'form_status'
    };
}

function webchartsSettings$4() {
    return {
        resizable: false,
        width: 500,
        height: 350,

        y: {
            type: 'linear',
            behavior: 'firstfilter'
        },
        x: {
            column: null, // set in syncSettings
            type: 'ordinal',
            label: ''
        },
        marks: [{
            arrange: 'stacked',
            split: null, // set in syncSettings
            type: 'bar',
            per: [], // set in syncSettings
            summarizeY: 'percent',
            tooltip: '$y'
        }],
        color_by: null, // set in syncSettings
        colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
        legend: {
            label: '',
            order: ['Received', 'Outstanding <= 90 days', 'Outstanding > 90 days']
        },
        margin: {
            left: 50
        }
    };
}

function syncSettings$4(settings) {
    settings.x.column = settings.site_col;
    settings.marks[0].split = settings.status_col;
    settings.marks[0].per[0] = settings.site_col;
    settings.color_by = settings.status_col;

    return settings;
}

function controlInputs$4() {
    return [{
        label: '',
        type: 'radio',
        option: 'marks[0].summarizeY',
        values: ['percent', 'count'],
        relabels: ['%', 'N']
    }];
}

function syncControlInputs$4(controlInputs, settings) {
    return controlInputs;
}

var configuration$4 = {
    rendererSettings: rendererSettings$4,
    webchartsSettings: webchartsSettings$4,
    settings: Object.assign({}, webchartsSettings$4(), rendererSettings$4()),
    syncSettings: syncSettings$4,
    controlInputs: controlInputs$4,
    syncControlInputs: syncControlInputs$4
};

function onInit$4() {}

function onLayout$4() {}

function onPreprocess$4() {}

function onDatatransform$4() {}

function onDraw$4() {
    var summarizeY = this.config.marks[0].summarizeY;
    if (summarizeY === 'count') this.config.y.format = '1d';else if (summarizeY === 'percent') this.config.y.format = '%';else this.config.y.format = null;
}

function onResize$4() {}

function onDestroy$4() {}

var callbacks$4 = {
    onInit: onInit$4,
    onLayout: onLayout$4,
    onPreprocess: onPreprocess$4,
    onDatatransform: onDatatransform$4,
    onDraw: onDraw$4,
    onResize: onResize$4,
    onDestroy: onDestroy$4
};

function specification$4() {
    var syncedSettings = configuration$4.syncSettings(configuration$4.settings);
    var syncedControlInputs = configuration$4.syncControlInputs(configuration$4.controlInputs(), syncedSettings);

    return {
        schema: schema$4,
        settings: syncedSettings,
        controlInputs: syncedControlInputs,
        callbacks: callbacks$4
    };
}

var specifications = {
    enrollment: specification(),
    visitCompletion: specification$1(),
    queries: specification$2(),
    enrollmentOverTime: specification$3(),
    forms: specification$4()
};

function enrollment() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    //Sync settings.
    var mergedSettings = Object.assign({}, configuration.settings, settings);
    var syncedSettings = configuration.syncSettings(mergedSettings);
    var syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs(), syncedSettings);

    //Define controls and chart.
    var controls = webcharts.createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    //Attach callbacks to chart.
    for (var callback in callbacks) {
        chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);
    }return chart;
}

function enrollment$1() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    //Sync settings.
    var mergedSettings = Object.assign({}, configuration$1.settings, settings);
    var syncedSettings = configuration$1.syncSettings(mergedSettings);
    var syncedControlInputs = configuration$1.syncControlInputs(configuration$1.controlInputs(), syncedSettings);

    //Define controls and chart.
    var controls = webcharts.createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    //Attach callbacks to chart.
    for (var callback in callbacks$1) {
        chart.on(callback.substring(2).toLowerCase(), callbacks$1[callback]);
    }return chart;
}

function enrollment$2() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    //Sync settings.
    var mergedSettings = Object.assign({}, configuration$2.settings, settings);
    var syncedSettings = configuration$2.syncSettings(mergedSettings);
    var syncedControlInputs = configuration$2.syncControlInputs(configuration$2.controlInputs(), syncedSettings);

    //Define controls and chart.
    var controls = webcharts.createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    //Attach callbacks to chart.
    for (var callback in callbacks$2) {
        chart.on(callback.substring(2).toLowerCase(), callbacks$2[callback]);
    }return chart;
}

function enrollmentOverTime() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    //Sync settings.
    var mergedSettings = Object.assign({}, configuration$3.settings, settings);
    var syncedSettings = configuration$3.syncSettings(mergedSettings);
    var syncedControlInputs = configuration$3.syncControlInputs(configuration$3.controlInputs(), syncedSettings);

    //Define controls and chart.
    var controls = webcharts.createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    //Attach callbacks to chart.
    for (var callback in callbacks$3) {
        chart.on(callback.substring(2).toLowerCase(), callbacks$3[callback]);
    }return chart;
}

function enrollment$3() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    //Sync settings.
    var mergedSettings = Object.assign({}, configuration$4.settings, settings);
    var syncedSettings = configuration$4.syncSettings(mergedSettings);
    var syncedControlInputs = configuration$4.syncControlInputs(configuration$4.controlInputs(), syncedSettings);

    //Define controls and chart.
    var controls = webcharts.createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    //Attach callbacks to chart.
    for (var callback in callbacks$4) {
        chart.on(callback.substring(2).toLowerCase(), callbacks$4[callback]);
    }return chart;
}

var dashboardCharts = {
    enrollment: enrollment,
    visitCompletion: enrollment$1,
    queries: enrollment$2,
    enrollmentOverTime: enrollmentOverTime,
    forms: enrollment$3
};

Object.defineProperty(dashboardCharts, 'specifications', {
    value: specifications,
    enumerable: false
});

return dashboardCharts;

})));
