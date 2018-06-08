import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calculateStep',
      component: resolve => require.ensure([], () => resolve(require('@/pages/calculateStep.vue')), 'calculateStep')
    },
    {
      path: '/addItem',
      name: 'addItem',
      component: resolve => require.ensure([], () => resolve(require('@/pages/AddItem.vue')), 'addItem')
    }
  ]
})
