<template>
    <div class='cell' v-for="topic in topicList">
      <a class="user_avatar pull-left" href="/user/<%= topic.author.loginname %>">
        <img :src="topic.author.avatar_url" title="topic.author.loginname"/>
      </a>
      <span class="reply_count pull-left">
        <span class="count_of_replies" title="回复数" v-text="topic.reply_count">
        </span>
        <span class="count_seperator">/</span>
        <span class="count_of_visits" title='点击数' v-text="topic.visit_count">
        </span>
      </span>
      <a v-if="topic.reply && topic.reply_count > 0" class='last_time pull-right' 
        v-link="{'name':'topic',qurey:{id:topic._id,reply:topic.reply._id}}" >
        <img class="user_small_avatar" :src="topic.reply.author.avatar_url" >
        <span class="last_active_time" 
          v-text="topic.last_reply_at | getLastTimeStr true"></span>
      </a>
      <span v-else class='last_time pull-right'>
        <span class="last_active_time" v-text="topic.create_at | getLastTimeStr true"></span>
      </span>
      <div class="topic_title_wrapper">
        <span v-if="topic.top" class='put_top'>置顶</span>
        <span v-if="topic.good" class='put_good'>精华</span>
        <span v-if="typeof(tab) !== 'undefined' &&  tab === 'all' && topic.tabName" 
        class="topiclist-tab" v-text="topic.tabName"></span>
        <a class='topic_title' v-link="{name:'topic',qurey:{id:topic._id}}" 
            title='topic.title' v-text="topic.title">
        </a>
      </div>
    </div>
</template>

<script>
    module.exports={
        replace:true,
        props:["topicList"]
    }
</script>