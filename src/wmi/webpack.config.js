const { error } = console;

try {
    const { resolve } = require("path");
    const { web, utils } = require("@wmi/webpack");
    const { createReducerAliases } = utils;

    module.exports = web({
        alias: {...createReducerAliases(),
            reducers: resolve("src", "reducers")
        }
    });
} catch(e) {
    error(e);
}