var factory = require('../index.js');
var dao = factory.build('facebook-poller');
dao.getUserSet(function(e, set){
  console.log('# fb users:', set.length);
  dao.getUserInfo(set[0], function(e, info){
    console.log("user 0's info", info);
    process.exit();
  });
});
