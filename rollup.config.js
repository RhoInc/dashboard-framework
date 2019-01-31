import resolve from 'rollup-plugin-node-resolve';
//import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

var pkg = require('./package.json');

module.exports = {
    input: pkg.module,
    output: {
        name: pkg.name
            .split('-')
            .map((str,i) =>
                i === 0 ?
                    str :
                    (str.substring(0,1).toUpperCase() + str.substring(1))
            )
            .join(''),
        file: pkg.main,
        format: 'umd',
        //globals: {
        //    d3: 'd3',
        //    webcharts: 'webCharts'
        //},
    },
    //external: (function() {
    //    var dependencies = pkg.dependencies;

    //    return Object.keys(dependencies);
    //}()),
    plugins: [
        resolve(),
        //commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ '@babel/preset-env', {modules: false} ]
            ],
            babelrc: false
        })
    ]
};
