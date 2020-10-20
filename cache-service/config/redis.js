const redis = require('redis');
let client = null;

const init = () => {
    client = redis.createClient({
        port: 6379,
        host: '127.0.0.1'
    });
    redisClient.on('connect', () => console.log('redis connected'));
    redisClient.on('error', () => console.log('redis not connected'));
};

const getClient = () => {
    if(client) return client;
    else {
        init();
        return client;
    }
};

module.exports = {
    getClient
};