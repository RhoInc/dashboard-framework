export default function callbacks(specification) {
    //callbacks - exists
    if (!specification.hasOwnProperty('callbacks')) {
        console.log('[ callbacks ] property of chart specification is missing.');
        specification.callbacks = {};
    }

    //callbacks - valid type
    if (typeof specification.callbacks !== 'object' || specification.callbacks === null) {
        console.warn('[ callbacks ] property of chart specification must be an object.');
        specification.callbacks = {};
    }

    //callbacks - valid properties
    specification.callbacks = Object.keys(specification.callbacks)
        .filter(key => {
            const validProperties = [
                'onInit',
                'onLayout',
                'onPreprocess',
                'onDatatransform',
                'onDraw',
                'onResize',
                'onDestroy'
            ];
            const validProperty = validProperties.indexOf(key) > -1;
            if (!validProperty)
                console.warn(
                    `Valid [ callbacks ] include ${validProperties
                        .toString()
                        .replace(/,/g, ', ')
                        .replace('onDestroy', 'and onDestroy')}. Removing \`${key}\`.`
                );
            return validProperty;
        })
        .reduce((acc, cur) => {
            acc[cur] = specification.callbacks[cur];

            return acc;
        }, {});
}
