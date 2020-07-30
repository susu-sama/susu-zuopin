<template>
	<div>
		<!-- 顶部跑马灯/轮播图 -->
		<el-row>
			<el-carousel height='450px'>
				<el-carousel-item v-for="(item,index) in dates.banner" :key='index'>
					<img :src="item" style="width: 100%; height: 450px;"/>
				</el-carousel-item>
			</el-carousel>
		</el-row>
		
		<!-- 主体 -->
		<el-row style='margin-top: 10px;'>
			<el-col :span="20" :offset="2">
				<el-row :gutter="15">
					<!-- 左侧导航 -->
					<el-col :span="4">
						<el-card :body-style="{ padding: '0px' }">
							<div class="clearfix" style="padding: 10px 10px; background: #487a6f;color: white;">
								<span>
									<i class="el-icon-notebook-1"></i>
									图书分类
								</span>
							</div>
							<div style="padding: 10px;" class="abox">
								<el-collapse accordion>
									<el-collapse-item :title="item.title" v-for="item in dates.navs" :key='item.title'>
										<el-link :underline="false" href='#' v-for='(link,ind) in item.list' :key='ind'>
											{{link}}
										</el-link>
									</el-collapse-item>
								</el-collapse>
							</div>
						</el-card>
					</el-col>
					<!-- 中间主体 -->
					<el-col :span="14">
						<el-carousel trigger="click" height="300px" direction="vertical">
							<el-carousel-item v-for="(item,ind) in dates.imglist" :key='ind'>
								<img :src="item" style="width: 100%; height: 300px;" />
							</el-carousel-item>
						</el-carousel>
						<el-tabs type="border-card" style='margin-top: 10px;'>
							<el-tab-pane :label="bitem.label" v-for='(bitem,bindex) in dates.tabs' :key='bindex'>
								<el-row :gutter="20">
									<el-col :span='6' v-for='(item,ind) in bitem.list' :key='ind'>
										<el-card :body-style="{ padding: '0px' }" shadow='never' style='padding-top: 10px; margin-bottom: 10px;border: none;'>
											<img :src="item.bookimg" class="image">
											<div style="padding: 5px;line-height: 22px;">
												<p style="font-size: 14px;">
													<el-link href="#">{{item.bookname}}</el-link>
												</p>
												<div class="bottom clearfix">
													<p style="font-size: 12px; color: #999999;">{{item.author}}</p>
													<p>
														<span style="font-weight: bold;font-size: 14px; color: #DD6161;">{{item.ddprice | pricefilter}}</span>
														<span style="font-weight: bold;font-size: 14px; color: #CCCCCC; text-decoration: line-through;padding-left: 10px;">
															{{item.price | pricefilter}}
														</span>
													</p>
													<el-button @click = 'buyTocar(item)' type='success' icon="el-icon-plus" circle style='float: right; padding: 7px;margin-top: -33px;'></el-button>
												</div>
											</div>
										</el-card>
									</el-col>
								</el-row>
							</el-tab-pane>
						</el-tabs>
					</el-col>
					<!-- 右侧信息 -->
					<el-col :span="6">
						<!-- 书讯快递 -->
						<el-card class="box-card" :body-style="{ padding: '0px' }">
							<div class="clearfix" style="padding: 10px 10px; background: #487a6f;color: white;">
								<span><i class="el-icon-collection"></i>书讯快递</span>
							</div>
							<div style="padding: 15px;">
								<el-collapse accordion>
									<el-collapse-item title="2019年孩子最喜欢的书">
										<div><el-link href='#'>喜羊羊打大灰狼</el-link></div>
										<div><el-link href='#'>熊大打光头强</el-link></div>
									</el-collapse-item>
									<el-collapse-item title="计算机新书畅销书75折抢购">
										<div><el-link href='#'>java入门到放弃</el-link></div>
										<div><el-link href='#'>sql server删库到跑路</el-link></div>
									</el-collapse-item>
									<el-collapse-item title="弗洛伊德作品精选集59折">
										<div></div>
										<div><el-link href='#'>梦的解析</el-link></div>
										<div><el-link href='#'>超越唯乐原则</el-link></div>
									</el-collapse-item>
									<el-collapse-item title="权威定本四大名著">
										<div>西游记</div>
										<div>红楼梦</div>
									</el-collapse-item>
									<el-collapse-item title="2010版法律硕士联考大纲75...">
										<div>考前必看</div>
										<div>考试大纲</div>
									</el-collapse-item>
								</el-collapse>
							</div>
						</el-card>
						<!-- 图书畅销榜 -->
						<el-card :body-style="{ padding: '0px' }" style='margin-top: 10px;'>
							<div class="clearfix" style="padding: 10px 10px; background: #487a6f;color: white;">
								<span><i class="el-icon-medal"></i>图书畅销榜</span>
							</div>
							<div style="padding: 10px;">
								<el-tabs v-model="activeName2" type="card">
									<el-tab-pane :label="item.label"  v-for='(item,index) in dates.goods' :key='index'>
										<div @mouseenter="over(bookitem,item)" v-for="(bookitem,ind) in item.list" class="baiyebox" :key='ind' :class="[,{'iscolepse':bookitem.ishover}]">
											<span :class="[{'istop':Boolean(ind<3)},{'num':true}]">{{ind+1}}</span>
											<div class="rightbox">
												<img :src="bookitem.bookimg" style="width: 50%;"/>
												<div class="rightp">
													<span class="bookname"><el-link href='#'>{{bookitem.bookname}}</el-link></span>
													<p class="ddj">{{bookitem.ddprice  | pricefilter}}</p>
													<p class="yj">{{bookitem.price  | pricefilter}}</p>
													<p class="pinlun">{{bookitem.pinnum}}条评论</p>
												</div>
											</div>
										</div>
									</el-tab-pane>
								</el-tabs>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!-- 底部 -->
		<el-row style='margin-top: 20px;'>
			<el-col :span="20" :offset="2">
				<!-- 中部图片 -->
				<el-row :gutter='30'>
					<el-col :span="8">
						<img src="../assets/footer1.jpg" style="width: 100%;" />
					</el-col>
					<el-col :span="8">
						<img src="../assets/footer2.jpg" style="width: 100%;" />
					</el-col>
					<el-col :span="8">
						<img src="../assets/footer3.png" style="width: 100%;" />
					</el-col>
				</el-row>
				<el-row :gutter="15" style='margin-top: 20px;'>
					<!-- 新书上架 -->
					<el-col :span='18'>
						<el-card :body-style="{ padding: '0px' }">
							<div class="clearfix" style="padding: 10px 10px; background: #487a6f;color: white;">
								<span><i class="el-icon-notebook-1"></i>新书上架</span>
							</div>
							<div style="padding: 10px;">
								<el-carousel indicator-position="outside" height='600px'>
									<el-carousel-item v-for="(item,ind) in dates.carous" :key='ind'>
										<el-row :gutter="20">
											<el-col :span='4' v-for='(citem,cind) in item.list' :key='cind'>
												<el-card :body-style="{ padding: '0px' }" shadow='never' style='padding-top: 10px; margin-bottom: 15px;border: none;'>
													<img :src="citem.bookimg" class="image">
													<div style="padding: 5px;line-height: 22px;">
														<p style="font-size: 14px;">
															<el-link href="#">{{citem.bookname}}</el-link>
														</p>
														<div class="bottom clearfix">
															<p style="font-size: 12px; color: #999999;">{{citem.author}}</p>
															<p><span style="font-size: 14px; color: #DD6161;font-weight: bold;">{{citem.ddprice | pricefilter}}</span><span style="font-weight: bold;font-size: 14px; color: #CCCCCC; text-decoration: line-through;padding-left: 10px;">{{citem.price | pricefilter}}</span></p>
														</div>
													</div>
												</el-card>
											</el-col>
										</el-row>
									</el-carousel-item>
								</el-carousel>
							</div>
						</el-card>
					</el-col>
					<el-col :span='6'>
						<el-card :body-style="{ padding: '0px' }">
							<div class="clearfix" style="padding: 10px 10px; background: #487a6f;color: white;">
								<span><i class="el-icon-medal"></i>新书热卖榜</span>
							</div>
							<div style="padding: 10px;">
								<el-tabs  type="card">
									<el-tab-pane :label="item.label" v-for='(item,ind) in dates.goods' :key='ind'>
										<div @mouseenter="over(bookitem,item)" v-for="(bookitem,bindex) in item.list" class="baiyebox" :key="bindex" :class="[,{'iscolepse':bookitem.ishover}]">
											<span :class="[{'istop':bindex<3},{'num':true}]">{{bindex+1}}</span>
											<div class="rightbox">
												<img :src="bookitem.bookimg" style="width: 50%;"/>
												<div class="rightp">
													<span class="bookname"><el-link href='#'>{{bookitem.bookname}}</el-link></span>
													<p class="ddj">{{bookitem.ddprice | pricefilter}}</p>
													<p class="yj">{{bookitem.price  | pricefilter}}</p>
													<p class="pinlun">{{bookitem.pinnum}}条评论</p>
												</div>
											</div>
										</div>
									</el-tab-pane>
								</el-tabs>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import dates from '@/assets/dates/datas.js'
	export default {
		data() {
			return {
				isoutbox:false,
				activeName2: 0,
				dates:dates
			}
		},
		methods:{
			buyTocar(obj){
				//取出
				let infos = JSON.parse(localStorage.getItem("infos"));
				if(infos.nowlogin == "现在所登录的"){
					this.$message.error("请先进行登录！");
				}else{
					let good = {
						sname:obj.bookname,
						sprice:obj.price,
						ddprice:obj.ddprice,
						integer:obj.ddprice*10,
						num:1
					}
					let isAdd = infos.nowlogin.car.find(item => item.sname == good.sname);
					if(isAdd){
						this.$message.error("已经在购物车了，请勿重复添加!");
					}else{
						infos.nowlogin.car.push(good);
						//从全部用户找到当前登录的，将数据同步
						infos.users.forEach(item => {
							if (item.email == infos.nowlogin.email) {
								item.car = infos.nowlogin.car;
							}
						})
						//放回
						localStorage.setItem("infos", JSON.stringify(infos));
						this.$message.success('加至购物车成功！');
					}
				}
				
			},
			//排行榜移入函数
			over(obj,arr){
				arr.list.forEach(item=>{
					item.ishover= false;
				})
				obj.ishover = true;
			}
		},
		filters:{
			pricefilter(str){
				return "￥" + str.toFixed(2); 
			}
		}
	}
</script>

<style scoped="scoped">
	.image {
		width: 100%;
		display: block;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.text {
		font-size: 15px;
	}

	.text:last-of-type {
		margin-bottom: 0px;
	}
	
	.istop{
		color: #DD6161;
	}
	.baiyebox{
		height: 25px;
		transition:all 0.5s;
		overflow: hidden;
		padding: 10px 0px;
		border-bottom: 1px dotted #E4E7ED;
	}
	.baiyebox img{
		display: none;
	}
	.baiyebox .ddj{
		display: none;
	}
	.baiyebox .yj{
		display: none;
	}
	.baiyebox .pinlun{
		display: none;
	}
	.baiyebox .bookname{
		font-size: 17px;
		margin-left: 10px;
	}
	
	.rightbox{
		font-size: 12px;
		float: left;
		padding-left: 10px;
	}
	.num{
		float: left;
		font-size: 15px;
		font-weight: bold;
	}
	.iscolepse{
		height: 140px;
	}
	.iscolepse img{
		margin-right: 10px;
		float: left;
		display: block;
	}
	.iscolepse .rightbox .rightp{
		line-height: 30px;
		float: left;
	}
	.iscolepse .bookname{
		word-wrap : break-word;
		margin-left: 0px;
	}
	.iscolepse .ddj{
		font-weight: bold;
		color: #DD6161;
		display: block;
	}
	.iscolepse .yj{
		font-weight: bold;
		color: #A1A1A1;
		text-decoration: line-through;
		display: block;
	}
	.iscolepse .pinlun{
		color: #42B983;
		display: block;
	}
	.abox a{
		margin-right:15px;
	}
	.abox a:hover{
		color: #13CE66;
		
	}
</style>
