d3.csv('../../../data/queries_example.csv', function(error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.queries('#container');
    instance.init(data);
});
