/** @format */

import Vue from 'test/unit/specs/node_modules/vue'
import HelloWorld from '@c/components/HelloWorld'

describe('HelloWorld.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(HelloWorld)
        const vm = new Constructor().$mount()
        expect(vm.$el.querySelector('.hello h1').textContent).toEqual('Welcome to Your Vue.js App')
    })
})
