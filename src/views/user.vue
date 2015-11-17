<template>
    <div>
        <section class="userinfo">
            <img class="u-img" :src="avatar_url"> />
            <span class="u-name" v-text="loginname"></span>
            <div class="u-bottom">
                <span v-text="create_at | getLastTimeStr false"></span>
                <span class="">积分：{{score}}</span>
            </div>
        </section>
    </div>
</template>
<script>
    require('../assets/scss/user.scss');
    var $ = require('webpack-zepto');
</script>
