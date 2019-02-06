import checkArguments from './addChart/checkArguments';

export default function addChart(specification) {
    specification = checkArguments.call(this, specification);
    if (specification.continue) this.charts.push(specification);
}
