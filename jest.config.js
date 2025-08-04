module.exports = {
    preset: "react-native",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?|expo-router))",
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1", //
    },
};
