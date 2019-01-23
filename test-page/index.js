const settings = {};
const dashboard = dashboardFramework('#container', settings);
dashboard.addChart(dashboardCharts.screening().settings, '../../dashboard-charts/data/screening_and_randomization_example.csv');
dashboard.addChart(dashboardCharts.visit().settings, '../../dashboard-charts/data/visit_completion_example.csv');
dashboard.addChart(dashboardCharts.queries().settings, '../../dashboard-charts/data/queries_example.csv');
dashboard.addChart(dashboardCharts.enrollment().settings, '../../dashboard-charts/data/enrollment_overtime_example.csv');
dashboard.addChart(dashboardCharts.forms().settings, '../../dashboard-charts/data/form_status_example.csv');
dashboard.init();
