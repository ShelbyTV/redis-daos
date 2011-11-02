/*
 * redis-daos
 */

if (!process.env.NODE_ENV){
  console.error('Specify NODE_ENV');
  process.exit();
}

module.exports = {
  
  factory : require('factory-node'),
  super : require('./lib/dao.proto.js'),

  build : function(sub){
    if (sub){
      if (typeof sub === 'string'){
        sub = require('./lib/subs/'+sub);
      }
    }
    return this.factory.build(this.super, sub);    
  }

};
