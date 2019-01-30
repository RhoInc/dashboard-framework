export default function onDraw() {
    const summarizeY = this.config.marks[0].summarizeY;
    if (summarizeY === 'count')
        this.config.y.format = '1d';
    else if (summarizeY === 'percent')
        this.config.y.format = '%';
    else
        this.config.y.format = null;
}
