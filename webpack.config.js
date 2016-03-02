var path = require("path");

module.exports = {
  entry: {
    app: ["./app/js/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "public", "js"),
    publicPath: "/js/",
    filename: "bundle.js"
  }
};

