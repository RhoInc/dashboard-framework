d3.csv('../../../data/visit_completion_example.csv', function(error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.visit('#container', settings);
    instance.init(data);
});
