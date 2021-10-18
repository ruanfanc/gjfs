<template>
<div class="mainbox">
  <div class="title">
			<h1>消息中心</h1>
			<el-divider>Message Center</el-divider>
			<p>打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链</p>
	</div>
  <div class="container">
    <div class="header">
      <div class="unread">未读消息</div>
      <!-- <div class="all">历史记录</div> -->
    </div>
    <div class="middle">
        <div class="aside">
          <ul>
              <li v-for="(item,index) in List" :key="item.id" ref="bgc">
                  <div class="aside-title" @click="change(index,List.length)">来自{{item.id}}的消息</div>
              </li>
          </ul>
        </div>
        <div class="main">
          <div class="content">{{List[num].messageinfo}}</div>
        </div>
    </div>
  </div>
</div>

</template>

<script>
//import bus from '../../eventBus.js'

export default({
  data(){
    return{
      List:[],
      num:0
    }
  },
  created(){
    this.$eventBus.$on('share',(val)=>{    //eventBus实现兄弟组件之间数据共享
      this.List=val;
    })
  },
  methods:{
    change(val,len){
      this.num=val
      for(var i=0;i<len;i++){
        this.$refs.bgc[i].style.backgroundColor="#fff"
      }
      this.$refs.bgc[val].style.backgroundColor="#eee" //排他算法实现点击选中的小li背景颜色加深，其他小li颜色不变
    }
  }
})
</script>

<style scoped>
li {
  list-style: none;

}
.mainbox{
		background: #FFFFFF;
		padding: 35px;
		border-radius: 10px;
		margin: 15px;
}
.container{
  position: relative;
  margin:30px auto;
  width: 1200px;
  height: 585px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.title {
		text-align: center;
	}

.title h1 {
	font-size: 25px;
	color: #2b7ec2;
	line-height: 10px;
}

.title p {
	font-size: 8px;
	color: #565656;
	line-height: 10px;
}
.header{
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #ccc;
}
.header div:hover{
  color:#ccc;
}
.header .unread{
  float: left;
  width: 100px;
  height: 55px;
  margin-left: 70px;
  text-align: center;
  line-height: 55px;
  cursor: pointer;
}
/*.header .all{
  float: left;
  width: 100px;
  height: 55px;
  margin-left: 20px;
  text-align: center;
  line-height: 55px;
  cursor: pointer;
}*/
.middle{
  position: relative;
  width: 100%;
  height: 530px;
}
.middle .aside{
  position: absolute;
  width: 250px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid #ccc;
}
.aside ul{
  padding: 0;
  margin: 0;
}
.aside ul li {
  position: relative;
  height: 50px;
  width: 250px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
}
.aside ul li:last-child{
  border-bottom: none;
}
.aside ul li:hover{
   background-color: #eee;
}
.aside ul li .aside-title{
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
}
.middle .main{
  position: absolute;
  right: 0;
  width: 950px;
  height: 100%;
}
.middle .main .content{
  width: 500px;
  height: 300px;
  margin: 50px auto;
  padding: auto;
}
</style>