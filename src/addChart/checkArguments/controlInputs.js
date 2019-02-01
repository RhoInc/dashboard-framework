export default function controlInputs(specification) {
    //controlInputs - exists
    if (!specification.hasOwnProperty('controlInputs')) {
        console.log('[ controlInputs ] property of chart specification is missing.');
        specification.controlInputs = [];
    }

    //controlInputs - valid type
    if (!Array.isArray(specification.controlInputs)) {
        console.warn('[ controlInputs ] property of chart specification must be an array');
        specification.controlInputs = [];
    }

    //controlInputs - valid items
    specification.controlInputs = specification.controlInputs
        .filter((controlInput,i) => {
            const isObject = typeof controlInput === 'object' && controlInput !== null && !Array.isArray(controlInput);
            if (!isObject)
                console.warn(`Items of [ controlInputs ] property must be objects. Removing \`${JSON.stringify(controlInput)}\`.`);
            return isObject;
        });
}
