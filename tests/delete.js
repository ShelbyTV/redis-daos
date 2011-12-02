var uid = process.argv[2];

if (!uid){
  console.error('no uid!');
  process.exit();
}

var dao = require('../index.js').build('facebook-poller');
dao.deleteUser(uid, function(){
  console.log(arguments);
  dao.userIsInSet(uid, function(){
    console.log('In Set?', arguments);
    dao.getUserInfo(uid, function(){
      console.log('User Info:', arguments);
    });
  });
});
