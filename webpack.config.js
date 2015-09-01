var path = require("path"),
    webpack = require("webpack");

module.exports = {
    cache:true,

    entry: path.join(__dirname,"src/index.js"),

    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: "babel-loader",
                test: /\.jsx?$/
            }
        ]
    },

    output: {
        filename:"react-prefixer.js",
        library:"react-prefixer",
        libraryTarget:"umd",
        path:path.join(__dirname,"/dist")
    }
};
