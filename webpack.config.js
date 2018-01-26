module.exports = {
    entry: "./js/nominations-mgr/index.js",
    output: {
        filename: "./js/nominations-mgr-bundle.js"
    },
    module:{
        loaders: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }    
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};