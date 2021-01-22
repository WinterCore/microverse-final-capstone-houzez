module.exports = {
  verbose: true,
  testPathIgnorePatterns: ["webpack/test.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/app/javascript/tests/file-mock.js",
  }
};
