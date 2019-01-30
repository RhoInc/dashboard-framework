for (const prop in dashboardCharts)
    console.log(prop);
console.log(dashboardCharts.specifications);
/**-------------------------------------------------------------------------------------------\
  Screening and Randomization Top Left Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementTL = ".gg-dash-item.top.left";
    var instanceTL =  dashboardCharts.enrollment(dataElementTL + ' .gg-dash-item-content');

    d3.csv('../data/enrollment.csv', function(error, data) {
        instanceTL.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Visit Completion  - Top Middle Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementTM = ".gg-dash-item.top.middle";
    var instanceTM =  dashboardCharts.visitCompletion(dataElementTM + ' .gg-dash-item-content', dataElementTM + ' .gg-dash-item-content', dataElementTM + ' .gg-dash-item-title');

    d3.csv('../data/visitCompletion.csv', function(error, data) {
        instanceTM.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Queries  - Top Right Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementTR = ".gg-dash-item.top.right";
    var instanceTR = dashboardCharts.queries(dataElementTR + " .gg-dash-item-content");

    d3.csv('../data/queries.csv', function (error, data) {
        instanceTR.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Enrollment Over Time - Bottom Left Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementBL = ".gg-dash-item.bottom.left"
    var instanceBL = dashboardCharts.enrollmentOverTime(dataElementBL+" .gg-dash-item-content")

    d3.csv('../data/enrollmentOverTime.csv', function(error, data){
        instanceBL.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Forms  - Bottom Middle Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementBR = ".gg-dash-item.bottom.middle";
    var instanceBR = dashboardCharts.forms(dataElementBR + " .gg-dash-item-content");

    d3.csv('../data/forms.csv', function (error, data) {
        instanceBR.init(data);
    });
