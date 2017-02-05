/**
 * Created by yu on 2017/2/6.
 */
module.exports = {
    md5:function(input){
        var crypto = require('crypto');
        return crypto.createHash('md5').update(input).digest('hex');
    }
}
