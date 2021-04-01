const ph = require("path");

module.exports = {
    mode: "production",
    target: ["web", "es5"],
    devtool: false,
    context: __dirname,
    resolve: {
        extensions: [".js", ".ts"],
        alias: {
            "@/*": ph.join(__dirname, "src"),
            "kiva/*": ph.join(__dirname, "kiva")
        }
    },
    entry: {
        "index": "./src/index.ts"
    },
    output: {
        filename: "[name].js",
        path: ph.resolve(__dirname, "dist"),
        globalObject: "this",
        libraryTarget: "umd2",
        library: "ffeach"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["babel-loader", "ts-loader"]
            }
        ]
    }
};
