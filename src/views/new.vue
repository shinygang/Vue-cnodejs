<template>
    <div>
        <nv-head page-type="主题"
            :show-menu="false"
            :fix-head="true"></nv-head>
        <div class="add-container">
            <div class="line">选择分类：
                <select class="add-tab" v-model="topic.tab">
                    <option value="share">分享</option>
                    <option value="ask">问答</option>
                    <option value="job">招聘</option>
                </select>
                <a class="add-btn" @click="addTopic">发布</a>
            </div>
            <div class="line">
                <input class="add-title" v-model="topic.title"
                        type="text" :class="{'err':err=='title'}"
                        placeholder="标题，字数10字以上" max-length="100"/>
            </div>
            <textarea v-model="topic.content" rows="35" class="add-content"
                :class="{'err':err=='content'}"
                placeholder='回复支持Markdown语法,请注意标记代码'>
            </textarea>
        </div>
    </div>
</template>

<script>
    import $ from 'webpack-zepto';
    import nvHead from '../components/header.vue';
    import {
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                topic: {
                    tab: 'share',
                    title: '',
                    content: ''
                },
                err: '',
                authorTxt: '<br/><br/><a class="from" href="https://github.com/shinygang/Vue-cnodejs">I‘m webapp-cnodejs-vue</a>'
            };
        },
        computed: {
            ...mapGetters({
                userInfo: 'getUserInfo'
            })
        },
        methods: {
            addTopic() {
                console.log(this.userInfo);
                let title = $.trim(this.topic.title);
                let contents = $.trim(this.topic.content);

                if (!title || title.length < 10) {
                    this.err = 'title';
                    return false;
                }
                if (!contents) {
                    this.err = 'content';
                    return false;
                }

                let postData = {
                    ...this.topic,
                    content: this.topic.content + this.authorTxt,
                    accesstoken: this.userInfo.token
                };
                $.ajax({
                    type: 'POST',
                    url: 'https://cnodejs.org/api/v1/topics',
                    data: postData,
                    dataType: 'json',
                    success: (res) => {
                        if (res.success) {
                            this.$router.push({
                                name: 'list'
                            });
                        }
                    },
                    error: (res) => {
                        let error = JSON.parse(res.responseText);
                        this.$alert(error.error_msg);
                        return false;
                    }
                });
            }
        },
        components: {
            nvHead
        }
    };
</script>

<style lang="scss">
    .add-container {
        margin-top: 50px;
        background-color: #fff;
        .line {
            padding: 10px 15px;
            border-bottom: solid 1px #d4d4d4;
            .add-btn {
                color: #fff;
                background-color: #80bd01;
                padding: 5px 15px;
                border-radius: 5px;
            }
            .add-tab {
                display: inline-block;
                width: calc(100% - 140px);
                min-width: 50%;
                font-size: 16px;
                background: transparent;
                 :after {
                    content: 'xe60e';
                }
                ;
            }
            .add-title {
                font-size: 16px;
                border: none;
                width: 100%;
                background: transparent;
                height: 25px;
            }
            .err {
                border: solid 1px red;
            }
        }
        .add-content {
            margin: 15px 2%;
            width: 96%;
            border-color: #d4d4d4;
            color: #000;
        }
        .err {
            border: solid 1px red;
        }
    }
</style>