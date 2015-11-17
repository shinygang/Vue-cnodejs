<template>
    <nv-head :page-type="searchKey.tab | getTitleStr" fix-head="true" :show-menu.sync="showMenu"></nv-head>
    <div id="page" v-class="show-menu:showMenu">
	    <section class="module-enter">
			<ul>
				<li v-for="item in topics" v-link="{name:'topic',params:{id:item.id}}">
					<div class="til">
						<span class="tab" :class="{'good':item.good || item.top}"
							v-text="item.tab | getTabStr item.good item.top"></span>
						<span class="title" v-text="item.title"></span>
					</div>
					<div class="til mt10">
						<img class="head" :src="item.author.avatar_url" />
						<div class="content">
							<span class="cl">
								<span class="name" v-text="item.author.loginname"></span>
								<span class="name mt10">
									创建于:{{item.create_at | getLastTimeStr}}</span>
							</span>
							<span class="cr">
								<span>
									<span class="color80" v-if="item.reply_count>0">
										{{item.reply_count}}/</span>{{item.visit_count}}</span>
								<span class="name mt10" v-if="item.reply_count > 0" 
									v-text="item.last_reply_at | getLastTimeStr true"></span>
								<span v-else class="name mt10" 
									v-text="item.create_at | getLastTimeStr true"></span>
							</span>
						</div>
					</div> 
				</li>
			</ul>
		</section>
    </div>
</template>

<script>
    require('../assets/scss/index.scss');
    var $ = require('webpack-zepto');

    module.exports = {
        data: function(){
            return {
                showMenu: false,
                scroll:true,
                topics:[],
                searchKey:{
                	page:0,
                	limit:20,
                	tab:'all',
                	mdrender:true
                }
            }
        },
        route:{
        	data:function(transition){
                var _self = this;

                _self.searchKey.page = 0;
        		if(transition.to.query.tab){
                    _self.searchKey.tab = transition.to.query.tab;
                }

                _self.showMenu = false;

                //页面初次加载获取的数据
                _self.getTopics(self.searchData);

                //滚动加载
                $(window).on('scroll', function() {
                    _self.getScrollData();
                });
               
        	}
        },
        methods:{
            getTopics:function(){
                var _self = this
                    , params = $.param(_self.searchKey);
                $.get('/api/v1/topics?'+params,function(d){
                    _self.scroll = true;
                    if(d && d.data){
                        if(_self.searchKey.page == 0){
                            _self.topics = d.data;
                        }
                        else{
                            _self.topics = _self.topics.concat(d.data);
                        }
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
                        _self.searchKey.page += 1;
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

