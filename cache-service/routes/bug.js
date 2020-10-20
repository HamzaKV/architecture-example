const express = require('express');
const router = express.Router();

const Strings = require('../constants/Strings');
const Functions = require('../constants/Functions');
const Objects = require('../constants/Objects');
const bugs = require('../models/bugs');

router.get(Strings.routes.bug.getAll, (req, res, next) => {
    bugs.getAll().then(data => Functions.sendSuccess(res, data)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
});

router.get(Strings.routes.bug.getOne, (req, res, next) => {
    const { id } = req.params;
    bugs.get(id).then(data => Functions.sendSuccess(res, data)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
});

router.post(Strings.routes.bug.add, (req, res, next) => {
    const {
        title, 
        project, 
        severity, 
        reporter, 
        handler, 
        status
    } = req.body;
    bugs.add(title, project, severity, reporter, handler, status).then(data => Functions.sendSuccess(res, data)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
});

router.patch(Strings.routes.bug.update, (req, res, next) => {
    const {
        id,
        title, 
        project, 
        severity, 
        reporter, 
        handler, 
        status
    } = req.body;
    bugs.get(id).then(data => {
        bugs.update(
            id,
            title ? title : data.title, 
            project ? project : data.project, 
            severity ? severity : data.severity, 
            reporter ? reporter : data.reporter, 
            handler ? handler : data.handler, 
            status ? status : data.status
        ).then(data1 => Functions.sendSuccess(res, data1)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
    }).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
});

router.delete(Strings.routes.bug.delete, (req, res, next) => {
    const { id } = req.params;
    bugs.remove(id).then(data => Functions.sendSuccess(res, data)).catch(error => Functions.sendError(res, Objects.responses.dbError, error));
});

module.exports = router;