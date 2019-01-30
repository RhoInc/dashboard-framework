const dashboard = dashboardFramework('#container');

//Pass an array of data specification identifiers and data paths/arrays.
dashboard.addChartList([
    {
        spec: 'enrollment',
        data: '../../dashboard-charts/data/enrollment.csv'
    },
    {
        spec: 'visitCompletion',
        data: '../../dashboard-charts/data/visitCompletion.csv'
    },
    {
        spec: 'queries',
        data: '../../dashboard-charts/data/queries.csv'
    },
    {
        spec: 'enrollmentOverTime',
        data: '../../dashboard-charts/data/enrollmentOverTime.csv'
    },
    {
        spec: 'forms',
        data: '../../dashboard-charts/data/forms.csv'
    },
]);

//Add an additional chart.
dashboard.addChart(
    medicalSignsSettings, // settings
    '../../data-library/data/clinical-trials/renderer-specific/adbds.csv', // data path
    'Medical Signs', // title
    [
        {
            type: 'subsetter',
            value_col: 'TEST',
            start: 'Albumin',
        }
    ], // control inputs
    {
        onInit: function() {
            console.log(this);
        },
        onResize: function() {
            this.marks
                .find(mark => mark.type === 'line')
                .groups
                .on('mouseover', function() {
                    d3.select(this).selectAll('path').attr('stroke-width', 3);
                })
                .on('mouseout', function() {
                    d3.select(this).selectAll('path').attr('stroke-width', .5);
                });
        },
    }, // callbacks
);

//Initialize dashboard.
dashboard.init();
