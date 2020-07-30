<template>
	<div>
		<el-row type="flex" justify="center">
			<ul class="lis">
				<li v-for="(item,index) in list" :key="index">
					<el-link href='#'>{{item}}</el-link>
                </li>
			</ul>
		</el-row>
		<el-row  type="flex" justify="center">
			<p class="footerp">
                Copyright (C) 当当网 2004-2017, All Rights Reserved 
                <img src="../../assets/copyright.gif" /> 
                京ICP证041189号出版物经营许可证 新出发京批字第直0673号
            </p>
		</el-row>
		<template>
				<el-popconfirm
				confirmButtonText='好的'
				cancelButtonText='不用了'
				icon="el-icon-info"
				iconColor="red"
				title="这是一段内容确定删除吗？"
				@onConfirm="del()"
				>
				<el-button slot="reference">删除</el-button>
				</el-popconfirm>
		</template>
	</div>
</template>

<script>
	export default {
	  name: 'dangfoot',
	  data(){
		  return{
			  list:["公司简介","诚聘英才","网站联盟","当当招商","机构销售","手机当当","官方Blog","热词搜索"]
		  }
	  },
	  methods:{
		  del(){
			  console.log(123);
		  }
	  }

	}
</script>

<style>
    .footrow{
        border-top: solid 1px #e6e6e6; 
        margin-top: 30px;
    }
	.lis{
		list-style: none;
		height: 70px;
	}
	.lis li{
		float: left;
		padding: 0px 30px;
		border-left: 1px solid #999999;
		margin-top: 20px;
	}
	.lis li:first-child{
		margin-left: 0px;
		border-left: 1px solid transparent;
	}
	.footerp{
		color: #999999;
		letter-spacing: 1px;
		margin-bottom: 30px;
	}
	.footerp img{
		position: relative;
		top:20px;
	}
</style>
