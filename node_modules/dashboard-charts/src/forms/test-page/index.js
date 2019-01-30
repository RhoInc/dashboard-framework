d3.csv('../../../data/form_status_example.csv', function(error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.forms('#container');
    instance.init(data);
});
