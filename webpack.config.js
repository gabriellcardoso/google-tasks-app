const rules = {
    typescript: {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
    },
    sourceMap: {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
    }
};

module.exports = {
    mode: 'development',

    entry: "./src/index.tsx",

    output: {
        path: __dirname + "/dist",
        publicPath: "dist",
        filename: "bundle.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    module: {
        rules: [
            rules.typescript,
            rules.sourceMap
        ]
    },

    externals: {
        gapi: "gapi"
    },

    devtool: "source-map",

    devServer: {
        historyApiFallback: true
    }

};