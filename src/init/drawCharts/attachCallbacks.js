export default function attachCallbacks(chart) {
    if (chart.callbacks) {
        for (const callback in chart.callbacks)
            chart.webcharts.on(callback.substring(2).toLowerCase(), chart.callbacks[callback]);
    }
}
