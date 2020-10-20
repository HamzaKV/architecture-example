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

module.exports = {
    routes
};