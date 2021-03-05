const { error } = console;

try {
    module.exports = require("@wmi/webpack").serverless();
} catch(e) {
    error(e);
}