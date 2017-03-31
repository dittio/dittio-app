var fs = require('fs');
var logfile_fd;

function math(options) {

  this.add({role:'math',cmd:'add'}, (msg, resp) => {
    var answer = parseFloat(msg.p1) + parseFloat(msg.p2);
    fs.write(logfile_fd, 'Math.add@' + new Date().toString() + ": " + '[' + msg.p1 + ' + ' + msg.p2 + '] = ' + answer + '.\n', 
        (error, written, buffer) => {
          if(error)resp(error);
          console.log('Wrote [' + written + ']  bytes...');
        });
    console.log('Sending: ' + answer);
    resp(null, {answer:answer});
  });

  this.add('init:math', init);

  function init(message, response) {
    console.log('Initializing plugin: math');
    fs.open(options.logfile, 'a', function(err, fd) {
      if(err) response(err);

      logfile_fd = fd;
      log = make_log(fd);
      response();
    });
  }
}

function make_log(fd) {
  return function(entry) {
    fs.write(fd, new Date().toString() + ": " + entry, null, 'utf-8', function(err) {
      if(err) return console.log(err);

      fs.fsync(fd, function(err) {
        if(err) return console.log(err);
      });
    });
  }
}

module.exports = math;
