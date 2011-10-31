/*
 * Redis DAO Factory
 */

var config = require('shelby-config')[process.env.NODE_ENV];
var redis = require('redis').createClient(config.redis.port, config.redis.server);

module.exports = {

  dao_proto : require('./dao.proto.js'),

  buildTypeMap : {
    'facebook-poller' : './subs/facebook-poller.js',
    'tumblr-poller' : './subs/tumblr-poller.js',
    //'twitter-poller' : './subs/twitter-poller.js', -- coming soon 
    'twitter-stream' : './subs/twitter-stream.js'
  },

  _addSubclass : function(super, sub){
    Object.keys(sub).forEach(function(k){
      super[k] = sub[k];  
    });
    return super;
  },

  build : function(constructor_data){
    var super = Object.create(this.dao_proto);
    super.redis = redis;
    var sub = (typeof constructor_data === 'string') ? require(this.buildTypeMap[constructor_data]) : constructor_data;
    return this._addSubclass(super, sub);
  }

};
