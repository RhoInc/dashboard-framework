export default function webchartsSettings() {
    return {
        resizable: false,
        width: 500,
        height: 350,

        x: {
            label: '',
            type: 'ordinal',
            column: null, // set in syncSettings
        },
        y: {
            label: '',
            type: 'linear',
            column: null, // set in syncSettings
            behavior: 'flex',
            domain: [0, null]
        },
        marks: [
            {
                arrange: 'stacked',
                split: null, // set in syncSettings
                type: 'bar',
                per: [], // set in syncSettings
                summarizeY: 'count',
                tooltip: null // set in syncSettings
            }
        ],
        color_dom: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed'],
        color_by: null, // set in syncSettings
        colors: ['rgb(102,194,165)', 'rgb(43,131,186)', '#fecc5c', '#E87F00', 'red', '#9933ff'],
        legend: {
            label: '',
            order: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed']
        },
        margin: {
            left: 50,
        }
    };
}
