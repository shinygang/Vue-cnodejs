'use strict'

module.exports=function(router){
    router.map({
        '/':{				//首页
            name:'home',
            component:require('./views/index.vue')
        },
        '/cnodevue':{               //首页
            name:'home',
            component:require('./views/index.vue')
        },
        '/topic/:id':{               //专题
            name:'topic',
            component:require('./views/topic.vue')
        },
        '/add':{               //首页
            name:'add',
            component:require('./views/new.vue'),
            auth: true
        },
        '/message':{               //消息
            name:'message',
            component:require('./views/message.vue'),
            auth: true
        },
        '/about':{               //关于
            name:'about',
            component:require('./views/about.vue')
        },
        '/login':{               //登录
            name:'login',
            component:require('./views/login.vue')
        },
        '/user/:loginname':{               //用户信息
            name:'user',
            component:require('./views/user.vue')
        }
    })
}