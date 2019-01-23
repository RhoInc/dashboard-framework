/* Methods
    * dashboardFramework(element, settings)
        * layout()
        * addChart(settings, data, row, column)
        * init()
        * updateLayout()
        * drawChart(chart)
*/

import layout from './layout';
import addChart from './addChart';
import init from './init';

export default function dashboardFramework(element = 'body', settings = {}) {
    const dashboardFramework = {
        element,
        settings,
        charts: [],
        addChart, // exposed method
        init, // exposed method
    };
    layout.call(dashboardFramework);
    return dashboardFramework;
}
