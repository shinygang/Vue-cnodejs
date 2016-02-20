/* global describe, it, expect */

import Vue from 'vue';
import nvHead from 'src/components/header.vue';


describe('Header.tpl.vue', () => {
    console.log('test');
    it('should show head title as "关于"', () => {
        const vm = new Vue({
            template:'<div><nv-head page-type="关于" fix-head="true" :need-add="true"></nv-head></div>',
            components:{nvHead}
        }).$mount();
        expect(vm.$el.querySelector('span').textContent).toBe('关于');
    });
});

/* global describe, it, expect */

// import Vue from 'vue'
// import Hello from 'src/components/Hello'

// describe('Hello.vue', () => {
//   it('should render correct contents', () => {
//     const vm = new Vue({
//       template: '<div><hello></hello></div>',
//       components: { Hello }
//     }).$mount()
//     expect(vm.$el.querySelector('.hello h1').textContent).toBe('Hello World!')
//   })
// })

