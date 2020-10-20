const redisClient = require('../config/redis').getClient();
const { getRequest, postRequest, patchRequest, deleteRequest } = require('../constants/Functions');
const Strings = require('../constants/Strings');

const get = (id) => new Promise((resolve, reject) => {
    redisClient.hgetall(`bug:${id}`, (error, reply) => {
        const timestamp = new Date().getTime();
        if(error) {
            getRequest({
                url: `${Strings.dbService}/bug/id/${id}`,
                json: true
            }).then(data => {
                resolve(data);
                redisClient.hset(`bug:${id}`, {data, timestamp});
            }).catch(error => reject(error));
        }
        if(reply) {
            resolve(reply.data);
            redisClient.hset(`bug:${id}`, {data: reply.data, timestamp});
        }
    });
});

const getAll = () => new Promise((resolve, reject) => {
    getRequest({
        url: `${Strings.dbService}/bug`,
        json: true
    }).then(data => resolve(data)).catch(error => reject(error));
});

const add = (title, project, severity, reporter, handler, status) => new Promise((resolve, reject) => {
    const timestamp = new Date().getTime();
    postRequest({
        url: `${Strings.dbService}/user`,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, project, severity, reporter, handler, status})
    }).then(data => {
        resolve();
        redisClient.hset(`user:${data.id}`, {data: {title, project, severity, reporter, handler, status}, timestamp: timestamp});
    }).catch(error => reject(error));
});

const update = (id, title, project, severity, reporter, handler, status) => new Promise((resolve, reject) => {
    const timestamp = new Date().getTime();
    redisClient.hmgetAll(`user:${id}`, (error, reply) => {
        const data = {
            title, project, severity, reporter, handler, status
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
                body: JSON.stringify({id, title, project, severity, reporter, handler, status})
            }).then(() => {}).catch(() => {});
        } 
        if(error) {
            patchRequest({
                url: `${Strings.dbService}/user`,
                json: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, title, project, severity, reporter, handler, status})
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

module.exports = {
    get,
    getAll,
    add,
    update,
    remove
};