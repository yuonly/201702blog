###在终端控制台。定义环境变量的方法

* windows
        
        定义：set name=hdpx
        输出： echo %name%
    
* mac linux

        定义: export DEGUB=201702:*;
        输出： echo $DEBUG
        
* debug.js
            
        var debug = require('debug');
        process.env.NODE_DEBUG = '201702:*';
        var error_debug = debug('201702:error');
        error_debug('error-message');
 
        var warning_debug = debug('201702:warning');
        warning_debug('waring-message');
 
        var log_debug = debug('201702:log');
        log_debug('log-message');
        
* 定义不同的错误级别，输出不同的日志信息

        export DEBUG='201702:error'
        node debug.js
        
   >只输出error日志
   
        export DEBUG=201702:log
        node debug.js
   
   >只输出log日志
        
    