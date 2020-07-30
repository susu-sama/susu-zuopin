<template>
    <div class="left-nav">
        <ul>
            <li v-for="navleft in menuData" :key="navleft.id">
                <i class="icon iconfont" :class="navleft.className"></i>
                <P>{{navleft.title}}</P>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'leftNav',
    data(){
        return {
            msg:'',
            menuData:[
                {className:'icon-jinqian',title:'收银'},
                {className:'icon-icon-dianpu-copy',title:'店铺'},
                {className:'icon-shangpin',title:'商品'},
                {className:'icon-huiyuan',title:'会员'},
                {className:'icon-tongji',title:'统计'},
                {className:'icon-设置',title:'设置'}
            ]
        }
    },
}
</script>
<style>
    *{margin: 0;padding: 0;}
    .left-nav{
        color: #fff;
        font-size: 18px;;
        height: 100%;
        background-color: #1d8ce0;
        float: left;
        width: 5%;
    }
    .iconfont{
        font-size: 24px;
    }
    .left-nav ul li{
        list-style: none;
        text-align: center;
        border-bottom: 1px solid #20a0ff;
        padding: 10px;
    }
</style>