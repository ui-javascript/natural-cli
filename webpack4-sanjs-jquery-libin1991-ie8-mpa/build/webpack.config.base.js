/* eslint-disable */
const path = require('path')

// 常用插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 配置文件
const myConfig = require("../config/index")

// 处理路径
function resolve(dir) {
    return path.join(__dirname, '..' , dir)
}

let webpackConfig = {
    mode: 'development',
    // 配置入口
    entry: {},
    // 配置出口
    output: {
        path: resolve("dist"),
        filename: 'js/[name].[hash:7].js',
        publicPath: '/',
        globalObject: 'this'
    },
    resolve: {
        extensions: [".js", ".json", ".vue", ".san", '.less', '.sass'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@m': resolve('src/cmpt-melt/model'),
            '@e': resolve('src/cmpt-melt/effects'),
            '@l': resolve('src/cmpt-melt/layout'),
            '@t': resolve('src/cmpt-melt/toolbox'),
            // san: 'san/dist/san.dev.js'
        }
    },
    externals: {
        jquery: 'window.$',
        $: 'window.$',
        san: 'window.san',
        seajs: 'window.seajs',
        requirejs: 'window.requirejs',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve(myConfig.PAGES),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client'),
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize&sourceMap=false']
                        }),
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize&sourceMap=false', "less-loader"]
                        })
                    }
                },
            },
            {
                test: /\.san$/,
                loader: 'san-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-withimg-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]'
                },
                include: [resolve('src/icons')],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                },
                exclude: [resolve('src/icons')],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?sourceMap=false', "postcss-loader"],
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?sourceMap=false', "postcss-loader", 'less-loader'],
                }),
            },

        ]
    },

    plugins: [
        new VueLoaderPlugin(),
    ],
};

// 路径覆盖
Object.assign(webpackConfig.resolve.alias, myConfig.RESOLVE_ALIAS)

module.exports = webpackConfig;