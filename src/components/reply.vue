<template>
  <section class="reply">
    <textarea id="content" rows="8" class="text" :class="{'err':hasErr}" v-model="content" placeholder='回复支持Markdown语法,请注意标记代码'>
    </textarea>
    <a class="button" @click="addReply">确定</a>
  </section>
</template>
<script>
const utils = require('../util/utils')
import selector from '../util/selector'
import { mapGetters } from 'vuex'
import {fetchPost} from '../util/fetch.js'
import mixin from '../mixin/common.js'
const markdown = require('markdown').markdown

export default {
  replace: true,
  props: ['topic', 'replyId', 'topicId', 'replyTo', 'show'],
  mixins: [mixin],
  data () {
    return {
      hasErr: false,
      content: '',
      userInfo: this.$store.state.loginUser || {},
      author_Html: '<p style="text-align:right"><a href="https://github.com/shinygang/Vue-cnodejs"> — — I\'m webapp-cnodejs-vue</a></p>',
      author_txt: '\r\r[— — I\'m webapp-cnodejs-vue](https://github.com/shinygang/Vue-cnodejs)'
    };
  },
  mounted () {
    if (this.replyTo) {
      this.content = `@${this.replyTo} `;
    }
  },
  methods: {
    addReply () {
      if (!this.content) {
        this.hasErr = true;
      } else {
        let postData = {
          accesstoken: this.userInfo.token,
          content: this.content + this.author_txt
        }
        if (this.replyId) {
          postData.reply_id = this.replyId;
        }

        fetchPost(`/topic/${this.topicId}/replies`, postData).then((res) => {
          if (res.success) {
            let time = new Date();
            let linkUsers = utils.linkUsers(this.content);
            let htmlText = markdown.toHTML(linkUsers)
            let replyContent = '<div class="markdown-text"><p>' + htmlText + '</p>'+ this.author_Html +'</div>'
            this.$store.state.topics[this.$route.params.id].replies.push({
              id: res.reply_id,
              author: {
                loginname: this.userInfo.loginname,
                avatar_url: this.userInfo.avatar_url
              },
              content: replyContent,
              ups: [],
              create_at: time
            })
            this.content = '';
            if (this.show) {
              this.$emit('close')
            }
          } else {
            this.$alert(res.error_msg)
          }
        })
      }
    }
  }
}
</script>
