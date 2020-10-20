const express = require('express');
const router = express.Router();

const Strings = require('../constants/Strings');
const Functions = require('../constants/Functions');
const Objects = require('../constants/Objects');
const users = require('../models/users');

router.post(Strings.routes.user.auth, (req, res, next) => {
    const { email } = req.body;
    users.auth(email).then(data => Functions.sendSuccess(res, data)).catch(() => Functions.sendError(res, Objects.responses.badRequest));
});

router.get(Strings.routes.user.getAll, (req, res, next) => {
    users.getAll().then(data => Functions.sendSuccess(res, data)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
});

router.get(Strings.routes.user.getOne, (req, res, next) => {
    const { id } = req.params;
    users.get(id).then(data => Functions.sendSuccess(res, data)).catch(() => Functions.sendError(res, Objects.responses.notFound));
});

router.post(Strings.routes.user.add, (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    users.add(email, password).then(data => Functions.sendSuccess(res, data)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
});

router.patch(Strings.routes.user.update, (req, res, next) => {
    const {
        id,
        email,
        password
    } = req.body;
    users.get(id).then(data => {
        users.update(id, email ? email : data.email, password ? password : data.password).then(data1 => Functions.sendSuccess(res, data1)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
    }).catch(error => Functions.sendError(res, Objects.responses.notFound));
});

router.delete(Strings.routes.user.delete, (req, res, next) => {
    const { id } = req.body;
    users.remove(id).then(data => Functions.sendSuccess(res, data)).catch(() => Functions.sendError(res, Objects.responses.notFound));
});

module.exports = router;