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
      });else if (Array.isArray(chart.data)) chart.webcharts.init(chart.data);
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
