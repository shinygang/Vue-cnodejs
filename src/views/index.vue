<template>
	<app-header></app-header>
	<div id="main">
		<div id="sidebar"></div>
		<div id="content">
			<div class="panel">
				<div class="header">
				</div>
				<div class="inner no-padding">
					
				</div>
				<div class="inner" v-show="lists.length == 0">
				<p>无话题</p>
				</div>
			</div>
		</div>
	</div>
	<app-backtotop></app-backtotop>
	<app-footer></app-footer>
</template>
<script>
	require('../assets/stylesheets/style.less');
	module.exports={
		data:function(){
			return {
				topicList:[],
			}
		},
		route:{
			data:function(transition){
				var _self = this;
			}
		},
		components:{
			'appHeader':require('../components/header.vue'),
			'appFooter':require('../components/footer.vue'),
			'appBacktotop':require('../components/footer.vue')
		}
	}
</script>