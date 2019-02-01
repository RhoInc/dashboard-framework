export default function title(specification) {
    //title - exists
    if (!specification.hasOwnProperty('title')) {
        specification.title = `${specification.settings.x.label || specification.settings.x.column} by ${specification.settings.y.label || specification.settings.y.column}`;
        console.log(`[ title ] property of chart specification is missing. Defaulting to "${specification.title}".`);
    }
}
