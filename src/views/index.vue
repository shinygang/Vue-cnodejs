<template>
    <!-- 全局header -->
    <nv-head :page-type="searchKey.tab | getTitleStr"
            fix-head="true"
            :need-add="true"
            :show-menu.sync="showMenu">
    </nv-head>


    <section id="page">

        <!-- 首页列表 -->
		<ul class="posts-list">
			<li v-for="item in topics"
                    v-link="{name:'topic',params:{id:item.id}}">

				<h3 v-text="item.title"
                        :class="item.tab | getTabClassName item.good item.top"
                        :title="item.tab | getTabStr item.good item.top">
                </h3>
                <div class="content">
                    <img class="avatar" :src="item.author.avatar_url" />
                    <div class="info">
                        <p>
                            <span class="name">
                                {{item.author.loginname}}
                            </span>
                            <span class="status" v-if="item.reply_count > 0">
                                <b>{{item.reply_count}}</b>
                                /{{item.visit_count}}
                            </span>
                        </p>
                        <p>
                            <time>
                                {{item.create_at | getLastTimeStr true}}
                            </time>
                            <time>
                                {{item.last_reply_at | getLastTimeStr true}}
                            </time>
                        </p>
                    </div>
                </div>
			</li>
		</ul>

    </section>
    <script src="../lib/llqrcode.js"></script>
</template>

<script>
    require('../assets/scss/CV.scss');

    module.exports = {
        data: function(){
            return {
                showMenu: false,
                scroll:true,
                topics:[],
                searchKey:{
                	page:1,
                	limit:20,
                	tab:'all',
                	mdrender:true
                }
            }
        },
        route:{
        	data:function(transition){
                var _self = this;

                //_self.searchKey.page = 1;
                _self.searchKey.limit = 20;
        		if(transition.to.query.tab){
                    _self.searchKey.tab = transition.to.query.tab;
                }

                _self.showMenu = false;

                //页面初次加载获取的数据
                _self.getTopics();

                //滚动加载
                $(window).on('scroll', function() {
                    _self.getScrollData();
                });

        	},
            deactivate:function(transition){
                $(window).off('scroll');
                transition.next();
            }
        },
        methods:{
            getTopics:function(){
                var _self = this
                    , params = $.param(_self.searchKey);
                $.get('https://cnodejs.org/api/v1/topics?'+params,function(d){
                    _self.scroll = true;
                    if(d && d.data){
                        _self.topics = d.data;
                        // if(_self.searchKey.page == 0){
                        //     _self.topics = d.data;
                        // }
                        // else{
                        //     _self.topics = _self.topics.concat(d.data);
                        // }
                    }
                })
            },
            //滚动加载数据
            getScrollData:function(){
                var _self = this;
                if(_self.scroll){
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if ($(document).height() <= totalheight + 100) {
                        _self.scroll = false;
                        _self.searchKey.limit += 20;
                        _self.getTopics();
                    }
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>

