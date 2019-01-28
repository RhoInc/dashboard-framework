(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('webcharts')) :
    typeof define === 'function' && define.amd ? define(['d3', 'webcharts'], factory) :
    (global = global || self, global.dashboardFramework = factory(global.d3, global.webCharts));
}(this, function (d3$1, webcharts) { 'use strict';

    function layout() {
      this.containers = {
        main: d3$1.select(this.element).append('div').datum(this).classed('dashboard-framework', true).attr('id', "dashboard-framework".concat(d3$1.selectAll('.dashboard-framework').size() + 1))
      };
    }

    function addChart(settings, data, row, column) {
      console.log(settings); //console.table(
      //    Object.keys(settings)
      //        .filter(key => !(settings[key] instanceof Object))
      //        .reduce(
      //            (acc,cur) => {
      //                console.log(acc);
      //                console.log(cur);
      //                console.log(settings[cur]);
      //                return acc[cur] = settings[cur];
      //            },
      //            {}
      //        )
      //);
      //settings.resizable = true;

      delete settings.width;
      delete settings.height;
      settings.scale_text = true; //settings.aspect = 1.5;

      this.charts.push({
        settings: settings,
        data: data,
        row: row,
        column: column
      });
    }

    function updateLayout() {
      var _this = this;

      this.nCharts = this.charts.length;
      this.charts.forEach(function (chart, i) {
        chart.container = _this.containers.main.append('div').classed("df-chart df-chart--".concat(i), true);
      });
    }

    function drawChart(chart) {
      chart.webcharts = new webcharts.createChart(chart.container.node(), chart.settings);
      if (typeof chart.data === 'string') d3.csv(chart.data, function (d) {
        return d;
      }, function (data) {
        console.log(data);
        chart.data = data;
        chart.webcharts.init(data);
        console.log(chart.webcharts.wrap.node().offsetHeight);
        console.log(chart.container.node().offsetHeight);
      });else if (Array.isArray(chart.data)) chart.webcharts.init(chart.data);else console.warn('addChart() requires a path to a .csv file or a data array.');
    }

    function init() {
      var _this = this;

      updateLayout.call(this);
      this.charts.forEach(function (chart) {
        drawChart.call(_this, chart);
      });
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
        addChart: addChart,
        // exposed method
        init: init // exposed method

      };
      layout.call(dashboardFramework);
      return dashboardFramework;
    }

    return dashboardFramework;

}));
