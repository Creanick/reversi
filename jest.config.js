module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  }
};
