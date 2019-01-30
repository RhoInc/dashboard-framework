export default function webchartsSettings() {
    return {
        resizable: false,
        width: 500,
        height: 350,

        y: {
            column: null, // set in syncSettings
            type: 'linear',
            behavior: 'firstfilter',
            label: ''
        },
        x: {
            column: null, // set in syncSettings
            type: 'time',
            label: '',
            format: '%b-%y'
        },
        marks: [
            {
                type: 'line',
                per: [], // set in syncSettings
                summarizeY: 'sum',
                tooltip: '$y'
            }
        ],
        date_format: '%Y-%m-%d',
        color_by: null, // set in syncSettings
        colors: ['#2b8cbe', '#a6bddb'],
        legend: {
            label: ''
        }
    };
}
