import enrollment from './enrollment/specification.js';
import visitCompletion from './visitCompletion/specification.js';
import queries from './queries/specification.js';
import enrollmentOverTime from './enrollmentOverTime/specification.js';
import forms from './forms/specification.js';

export default {
    enrollment: enrollment(),
    visitCompletion: visitCompletion(),
    queries: queries(),
    enrollmentOverTime: enrollmentOverTime(),
    forms: forms(),
};
