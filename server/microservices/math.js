module.exports = function math(options) {

   this.add({role:'web',cmd:'add'}, (msg, resp) => {
      var answer = parseFloat(msg.p1) + parseFloat(msg.p2);
      console.log('Sending: ' + answer);
      resp(null, {answer:answer});
   });
}

