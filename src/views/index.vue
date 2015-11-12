<template>
    <nv-head :page-type="title" :fix-head="true"></nv-head>
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
                isLoadShow: true,
                topics:[],
                title:"全部",
                searchKey:{
                	page:0,
                	limit:20,
                	tab:'all',
                	mdrender:true
                }
            }
        },
        ready:function(){
            console.log("ready");
        },
        route:{
        	data:function(transition){
                console.log('index');
        		var self = this;
        		var params = $.param(self.searchKey);
        		$.get('/api/v1/topics?'+params,function(d){
        			if(d && d.data){
        				self.topics = d.data;
        			}
        		})
        	}
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>

