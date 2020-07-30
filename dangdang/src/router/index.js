import Vue from 'vue'
import Router from 'vue-router'
import car from '@/components/car'
import regist from '@/components/regist'
import indexmain from '@/components/IndexMain'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexmain',
      component: indexmain
    },
	{
		path: '/login',
		name: 'login',
		component: login	
	},
	{
		path: '/car',
		name: 'car',
		component: car
	},
	{
		path: '/regist',
		name: 'regist',
		component: regist
	}
  ]
})

