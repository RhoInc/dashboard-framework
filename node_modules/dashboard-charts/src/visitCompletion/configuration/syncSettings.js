export default function syncSettings(settings) {
    settings.x.column = settings.visit_col;
    settings.y.column = settings.status_col;
    settings.marks[0].split = settings.status_col;
    settings.marks[0].per[0] = settings.visit_col;
    settings.marks[0].tooltip = '[' + settings.status_col + ']: $y';
    settings.color_by = settings.status_col;

    return settings;
}
