const responses = {
    successful: {
        status: 200,
        message: null
    },
    notAuthenticated: {
        status: 401,
        error: 'Auth Failed'
    },
    dbError: {
        status: 500,
        error: 'Error with DB'
    },
    tokenError: {
        status: 500,
        error: 'Error with Token'
    },
    limiterError: {
        status: 429,
        error: 'Too many requests'
    },
    fileSavingError: {
        status: 500,
        error: 'Error with File'
    },
    fileTypeError: {
        status: 415,
        error: 'File not supported'
    },
    stripeError: {
        status: 406,
        error: 'Error with Stripe'
    },
    notFound: {
        status: 404,
        error: 'Not Found'
    },
    mailError: {
        status: 500,
        error: 'Error with mail'
    },
    badRequest: {
        status: 400,
        error: 'Bad Request'
    }
};

module.exports = {
    responses
};