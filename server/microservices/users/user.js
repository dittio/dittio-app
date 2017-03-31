var seneca = require('seneca')();
seneca.use('entity');

function user(options) {

  this.add({role:'user',cmd:'add'}, (msg, resp) => {
    var user = seneca.make('users');
    user.email      = msg.data.email;
    user.password   = msg.data.password;
    user.first_name = msg.data.first_name;
    user.last_name  = msg.data.last_name;

    user.save$(console.log);
    resp(null, {answer: user.id});
  });
}

module.exports = user;
