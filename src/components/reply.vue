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

    var utils = require('../libs/utils'),
        markdown = require("markdown").markdown;

    export default {
        replace:true,
        props: ['topic','replyId','topicId','replyTo','show'],
        data (){
            return {
                hasErr:false,
                content:'',
                userId:localStorage.userId || '',
                authorTxt:'<br/><br/><a class="form" href="https://github.com/shinygang/Vue-cnodejs">I‘m webapp-cnodejs-vue</a>',
            }
        },
        ready (){
            var _self = this;
            if(_self.replyTo){
                _self.content = '@'+_self.replyTo+' ';
            }
        },
        methods:{
            addReply (){

                let _self = this;
                if(!_self.content){
                    _self.hasErr = true;
                }
                else{
                    let time=new Date()
                        , linkUsers = utils.linkUsers(_self.content)
                        , htmlText = markdown.toHTML(linkUsers) + _self.authorTxt
                        , reply_content =$('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML
                        , postData={accesstoken:localStorage.token,content: _self.content+ _self.authorTxt}

                    if(_self.replyId){
                        postData.reply_id = _self.replyId;
                    }
                    $.ajax({
                        type:'POST',
                        url:'https://cnodejs.org/api/v1/topic/'+_self.topicId+'/replies',
                        data: postData,
                        dataType: 'json',
                        success:function(res){
                            if(res.success){
                                _self.topic.replies.push({
                                    id:res.reply_id,
                                    author:{
                                        loginname:_self.userId,
                                        avatar_url:localStorage.avatar_url
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
