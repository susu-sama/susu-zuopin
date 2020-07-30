<template>
    <div>
       <el-row  style='margin-top: 20px;'>
			<el-col :span="18" :offset="3">
				<el-card   style="background: #FEFAEE;"> 
                     <!-- 步骤条 -->
					<el-steps  finish-status="success" simple  :active="active" style='background: #fff;'>
					    <el-step title="填写注册信息" icon="el-icon-edit"></el-step>
					    <el-step title="邮箱注册" icon="el-icon-message"></el-step>
					    <el-step title="完成注册" icon="el-icon-check"></el-step>
					</el-steps>
                    <!-- 内容盒子  -->
                    <div class="top" style="margin-top: 30px;">
                        <el-row>
                            <el-col :span="18" :offset='3'>
                                <el-card>
                                    <!-- 卡片头部 -->
                                    <div slot="header">
                                        <h3>HI，欢迎注册当当网！尽享多重优惠服务</h3>
                                        <br />
                                        <span style="color: #13CE66;">您的资料不会作为其他用途，敬请放心填写</span>
                                    </div>
                                    <!-- 内容盒子 -->
                                    <!-- 第1步对应展示的页面 -->
                                    <div v-if="active==0">
                                        <el-form label-position="right" status-icon label-width="100px" ref="ruleForm"  :rules="rules" :model="ruleForm">
                                            <!-- 验证QQ邮箱 -->
                                            <el-form-item label='Email地址:' prop="email">
                                                <el-input clearable  placeholder="请输入邮箱" v-model="ruleForm.email" style='width: 40%;'></el-input>
                                            </el-form-item>
                                            <!-- 验证昵称 -->
                                            <el-form-item label='设置昵称:' prop="nikename">
                                                <el-input clearable  placeholder="请输入昵称"  v-model="ruleForm.nikename" style='width: 40%;'></el-input>
                                            </el-form-item>
                                            <!-- 验证密码 -->
                                            <el-form-item label='设置密码:' prop="password">
                                                <el-input clearable placeholder="请输入密码" autocomplete="off" show-password v-model="ruleForm.password" style='width: 40%;'></el-input>
                                            </el-form-item>
                                            <!-- 确认密码 -->
                                            <el-form-item label='确认密码:'  prop="checkpass">
                                                <el-input clearable placeholder="请再次确认密码" show-password v-model="ruleForm.checkpass" style='width: 40%;'></el-input>
                                            </el-form-item>
                                            <!-- 选择性别，无需验证，不加prop -->
                                            <el-form-item  label='性别:'>
                                                <el-radio-group v-model="ruleForm.sex">
                                                    <el-radio-button label="男"></el-radio-button>
                                                    <el-radio-button label="女"></el-radio-button>
                                                </el-radio-group>
                                            </el-form-item>
                                            <!-- 所在地区 -->
                                            <el-form-item  label='所在地区:' style='width: 130%;'>
                                                <el-cascader
                                                    placeholder="试试搜索：洪山区"
                                                    :options="options"
                                                    filterable
                                                    style="width: 30%"
                                                    change-on-select
                                                >
                                                </el-cascader>
                                            </el-form-item>
                                            <!-- 提交注册和重置按钮 -->
                                            <el-form-item>
                                                <el-button type="primary" @click="next('ruleForm')">提交注册</el-button>
                                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                    <!-- 第2步对应展示的页面 -->
                                    <div class="emailReg"  v-if="active==1">
                                        <div class="top" style="margin-top: 30px;">
                                            <el-form label-position="right" label-width="100px">
                                                <!-- 邮箱 -->
                                                <el-form-item label="您的邮箱:">
                                                    <el-input v-model='ruleForm.email' disabled style='width: 40%;'></el-input>
                                                </el-form-item>
                                                <!-- 验证码  -->
                                                <el-form-item label="填写验证码:">
                                                    <el-input placeholder="填写下方验证码，不区分大小写" v-model='ins' clearable  style='width: 40%;'>
                                                            <el-button :disabled='statu' slot="append" @click='getMa'>
                                                            <span v-show="ma == ''">获取验证码</span>
                                                            <span v-show="ma != ''">重新获取</span>
                                                            <span v-show=" ma!= '' && Matime != 0" style="color: #DD6161;">({{Matime}})</span>
                                                            </el-button>
                                                    </el-input>
                                                </el-form-item>
                                                <!-- 下一步 -->
                                                <el-form-item>
                                                    <el-button type='success' :disabled='ins == ""' @click="Emailnext">下一步</el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                                    <!-- 第3步对应展示的页面 -->
                                    <div class="sucessReg"  v-if="active==2">
                                        <span>
                                            注册成功，
                                            <span style="color: #DD6161; font-size: 28px;">
                                                {{linktime}}
                                            </span>
                                            秒后将为你跳转至
                                            <router-link to='/'>首页</router-link>
                                            (点击快速跳转)
                                        </span>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
				</el-card>
			</el-col>
       </el-row>
    </div>
</template>

<script>
    // 将所在地区要调用的城市的数据js引入，这个数据直接放在src中
    import options from '@/country-data.js'
	export default {
		data(){
            // 验证邮箱
            let validateEmail = (rule, nowvalue, callback) => {
                let rege = /^[1-9]\d{4,9}@qq\.com/i ;//第1个数字是1-9的，后面是任意的数字，匹配4-9次
                if (rege.test(nowvalue) == false) {
                    callback(new Error('邮箱格式不正确'));
                } else{
                    callback();
                }
            }
            // 验证昵称
            let validatename = (rule, nowvalue, callback) => {
                //4-20位大小写字母数字
                let regn = /^[0-9\w]{4,20}$/;
                if (regn.test(nowvalue) == false) {
                    callback(new Error('昵称格式为4-20位大小写字母或数字'));
                } else{
                    callback();
                }
            }
            // 验证密码
            let validatePass = (rule, nowvalue, callback) => {
                let regp = /^[0-9a-zA-Z]{6,20}$/ ;
                if (regp.test(nowvalue) == false) {
                    callback(new Error('密码格式为6-20位大小写字母或数字'));
                } else{
                    if (this.ruleForm.checkpass !== '') {
                        this.$refs.ruleForm.validateField('checkpass');
                    }
                    callback();
                }
            }
             // 确认密码一致
            let validatePass2 = (rule, nowvalue, callback) => {
                if (nowvalue !== this.ruleForm.password || nowvalue =="") {
                    callback(new Error('两次密码不一致'));
                } else{
                    callback();
                }
            };
            return {
                active:0,
                options:options,
                ins:"",
				ma:"",
				statu:false,
                Matime:30,
                linktime:5,
                ruleForm:{
                    email:'',
                    nikename:'',
                    password:'',
                    checkpass:'',
                    sex:"女",
				},
				rules:{
					email:[
						{ validator: validateEmail, trigger: 'change' }
					],
					nikename:[
						{ validator: validatename, trigger: 'change' }
                    ],
                    password: [
						{ validator: validatePass, trigger: 'change' }
                    ],
                    checkpass:[
						{ validator: validatePass2, trigger: 'change' }
					],
                },
                timer: 0
            } 
        },
        methods:{
            // 提交注册调用的方法
            next(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let infos = JSON.parse(localStorage.getItem("infos")); 
                        let have = infos.users.find(item => item.email == this.ruleForm.email);
                        if(have){
                                this.$message.error('邮箱已经被注册！！！');
                                return false;
                        }else{
                            if (this.active++ > 2){this.active = 0};
                            let userinfo = {
                                email:this.ruleForm.email,
                                username:this.ruleForm.nikename,
                                password:this.ruleForm.password,
                                sex:this.ruleForm.sex,
                                car:[]
                            };
                            infos.users.push(userinfo);
                            localStorage.setItem("infos",JSON.stringify(infos));
                        }
                    } else {
                        this.$message.error('表单未完成，请检查后提交');
                        return false;
                    }
                });
            },
            // 重置调用的方法
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //获取验证码
			getMa(){
				this.Matime = 30;//设定验证码的时间
                this.ma = String(Math.random()*100).substring(3,9);//获取一个随机6位数
                // 设置消息通知
                this.$notify.info({
                    title: '您有一条新消息',
                    dangerouslyUseHTMLString: true,
                    message: `<p style="font-size:15px; letter-spacing:5px; line-height:25px" >
                                【当当】您的注册验证码为
                                <span style="color:#DD6161">${this.ma}</span>
                                打死不能告诉别人哦,若非本人操作请忽略
                                </p>`,
                    duration: 30000//30s后自动关闭
                });
                // 验证码倒计时，30秒后修改获取的状态，可以重新获取
                setInterval(()=>{
                    this.Matime = this.Matime ? this.Matime - 1 : 0;
                    this.statu = this.Matime==0 ? false : true;
                },1000)
            },
            // 下一步上调用的方法 
            Emailnext(){
				//成功
				if(this.ins == this.ma && this.ins != ''){//绑定的验证码框，不为空来验证
                    if (this.active++ > 2) this.active = 0;
                  
					this.timer = setInterval(() =>{
                        this.linktime -=1;
						if(this.linktime == 0){
							clearInterval(this.timer);
							this.$router.push({path:"/"})
						}
					},2000)
				}else{
					 this.$message.error('验证码错误');
				}
			}
        },
        // 加个销毁的钩子函数解决bug 
        destroyed(){//解决第3步出来，点击跳转到首页后，秒数到了还有报错的bug
            clearInterval(this.timer);//当页面跳转了，就把这个定时器关掉
        }
    }
</script>

<style scoped>
    .sucessReg{
        margin-top: 30px;
        text-align:center;
        font-size: 20px;
    }
</style>