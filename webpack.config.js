require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const prerender = require('./build/prerender')
const isProd = process.env.NODE_ENV === 'production'
const { VueLoaderPlugin } = require('vue-loader')

const plugins = [new VueLoaderPlugin()]

if (isProd) {
    plugins.push(
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].min.[chunkhash].css',
            attributes: {
                rel: 'preload',
                onload: 'this.onload=null;this.rel="stylesheet"',
                as: 'style',
            },
        })
    )
}

module.exports = {
    mode: process.env.NODE_ENV,
    entry: ['./resources/app/app.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader',
                options: {
                    svgo: {
                        plugins: [
                            { collapseGroups: false },
                            { removeEmptyContainers: false },
                            { cleanupIDs: false },
                            { removeViewBox: false },
                        ],
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader',
                    },
                    esModule: true,
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            },
            {
                test: /\.(jsx?|tsx?)$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /critical\.scss$/,
                use: isProd
                    ? [
                          'vue-style-loader',
                          'css-loader',
                          {
                              loader: 'postcss-loader',
                              options: {
                                  sourceMap: true,
                                  config: {
                                      path: `./build/postcss.config.js`,
                                  },
                              },
                          },
                          'sass-loader',
                      ]
                    : ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /main\.scss$/,
                use: isProd
                    ? [
                          MiniCssExtractPlugin.loader,
                          'css-loader',
                          {
                              loader: 'postcss-loader',
                              options: {
                                  sourceMap: true,
                                  config: {
                                      path: `./build/postcss.config.js`,
                                  },
                              },
                          },
                          'sass-loader',
                      ]
                    : ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        use: [
                            {
                                loader: 'pug-bem-plain-loader',
                                options: {
                                    b: true, // default 'b-'
                                    e: '__',
                                    m: '--',
                                },
                            },
                        ],
                    },

                    {
                        use: ['raw-loader', 'pug-bem-plain-loader'],
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    devServer: {
        historyApiFallback: true,
        noInfo: false,
        port: process.env.PORT || 2000,
    },
    devtool: '#eval-source-map',
    plugins,
}

const htmlTemplate = './resources/app/index.html'

if (isProd) {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || [])
        .concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                },
            }),
            new HtmlWebpackPlugin({
                template: htmlTemplate,
                filename: path.resolve(__dirname, 'dist/index.html'),
                minify: true,
            }),
        ])
        .concat(prerender)
} else {
    // NODE_ENV === 'development'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                PORT: 2000,
            },
        }),
        new HtmlWebpackPlugin({
            template: htmlTemplate,
            filename: 'index.html',
        }),
    ])
}
