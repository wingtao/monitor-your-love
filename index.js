const Monitor = require('./Monitor');

/**
 * url: https://item.jd.com/16886934964.htm
 * @type {string}
 */
const url = process.argv[2];
const target = process.argv[3];
new Monitor(url,target);
