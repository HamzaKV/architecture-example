const redisClient = require('../config/redis').getClient();
const { getRequest, postRequest, patchRequest, deleteRequest } = require('../constants/Functions');
const Strings = require('../constants/Strings');

const get = (id) => new Promise((resolve, reject) => {
    redisClient.hgetall(`user:${id}`, (error, reply) => {
        const timestamp = new Date().getTime();
        if(error) {
            getRequest({
                url: `${Strings.dbService}/user/id/${id}`,
                json: true
            }).then(data => {
                resolve(data);
                redisClient.hset(`user:${id}`, {data: data, timestamp: timestamp});
            }).catch(error => reject(error));
        } 
        if(reply) {
            resolve(reply.data);
            redisClient.hset(`user:${id}`, {data: reply.data, timestamp: timestamp});
        }
    });
});

const getAll = () => new Promise((resolve, reject) => {
    getRequest({
        url: `${Strings.dbService}/user`,
        json: true
    }).then(data => resolve(data)).catch(error => reject(error));
});

const add = (email, password) => new Promise((resolve, reject) => {
    const timestamp = new Date().getTime();
    postRequest({
        url: `${Strings.dbService}/user`,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(data => {
        resolve();
        redisClient.hset(`user:${data.id}`, {data: {email, password}, timestamp: timestamp});
    }).catch(error => reject(error));
});

const update = (id, email, password) => new Promise((resolve, reject) => {
    const timestamp = new Date().getTime();
    redisClient.hmgetAll(`user:${id}`, (error, reply) => {
        const data = {
            email: email ? email : reply.data.email,
            password: password ? password : reply.data.password
        };
        if(reply) {
            redisClient.hset(`user:${id}`, {data: data, timestamp: timestamp});
            resolve();
            patchRequest({
                url: `${Strings.dbService}/user`,
                json: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, email, password})
            }).then(() => {}).catch(() => {});
        } 
        if(error) {
            patchRequest({
                url: `${Strings.dbService}/user`,
                json: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, email, password})
            }).then(() => {
                resolve();
                redisClient.hset(`user:${id}`, {data: data, timestamp: timestamp});
            }).catch(error => reject(error));
        }
    });
});

const remove = (id) => new Promise((resolve, reject) => {
    redisClient.hdel(`user:${id}`);
    deleteRequest({
        url: `${Strings.dbService}/user`,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(() => resolve()).catch(error => reject(error));
});

const auth = (email) => new Promise((resolve, reject) => {
    redisClient.hgetall(`auth:${id}`, (error, reply) => {
        const timestamp = new Date().getTime();
        if(error) {
            postRequest({
                url: `${Strings.dbService}/auth`,
                json: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            }).then(data => {
                resolve(data);
                redisClient.hset(`auth:${id}`, {data: data, timestamp: timestamp});
            }).catch(error => reject(error));
        } 
        if(reply) {
            resolve(reply.data);
            redisClient.hset(`auth:${id}`, {data: reply.data, timestamp: timestamp});
        }
    });
});

module.exports = {
    get,
    getAll,
    add,
    update,
    remove,
    auth
};