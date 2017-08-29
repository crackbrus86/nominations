module.exports = {
    entry: "./js/settings/index.js",
    output: {
        filename: "./js/settings-bundle.js"
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