(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('dashboardCharts'), require('webcharts')) :
    typeof define === 'function' && define.amd ? define(['d3', 'dashboardCharts', 'webcharts'], factory) :
    (global = global || self, global.dashboardFramework = factory(global.d3, global.dashboardCharts, global.webCharts));
}(this, function (d3, dashboardCharts$1, webcharts) { 'use strict';

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
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
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

    function layout() {
      this.containers = {
        main: d3.select(this.element).append('div').datum(this).classed('dashboard-framework', true).attr('id', "dashboard-framework".concat(d3.selectAll('.dashboard-framework').size() + 1))
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

    function data(specification) {
      //data - exists
      if (!specification.hasOwnProperty('data')) {
        console.warn('Chart specification requires a [ data ] property.');
        specification.continue = false;
        return;
      } //data - valid type


      if (!(typeof specification.data === 'string' || Array.isArray(specification.data))) {
        console.warn('[ data ] property of chart specification must be a path to a .csv file or an array.');
        specification.continue = false;
        return;
      }
    }

    function title(specification) {
      //title - exists
      if (!specification.hasOwnProperty('title')) {
        specification.title = "".concat(specification.settings.x.label || specification.settings.x.column, " by ").concat(specification.settings.y.label || specification.settings.y.column);
        console.log("[ title ] property of chart specification is missing. Defaulting to \"".concat(specification.title, "\"."));
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


      specification.controlInputs = specification.controlInputs.filter(function (controlInput, i) {
        var isObject = _typeof(controlInput) === 'object' && controlInput !== null && !Array.isArray(controlInput);
        if (!isObject) console.warn("Items of [ controlInputs ] property must be objects. Removing `".concat(JSON.stringify(controlInput), "`."));
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


      specification.callbacks = Object.keys(specification.callbacks).filter(function (key) {
        var validProperties = ['onInit', 'onLayout', 'onPreprocess', 'onDatatransform', 'onDraw', 'onResize', 'onDestroy'];
        var validProperty = validProperties.indexOf(key) > -1;
        if (!validProperty) console.warn("Valid [ callbacks ] include ".concat(validProperties.toString().replace(/,/g, ', ').replace('onDestroy', 'and onDestroy'), ". Removing `").concat(key, "`."));
        return validProperty;
      }).reduce(function (acc, cur) {
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
      console.log("Checking specification of chart ".concat(specification.index, ".")); //required arguments

      settings(specification);

      if (specification.continue === false) {
        console.log("Chart ".concat(specification.index, " DOES NOT check out."));
        return specification;
      }

      data(specification);

      if (specification.continue === false) {
        console.log("Chart ".concat(specification.index, " DOES NOT check out."));
        return specification;
      } //optional arguments


      title(specification);
      controlInputs(specification);
      callbacks(specification);
      row(specification);
      col(specification);
      specification.continue = true;
      console.log("Chart ".concat(specification.index, " checks out."));
      return specification;
    }

    function addChart(specification) {
      specification = checkArguments.call(this, specification);
      if (specification.continue) this.charts.push(specification);
    }

    function checkArguments$1() {}

    function addChartList(charts) {
      var _this = this;

      checkArguments$1.call(this, charts);
      charts.forEach(function (chart) {
        if (dashboardCharts !== undefined && chart.hasOwnProperty('identifier') && dashboardCharts$1.specifications[chart.identifier] !== undefined) {
          var specification = _this.clone(dashboardCharts$1.specifications[chart.identifier]);

          specification.data = chart.data;
          specification.title = specification.schema.title;

          _this.addChart(specification);
        } else if (chart.hasOwnProperty('specification')) {
          _this.addChart(chart.specification);
        } else {
          console.warn('To render a chart provide either a chart specification identifier or a chart settings object, and a data path or array.');
        }
      });
    }

    function setNumberOfColumns() {
      this.settings.nCharts = this.charts.length;

      if (this.settings.nColumns === undefined || this.settings.nColumns < 2 || this.settings.nColumns > 4) {
        if ([2, 4].indexOf(this.settings.nCharts) > -1) this.settings.nColumns = 2;else if (this.settings.nCharts % 4 === 0) this.settings.nColumns = 4;else this.settings.nColumns = 3;
      }

      this.containers.main.classed("dashboard-framework--".concat(this.settings.nColumns), true);
    }

    function layoutRows() {
      this.settings.nRows = Math.ceil(this.settings.nCharts / this.settings.nColumns);

      for (var i = 0; i < this.settings.nRows; i++) {
        var row = i + 1;
        this.containers["row".concat(row)] = this.containers.main.append('div').classed("df-row df-row--".concat(row), true);
      }
    }

    function layoutCharts() {
      var _this = this;

      this.charts.forEach(function (chart, i) {
        var row = Math.ceil((i + 1) / _this.settings.nColumns);
        var col = (i + 1) % _this.settings.nColumns || _this.settings.nColumns;
        chart.containers = {
          main: _this.containers["row".concat(row)].append('div').classed("df-chart df-chart--row".concat(row, " df-chart--col").concat(col, " df-chart--").concat(i), true)
        };
        chart.containers.head = chart.containers.main.append('div').classed('df-chart__head', true);
        chart.containers.body = chart.containers.main.append('div').classed('df-chart__body', true);
      });
    }

    function updateLayout() {
      setNumberOfColumns.call(this);
      layoutRows.call(this);
      layoutCharts.call(this);
    }

    function enforceChartSizing(chart) {
      delete chart.settings.width;
      delete chart.settings.height;
      chart.settings.aspect = this.settings.nColumns === 2 ? 25 / 9 : 16 / 9;
      chart.settings.resizable = false;
      chart.settings.scale_text = true;
    }

    function drawCharts() {
      var _this = this;

      this.charts.forEach(function (chart) {
        //Enforce chart sizing.
        enforceChartSizing.call(_this, chart); //Set title.

        chart.containers.head.text(chart.title); //Define controls.

        if (Array.isArray(chart.controlInputs) && chart.controlInputs.length) chart.controls = new webcharts.createControls(chart.containers.head.node(), {
          inputs: chart.controlInputs
        }); //Define chart.

        chart.webcharts = new webcharts.createChart(chart.containers.body.node(), chart.settings, chart.controls); //Attach callbacks.

        if (chart.callbacks) {
          for (var callback in chart.callbacks) {
            chart.webcharts.on(callback.substring(2).toLowerCase(), chart.callbacks[callback]);
          }
        } //Intialize chart.


        if (typeof chart.data === 'string') d3.csv(chart.data, function (d) {
          return d;
        }, function (data) {
          chart.data = data;
          chart.webcharts.init(data);
        });else if (Array.isArray(chart.data)) chart.webcharts.init(chart.data);else console.warn('addChart() requires a path to a .csv file or a data array.');
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
        clone: clone // avoid altering chart specifications

      };
      layout.call(dashboardFramework);
      return dashboardFramework;
    }

    return dashboardFramework;

}));
