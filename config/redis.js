const redis = require('redis');
const bluebird = require('bluebird');
const client = redis.createClient('//127.0.0.1:6379');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = client;
