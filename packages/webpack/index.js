const { web } = require("./src/config/web.config");
const { serverless } = require("./src/config/serverless.config");
const { createReducerAliases } = require("./src/utils/createReducerAliases");

module.exports = {
    web,
    serverless,
    utils: {
        createReducerAliases
    }
}