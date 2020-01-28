(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(
              require('d3'),
              require('dashboardCharts'),
              require('webcharts')
          ))
        : typeof define === 'function' && define.amd
        ? define(['d3', 'dashboardCharts', 'webcharts'], factory)
        : ((global = global || self),
          (global.dashboardFramework = factory(
              global.d3,
              global.dashboardCharts,
              global.webCharts
          )));
})(this, function(d3, dashboardCharts, webcharts) {
    'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
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

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, 'length')).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return undefined.

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

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return -1.

                return -1;
            }
        });
    }

    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        }
    }

    function _iterableToArray(iter) {
        if (
            Symbol.iterator in Object(iter) ||
            Object.prototype.toString.call(iter) === '[object Arguments]'
        )
            return Array.from(iter);
    }

    function _nonIterableSpread() {
        throw new TypeError('Invalid attempt to spread non-iterable instance');
    }

    function clone(obj) {
        var copy; //boolean, number, string, null, undefined

        if ('object' != _typeof(obj) || null == obj) return obj; //date

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        } //array

        if (obj instanceof Array) {
            copy = [];

            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }

            return copy;
        } //object

        if (obj instanceof Object) {
            copy = {};

            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }

            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function stringAccessor(object, option, value) {
        var a = option
            .replace(/\[(\w+)\]/g, '.$1')
            .replace(/^\./, '')
            .split('.');

        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];

            if (k in object) {
                if (i == n - 1 && value !== undefined) object[k] = value;
                object = object[k];
            } else {
                return;
            }
        }

        return object;
    }

    function layout() {
        this.containers = {
            main: d3
                .select(this.element)
                .append('div')
                .datum(this)
                .classed('dashboard-framework', true)
                .attr(
                    'id',
                    'dashboard-framework'.concat(d3.selectAll('.dashboard-framework').size() + 1)
                )
        };
    }

    function settings(specification) {
        //settings - exists
        if (!specification.hasOwnProperty('settings')) {
            console.warn('Chart specification requires a [ settings ] property.');
            specification.continue = false;
            return;
        } //settings - valid type

        if (_typeof(specification.settings) !== 'object' || specification.settings === null) {
            console.warn('[ settings ] property of chart specification must be an object.');
            specification.continue = false;
            return;
        }
    }

    function data$1(specification) {
        //data - exists
        if (!specification.hasOwnProperty('data')) {
            console.warn('Chart specification requires a [ data ] property.');
            specification.continue = false;
            return;
        } //data - valid type

        if (!(typeof specification.data === 'string' || Array.isArray(specification.data))) {
            console.warn(
                '[ data ] property of chart specification must be an array or a path to a .csv file.'
            );
            specification.continue = false;
            return;
        }
    }

    function title(specification) {
        //title - exists
        if (!specification.hasOwnProperty('title')) {
            specification.title = ''
                .concat(specification.settings.x.label || specification.settings.x.column, ' by ')
                .concat(specification.settings.y.label || specification.settings.y.column);
            console.log(
                '[ title ] property of chart specification is missing. Defaulting to "'.concat(
                    specification.title,
                    '".'
                )
            );
        }
    }

    function controlInputs(specification) {
        //controlInputs - exists
        if (!specification.hasOwnProperty('controlInputs')) {
            console.log('[ controlInputs ] property of chart specification is missing.');
            specification.controlInputs = [];
        } //controlInputs - valid type

        if (!Array.isArray(specification.controlInputs)) {
            console.warn('[ controlInputs ] property of chart specification must be an array');
            specification.controlInputs = [];
        } //controlInputs - valid items

        specification.controlInputs = specification.controlInputs.filter(function(controlInput, i) {
            var isObject =
                _typeof(controlInput) === 'object' &&
                controlInput !== null &&
                !Array.isArray(controlInput);
            if (!isObject)
                console.warn(
                    'Items of [ controlInputs ] property must be objects. Removing `'.concat(
                        JSON.stringify(controlInput),
                        '`.'
                    )
                );
            return isObject;
        });
    }

    function callbacks(specification) {
        //callbacks - exists
        if (!specification.hasOwnProperty('callbacks')) {
            console.log('[ callbacks ] property of chart specification is missing.');
            specification.callbacks = {};
        } //callbacks - valid type

        if (_typeof(specification.callbacks) !== 'object' || specification.callbacks === null) {
            console.warn('[ callbacks ] property of chart specification must be an object.');
            specification.callbacks = {};
        } //callbacks - valid properties

        specification.callbacks = Object.keys(specification.callbacks)
            .filter(function(key) {
                var validProperties = [
                    'onInit',
                    'onLayout',
                    'onPreprocess',
                    'onDatatransform',
                    'onDraw',
                    'onResize',
                    'onDestroy'
                ];
                var validProperty = validProperties.indexOf(key) > -1;
                if (!validProperty)
                    console.warn(
                        'Valid [ callbacks ] include '
                            .concat(
                                validProperties
                                    .toString()
                                    .replace(/,/g, ', ')
                                    .replace('onDestroy', 'and onDestroy'),
                                '. Removing `'
                            )
                            .concat(key, '`.')
                    );
                return validProperty;
            })
            .reduce(function(acc, cur) {
                acc[cur] = specification.callbacks[cur];
                return acc;
            }, {});
    }

    function row(specification) {
        //row - exists
        if (!specification.hasOwnProperty('row')) {
            //console.log('[ row ] property of chart specification is missing.');
            specification.row = 0;
        } //row - valid type

        if (typeof specification.row !== 'number') {
            console.warn('[ row ] property of chart specification must be a number.');
            specification.row = 0;
        } //row - valid value

        if (specification.row < 0 || specification.row % 1) {
            console.warn('[ row ] property of chart specification must be a positive integer.');
            specification.row = 0;
        }
    }

    function col(specification) {
        //col - exists
        if (!specification.hasOwnProperty('col')) {
            //console.log('[ col ] property of chart specification is missing.');
            specification.col = 0;
        } //col - valid type

        if (typeof specification.col !== 'number') {
            console.warn('[ col ] property of chart specification must be a number.');
            specification.col = 0;
        } //col - valid value

        if (specification.col < 0 || specification.col % 1) {
            console.warn('[ col ] property of chart specification must be a positive integer.');
            specification.col = 0;
        }
    }

    function checkArguments(argument) {
        var specification = Object.assign({}, argument);
        specification.index = this.charts.length + 1;
        console.log('Checking specification of chart '.concat(specification.index, '.')); //required arguments

        settings(specification);

        if (specification.continue === false) {
            console.log('Chart '.concat(specification.index, ' DOES NOT check out.'));
            return specification;
        }

        data$1(specification);

        if (specification.continue === false) {
            console.log('Chart '.concat(specification.index, ' DOES NOT check out.'));
            return specification;
        } //optional arguments

        title(specification);
        controlInputs(specification);
        callbacks(specification);
        row(specification);
        col(specification);
        specification.continue = true;
        console.log('Chart '.concat(specification.index, ' checks out.'));
        return specification;
    }

    function addChart(specification) {
        specification = checkArguments.call(this, specification);
        if (specification.continue) this.charts.push(specification);
    }

    function checkArguments$1() {}

    function isNonNullObject(value) {
        return !!value && _typeof(value) === 'object';
    }

    function isSpecial(value) {
        var stringValue = Object.prototype.toString.call(value);
        return stringValue === '[object RegExp]' || stringValue === '[object Date]';
    }

    function defaultIsMergeableObject(value) {
        return isNonNullObject(value) && !isSpecial(value);
    }

    function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
    }

    function cloneUnlessOtherwiseSpecified(value, options) {
        return options.clone !== false && options.isMergeableObject(value)
            ? deepmerge(emptyTarget(value), value, options)
            : value;
    }

    var clone$1 = function clone(value, options) {
        return deepmerge(emptyTarget(value), value, options);
    };

    function combineMerge(target, source, options) {
        var destination = target.slice();
        source.forEach(function(e, i) {
            if (typeof destination[i] === 'undefined') {
                var cloneRequested = options.clone !== false;
                var shouldClone = cloneRequested && options.isMergeableObject(e);
                destination[i] = shouldClone ? clone$1(e, options) : e;
            } else if (options.isMergeableObject(e)) {
                destination[i] = deepmerge(target[i], e, options);
            } else if (target.indexOf(e) === -1) {
                destination.push(e);
            }
        });
        return destination;
    }

    function mergeObject(target, source, options) {
        var destination = {};

        if (options.isMergeableObject(target)) {
            Object.keys(target).forEach(function(key) {
                destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
            });
        }

        Object.keys(source).forEach(function(key) {
            if (!options.isMergeableObject(source[key]) || !target[key]) {
                destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
            } else {
                destination[key] = deepmerge(target[key], source[key], options);
            }
        });
        return destination;
    }

    function deepmerge(target, source, options) {
        options = options || {};
        options.arrayMerge = options.arrayMerge || combineMerge;
        options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject;
        var sourceIsArray = Array.isArray(source);
        var targetIsArray = Array.isArray(target);
        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

        if (!sourceAndTargetTypesMatch) {
            return cloneUnlessOtherwiseSpecified(source, options);
        } else if (sourceIsArray) {
            return options.arrayMerge(target, source, options);
        } else {
            return mergeObject(target, source, options);
        }
    }

    deepmerge.all = function deepmergeAll(array, options) {
        if (!Array.isArray(array)) {
            throw new Error('first argument should be an array');
        }

        return array.reduce(function(prev, next) {
            return deepmerge(prev, next, options);
        }, {});
    };

    function addChartList(charts) {
        var _this = this;

        checkArguments$1.call(this, charts);
        charts.forEach(function(chart) {
            if (
                window &&
                window.dashboardCharts !== undefined &&
                chart.hasOwnProperty('spec') &&
                dashboardCharts.specifications[chart.spec] !== undefined
            ) {
                //Capture and clone default chart specification given specification identifier specified in chart settings.
                var specification = _this.clone(dashboardCharts.specifications[chart.spec]); //Attach specification identifier to specification -- seems recursive.

                specification.spec = chart.spec; //Attach chart data to specification.

                specification.data = chart.data; //Overwrite specification title with custom chart title.

                specification.title = chart.title || specification.schema.title; //Add a data callback that is called before the chart is initialized.

                if (chart.data_callback) specification.data_callback = chart.data_callback; //Merge default settings with custom settings.

                if (chart.settings)
                    specification.settings = deepmerge(specification.settings, chart.settings, {
                        arrayMerge: function arrayMerge(target, source) {
                            return _toConsumableArray(source);
                        }
                    }); //Overwrite default controls with custom controls.

                if (chart.controlInputs) specification.controlInputs = chart.controlInputs; //Couple custom callbacks with default callbacks.

                if (chart.callbacks) {
                    var _loop = function _loop(callback) {
                        var defaultCallback = specification.callbacks[callback];
                        var customCallback = chart.callbacks[callback];

                        specification.callbacks[callback] = function() {
                            if (defaultCallback) defaultCallback.call(this); // run default callback defined in specification

                            if (customCallback) customCallback.call(this); // run custom callback defined by user
                        };
                    };

                    for (var callback in chart.callbacks) {
                        _loop(callback);
                    }
                } //Add chart to dashboard framework.

                _this.addChart(specification);
            } else {
                //Add chart to dashboard framework.
                _this.addChart(chart.specification);
            }
        });
    }

    function setNumberOfColumns() {
        this.settings.nCharts = this.charts.length;

        if (
            this.settings.nColumns === undefined ||
            this.settings.nColumns < 2 ||
            this.settings.nColumns > 4
        ) {
            if ([2, 4].indexOf(this.settings.nCharts) > -1) this.settings.nColumns = 2;
            else if (this.settings.nCharts % 4 === 0) this.settings.nColumns = 4;
            else this.settings.nColumns = 3;
        }

        this.containers.main.classed('dashboard-framework--'.concat(this.settings.nColumns), true);
    }

    function layoutRows() {
        this.settings.nRows = Math.ceil(this.settings.nCharts / this.settings.nColumns);

        for (var i = 0; i < this.settings.nRows; i++) {
            var row = i + 1;
            this.containers['row'.concat(row)] = this.containers.main
                .append('div')
                .classed('df-row df-row--'.concat(row), true);
        }
    }

    function layoutCharts() {
        var _this = this;

        this.charts.forEach(function(chart, i) {
            var row = Math.ceil((i + 1) / _this.settings.nColumns);
            var col = (i + 1) % _this.settings.nColumns || _this.settings.nColumns;
            chart.containers = {
                main: _this.containers['row'.concat(row)].append('div').classed(
                    'df-chart df-chart--row'
                        .concat(row, ' df-chart--col')
                        .concat(col, ' df-chart--')
                        .concat(i),
                    true
                )
            };
            chart.containers.head = chart.containers.main
                .append('div')
                .classed('df-chart__head', true);
            chart.containers.body = chart.containers.main
                .append('div')
                .classed('df-chart__body', true);
        });
    }

    function updateLayout() {
        setNumberOfColumns.call(this);
        layoutRows.call(this);
        layoutCharts.call(this);
    }

    function setTitle(chart) {
        chart.containers.title = chart.containers.head
            .append('span')
            .classed('df-chart-title', true)
            .text(chart.title);
        chart.containers.settingsToggle = chart.containers.title
            .append('span')
            .classed('df-settings-toggle df-invisible', true)
            .html(' &#x2699;')
            .attr('title', 'View chart settings.');
        chart.containers.title
            .on('mouseover', function() {
                chart.containers.settingsToggle.classed('df-invisible', false);
            })
            .on('mouseout', function() {
                chart.containers.settingsToggle.classed('df-invisible', true);
            });
        chart.containers.settingsToggle.on('click', function() {
            if (chart.containers.dataCheck.classed('df-hidden')) {
                chart.containers.dataCheck.classed('df-hidden', false);
                chart.webcharts.wrap.classed('df-hidden', true);
                chart.containers.settingsToggle.attr('title', 'View chart.');
            } else {
                chart.containers.dataCheck.classed('df-hidden', true);
                chart.webcharts.wrap.classed('df-hidden', false);
                chart.containers.settingsToggle.attr('title', 'View chart settings.');
            }
        });
    }

    function callCreateControls(chart) {
        chart.controls = new webcharts.createControls(chart.containers.head.node(), {
            inputs: chart.controlInputs || []
        });
    }

    function enforceChartSizing(chart) {
        chart.settings.resizable = false;
        delete chart.settings.width;
        delete chart.settings.height;
        delete chart.settings.range_band;
        chart.settings.aspect = this.settings.nColumns === 2 ? 25 / 9 : 16 / 9;
        chart.settings.scale_text = true;
    }

    function callCreateChart(chart) {
        chart.webcharts = new webcharts.createChart(
            chart.containers.body.node(),
            chart.settings,
            chart.controls
        );
    }

    function attachCallbacks(chart) {
        if (chart.callbacks) {
            for (var callback in chart.callbacks) {
                chart.webcharts.on(callback.substring(2).toLowerCase(), chart.callbacks[callback]);
            }
        }
    }

    function withSchema(chart) {
        //Update settings before checking schema.
        chart.settings = chart.configuration.syncSettings(chart.settings);
        chart.controlInputs = chart.configuration.syncControlInputs(
            chart.controlInputs,
            chart.settings
        ); //Check schema against specified data mappings.

        chart.variables.schema = Object.keys(chart.schema.properties)
            .map(function(key) {
                var property = chart.schema.properties[key];
                property.key = key;
                property.current = chart.settings[property.key];
                property.missing = chart.variables.actual.indexOf(property.current) < 0;
                return property;
            })
            .filter(function(property) {
                return property['data-mapping'] === true;
            }); //Capture list of required variables.

        chart.variables.required = chart.variables.schema.filter(function(property) {
            return property.required === true;
        }); //Capture list of missing variables.

        chart.variables.missing = chart.variables.schema.filter(function(variable) {
            return variable.missing;
        });
    }

    function withoutSchema(chart) {
        var schema = []; //x.column

        if (chart.webcharts.config.x && chart.webcharts.config.x.column)
            schema.push({
                key: 'x.column',
                title: 'X-axis',
                current: chart.webcharts.config.x.column
            }); //y.column

        if (chart.webcharts.config.y && chart.webcharts.config.y.column)
            schema.push({
                key: 'y.column',
                title: 'Y-axis',
                current: chart.webcharts.config.y.column
            }); //color_by

        if (chart.webcharts.config.color_by)
            schema.push({
                key: 'color_by',
                title: 'Color Stratification',
                current: chart.webcharts.config.color_by
            }); //marks

        if (chart.webcharts.config.marks)
            chart.webcharts.config.marks.forEach(function(mark, i) {
                //per
                if (mark.per && mark.per.length)
                    mark.per.forEach(function(variable, j) {
                        schema.push({
                            key: 'marks[' + i + '].per[' + j + ']',
                            title: 'Mark '
                                .concat(i, ' (')
                                .concat(mark.type, '), key ')
                                .concat(j),
                            current: variable
                        });
                    }); //split

                if (mark.split)
                    schema.push({
                        key: 'marks[' + i + '].split',
                        title: 'Mark '.concat(i, ' (').concat(mark.type, ') arrangement'),
                        current: mark.split
                    }); //values

                if (mark.values) {
                    for (var value in mark.values) {
                        schema.push({
                            key: 'marks[' + i + "].values['" + value + "']",
                            title: 'Mark '
                                .concat(i, ' (')
                                .concat(mark.type, '), ')
                                .concat(value, ' subset'),
                            current: value
                        });
                    }
                }
            });
        schema.forEach(function(variable) {
            variable['data-mapping'] = true;
            variable.required = true;
            variable.missing = chart.variables.actual.indexOf(variable.current) < 0;
        });
        chart.variables.schema = schema;
        chart.variables.missing = chart.variables.schema.filter(function(variable) {
            return variable.missing;
        });
    }

    function checkRequiredVariables(chart) {
        chart.variables = {
            actual: Object.keys(chart.data[0]),
            required: [],
            missing: []
        };
        if (chart.schema !== undefined) withSchema.call(this, chart);
        else withoutSchema.call(this, chart);
    }

    function addContainer(chart) {
        chart.containers.dataCheck = chart.containers.body
            .append('div')
            .classed('df-data-check', true);
    }

    function addWarning(chart) {
        chart.containers.warning = chart.containers.dataCheck
            .append('strong')
            .classed('df-data-check__warning', true);
        chart.containers.warningRequired = chart.containers.dataCheck
            .append('strong')
            .classed('df-data-check__warning df-data-check__warning--required', true);
        chart.containers.warningOptional = chart.containers.dataCheck
            .append('em')
            .classed('df-data-check__warning df-data-check__warning--optional', true);
    }

    function addSchema(chart) {
        chart.containers.schemaContainers = chart.containers.dataCheck
            .selectAll('div.df-data-check__variable-select')
            .data(chart.variables.schema)
            .enter()
            .append('div')
            .classed('df-data-check__variable-select', true);
        chart.containers.schemaTitles = chart.containers.schemaContainers
            .append('div')
            .classed('df-data-check__variable-select__title', true)
            .html(function(d) {
                return ''.concat(d.title).concat(d.required ? ' (<strong>required</strong>)' : '');
            });
        chart.containers.schemaMessages = chart.containers.schemaContainers
            .append('div')
            .classed('df-data-check__variable-select__action', true)
            .html(function(d) {
                return 'Choose another variable:';
            });
        chart.containers.schemaSettings = chart.containers.schemaContainers
            .append('div')
            .classed('df-data-check__variable-select__current', true)
            .html(function(d) {
                return 'Currently: <em>'.concat(d.current, '<em>');
            });
        chart.containers.schemaDropdowns = chart.containers.schemaContainers
            .append('select')
            .classed('df-data-check__variable-select__dropdown', true);
        chart.containers.schemaOptions = chart.containers.schemaDropdowns
            .selectAll('option')
            .data(['None selected'].concat(chart.variables.actual))
            .enter()
            .append('option')
            .text(function(di) {
                return di;
            });
    }

    function addSubmit(chart) {
        chart.containers.submit = chart.containers.dataCheck
            .append('button')
            .classed('df-data-check__submit', true)
            .text('View chart');
    }

    function layout$1(chart) {
        addContainer.call(this, chart);
        addWarning.call(this, chart);
        addSchema.call(this, chart);
        addSubmit.call(this, chart);
    }

    function updateWarning(chart) {
        var missingVariables = chart.variables.schema.filter(function(variable) {
            return variable.missing;
        });
        var missingRequiredVariables = missingVariables.filter(function(variable) {
            return variable.required;
        });
        var missingOptionalVariables = missingVariables.filter(function(variable) {
            return !variable.required;
        });
        chart.containers.warning
            .classed('df-hidden', missingVariables.length > 0)
            .text('All variables present.');
        chart.containers.warningRequired
            .classed('df-data-check__warning--missing', missingRequiredVariables.length > 0)
            .classed('df-hidden', missingVariables.length === 0)
            .text(
                missingRequiredVariables.length > 0
                    ? ''
                          .concat(missingRequiredVariables.length, ' required variable')
                          .concat(missingRequiredVariables.length === 1 ? '' : 's', ' missing.')
                    : 'All required variables present.'
            );
        chart.containers.warningOptional
            .classed('df-data-check__warning--missing', missingOptionalVariables.length > 0)
            .classed('df-hidden', missingVariables.length === 0)
            .text(
                missingOptionalVariables.length > 0
                    ? ''
                          .concat(missingOptionalVariables.length, ' optional variable')
                          .concat(missingOptionalVariables.length === 1 ? '' : 's', ' missing.')
                    : 'All optional variables present.'
            );
    }

    function callCreateControls$1(chart) {
        chart.controls = new webcharts.createControls(chart.containers.head.node(), {
            inputs: chart.controlInputs || []
        });
    }

    function enforceChartSizing$1(chart) {
        chart.settings.resizable = false;
        delete chart.settings.width;
        delete chart.settings.height;
        delete chart.settings.range_band;
        chart.settings.aspect = this.settings.nColumns === 2 ? 25 / 9 : 16 / 9;
        chart.settings.scale_text = true;
    }

    function callCreateChart$1(chart) {
        chart.webcharts = new webcharts.createChart(
            chart.containers.body.node(),
            chart.settings,
            chart.controls
        );
    }

    function updateSubmit(chart) {
        var _this = this;

        var missingRequiredVariables = chart.variables.schema.filter(function(variable) {
            return variable.required && variable.missing;
        });
        chart.containers.submit
            .property('disabled', missingRequiredVariables.length > 0)
            .on('click', function() {
                if (chart.initialized) chart.webcharts.destroy();
                callCreateControls$1.call(_this, chart);
                enforceChartSizing$1.call(_this, chart);
                callCreateChart$1.call(_this, chart);
                attachCallbacks.call(_this, chart);
                chart.webcharts.init(chart.data);
                chart.initialized = true;
                chart.containers.dataCheck.classed('df-hidden', true);
            });
    }

    function updateSchema(chart) {
        var context = this;
        chart.containers.schemaContainers.classed(
            'df-data-check__variable-select--missing',
            function(d) {
                return (
                    chart.variables.missing
                        .map(function(variable) {
                            return variable.key;
                        })
                        .indexOf(d.key) > -1
                );
            }
        );
        chart.containers.schemaOptions.property('selected', function(d) {
            var dropdown = d3.select(this.parentNode);
            return dropdown.datum().current === d;
        });
        chart.containers.schemaDropdowns.on('change', function(d) {
            var schemaContainer = d3.select(this.parentNode);
            var dropdown = d3.select(this);
            var option = dropdown.selectAll('option:checked').text(); //user selects variable

            if (option !== 'None selected') {
                //update class
                schemaContainer.classed('df-data-check__variable-select--missing', false); //update schema

                var variableSchema = chart.variables.schema.find(function(variable) {
                    return variable.key === d.key;
                });
                variableSchema.current = option;
                variableSchema.missing = false; //update warning

                updateWarning.call(context, chart); //update and sync settings

                if (chart.configuration) {
                    chart.settings[d.key] = option;
                    chart.settings = chart.configuration.syncSettings(chart.settings);
                    chart.controlInputs = chart.configuration.syncControlInputs(
                        chart.controlInputs,
                        chart.settings
                    );
                } else {
                    context.stringAccessor(chart.settings, d.key, option);
                }
            } //user deselects variable
            else {
                //update class
                schemaContainer.classed('df-data-check__variable-select--missing', true); //update schema

                var _variableSchema = chart.variables.schema.find(function(variable) {
                    return variable.key === d.key;
                });

                _variableSchema.current = null;
                _variableSchema.missing = true; //update warning

                updateWarning.call(context, chart); //update and sync settings

                if (chart.configuration) {
                    chart.settings[d.key] = null;
                    chart.settings = chart.configuration.syncSettings(chart.settings);
                    chart.controlInputs = chart.configuration.syncControlInputs(
                        chart.controlInputs,
                        chart.settings
                    );
                }
            } //update submit button

            updateSubmit.call(context, chart);
        });
    }

    function update(chart) {
        updateWarning.call(this, chart);
        updateSchema.call(this, chart);
        updateSubmit.call(this, chart);
    }

    function addVariableSelect(chart) {
        layout$1.call(this, chart);
        update.call(this, chart);
    }

    function initializeChart(chart) {
        var _this = this;

        //Intialize chart.
        if (typeof chart.data === 'string') {
            d3.csv(
                chart.data,
                function(d) {
                    return d;
                },
                function(data) {
                    if (chart.data_callback) chart.data_callback(data);
                    chart.data = data;
                    checkRequiredVariables.call(_this, chart);
                    addVariableSelect.call(_this, chart);

                    if (
                        chart.variables.schema.filter(function(variable) {
                            return variable.required && variable.missing;
                        }).length === 0
                    ) {
                        chart.containers.dataCheck.classed('df-hidden', true);
                        chart.webcharts.init(data);
                        chart.initialized = true;
                    }
                }
            );
        } else if (Array.isArray(chart.data)) {
            if (chart.data_callback) chart.data_callback(data);
            checkRequiredVariables.call(this, chart);
            addVariableSelect.call(this, chart);

            if (
                chart.variables.schema.filter(function(variable) {
                    return variable.required && variable.missing;
                }).length === 0
            ) {
                chart.containers.dataCheck.classed('df-hidden', true);
                chart.webcharts.init(data);
                chart.initialized = true;
            }
        } else console.warn('addChart() requires a path to a .csv file or a data array.');
    }

    function drawCharts() {
        var _this = this;

        this.charts.forEach(function(chart) {
            setTitle.call(_this, chart);
            callCreateControls.call(_this, chart);
            enforceChartSizing.call(_this, chart);
            callCreateChart.call(_this, chart);
            attachCallbacks.call(_this, chart);
            initializeChart.call(_this, chart);
        });
    }

    function init() {
        updateLayout.call(this);
        drawCharts.call(this);
    }

    function dashboardFramework() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var dashboardFramework = {
            element: element,
            settings: settings,
            charts: [],
            //methods
            addChart: addChart,
            addChartList: addChartList,
            init: init,
            clone: clone,
            // avoid altering chart specifications
            stringAccessor: stringAccessor // update chart settings
        };
        layout.call(dashboardFramework);
        return dashboardFramework;
    }

    return dashboardFramework;
});
