export default function stringAccessor(object, option, value) {
    const a = option
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '')
        .split('.');

    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (k in object) {
            if (i == n - 1 && value !== undefined) object[k] = value;
            object = object[k];
        } else {
            return;
        }
    }
    return object;
}
