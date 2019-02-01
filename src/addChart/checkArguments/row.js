export default function row(specification) {
    //row - exists
    if (!specification.hasOwnProperty('row')) {
        //console.log('[ row ] property of chart specification is missing.');
        specification.row = 0;
    }

    //row - valid type
    if (typeof specification.row !== 'number') {
        console.warn('[ row ] property of chart specification must be a number.');
        specification.row = 0;
    }

    //row - valid value
    if (specification.row < 0 || specification.row % 1) {
        console.warn('[ row ] property of chart specification must be a positive integer.');
        specification.row = 0;
    }
}
