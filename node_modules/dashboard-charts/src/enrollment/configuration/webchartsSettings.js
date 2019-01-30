export default function webchartsSettings() {
    return {
        colors: ['#2b8cbe', '#a6bddb'],
        resizable: false,
        width: 500,
        height: 350,

        y: {
            label: '',
            type: 'ordinal',
            column: null // set in syncSettings
        },
        x: {
            label: '',
            type: 'linear',
            column: null, // set in syncSettings
            behavior: 'firstfilter',
            domain: [0, null],
            format: '1d',
        },
        marks: [
            {
                arrange: 'nested',
                split: null, // set in syncSettings
                type: 'bar',
                per: [], // set in syncSettings
                attributes: { 'fill-opacity': 0.8 },
                summarizeX: 'count',
                tooltip: '' // set in syncSettings status
            }
        ],
        color_by: null, // set in syncSettings
        color_dom: ['Randomized', 'Screened'],
        legend: {
            label: '',
            order: ['Randomized', 'Screened']
        }
    };
}
