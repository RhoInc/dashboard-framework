export default function syncSettings(settings) {
    settings.x.column = settings.date_col;
    settings.y.column = settings.number_participants_col;
    settings.marks[0].per[0] = settings.status_col;
    settings.color_by = settings.status_col;

    return settings;
}
