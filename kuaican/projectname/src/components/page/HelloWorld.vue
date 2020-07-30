<template>
    <div class="pos">
        <el-row>
            <!-- 结账列 -->
            <el-col :span='7' class="pos-order" id="order-list">
                <el-tabs>
                    <!-- 点餐系统 -->
                    <el-tab-pane label='点餐'>
                        <!-- 餐品 -->
                        <el-table :data="tableData" style="width:100%">
                            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                            <el-table-column prop="count" label="数量" width="50"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                            <el-table-column label="操作" width="100" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--  -->
                        <div class="totalDiv">
                            <small>数量:</small> {{totalcount}}元  &nbsp;&nbsp;&nbsp;&nbsp;  <small>金额:</small> {{totalmoney}}元
                        </div>
                        <!-- 按钮 -->
                        <div class="div-btn">
                            <el-button type="warning" @click="guadan()">挂单</el-button>
                            <el-button type="danger" @click="delAllGoods()">删除</el-button>
                        </div>
                    </el-tab-pane>
                    <!-- 挂单系统 -->
            <el-tab-pane label="挂单">
              <el-table border style="width: 100%" :data="guadanData">
                <el-table-column  label="商品" prop="goodsName"></el-table-column>
                <el-table-column label="量" prop="count"></el-table-column>
                <el-table-column label="金额" prop="price"></el-table-column>         
              </el-table>
              <!-- 数量和金额 -->
              <div v-show="isshow2" class="zong">
                <span>数量：{{totalcount}}</span>
                <span>金额：{{totalmoney}}</span>
              </div>
              <!-- 按钮 -->
              <div class="btn">
                <el-button type="danger" @click="delAllGuadan()">删除</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>

            </el-col>
            <!-- 产品栏 -->
            <el-col :span='15'>
                <div class="often-goods">
                    <div class="title">常用商品</div>
                    <div class="often-goods-list">
                        <ul>
                            <li v-for="goods in oftenGoods" :key="goods.id" @click="addOrderList(goods)">
                                <span>{{goods.goodsName}}</span>
                                <span class="o-price">¥{{goods.price}}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="goods-type">
                    <el-tabs>
                        <el-tab-pane label="汉堡">
                            <div>
                                <ul class="cookList">
                                    <li v-for="goods in hanbao" :key="goods.id" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsIms" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">¥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="小食">
                            <div>
                                <ul class="cookList">
                                    <li v-for="goods in xiaoshi" :key="goods.id" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsIms" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">¥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="饮料">
                            <div>
                                <ul class="cookList">
                                    <li v-for="goods in kele" :key="goods.id" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsIms" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">¥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="套餐">
                            <div>
                                <ul class="cookList">
                                    <li v-for="goods in taocan" :key="goods.id" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsIms" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">¥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
// let arrs = [];
export default {
    name:'pos',
    data() {
        return {
            tableData:[],
            oftenGoods:[],
            typeGoods:[],
            hanbao:[],
            xiaoshi:[],
            kele:[],
            taocan:[],
            totalmoney:0,
            totalcount:0,
            multipleSelection: [],
            isshow:true, // 点餐界面默认显示
            isshow2:false,// 挂单界面默认显示
            guadanData:[]
            
        }
    },
    created:function(){
        var rel = this;
        // 请求数据
        axios.get('../../../static/json/oftenGoods.json')
        .then(function(data){
            rel.oftenGoods = data.data
        })
        .catch(function(){
            alert("ajax error")
        });

        // 请求分类商品
        axios.get('../../../static/json/typeGoods.json')
        .then(function(data){
            rel.hanbao = data.data.hanbao;
            rel.xiaoshi = data.data.xiaoshi;
            rel.kele = data.data.kele;
            rel.taocan = data.data.taocan;
        })
    },
    mounted:function(){
        var orderHeight = document.body.clientHeight;//获取订单栏高度
        console.log(orderHeight);
        document.getElementById('order-list').style.height = orderHeight + 'px';
    },
    methods: {
        // 添加订单列表
        addOrderList :function(goods){
            console.log(this.hanbao);
            let ishave = false;
            // 判断商品是否存在订单列表中
            for(var i = 0; i < this.tableData.length;i++){
                if(this.tableData[i].goodsId == goods.goodsId){
                    ishave = true;
                }
            }
            // 有就执行下面的逻辑
            if(ishave == true){
                // 改变列表中商品的数量
                let arr = this.tableData.filter(function(o){
                    return (o.goodsId == goods.goodsId)
                });
                arr[0].count += 1;
            }else{
                this.tableData.push({
                    goodsId: goods.goodsId,
                    goodsName: goods.goodsName,
                    price: goods.price,
                    count: 1
                })
            }
            this.getsum();
        },
        // 计算数量和总价
        getsum(){
            this.totalcount = 0;
            this.totalmoney = 0;
            if(this.tableData.length > 0){
                this.isshow = true;
            }else{
                this.isshow = false;
            }
            this.tableData.forEach(ele=>{
                this.totalcount += ele.count;
                this.totalmoney = this.totalmoney + (ele.count * ele.price)
            })
        },
        // 删除单个
        delSingleGoods: function(good){
            this.tableData = this.tableData.filter(function(o){
                return o.goodsId != good.goodsId;
            });
            this.getsum();
        },
        // 2 挂单 点击挂单，把点餐表格中的数据传入挂单的表格中，并清空点餐表格中的数据
    guadan(){
      // alert("000");
      
      this.guadanData = this.tableData;
      this.tableData = [];
      //提示消息
      this.$message({
          message: '挂单成功，请在挂单中查看已挂单的商品',
          type: 'success'
      });
      this.getsum();
    },
        // 清除列表所有商品
        delAllGoods() {
            this.tableData = [];
            this.totalmoney = 0;
            this.totalcount = 0;
        },
        // 清除挂单所有商品
        delAllGuadan() {
            this.guadanData = [];
            this.totalmoney = 0;
            this.totalcount = 0;
        },
       
        // 选择的商品列表多选框，取消所选择的项
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },//多选项存储值（选择或改变选项是调用）
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        }
    },
}
</script>


<style scoped>
    .pos-order{
        background-color: #f9fafc;
        border-right:1px solid #c8ccda ;
        height: 100%;
    }
    .div-btn{
        margin-top: 10px;
    }
    .title{
        height: 20px;
        border-bottom: 1px solid #d3dce6;
        background-color: #f9fafc;
        padding: 10px;
        text-align: left;
    }
    .often-goods-list ul li{
        list-style: none;
        float: left;
        border: 1px solid #e5e9f2;
        padding: 10px;
        margin: 10px;
        background-color: #fff;
    }
    .o-price{
        color: #58b7ff;
    }
    .goods-type{
        clear: both;
    }
    .cookList li{
       list-style: none;
       width:23%;
       border:1px solid #E5E9F2;
       height: auto;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
       cursor: pointer;
   }
   .cookList li span{
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 16px;
       padding-left: 10px;
       color:brown;
   }
   .foodPrice{
       font-size: 14px;
       padding-left: 10px;
       padding-top:10px;
   }
   .totalDiv{
       background-color:#fff;
       padding: 10px;
       border-bottom:1px solid #d3dce6;
   }
</style>