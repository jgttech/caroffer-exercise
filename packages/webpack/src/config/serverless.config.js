const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const { argv: { mode="development" }} = yargs(hideBin(process.argv));

exports.serverless = () => {
    try {
        // Plugins
        const slsw = require("serverless-webpack");
        const WebpackBar = require("webpackbar");
        const { CleanWebpackPlugin } = require("clean-webpack-plugin");
        const WebpackNodeExternals = require("webpack-node-externals");

        return {
            mode,
            target: "node",
            entry: slsw.lib.entries,
            externals: [ WebpackNodeExternals() ],
            resolve: {
                modules: [
                    "node_modules",
                ],
                extensions: [
                    "*", ".js",
                ]
            },
            plugins: [
                new WebpackBar(),
                new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
            ],
            module: {
                strictExportPresence: true,
                rules: [{
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env"
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/plugin-transform-runtime",
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-proposal-optional-chaining",
                                "@babel/plugin-proposal-nullish-coalescing-operator"
                            ]
                        }
                    }
                }]
            }
        };
    } catch(e) {
        throw e;
    }
}