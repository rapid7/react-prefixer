var webpack = require("webpack"),
    merge = require("lodash").merge;

module.exports = merge({},require("./webpack.config"),{
    output:{
        filename:"react-prefixer.min.js"
    },

    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                booleans:true,
                conditionals:true,
                drop_console:true,
                drop_debugger:true,
                join_vars:true,
                sequences:true,
                warnings:false
            },
            sourceMap:false
        }),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify("production")
            }
        })
    ]
});