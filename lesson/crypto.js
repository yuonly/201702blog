/**
 * Created by yu on 2017/2/6.
 */

var crypto = require('crypto');

var md5 = crypto.createHash('md5');

var re = md5.update('1').digest('hex');

console.log(re);
