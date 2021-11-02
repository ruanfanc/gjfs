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
      
    </div>
    <div class="middle-unread">
        <div class="aside">
          <ul>
              <li v-for="(item,index) in List" :key="item.uuid" ref="bgc" @click="change(index,List.length)">
                <!-- <div class="el-icon-close" @click="del(item.uuid)"></div> -->                                
                <div class="aside-title" >来自{{item.id}}的消息</div>
                <el-badge is-dot :hidden="item.readornot" class="item" ref="badge"></el-badge>
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

export default({
  data(){
    return{
      List: [],
      num:0,//接受点击下拉菜单中的某一条消息的索引号
      count:0,
      clicked:false,
      isShowdot:true
    } 
  },
  created(){    
    this.$eventBus.$on('shareMsgList',(val)=>{    //eventBus实现兄弟组件之间数据共享          
      this.List = val
      console.log(this.List,'未读');
    }),
    this.$eventBus.$on('shareIndex',(val)=>{
      this.num=val;
      this.List[val].readornot=true
       for(let i=0;i<this.List.length;i++){
        this.$refs.bgc[i].style.backgroundColor="#fff"
      }
      this.$refs.bgc[val].style.backgroundColor="#eee"
    })
  },
  methods:{
    change(val,len){
      this.num=val
      this.List[val].readornot=true
      this.$http.put('http://denghuolanshan.top:8082/messagecommunication',{
            "messageinfo": `${this.List[val].messageinfo}`,
            "id": "user1",
            "icon": "usericon",
            "sendtime": `${this.List[val].sendtime}`,
            "readornot": true,
            "sendto": null,
            "uuid": `${this.List[val].uuid}`
        })
      for(var i=0;i<len;i++){
        this.$refs.bgc[i].style.backgroundColor="#fff"
      }
      this.$refs.bgc[val].style.backgroundColor="#eee" //排他算法实现点击选中的小li背景颜色加深，其他小li颜色不变     
      console.log(this.List[val].readornot);
    }
  }
})
</script>

<style lang="less" scoped>
ul{
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
  cursor:pointer;
}

::-webkit-scrollbar {
    width: 10px;    
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.mainbox{
		background: #FFFFFF;
		padding: 35px;
		border-radius: 10px;
		margin: 15px;
}
.container{
  position: relative;
  margin: 0 auto;
  width: 1200px;
  height: 485px;
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

.header .unread{
  float: left;
  width: 100px;
  height: 55px;
  margin-left: 70px;
  text-align: center;
  line-height: 55px;
}
.middle-unread{
  position: relative;
  width: 100%;
  height: 430px;
}
.middle-unread .aside{
  position: absolute;
  width: 250px;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  border-bottom-left-radius: 5px;
  border-bottom: 1px solid #ccc;
}
.middle-unread .aside:hover{
  overflow-y: auto;
}
.aside ul li {
  position: relative;
  height: 50px;
  width: 250px;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
}
.aside ul li:first-child{
  border-top: none;
}
// .aside ul li .el-icon-close{
//   position: absolute;
//   top: 50%;
//   left: -50px;
//   transform: translateY(-50%);
//   z-index: 999;
//   width: 50px;
//   height: 50px;
//   border-top: 1px solid #ccc;
//   box-sizing: content-box;
//   text-align: center;
//   line-height: 50px;
//   float: left;
// }
// .aside ul li:first-child .el-icon-close{
//   border-top: none;
// }
// .aside ul li .el-icon-close:hover{
//   color: #ccc;
//   font-weight: 600;
// }
.aside ul li .aside-title{
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
}
.aside ul li .aside-title:hover{
  background-color: #eee;
}
.middle-unread .main{
  position: absolute;
  right: 0;
  width: 950px;
  height: 100%;
  overflow: auto;
}
.middle-unread .main .content{
  width: 500px;
  height: 300px;
  margin: 30px auto;
  padding: auto;
}
.item {
  margin-top: 20px;
  margin-left: 40px;
}
</style>