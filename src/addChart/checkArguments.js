import checkSettings from './checkArguments/settings';
import checkData from './checkArguments/data';
import checkTitle from './checkArguments/title';
import checkControlInputs from './checkArguments/controlInputs';
import checkCallbacks from './checkArguments/callbacks';
import checkRow from './checkArguments/row';
import checkCol from './checkArguments/col';

export default function checkArguments(argument) {
    const specification = Object.assign({}, argument);
    specification.index = this.charts.length + 1;
    console.log(`Checking specification of chart ${specification.index}.`);

    //required arguments
    checkSettings(specification);
    if (specification.continue === false) {
        console.log(`Chart ${specification.index} DOES NOT check out.`);
        return specification;
    }

    checkData(specification);
    if (specification.continue === false) {
        console.log(`Chart ${specification.index} DOES NOT check out.`);
        return specification;
    }

    //optional arguments
    checkTitle(specification);
    checkControlInputs(specification);
    checkCallbacks(specification);
    checkRow(specification);
    checkCol(specification);

    specification.continue = true;
    console.log(`Chart ${specification.index} checks out.`);

    return specification;
}
