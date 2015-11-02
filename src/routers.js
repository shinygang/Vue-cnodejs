module.exports=function(router){
    router.map({
        '/':{				//首页
            name:'home',
            component:require('./views/index.vue')
        }
    });
}