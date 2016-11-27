/**
 * Created by rishi on 11/23/16.
 */

var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('auto_exchange.log'), 'cmpe_user');
var logger = log4js.getLogger('cmpe_user');
logger.setLevel('TRACE');

function getLogger(){
    return logger;
}

exports.getLogger = getLogger;
