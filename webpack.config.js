const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/ExamplePackage/index.ts',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.ts', '.js', 'json'],
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname),
        open: true,
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            reportFiles: [
                                'src/**/*.ts',
                            ],
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/ExamplePackage/index.html',
            filename: 'index.html',
        }),
    ],
};
