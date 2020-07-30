<template>
  <div id="app">
		<dang-header></dang-header>
		<router-view/>
		<dang-foot></dang-foot>
  </div>
</template>

<script>
	// 引入头部与尾部
	import dangheader from '@/components/common/dangheader'
	import dangfoot from '@/components/common/dangfoot'
	export default {
		name: 'App',
		components:{
			'dang-header':dangheader,
			'dang-foot':dangfoot
		},
		created(){
			// localStorage.clear()
			//页面创建初，向存储中存放对像
			// users:存放已经注册的用户
			// nowlogin:目前正在登陆的用户
			if(localStorage.getItem('infos')==undefined){
				localStorage.setItem("infos",JSON.stringify({users:[],nowlogin:'现在所登录的'}));
			}
		}
	}
</script>

