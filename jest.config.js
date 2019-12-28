module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: "./tsconfig.json"
    }
  }
};