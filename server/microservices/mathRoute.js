module.exports = function(app) {

   app.get('/math/add/:p1/:p2', function(msg, resp) {
      require('seneca')()
      .use('math')
      .act({role:'web',cmd:'add',p1:msg.params.p1,p2:msg.params.p2}, 
         function(err, result) {
            if(err) console.error(err);
            resp.send(result);
         }
      );
   });
   }

