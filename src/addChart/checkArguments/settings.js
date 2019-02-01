export default function settings(specification) {
    //settings - exists
    if (!specification.hasOwnProperty('settings')) {
        console.warn('Chart specification requires a [ settings ] property.');
        specification.continue = false;
        return;
    }

    //settings - valid type
    if (typeof specification.settings !== 'object' || specification.settings === null) {
        console.warn('[ settings ] property of chart specification must be an object.');
        specification.continue = false;
        return;
    }
}
