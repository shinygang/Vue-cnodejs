<template>

    <section class="reply">
        <textarea id="content" rows="8" class="text"
            :class="{'err':hasErr}"
            v-model="content"
            placeholder='回复支持Markdown语法,请注意标记代码'>
        </textarea>
        <a class="button" @click="addReply">确定</a>
    </section>

</template>
<script>
    import $ from 'webpack-zepto';
    const utils = require('../libs/utils');
    const markdown = require('markdown').markdown;

    export default {
        replace: true,
        props: ['topic', 'replyId', 'topicId', 'replyTo', 'show'],
        data() {
            return {
                hasErr: false,
                content: '',
                loginname: localStorage.loginname || '',
                author_txt: '<br/><br/><a class="form" href="https://github.com/shinygang/Vue-cnodejs">I‘m webapp-cnodejs-vue</a>'
            };
        },
        mounted() {
            if (this.replyTo) {
                this.content = `@${this.replyTo} `;
            }
        },
        methods: {
            addReply() {
                if (!this.content) {
                    this.hasErr = true;
                } else {
                    let time = new Date();
                    let linkUsers = utils.linkUsers(this.content);
                    let htmlText = markdown.toHTML(linkUsers) + this.author_txt;
                    let replyContent = $('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML;
                    let postData = {
                        accesstoken: localStorage.token,
                        content: this.content + this.author_txt
                    };

                    if (this.replyId) {
                        postData.reply_id = this.replyId;
                    }
                    $.ajax({
                        type: 'POST',
                        url: `https://cnodejs.org/api/v1/topic/${this.topicId}/replies`,
                        data: postData,
                        dataType: 'json',
                        success: (res) => {
                            if (res.success) {
                                this.topic.replies.push({
                                    id: res.reply_id,
                                    author: {
                                        loginname: this.loginname,
                                        avatar_url: localStorage.avatar_url
                                    },
                                    content: replyContent,
                                    ups: [],
                                    create_at: time
                                });
                            }
                            this.content = '';
                            if (this.show) {
                                this.show = '';
                            }
                        },
                        error: (res) => {
                            var error = JSON.parse(res.responseText);
                            this.$alert(error.error_msg);
                            return false;
                        }
                    });
                }
            }
        }
    };
</script>