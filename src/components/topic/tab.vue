<template>
    <div class="header">
        <a v-for="item in tabs" class="topic-tab" 
            :class="{'current-tab':selectVal == item.val}" v-text="item.text"></a>
    </div>
</template>
<script>
    module.exports={
        replace:true,
        props:[],
        data:function(){
            return {
                selectVal:'all',
                tabs:[{
                    val:'all',
                    text:'全部'
                },{
                    val:'good',
                    text:'精华'
                },{
                    val:'share',
                    text:'分享'
                },{
                    val:'ask',
                    text:'问答'
                },{
                    val:'job',
                    text:'招聘'
                }]
            }
        }
    }
</script>