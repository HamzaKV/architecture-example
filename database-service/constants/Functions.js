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

module.exports = {
    sendSuccess,
    sendError
};