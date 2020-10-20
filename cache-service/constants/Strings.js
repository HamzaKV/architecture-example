const routes = {
    user: {
        root: '/user',
        add: '/',
        getAll: '/',
        getOne: '/id/:id',
        update: '/',
        delete: '/',
        auth: '/auth'
    },
    bug: {
        root: '/bug',
        add: '/',
        getAll: '/',
        getOne: '/id/:id',
        update: '/',
        delete: '/'
    }
};

const dbService = 'http://localhost:5000';

module.exports = {
    routes,
    dbService
};