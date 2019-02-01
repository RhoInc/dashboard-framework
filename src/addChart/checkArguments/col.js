export default function col(specification) {
    //col - exists
    if (!specification.hasOwnProperty('col')) {
        //console.log('[ col ] property of chart specification is missing.');
        specification.col = 0;
    }

    //col - valid type
    if (typeof specification.col !== 'number') {
        console.warn('[ col ] property of chart specification must be a number.');
        specification.col = 0;
    }

    //col - valid value
    if (specification.col < 0 || specification.col % 1) {
        console.warn('[ col ] property of chart specification must be a positive integer.');
        specification.col = 0;
    }
}
