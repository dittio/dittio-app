module.exports = function(app, router) {
   let seneca = require('seneca')();

   router.register({
         mathLib: "/math/:p1/:p2"
   },

   seneca.add('role:web,route:mathLib', (msg, resp) => {
      var answer = parseFloat(msg.params.p1) + parseFloat(msg.params.p2);
      msg.response.send('{answer: ' + answer + "}");
   })
   );

   app.use(router);
}

