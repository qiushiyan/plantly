// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  plugins: ["prettier", "react-native", "@tanstack/query"],
  rules: {
    "prettier/prettier": "warn",
    "react-native/no-unused-styles": "warn",
    "react-native/split-platform-components": "warn",
    "react-native/no-inline-styles": "warn",
    "react-native/no-raw-text": "warn",
  },
};
