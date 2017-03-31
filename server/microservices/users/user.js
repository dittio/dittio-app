var seneca = require('seneca')();
seneca.use('entity');

function user(options) {

  this.add({role:'user',cmd:'add'}, (msg, resp) => {
    var user = seneca.make('users');
    user.email      = msg.email;
    user.password   = msg.password;
    user.first_name = msg.first_name;
    user.last_name  = msg.last_name;

    user.save$(console.log);
    resp(null, {answer: user.id});
  });
}

module.exports = user;
