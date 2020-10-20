// const fs = require('fs');
const dotenv = require('dotenv');
// const envStrings = require('../constants/Strings').envs;
const result = dotenv.config();

if(result.error) {
    throw result.error;
}

// let envConfig = null;
// if(process.env.NODE_ENV === envStrings.production) {
//     envConfig = dotenv.parse(fs.readFileSync('production.env'));
// } else if(process.env.NODE_ENV === envStrings.dev) {
//     envConfig = dotenv.parse(fs.readFileSync('development.env'));
// } else {
//     envConfig = dotenv.parse(fs.readFileSync('local.env'));
// }

const { parsed: envs } = result;

module.exports = Object.assign({}, envs, envConfig);