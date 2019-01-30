export default function syncSettings(settings) {
    settings.x.column = settings.site_col;
    settings.marks[0].split = settings.status_col;
    settings.marks[0].per[0] = settings.site_col;
    settings.color_by = settings.status_col;

    return settings;
}
