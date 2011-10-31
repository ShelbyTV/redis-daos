var factory = require('../index.js');
var dao = factory.build('twitter-stream');
dao.getUserSet(function(e, set){
  console.log('# tw stream users:', set.length);
  process.exit();
});
