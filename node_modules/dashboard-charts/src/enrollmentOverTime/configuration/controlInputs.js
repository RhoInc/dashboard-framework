export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            value_col: null, // set in syncControlInputs()
            label: 'Site',
            require: true
        }
    ];
}
