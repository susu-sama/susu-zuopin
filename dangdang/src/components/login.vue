<template>
	<div>
		<el-form label-position="right" status-icon label-width="60px" :rules="rules" ref="ruleForm" :model="ruleForm">
            <el-form-item label='用户名:' prop="username">
                <el-input clearable  placeholder="请输入邮箱" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label='密码:' prop="pass">
                <el-input clearable  placeholder="请输入密码" v-model="ruleForm.pass" show-password></el-input>
            </el-form-item>
            <el-form-item>
                没有账号？ 
                <span @click="hidelogin">
                    <router-link to='/regist'>注册</router-link>
                </span>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click="submit('ruleForm')">登录</el-button>
                <el-button @click='resetForm("ruleForm")'>重置</el-button>
            </el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data(){
            let validatename = (rule, nowvalue, callback) => {
                //4-20位大小写字母数字
                let regn = /^[1-9]\d{4,9}@qq\.com/i;
                if (regn.test(nowvalue) == false) {
                    callback(new Error('邮箱格式不正确'));
                } else{
                    callback();
                }
            };
			let validatepass = (rule, nowvalue, callback) => {
				let regp = /^[0-9a-zA-Z]{6,20}$/ ;
				if (regp.test(nowvalue) == false) {
				  callback(new Error('密码格式为6-20位大小写字母或数字'));
				} else{
				  callback();
				}
			 };
			  
			return{
				ruleForm:{
					username:'',
					pass:''
				},
				rules:{
					username:[
						{ validator: validatename, trigger: 'change' }
					],
					 pass: [
						{ validator: validatepass, trigger: 'change' }
					]
				}
			}
		},
		methods:{
            // 点击注册调用的方法
            hidelogin(){
                this.$emit('hidelogin');//分发一个事件，在头部的对话框里的login来接收
            },
            // 点击登录调用的方法
            submit(formName){
                let infos = JSON.parse(localStorage.getItem("infos"));
                let finded = false;//判断输入的要登录的用户是否存在
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        infos.users.forEach(item =>{
                            //成功
                            if(item.email == this.ruleForm.username && item.password == this.ruleForm.pass){
                                infos.nowlogin = item;//记录当前登录的用户名和密码
                                localStorage.setItem("infos",JSON.stringify(infos));//都存进去
                                this.$emit('loginsuccess');//分发事件，头部的对话框里的login来接收
                                finded = true;//输入的要登录的用户存在
                                this.resetForm("ruleForm")//重置表单
                            //密码错误
                            }else if(item.email == this.ruleForm.username && item.password != this.ruleForm.pass){
                                this.$message.error('密码错误！');
                                finded = true;
                            }
                        })
                        //没找到用户名
                        if(finded == false){
                            this.$message.error('用户名不存在！');
                            return false;
                        }
                    } else {
                        this.$message.error('表单未完成，请检查后提交');
                        return false;
                    }
                });
            },
            // 点击重置调用的方法
			resetForm(formName) {
			    this.$refs[formName].resetFields();
            }
           
            
		}
	}
</script>


