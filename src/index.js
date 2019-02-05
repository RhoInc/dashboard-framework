import './util/polyfills';
import clone from './util/clone';
import stringAccessor from './util/stringAccessor';

/* Methods
    * dashboardFramework(element, settings)
        * layout()
        * addChart(specification)
            * or
        * addChartList([{specification, data},...])
        * init()
        * updateLayout()
        * drawChart(chart)
*/

import layout from './layout';
import addChart from './addChart';
import addChartList from './addChartList';
import init from './init';

export default function dashboardFramework(element = 'body', settings = {}) {
    const dashboardFramework = {
        element,
        settings,
        charts: [],

        //methods
        addChart,
        addChartList,
        init,
        clone, // avoid altering chart specifications
        stringAccessor, // update chart settings
    };
    layout.call(dashboardFramework);
    return dashboardFramework;
}
