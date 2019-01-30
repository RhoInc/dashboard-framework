import './util/polyfills';

import specifications from './specifications';

import enrollment from './enrollment/wrapper';
import visitCompletion from './visitCompletion/wrapper';
import queries from './queries/wrapper';
import enrollmentOverTime from './enrollmentOverTime/wrapper';
import forms from './forms/wrapper';

const dashboardCharts = {
    enrollment,
    visitCompletion,
    queries,
    enrollmentOverTime,
    forms,
};

Object.defineProperty(
    dashboardCharts,
    'specifications',
    {
        value: specifications,
        enumerable: false
    }
);

export default dashboardCharts;
