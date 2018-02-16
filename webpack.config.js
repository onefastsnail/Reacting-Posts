const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distDir = path.resolve(__dirname, 'assets/dist/react');
const srcDir = path.resolve(__dirname, 'assets/react');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
  })

const config = {
    entry: srcDir + '/App.js',
    output: {
        path: distDir,
        filename: 'bundle.js'
    },
    plugins: [
        HtmlWebpackPluginConfig
    ],
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: srcDir,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
};

module.exports = config
