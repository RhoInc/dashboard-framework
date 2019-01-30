const settings = {};
const dashboard = dashboardFramework('#container', settings);
//const method = 'addChart';
const method = 'createDashboard';

if (method === 'addChart') {
    dashboard.addChart(dashboardCharts.specifications.enrollment.settings, '../../dashboard-charts/data/enrollment.csv');
    dashboard.addChart(dashboardCharts.specifications.visitCompletion.settings, '../../dashboard-charts/data/visitCompletion.csv');
    dashboard.addChart(dashboardCharts.specifications.queries.settings, '../../dashboard-charts/data/queries.csv');
    dashboard.addChart(dashboardCharts.specifications.enrollmentOverTime.settings, '../../dashboard-charts/data/enrollmentOverTime.csv');
    dashboard.addChart(dashboardCharts.specifications.forms.settings, '../../dashboard-charts/data/forms.csv');
}

if (method === 'createDashboard') {
    dashboard.createDashboard([
        {spec: 'enrollment', data: '../../dashboard-charts/data/enrollment.csv'},
        {spec: 'visitCompletion', data: '../../dashboard-charts/data/visitCompletion.csv'},
        {spec: 'queries', data: '../../dashboard-charts/data/queries.csv'},
        {spec: 'enrollmentOverTime', data: '../../dashboard-charts/data/enrollmentOverTime.csv'},
        {spec: 'forms', data: '../../dashboard-charts/data/forms.csv'},
    ]);
    dashboard.addChart(
        {
            "x": {
                "column": "VISIT",
                "type": "ordinal",
                "behavior": "raw",
                "label": "Visit",
                "order": [
                    "Screening",
                    "Visit 1",
                    "Visit 2",
                    "Visit 3",
                    "Visit 4",
                    "Visit 5",
                    "Visit 6",
                    "End of Study"
                ],
                "sort": "alphabetical-ascending",
                "value_col": "VISIT",
                "order_col": "VISITNUM",
                "rotate_tick_labels": true,
                "vertical_space": 100,
                "domain": [
                    "Screening",
                    "Visit 1",
                    "Visit 3",
                    "Visit 4",
                    "Visit 5",
                    "Visit 6",
                    "End of Study"
                ]
            },
            "y": {
                "column": "STRESN",
                "stat": "mean",
                "type": "linear",
                "label": "Result",
                "behavior": "flex",
                "format": "0.2f",
                "sort": "alphabetical-descending",
            },
            "marks": [
                {
                    "per": [
                        "USUBJID",
                        "TEST"
                    ],
                    "type": "line",
                    "attributes": {
                        "stroke": "black",
                        "stroke-width": 0.5,
                        "stroke-opacity": 0.75
                    },
                    "tooltip": "[USUBJID]",
                    "values": {
                        'VISIT': [
                            "Screening",
                            "Visit 1",
                            "Visit 3",
                            "Visit 4",
                            "Visit 5",
                            "Visit 6",
                            "End of Study"
                        ]
                    }
                },
                {
                    "per": [
                        "USUBJID",
                        "TEST",
                        "VISIT",
                        "STRESN"
                    ],
                    "type": "circle",
                    "attributes": {
                        "stroke": "#1f78b4",
                        "stroke-width": 0.5,
                        "stroke-opacity": 1,
                        "radius": 3,
                        "fill": "#1f78b4",
                        "fill-opacity": 0.2
                    },
                    "tooltip": "ID = [USUBJID]\n[TEST] = [STRESN] [STRESU]\nVISIT = [VISIT]\nDate = [DT]",
                    "radius": 3,
                    "values": {
                        'VISIT': [
                            "Screening",
                            "Visit 1",
                            "Visit 3",
                            "Visit 4",
                            "Visit 5",
                            "Visit 6",
                            "End of Study"
                        ]
                    }
                }
            ]
        },
        '../../data-library/data/clinical-trials/renderer-specific/adbds.csv',
        'Safety Outlier Explorer',
        [
            {
                type: 'subsetter',
                value_col: 'TEST',
                start: 'Albumin',
            }
        ]
    );
}

dashboard.init();
