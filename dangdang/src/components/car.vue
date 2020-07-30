<template>
	<div>
		<el-row style='margin-top: 20px;'>
			<el-col :span="18" :offset="3">
				<el-card class="box-card">
					<div slot="header">
						<span>根据你选的商品，当当为您推荐</span>
					</div>
					<el-row>
						<el-col :span='12'>
								<el-table :header-cell-style="{
							    'display': 'none'
								}" :data="tableData" style="width: 100%;margin-top:0px;" :cell-style="cellStyle">
									<el-table-column prop="sname" width='200%'>
									</el-table-column>
									<el-table-column prop="sprice" :formatter="priceFormat" >
									</el-table-column>
									<el-table-column prop="ddprice" :formatter="priceFormat">
									</el-table-column>
									<el-table-column align='center'>
										<template slot-scope="scope">
											<el-button type='success' icon='el-icon-shopping-cart-2' circle @click='buy(scope.$index, scope.row)'></el-button>
										</template>
									</el-table-column>
								</el-table>
						</el-col>
						<el-col :span='12'>
							<template>
								<el-table :cell-style="cellStyle" :header-cell-style="{
							    'display': 'none'
							}" :data="tableData2" style="width: 100%;margin-top:0px;">
									<el-table-column prop="sname" width='200%'>
									</el-table-column>
									<el-table-column prop="sprice" :formatter="priceFormat">
									</el-table-column>
									<el-table-column prop="ddprice" :formatter="priceFormat">
									</el-table-column>
									<el-table-column align='right'>
										<template slot-scope="scope">
											<el-button type='success' icon='el-icon-shopping-cart-2' circle @click='buy(scope.$index, scope.row)'></el-button>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</el-col>
					</el-row>
				</el-card>
				<el-divider></el-divider>
				<el-card class="box-card">
					<div slot="header">
						<span>您已选购以下商品</span>
					</div>
					<el-table @selection-change="onselect" :data="choosetableData" stripe style="width: 100%">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="sname" label="书名" width='200%'>
						</el-table-column>
						<el-table-column prop="sprice" label="市场价" :formatter="priceFormat" align='center'>
						</el-table-column>
						<el-table-column prop="ddprice" label="当当价" :formatter="priceFormat" align='center'>
						</el-table-column>
						<el-table-column label="积分" align='center' prop='integer'>
						</el-table-column>
						<el-table-column label="数量" align='center'>
							<template slot-scope="scope">
								<el-input-number size='mini' v-model="scope.row.num" @change='tongbu' :min="1" :max="99"></el-input-number>
							</template>
						</el-table-column>
						<el-table-column label="操作" align='right'>
							<template slot-scope="scope">
								<el-button type="danger" icon="el-icon-delete" circle @click='del(scope.$index)'></el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
				<el-divider></el-divider>
				<el-card class='box-card'>
					<el-row style="text-align: left;">
						<el-col :span='5'>
							<el-button @click='clear' type="danger">清空购物车</el-button>
						</el-col>
						<el-col :span='6'>
							可节省金额:
							<span class="save">{{total[0] | priceFilter}}</span>
						</el-col>
						<el-col :span='6'>
							可获得积分:
							<span class="inte">{{total[1]*10}}</span>
						</el-col>
						<el-col :span='4'>
							总计:
							<span class="allmoney">{{total[1] | priceFilter}}</span>
						</el-col>
						<el-col :span='3' style="text-align: right;">
							<el-button type="danger" round @click="open">
								结算({{checklist.length}})
							</el-button>
						</el-col>
					</el-row>
				</el-card>

			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'car',
		data() {
			return {
				checklist: [], //选中结算的商品
				tableData: [{
						sname: "《名侦探柯南》",
						sprice: 32.80,
						ddprice: 18.80
					},
					{
						sname: "《复仇者联盟4-终局之战》",
						sprice: 47.80,
						ddprice: 36.80
					},
					{
						sname: "《回村的诱惑》",
						sprice: 59.80,
						ddprice: 38.80
					},
					{
						sname: "《活着》",
						sprice: 29.80,
						ddprice: 18.80
					},
				],
				tableData2: [{
						sname: "《中国地理杂志》",
						sprice: 43.80,
						ddprice: 28.80
					},
					{
						sname: "《web前端入门到放弃》",
						sprice: 66.50,
						ddprice: 32.80
					},
					{
						sname: "《SQL server删库到跑路》",
						sprice: 87.20,
						ddprice: 65.40
					},
					{
						sname: "《Java常见10000种bug》",
						sprice: 78.80,
						ddprice: 55.60
					}
				],
				choosetableData: [] //已经加入的商品
			}
		},
		created() {
			//实例创建，将登录用户的历史购物车同步至页面
			if (this.islogined().islogin) {
				this.choosetableData = this.islogined().obj.car;
			}
		},
		updated(){
			//页面发生改变并渲染完毕，做同步处理
			this.tongbu();
		},
		methods: {
			cellStyle ({ row, column, rowIndex, columnIndex }) {
			      if (columnIndex ===  1) {
			        // 指定坐标
			        return 'color:#ccc;text-decoration: line-through;'
			      }
			      if (columnIndex === 2) {
			        // 指定坐标
			        return 'color:#13CE66;font-weight:bold'
			      }
			 },
			//用于判断是否有用户登录
			islogined() {
				let infos = JSON.parse(localStorage.getItem("infos"));
				//有
				if (infos.nowlogin != "现在所登录的") {
					return {
						islogin: true,
						obj: infos.nowlogin
					}
					//无
				} else {
					return {
						islogin: false
					}
				}
			},
			//将表格中的价格转换格式
			priceFormat(row, column, cellValue, index) {
				return "￥" + cellValue.toFixed(2);
			},
			//购买函数
			buy(index, row) {
				// 当有用户登录
				if (this.islogined().islogin) {
					// 先查找是否已经加入
					let isAdd = this.choosetableData.find(item => item.sname == row.sname);
					//是：数量+1 否：加入
					isAdd ? isAdd.num++ : this.suc(row);
					//没有登录无法选购
				} else {
					this.$message.error("请先进行登录!");
				}
			},
			//购买函数，传入一整个对象
			suc(row) {
				this.choosetableData.push({
					sname: row.sname,
					sprice: row.sprice,
					ddprice: row.ddprice,
					integer: (row.ddprice * 10),
					num: 1,
				});
				this.$message({
					message: '加至购物车成功',
					showClose: true,
					type: 'success'
				});
			},
			//删除函数
			del(ind) {
				this.$confirm('确认删除该条商品？')
					.then(() => {
						//根据索引删除
						this.choosetableData.splice(ind, 1);
						//同步
						// this.tongbu();
						this.$notify({
							title: '成功',
							message: '删除商品成功!',
							type: 'success'
						});
					})
					.catch(_ => {

					});
			},
			// 勾选函数
			onselect(val) {
				this.checklist = val;
			},
			//清空购物车
			clear() {
				if(this.choosetableData.length>0){
					this.$confirm('确认删除所有商品？')
						.then(_ => {
							//置空数组
							this.choosetableData = [];
							//同步
							// this.tongbu();
							this.$notify({
								title: '成功',
								message: '删除所有商品成功!',
								type: 'success'
							});
						})
				}
			},
			// 同步函数
			tongbu() {
				//取出数据
				let infos = JSON.parse(localStorage.getItem("infos"));
				//改变正在登陆的购物车
				infos.nowlogin.car = this.choosetableData;
				//从全部用户找到当前登录的，将数据同步
				infos.users.forEach( item => {
					if (item.email == infos.nowlogin.email) {
						item.car = infos.nowlogin.car;
					}
				})
				//放回
				localStorage.setItem("infos", JSON.stringify(infos));
			},
			// 结账
			open(){
				const h = this.$createElement;
				this.$msgbox({
				title: '结账信息',
				message: h('p', null, [
					h('span', null, ''),
					h('i', { style: 'color: teal' }, `本次消费共${this.total[1]}元，确定结账吗？`)
				]),
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				beforeClose: (action, instance, done) => {
					if (action === 'confirm') {
					instance.confirmButtonLoading = true;
					instance.confirmButtonText = '结账中...';
					setTimeout(() => {
						done();
						setTimeout(() => {
						instance.confirmButtonLoading = false;
						}, 300);
					}, 3000);
					} else {
						done();
					}
				}
				}).then(action => {
				this.choosetableData = [];
				this.$message({
					type: 'info',
					message: '已支付，谢谢惠顾，欢迎下次光临'
				});
				});
			}
		},
		computed: {
			//结算
			total() {
				let save = 0;
				let Allprice = 0;
				this.checklist.forEach(item => {
					save += (item.sprice - item.ddprice) * item.num;
					Allprice += item.ddprice * item.num;
				})
				return [Number(save).toFixed(2), Number(Allprice).toFixed(2)]
			}
		},
		//过滤器（给价格特殊格式）
		filters: {
			priceFilter(str) {
				return "￥" + str;
			}
		}
	}
</script>

<style>
	.yuanjia{
		color: red;
		text-decoration: line-through;
		color: #13CE66;
	}
	.save {
		font-size: 20px;
		line-height: 40px;
		color: #13CE66;
	}

	.inte {
		font-size: 20px;
		color: #CF9236;
		line-height: 40px;
	}

	.allmoney {
		font-size: 27px;
		color: #DD6161;
	}
</style>
