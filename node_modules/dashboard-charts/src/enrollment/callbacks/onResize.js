export default function onResize() {
    const context = this;

    //Add population totals to legend labels.
    this.wrap.selectAll('.legend-label').each(function(d) {
        d3.select(this).text(
            d.label +
                ' (' +
                context.raw_data.filter(function(di) {
                    return di.status === d.label;
                }).length +
                ')'
        );
    });
}
