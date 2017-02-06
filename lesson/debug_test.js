/**
 * Created by yu on 2017/2/5.
 */
var debug = require('debug');
process.env.NODE_DEBUG = '201702:*';
var error_debug = debug('201702:error');
error_debug('error-message');

var warning_debug = debug('201702:warning');
warning_debug('waring-message');

var log_debug = debug('201702:log');
log_debug('log-message');

