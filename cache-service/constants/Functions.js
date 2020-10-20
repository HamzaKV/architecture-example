const request = require('request');
const { responses } = require('./Objects');

const sendSuccess = (res, message) => {
    return res.status(responses.successful.status).json({ message });
};

const sendError = (res, type, error) => {
    if(error) {
        console.log(error);
    }
    return res.status(type.status).json({ error: type.error });
};

const postRequest = (options) => new Promise((resolve, reject) => {
    request.post(options, (err, resp, body) => {
        if(err) {
            reject(err);
        }
        if(body.error) {
            reject(body);
        }
        resolve(body);
    });
});

const getRequest = (options) => new Promise((resolve, reject) => {
    request.get(options, (err, resp, body) => {
        if(err) {
            reject(err);
        }
        if(body.error) {
            reject(body);
        }
        resolve(body);
    });
});

const patchRequest = (options) => new Promise((resolve, reject) => {
    request.patch(options, (err, resp, body) => {
        if(err) {
            reject(err);
        }
        if(body.error) {
            reject(body);
        }
        resolve(body);
    });
});

const deleteRequest = (options) => new Promise((resolve, reject) => {
    request.delete(options, (err, resp, body) => {
        if(err) {
            reject(err);
        }
        if(body.error) {
            reject(body);
        }
        resolve(body);
    });
});

module.exports = {
    sendSuccess,
    sendError,
    deleteRequest,
    postRequest,
    getRequest,
    patchRequest
};