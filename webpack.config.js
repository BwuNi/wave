var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'app': path.resolve(__dirname, './src/app.ts')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: 'chunk/[id]_[chunkhash:8].chunk.js'
    },
    devServer: {
        port: 8888,
        open: true,
        hot: true,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        "extensions": ['.js', '.ts']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
}