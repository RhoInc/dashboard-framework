d3.csv('../../../data/screening_and_randomization_example.csv', function(error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.screening('#container', settings);
    instance.init(data);
});
