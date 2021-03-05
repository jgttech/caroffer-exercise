const { resolve } = require("path");
const { existsSync, lstatSync, readdirSync } = require("fs");

exports.createReducerAliases = () => {
    const aliases = {};
    const basePath = resolve("src", "reducers");
    const hasReducersDir = existsSync(basePath);

    try {
        // If the node does not exist, return an empty object.
        if (!hasReducersDir) return aliases
        else {
            const stat = lstatSync(basePath);

            // Return an empty object if the "basePath"
            // is pointing to a file node.
            if (stat.isFile()) return {}
            else {
                const dirContent = readdirSync(basePath);

                for (const target of dirContent) {
                    const reducerPath = resolve(basePath, target);
                    const reducerDir = lstatSync(reducerPath);

                    if (reducerDir.isDirectory()) {
                        const hasReducer = existsSync(resolve(reducerPath, "reducer.js"));

                        // If the "reducer.js" file exists, add this to the "aliases".
                        if (hasReducer)
                            aliases[target] = resolve(reducerPath, "reducer.js");
                    }
                }
            }

            return aliases;
        }
    } catch(e) {
        console.error(e);

        // Throw error, but still return to allow execution.
        return aliases;
    }
}