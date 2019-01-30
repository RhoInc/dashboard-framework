export default function layoutRows() {
    this.settings.nRows = Math.ceil(this.settings.nCharts/this.settings.nColumns);
    for (let i = 0; i < this.settings.nRows; i++) {
        const row = i + 1;
        this.containers[`row${row}`] = this.containers.main
            .append('div')
            .classed(`df-row df-row--${row}`, true);
    }
}
