const db = require('../config/db');

const getAll = () => new Promise((resolve, reject) => db.many('SELECT id, email FROM users').then(data => resolve(data)).catch(error => reject(error)));

const get = (id) => new Promise((resolve, reject) => db.one('SELECT id, email FROM users WHERE id=${id}', {id}).then(data => resolve(data)).catch(error => reject(error)));

const add = (email, password) => new Promise((resolve, reject) => db.one('INSERT INTO users(email, password) VALUES (${email}, ${password}) RETURNING id', {email, password}).then(data => resolve(data)).catch(error => reject(error)));

const auth = (email) => new Promise((resolve, reject) => db.one('SELECT id, password FROM users WHERE email=${email}', {email}).then(data => resolve(data)).catch(error => reject(error)));

const update = (id, email, password) => new Promise((resolve, reject) => db.one('UPDATE users SET email=${email}, password=${password} WHERE id=${id} RETURNING id', {id, email, password}).then(data => resolve(data)).catch(error => reject(error)));

const remove = (id) => new Promise((resolve, reject) => db.one('DELETE FROM users WHERE id=${id} RETURNING id', {id}).then(data => resolve(data)).catch(error => reject(error)));

module.exports = {
    get,
    getAll,
    add,
    update,
    remove,
    auth
};