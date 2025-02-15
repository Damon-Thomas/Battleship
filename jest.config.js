module.exports = {
modulePaths: ['/shared/vendor/modules'],
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "bower_components", "shared"],

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
    "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    //'^react(.*)$': '<rootDir>/vendor/react-master$1',
    '^config$': '<rootDir>/configs/app-config.js',
  },
};
