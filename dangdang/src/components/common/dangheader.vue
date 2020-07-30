<template>
	<div>
		<el-row type="flex" class="myrow" justify="center">
			<el-col :span='20'>
				<!-- 左边导航 -->
				<ul class="leftul">
					<li>您好！欢迎光临当当网</li>
					<li v-for="(item,index) in list.left" :key="'left'+index" :class="[{'isactive':item.isActive}]" @click="choose(item)"> 
						<i class="el-icon-s-home" v-if="item.name=='首页'"></i>
						<router-link :to='item.to'>{{item.name}}</router-link>
					</li>
					<li>
						 <el-input size="medium" placeholder="请输入内容" v-model="input">
							<el-button slot="append"  icon="el-icon-search"></el-button>
						</el-input>
					</li>
				</ul>
				<!-- 右边导航 -->
				<ul class="rightul">
					<li v-for="(item,index) in list.right" :key="'right'+index" :class="[{'isactive':item.isActive}]" @click="choose(item)">
						<i class="el-icon-shopping-cart-2" v-if="item.name=='购物车'"></i>
						<i class="el-icon-user-solid" v-if="item.name=='登录'"></i>
						<i class="el-icon-circle-plus" v-if="item.name=='注册'"></i>
						<router-link :to='item.to'>{{item.name}}</router-link>
					</li>
				</ul>
			</el-col>
		</el-row>
		
		<!-- 登录的对话框效果 -->
		<el-dialog title = '用户登录' :visible.sync="dialogFormVisible" center width='36%'>
			<my-login @hidelogin="hideDialog" @loginsuccess="cheng"></my-login>
		</el-dialog>
	</div>
</template>

<script>
	import login from '@/components/login'
	export default {
		name: 'dangheader',
		components:{
			'my-login':login 
		},
		data(){
			return {
				dialogFormVisible:false,
				input:"",
				list:{
					left:[
						{name:"首页",isActive:true,to:"/"},
						{name:"我的当当",isActive:false,to:"/"},
					],
					right:[
						{name:"购物车",isActive:false,to:"/car"},
						{name:"登录",isActive:false,to:"/", type: 'unlogin'},
						{name:"注册",isActive:false,to:"/regist"},
					],
				},
				listName: ['首页','我的当当',],
			}
		},
		methods:{
			hideDialog(){
				this.dialogFormVisible = false;//隐藏对话框
				this.choose(this.list.right[2]);//把当前活动页active的样式设置给注册页
			},
			choose(obj){
				if(obj.name == '登录'){
					this.dialogFormVisible = true;
				}else if(obj.type=='login'){
					this.$confirm('确认退出登录？')
				    // .then(_ => {
					.then(() => {
						let infos = JSON.parse(localStorage.getItem("infos"));
						infos.nowlogin = "现在所登录的";
						localStorage.setItem("infos",JSON.stringify(infos));
						this.choose(this.list.left[0]);
						this.find();
						this.$notify({title: '成功', message: '已经安全退出!',type: 'success', duration: 2000});
				    })
				}else{
					// 将其他的按钮的当前状态去掉，当前点击的isActive设为true
					this.list.left.forEach(item=>{item.isActive = false});
					this.list.right.forEach(item=>{item.isActive = false});
					obj.isActive = true;
				}
				
			},
			cheng(item){
				this.dialogFormVisible = false;
				this.choose(this.list.left[0]);
				this.find();
			},
			find(){
				let infos = JSON.parse(localStorage.getItem("infos"));
				if(infos.nowlogin != "现在所登录的"){
					this.list.right[1].name = infos.nowlogin.username;
					this.list.right[1].type = "login";
					this.$message.success('登陆成功');
				}else{
					this.list.right[1].name = "登录";
					this.list.right[1].type = "unlogin";
				}
			}
		}
	}
</script>

<style>
	*{
		margin: 0px;
		padding: 0px;
	}
	.myrow{
		border-bottom: solid 1px #e6e6e6;
	}
	.leftul a,.rightul a{
		color: #000;
		text-decoration: none;
	}
	.leftul li,.rightul li{
		list-style: none;
		float: left;
		padding: 0px 20px;
		line-height: 50px;
	}
	.rightul{
		float: right;
	}
	.isactive{
		color: #13CE66;
		border-bottom: 2px solid #13CE66;
	}
	.isactive a{
		color: #13CE66;
	}
</style>
