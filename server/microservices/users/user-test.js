var assert = require('assert');

var seneca = require('seneca')()
  .use('entity')
  .use('user')
  .error(assert.fail);

test_list_user();
test_add_user();
test_get_user();
test_del_user();

function test_list_user() {
}

function test_add_user() {
  //seneca.act(
  //  role:'user',
  //  cmd:'add',
  //  data:{
  //    email     :'abc@gmail.com', 
  //    password  :'nothing', 
  //    first_name:'Dhulandhar', 
  //    last_name :'Bhatvadekar'
  //  },
  //  function(err, added_user) {
  //    if(err) console.log(err);
  //    console.log("Saved user with id [" + added_user.id + "]");
  //  }
  //);
  seneca.act('role:user,cmd:add, data:{email:a@b.com,password:abc,first_name:a,last_name:b}', function(err, user) {
    if(err) console.error(err);
    console.log("Added new user with id [" + user.id + "]");
  });
}

function test_get_user() {
}

function test_del_user() {
}



