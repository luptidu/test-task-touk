const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = (env) => {
    const PRODUCTION = 'production';
    const DEVELOPMENT = 'development';
    const isDevelopment = env !== PRODUCTION;
    const outputDirName = isDevelopment ? 'dist' : 'build';

    return {
        mode: isDevelopment ? DEVELOPMENT : PRODUCTION,
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, outputDirName),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react'],
                            plugins: ["transform-class-properties"]
                        }
                    }
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer]
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin([outputDirName]),
            new HtmlWebpackPlugin({ template: './public/index.html' }),
            new MiniCssExtractPlugin,
            new OptimizeCssAssetsPlugin
        ],
        devServer: {
            contentBase: './dist'
        },
    };
};