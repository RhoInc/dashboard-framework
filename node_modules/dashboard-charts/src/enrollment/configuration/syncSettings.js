export default function syncSettings(settings) {
    settings.x.column = settings.status_col;
    settings.y.column = settings.site_col;
    settings.marks[0].split = settings.status_col;
    settings.marks[0].per[0] = settings.site_col;
    settings.marks[0].tooltip = '[' + settings.status_col + ']: $x';
    settings.color_by = settings.status_col;

    return settings;
}
