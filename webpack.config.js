const path = require("path");
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const webpack = require("webpack");
const { resolve } = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

module.exports = {
    entry: {
        indexjs: "./src/index.js",
        indexts: ",/src/index.ts",
        style: "./test/version0.9.1/css/style.css",
    },
    mode: "development",
    // 1.配合npm run watch监听改变
    // 2.提取这些 source map，并内联到最终的 bundle 中
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    output:  {
        filename: "[name].[chunkhash].js",
        // chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: require.resolve("./src/globals.js"),
                loader: "exports-loader",
                options: {
                    exports: ["FS", "LOG", "ERROR"]
                }
            },
            {
                test: /\.(c|sa|le)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
                //,  "sass-loader", "less-loader"
            },
            {
                test: /\.(png|jpeg|jpg|svg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /.tsx?$/,
                use: "ts-loader",
                exclude: "node_modules"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts"]
        // '.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            join: ["lodash", "join"]
        }),
        new CleanWebpackPlugin({
            removeFiles: ["dist"]
        }),
        new HtmlWebpackPlugin({
            title: "AmazJsOrz",
            filename: "index.html",
            favicon: "./src/AmazJsOrz.png",
            css: "./test/version0.9.1/css/style.css"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            // chunkFilename: "[id].css"
        })
    ],
};