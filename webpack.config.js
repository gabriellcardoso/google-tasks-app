module.exports = {
    mode: 'development',
    
    entry: "./src/index.tsx",
    
    output: {
        path: __dirname + "/dist",
        publicPath: "dist",
        filename: "bundle.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    devtool: "source-map",

    devServer: {
        historyApiFallback: true
    }

};