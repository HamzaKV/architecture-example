const db = require('../config/db');

const getAll = () => new Promise((resolve, reject) => db.many('SELECT id, title, project, severity, status description FROM bugs').then(data => resolve(data)).catch(error => reject(error)));

const get = (id) => new Promise((resolve, reject) => db.one('WITH ins AS (SELECT bugs.id, users.email AS reporter, bugs.handler FROM bugs LEFT JOIN users ON users.id=bugs.reporter WHERE id=${id}) SELECT ins.id, ins.reporter, users.email AS handler FROM ins LEFT JOIN users ON users.id=ins.handler', {id}).then(data => resolve(data)).catch(error => reject(error)));

const add = (title, project, severity, reporter, handler, status) => new Promise((resolve, reject) => db.one('INSERT INTO bugs(title, project, severity, reporter, handler, status) VALUES (${title}, ${project}, ${severity}, ${reporter}, ${handler}, ${status}) RETURNING id', {title, project, severity, reporter, handler, status}).then(data => resolve(data)).catch(error => reject(error)));

const update = (id, title, project, severity, reporter, handler, status) => new Promise((resolve, reject) => db.one('UPDATE bugs SET title=${title}, project=${project}, severity=${severity}, reporter=${reporter}, handler=${handler}, status=${status} WHERE id=${id} RETURNING id', {id, title, project, severity, reporter, handler, status}).then(data => resolve(data)).catch(error => reject(error)));

const remove = (id) => new Promise((resolve, reject) => db.one('DELETE FROM bugs WHERE id=${id} RETURNING id', {id}).then(data => resolve(data)).catch(error => reject(error)));

module.exports = {
    get,
    getAll,
    add,
    update,
    remove
};