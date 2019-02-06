const dashboard = dashboardFramework('#container');

//Pass an array of data specification identifiers and data paths/arrays.
dashboard.addChartList([
    {
        identifier: 'enrollment',
        data: 'https://raw.githubusercontent.com/RhoInc/dashboard-charts/master/data/enrollment.csv',
    },
    {
        identifier: 'visitCompletion',
        data: 'https://raw.githubusercontent.com/RhoInc/dashboard-charts/master/data/visitCompletion.csv'
    },
    {
        identifier: 'queries',
        data: 'https://raw.githubusercontent.com/RhoInc/dashboard-charts/master/data/queries.csv',
    },
    {
        identifier: 'enrollmentOverTime',
        data: 'https://raw.githubusercontent.com/RhoInc/dashboard-charts/master/data/enrollmentOverTime.csv',
    },
    {
        identifier: 'forms',
        data: 'https://raw.githubusercontent.com/RhoInc/dashboard-charts/master/data/forms.csv',
    },
]);

//Add an additional chart.
dashboard.addChart({
    settings: medicalSignsSettings, // settings
    data: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv', // data path
    title: 'Lab Results',
    controlInputs: [
        {
            type: 'subsetter',
            label: '',
            value_col: 'TEST',
            start: 'Albumin',
        },
    ], // control inputs
    callbacks: {
        onInit: function() {
            this.raw_data = this.raw_data.filter(d => d.CAT === 'Serum');
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
});

//Initialize dashboard.
dashboard.init();
