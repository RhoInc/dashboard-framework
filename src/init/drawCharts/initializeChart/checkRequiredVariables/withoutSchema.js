import { select } from 'd3';

export default function withoutSchema(chart) {
    const schema = [];

    //x.column
    if (chart.webcharts.config.x && chart.webcharts.config.x.column)
        schema.push({
            key: 'x.column',
            title: 'X-axis',
            current: chart.webcharts.config.x.column,
        });

    //y.column
    if (chart.webcharts.config.y && chart.webcharts.config.y.column)
        schema.push({
            key: 'y.column',
            title: 'Y-axis',
            current: chart.webcharts.config.y.column,
        });

    //color_by
    if (chart.webcharts.config.color_by)
        schema.push({
            key: 'color_by',
            title: 'Color Stratification',
            current: chart.webcharts.config.color_by,
        });

    //marks
    if (chart.webcharts.config.marks)
        chart.webcharts.config.marks.forEach((mark, i) => {

            //per
            if (mark.per && mark.per.length)
                mark.per.forEach((variable, j) => {
                    schema.push({
                        key: 'marks[' + i + '].per[' + j + ']',
                        title: `Mark ${i} (${mark.type}), key ${j}`,
                        current: variable,
                    });
                });

            //split
            if (mark.split)
                schema.push({
                    key: 'marks[' + i + '].split',
                    title: `Mark ${i} (${mark.type}) arrangement`,
                    current: mark.split
                });

            //values
            if (mark.values) {
                for (const value in mark.values)
                    schema.push({
                        key: 'marks[' + i + "].values['" + value + "']",
                        title: `Mark ${i} (${mark.type}), ${value} subset`,
                        current: value,
                    });
            }
        });

    schema.forEach(variable => {
        variable['data-mapping'] = true;
        variable.required = true;
        variable.missing = chart.variables.actual.indexOf(variable.current) < 0;
    });
    chart.variables.schema = schema;
    chart.variables.missing = chart.variables.schema.filter(variable => variable.missing);
}
