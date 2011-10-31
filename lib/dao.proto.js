/*
 * Redis DAO prototype/super
 * -- most of this functionality is for 'pollers' as 
 *  that is what we mostly use right now
 */

module.exports = {

  getUserInfoKey : function(user_id) {
    return this.infoKeyPrefix+':'+user_id+':info';
  },

  getUserSetKey : function() {
    return this.setKey;
  },

  addUserToSet : function(user_id, callback) {
    this.redis.sadd(this.getUserSetKey(), user_id, callback);
  },

  getUserSet : function(callback) {
    this.redis.smembers(this.getUserSetKey(), callback);
  },

  getUserInfo : function(user_id, callback) {
    this.redis.hgetall(this.getUserInfoKey(user_id), callback);
  },

  setUserInfo : function(user_id, info_hash, callback) { 
    var self = this;
    addUserToSet(user_id, function(err, res) {
      self.redis.hmset(self.getUserInfoKey(user_id), info_hash, callback);  
    });
  },

  setUserProperty : function(user_id, property, value, callback) {
    this.redis.hset(this.getUserInfoKey(user_id), property, value, callback);
  },

  userIsInSet : function(user_id, callback) {
    this.redis.sismember(this.getUserSetKey(), user_id, callback);
  }
};
