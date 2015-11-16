module.exports=function(router){
    router.map({
        '/':{				//首页
            name:'home',
            component:require('./views/index.vue')
        },
        '/topic/:id':{               //首页
            name:'topic',
            component:require('./views/topic.vue')
        },
        '/message':{               //首页
            name:'message',
            component:require('./views/message.vue'),
            auth: true
        },
        '/setting':{               //首页
            name:'setting',
            component:require('./views/index.vue')
        },
        '/about':{               //首页
            name:'about',
            component:require('./views/index.vue')
        },
        '/login':{               //首页
            name:'login',
            component:require('./views/login.vue')
        },
        '/user/:loginname':{               //首页
            name:'user',
            component:require('./views/login.vue')
        }
    })
}