export default function setNumberOfColumns() {
    this.settings.nCharts = this.charts.length;

    if (this.settings.nColumns === undefined || this.settings.nColumns < 2 || this.settings.nColumns > 4) {
        if ([2,4].indexOf(this.settings.nCharts) > -1)
            this.settings.nColumns = 2;
        else if (this.settings.nCharts % 4 === 0)
            this.settings.nColumns = 4;
        else
            this.settings.nColumns = 3;
    }

    this.containers.main
        .classed(`dashboard-framework--${this.settings.nColumns}`, true);
}
