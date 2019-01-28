export default function addChart(settings, data, row, column) {
    console.log(settings);
    //console.table(
    //    Object.keys(settings)
    //        .filter(key => !(settings[key] instanceof Object))
    //        .reduce(
    //            (acc,cur) => {
    //                console.log(acc);
    //                console.log(cur);
    //                console.log(settings[cur]);

    //                return acc[cur] = settings[cur];
    //            },
    //            {}
    //        )
    //);
    //settings.resizable = true;
    delete settings.width;
    delete settings.height;
    settings.scale_text = true;
    //settings.aspect = 1.5;
    this.charts.push({
        settings,
        data,
        row,
        column
    });
}
