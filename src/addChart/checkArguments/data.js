export default function data(specification) {
    //data - exists
    if (!specification.hasOwnProperty('data')) {
        console.warn('Chart specification requires a [ data ] property.');
        specification.continue = false;
        return;
    }

    //data - valid type
    if (!(typeof specification.data === 'string' || Array.isArray(specification.data))) {
        console.warn(
            '[ data ] property of chart specification must be an array or a path to a .csv file.'
        );
        specification.continue = false;
        return;
    }
}
