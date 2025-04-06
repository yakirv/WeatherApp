const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { watchFile } = require('fs')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/WeatherApp/', // Add this line with your repo name
    },

    devtool: 'eval-source-map',
    devServer: {
        watchFiles: ['./src/template.html'],
    },
    stats: {
        children: true,
    },

    mode: 'development', // You'll want to change this to "production" for builds

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ],
    },
}
