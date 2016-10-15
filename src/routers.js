// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Home = resolve => {
    require.ensure(['./views/index.vue'], () => {
        resolve(require('./views/index.vue'));
    });
};

const List = resolve => {
    require.ensure(['./views/list.vue'], () => {
        resolve(require('./views/list.vue'));
    });
};

const routers = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/cnodevue',
    name: 'cnodevue',
    component: Home
}, {
    path: '/list',
    name: 'list',
    component: List
}, {
    path: '/topic/:id',
    name: 'topic',
    component(resolve) {
        require.ensure(['./views/topic.vue'], () => {
            resolve(require('./views/topic.vue'));
        });
    }
}, {
    path: '/add',
    name: 'add',
    component(resolve) {
        require.ensure(['./views/new.vue'], () => {
            resolve(require('./views/new.vue'));
        });
    },
    meta: { requiresAuth: true }
}, {
    path: '/message',
    name: 'message',
    component(resolve) {
        require.ensure(['./views/message.vue'], () => {
            resolve(require('./views/message.vue'));
        });
    },
    meta: { requiresAuth: true }
}, {
    path: '/user/:loginname',
    name: 'user',
    component(resolve) {
        require.ensure(['./views/user.vue'], () => {
            resolve(require('./views/user.vue'));
        });
    }
}, {
    path: '/about',
    name: 'about',
    component(resolve) {
        require.ensure(['./views/about.vue'], () => {
            resolve(require('./views/about.vue'));
        });
    }
}, {
    path: '/login',
    name: 'login',
    component(resolve) {
        require.ensure(['./views/login.vue'], () => {
            resolve(require('./views/login.vue'));
        });
    }
}, {
    path: '*',
    component: Home
}];

export default routers;