module.exports = function(app) {
  var seneca = require('seneca')();

  app.get('/ms/user/add', function(msg, resp) {
    seneca.use('user')
      .act({
        role:'user',
        cmd:'add',
        email:msg.email,
        password:msg.password,
        first_name:msg.first_name,
        last_name:msg.last_name
      },
      function(err, result) {
          if(err) console.error(err);
          resp.send(result);
      }
    );
  });
}
