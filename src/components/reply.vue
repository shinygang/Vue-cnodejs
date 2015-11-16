<template>
    <section class="reply">
        <textarea id="content" rows="8" class="text" 
            :class="{'err':hasErr}"
            v-model="content" 
            placeholder='回复支持Markdown语法,请注意标记代码'>
        </textarea>
        <a class="btn" @click="addReply()">确定</a>
    </section>
</template>
<!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
<script src="//cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script> -->
<script>

    var $ = require('webpack-zepto'),
        utils = require('../libs/utils'),
        markdown = require("markdown").markdown;

    module.exports={
        replace:true,
        props: ['topic','replyId','topicId','replyTo','show'],
        data:function(){
            return {
                hasErr:false,
                content:'',
                userId:localCache.userId || '',
                authorTxt:'<a href="https://github.com/shinygang/Vue-cnodejs">From CNodeJS-VueJS</a>',
            }
        },
        ready: function(){
            var _self = this;
            if(_self.replyTo){
                _self.content = '@'+_self.replyTo+' ';
            }
        },
        methods:{
            addReply:function(){
                 
                var _self = this;
                if(!_self.content){
                    _self.hasErr = true;
                }
                else{
                    var time=new Date()
                        , linkUsers = utils.linkUsers(_self.content)
                        , htmlText = markdown.toHTML(linkUsers) + _self.authorTxt
                        , reply_content =$('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML
                        , postData={accesstoken:localCache.token,content: _self.content}

                    if(_self.replyId){
                        postData.reply_id = _self.replyId;
                    }
                    $.ajax({
                        type:'POST',
                        url:'/api/v1/topic/'+_self.topicId+'/replies',
                        data: postData,
                        dataType: 'json',
                        success:function(res){
                            if(res.success){
                                _self.topic.replies.push({
                                    id:res.reply_id,
                                    author:{
                                        loginname:_self.userId,
                                        avatar_url:localCache.avatar_url
                                    },
                                    content:reply_content,
                                    ups:[],
                                    create_at:time
                                });
                            }
                            _self.content = '';
                            if(_self.show){
                                _self.show = '';
                            }
                        },
                        error:function(res){
                            var error = JSON.parse(res.responseText);
                            _self.alert.txt = error.error_msg;
                            _self.alert.show = true;
                            _self.alert.hideFn();
                            return false;
                        }
                    });
                }
            }
        }
    }
</script>
