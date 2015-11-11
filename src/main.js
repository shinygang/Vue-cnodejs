var Vue = require('vue');
var app = Vue.extend({});
var VueResource = require('vue-resource');
Vue.use(VueResource);
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var validator = require('vue-validator');
Vue.use(validator);

//实例化Vue的filter
var filters = require('./filters');
Object.keys(filters).forEach(function(k) {
    Vue.filter(k, filters[k]);
})
//实例化VueRouter
var router = new VueRouter({
    hashbang: false,
    history: true,
    saveScrollPosition: true,
    transitionOnLoad: true
});

//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach(function (transition) {
    if (transition.to.auth) {
        utils.isLogin(function(b){
            if(b){
                transition.next();
            }
            else{
                console.log(transition.to.path);
                var redirect= encodeURIComponent(transition.to.path);
                transition.redirect('/logon?redirect='+redirect);
            }
        });
    }
    else{
        transition.next();
    }
})

require('./routers')(router);

router.start(app, "#app");
