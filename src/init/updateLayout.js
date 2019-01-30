import setNumberOfColumns from './updateLayout/setNumberOfColumns';
import layoutRows from './updateLayout/layoutRows';
import layoutCharts from './updateLayout/layoutCharts';

export default function updateLayout() {
    setNumberOfColumns.call(this);
    layoutRows.call(this);
    layoutCharts.call(this);
}
