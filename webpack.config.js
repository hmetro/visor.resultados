const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'none',

    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash:7].js'
    },

    module: {
        rules: [
            {
                test: /.\jsx?$/,
                use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.(png|gif|jpe?g)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:7].[ext]',
                        limit: 8192,
                        outputPath: 'assets/images'
                    }
                }]
            
            },
            {
                test: /\.(eot|svg|ttf|woff2?)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash:7].[ext]',
                        outputPath: 'assets/fonts'
                    }
                }]
            
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it uses publicPath in webpackOptions.output
                          hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                              require('autoprefixer')(),
                            //   require('cssnano')()
                            ]
                          }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name]-[hash:7].css',
        }),
    ]
}