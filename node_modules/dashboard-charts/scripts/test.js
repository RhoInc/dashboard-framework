var glob = require('glob');
glob(
    '../src/**/*.js',
    function(error,files) {
        if (error)
            console.log(error)
        console.log(files);
    }
);
