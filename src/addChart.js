export default function addChart(settings, data, title, controlInputs, callbacks, row, col) {
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
    settings.resizable = false;
    delete settings.width;
    delete settings.height;
    settings.scale_text = true;
    settings.aspect = 1.75;
    this.charts.push({
        settings,
        data,
        title,
        controlInputs,
        callbacks,
        row,
        col
    });
}
