const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.tsx",
    },
    resolve: {
        alias: {
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",     // Must be below test-utils
            "react/jsx-runtime": "preact/jsx-runtime"
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    optimization: {
        minimizer: [new TerserWebpackPlugin()],
    },
}

