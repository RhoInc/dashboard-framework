(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('dashboard-charts'), require('webcharts')) :
    typeof define === 'function' && define.amd ? define(['d3', 'dashboard-charts', 'webcharts'], factory) :
    (global = global || self, global.dashboardFramework = factory(global.d3, global.dashboardCharts, global.webCharts));
}(this, function (d3$1, dashboardCharts, webcharts) { 'use strict';

    function layout() {
      this.containers = {
        main: d3$1.select(this.element).append('div').datum(this).classed('dashboard-framework', true).attr('id', "dashboard-framework".concat(d3$1.selectAll('.dashboard-framework').size() + 1))
      };
    }

    function addChart(settings, data) {
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var controlInputs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var callbacks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var row = arguments.length > 5 ? arguments[5] : undefined;
      var col = arguments.length > 6 ? arguments[6] : undefined;
      this.charts.push({
        settings: settings,
        data: data,
        title: title,
        controlInputs: controlInputs,
        callbacks: callbacks,
        row: row,
        col: col
      });
    }

    //import specifications from '../../dashboard-charts/src/specifications';
    function addChartList(charts) {
      var _this = this;

      console.log(dashboardCharts.specifications);
      charts.forEach(function (chart) {
        if (chart.hasOwnProperty('spec')) {
          var spec = dashboardCharts.specifications[chart.spec];
          if (spec !== undefined) _this.addChart(spec.settings, chart.data, spec.schema.title, spec.controlInputs, spec.callbacks);
        } else if (chart.hasOwnProperty('settings')) {
          _this.addChart(chart.settings, chart.data, chart.title || '', chart.controlInputs || [], chart.callbacks || {});
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

    /* Methods
        * dashboardFramework(element, settings)
            * layout()
            * addChart(settings, data, row, column)
            * init()
            * updateLayout()
            * drawChart(chart)
    */
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
        init: init
      };
      layout.call(dashboardFramework);
      return dashboardFramework;
    }

    return dashboardFramework;

}));
