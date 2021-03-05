exports.web = (additionalConfig={}) => (none, { analyzer=false }) => {
    try {
        // Utils
        const { withSwitch } = require("../utils/withSwitch");
        const { resolve } = require("path");
        const webpack = require("webpack");

        // Plugins
        const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
        const { CleanWebpackPlugin } = require("clean-webpack-plugin");
        const HtmlWebpackPlugin = require("html-webpack-plugin");
        const HtmlWebpackTemplate = require("html-webpack-template");
        const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
        const TerserWebpackPlugin = require("terser-webpack-plugin");
        const WebpackManifestPlugin = require("webpack-manifest-plugin");
        const DotEnvPlugin = require("dotenv-webpack");
        const WebpackBar = require("webpackbar");

        // Array of configured features (also prints features to console).
        const mode = process.env.NODE_ENV || "development";

        /**
         * [ABOUT]
         * Import and validate environment configuration.
         * If an error is found for the environment configuration
         * it will throw, failing the Webpack build and displaying
         * a message about the environment variables that failed to
         * properly load and validate for the environment.
         */
        require("dotenv-safe").config({
            allowEmptyValues: false,
        });

        return {
            mode,
            target: "web",
            devtool: withSwitch(mode, {
                development: "inline-source-map",
                production: false
            }),
            devServer: {
                historyApiFallback: true,
                contentBase: resolve(".dist", "app"),
                compress: true,
                port: 9000,
                hot: true,
                open: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
                },
            },
            entry: {
                app: [ resolve("src", "index.jsx") ],
            },
            output: withSwitch(mode, {
                default: {
                    path: resolve(".dist", "app"),
                    publicPath: "/"
                },
                production: {
                    chunkFilename: "[name].[chunkhash].bundle.js",
                    filename: "[name].[chunkhash].bundle.js",
                },
                development: {
                    chunkFilename: "[name].bundle.js",
                    filename: "[name].bundle.js",
                }
            }),
            optimization: {
                splitChunks: {
                    chunks: "all",
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendor",
                            chunks: "initial"
                        }
                    }
                },
                runtimeChunk: {
                    name: "manifest"
                },
                minimize: mode === "production",
                minimizer: [
                    new TerserWebpackPlugin()
                ]
            },
            resolve: {
                modules: [...additionalConfig.modules || [], ...[
                    "node_modules",
                ]],
                extensions: [...additionalConfig.extensions || [], ...[
                    "*", ".js", ".jsx",
                    ".png", ".jpg", ".jpeg", ".ico",
                    ".less", ".sass", ".scss"
                ]],
                alias: {...additionalConfig.alias || {}}
            },
            plugins: [
                new WebpackBar(),
                !!analyzer && new BundleAnalyzerPlugin({ analyzerMode: "static" }),
                new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
                new FaviconsWebpackPlugin({
                    logo: resolve("src", "assets", "images", "favicon.ico"),
                    outputPath: resolve(".dist", "app"),
                    inject: true,
                }),
                new HtmlWebpackPlugin({
                    hash: true,
                    title: "WMI",
                    template: HtmlWebpackTemplate,
                    appMountId: "app",
                    links: [{
                        rel: "stylesheet",
                        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    }],
                    meta: {
                        viewport:
                            "width=device-width, " +
                            "initial-scale=1, " +
                            "shrink-to-fit=no, " +
                            "user-scalable=no"
                    }
                }),
                new DotEnvPlugin({
                    safe: true,
                    systemvars: false,
                    silent: false,
                    allowEmptyValues: false
                }),
                new WebpackManifestPlugin(),
            ].filter(plugin => !!plugin),
            module: {
                strictExportPresence: true,
                rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/plugin-transform-runtime",
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-proposal-optional-chaining",
                                "@babel/plugin-proposal-nullish-coalescing-operator",
                                "react-loadable/babel",
                                "react-require"
                            ]
                        }
                    }
                }, {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                outputStyle: "compressed"
                            }
                        }
                    }]
                }, {
                    test: /\.less$/i,
                    exclude: /node_modules\/(?!(antd)\/).*/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }]
                }, {
                    test: /\.css$/i,
                    exclude: /node_modules\/(?!(antd)\/).*/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }]
                }, {
                    test: /\.(jpg|jpeg|ico|csv|png|oft|woff|woff2|eot|ttf|svg)$/,
                    exclude: /\.(s[ac]ss|less)$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            outputPath: "assets",
                            publicPath: "/assets"
                        }
                    }]
                }]
            }
        };
    } catch(e) {
        throw e;
    }
}