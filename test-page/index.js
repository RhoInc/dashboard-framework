const dashboard = dashboardFramework('#container');

//Pass an array of data specification identifiers and data paths/arrays.
dashboard.addChartList([
    {
        identifier: 'enrollment',
        data: '../../dashboard-charts/data/enrollment.csv'
    },
    {
        identifier: 'visitCompletion',
        data: '../../dashboard-charts/data/visitCompletion.csv'
    },
    {
        identifier: 'queries',
        data: '../../dashboard-charts/data/queries.csv'
    },
]);

//Add an additional chart.
dashboard.addChart({
    settings: medicalSignsSettings, // settings
    data: '../../data-library/data/clinical-trials/renderer-specific/adbds.csv', // data path
    title: 'Lab Results',
    controlInputs: [
        {
            type: 'subsetter',
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

dashboard.addChartList([
    {
        identifier: 'enrollmentOverTime',
        data: '../../dashboard-charts/data/enrollmentOverTime.csv'
    },
    {
        identifier: 'queries',
        data: '../../dashboard-charts/data/queries.csv'
    },
    {
        identifier: 'forms',
        data: '../../dashboard-charts/data/forms.csv'
    },
]);

//Add an additional chart.
dashboard.addChart({
    settings: medicalSignsSettings, // settings
    data: '../../data-library/data/clinical-trials/renderer-specific/adbds.csv', // data path
    title: 'Vital Signs',
    controlInputs: [
        {
            type: 'subsetter',
            value_col: 'TEST',
            start: 'Temperature',
        },
    ], // control inputs
    callbacks: {
        onInit: function() {
            this.raw_data = this.raw_data.filter(d => d.CAT !== 'Serum');
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
