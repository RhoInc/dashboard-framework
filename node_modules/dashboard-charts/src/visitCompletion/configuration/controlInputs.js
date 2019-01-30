export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            value_col: null, // set in syncControlInputs()
            label: 'Site',
            require: true
        },
        {
            label: '',
            type: 'radio',
            option: 'marks[0].summarizeY',
            values: ['percent', 'count'],
            relabels: ['%', 'N']
        }
    ];
}
