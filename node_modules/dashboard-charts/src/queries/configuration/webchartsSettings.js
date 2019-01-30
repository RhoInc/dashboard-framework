export default function webchartsSettings() {
    return {
        resizable: false,
        width: 500,
        height: 350,

        y: {
            type: 'linear',
            behavior: 'firstfilter',
            format: '1d',
        },
        x: {
            column: null, // set in syncSettings
            type: 'ordinal',
            label: ''
        },
        marks: [
            {
                arrange: 'stacked',
                split: null, // set in syncSettings
                type: 'bar',
                per: [], // set in syncSettings
                summarizeY: 'percent',
                tooltip: '$y'
            }
        ],
        color_by: null, // set in syncSettings
        colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
        legend: {
            label: '',
            order: ['Resolved', 'Outstanding <= 90 days', 'Outstanding > 90 days']
        },
        margin: {
            left: 50,
        }
    };
}
