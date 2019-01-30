d3.csv('../../../data/enrollment_overtime_example.csv', function(error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.enrollment('#container', settings);
    instance.init(data);
});
