<template>
<div class="mainbox">
  <div class="title">
			<h1>消息中心</h1>
			<el-divider>Message Center</el-divider>
			<p>打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链</p>
	</div>
  <div class="container">
     <div class="header">
      <div class="unread" @click="showUnread" ref="unread">未读消息</div>
      <div class="all" @click="showAll" ref="all">全部消息</div>
    </div>
    <div class="middle-unread" v-show="isShowUnread">
        <div class="aside">
          <ul>
              <li v-for="(item,index) in unReadList" :key="item.uuid" ref="bgc" @click="change(index,unReadList.length)" @mouseenter="showBgc(index)" @mouseleave="hideBgc(index)">
                <div class="el-icon-close" @click="del(item.uuid)"></div>
                <div class="aside-title" >来自{{item.id}}的消息</div>
              </li>
          </ul>
        </div>
        <div class="main">
          <div class="content">{{unReadList[num].messageinfo}}</div>
        </div>
    </div>
    <div class="middle-all" v-show="isShowAll">
      <div class="list" ref="list">
         <ul ref="ul">
          <li v-for="(item,index) in List" :key="item.uuid" @click="showDetail(index)">
            <div class="list-title" >             
              来自{{item.id}}的消息
            </div>
            <div class="list-time">{{item.sendtime}}</div>
          </li>
        </ul> 
      </div>
      <div class="btn">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="List.length"
            :current-page="currentPage"
            :page-size="pagesize"
            class="pag" 
            @current-change="handleCurrentChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick">
        </el-pagination>
      </div>         
    </div>
  </div>
  <div class="mask" v-show="isShowHidden" @click="hideDetail">
    <div class="content">{{List[count].messageinfo}}</div>
  </div>
</div>
</template>

<script>

export default({
  data(){
    return{
      unReadList: [],
      List:[],//未读消息列表
      num:0,//接受点击下拉菜单中的某一条消息的索引号
      count:0,
      clicked:false,
      isShowUnread:false,//isShowUnread和isShowAll实现未读消息和全部消息内容的切换
      isShowAll:true,
      isShowHidden:false,//为true显示遮罩层，为false隐藏遮罩层
      currentPage:1, //点击页面的索引号
      pagesize:5,//一页展示几条消息
      index:1, //当前页面的索引号
    } 
  },
  created(){
    
    this.$eventBus.$on('shareMsgList',(val)=>{    //eventBus实现兄弟组件之间数据共享      
      this.List=val;     
      console.log(this.List,'全部');      
    }),
    this.$eventBus.$on('shareUnMsgList',(val)=>{    //eventBus实现兄弟组件之间数据共享          
      this.unReadList = val    
      console.log(this.unReadList,'未读');
    }),
    this.$eventBus.$on('shareIndex',(val)=>{
      this.num=val;
      this.unReadList[val].readornot=true
      this.isShowUnread=true
      this.isShowAll=false
      this.$refs.unread.style.color="#666"
      this.$refs.all.style.color="#ccc"
       for(var i=0;i<this.unReadList.length;i++){
        this.$refs.bgc[i].style.backgroundColor="#fff"
      }
      this.$refs.bgc[val].style.backgroundColor="#eee"
    })
  },
  methods:{
    //实现点击页面号进行跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;//将点击的页面号赋值给currentPage
      const ul=this.$refs.ul;
      const target=-this.$refs.list.offsetHeight*(this.currentPage-this.index);
      ul.style.top = ul.offsetTop + target + 'px';
      this.index=this.currentPage;
    },
    //实现点击“>”跳转到下一页
    handleNextClick(){
      const ul=this.$refs.ul;
      const target=-this.$refs.list.offsetHeight;
      ul.style.top = ul.offsetTop + target + 'px';
      this.index++;
      console.log(this.index);
    },
    //实现点击“<”跳转到上一页
    handlePrevClick(){
      const ul=this.$refs.ul;
      const target=this.$refs.list.offsetHeight;     
      ul.style.top = ul.offsetTop + target + 'px';
      this.index--;
      console.log(this.index);
    },
    //点击切换未读消息列表的消息，展示不同的样式及内容
    change(val,len){
      this.num=val
      this.unReadList[val].readornot=true
      this.$http.put('http://denghuolanshan.top:8082/messagecommunication',{
            "messageinfo": `${this.unReadList[val].messageinfo}`,
            "id": "user1",
            "icon": "usericon",
            "sendtime": `${this.unReadList[val].sendtime}`,
            "readornot": true,
            "sendto": null,
            "uuid": `${this.unReadList[val].uuid}`
        })
      for(var i=0;i<len;i++){
        this.$refs.bgc[i].style.backgroundColor="#fff"
      }
      this.$refs.bgc[val].style.backgroundColor="#eee" //排他算法实现点击选中的小li背景颜色加深，其他小li颜色不变     
      console.log(this.unReadList[val].readornot);
    },
    //鼠标经过背景颜色加深，并实现小叉号的移出
    showBgc(val){
      console.log(this.unReadList[val].readornot)
      this.clicked=this.unReadList[val].readornot
      if(!this.clicked){
      this.$refs.bgc[val].style.backgroundColor="#eee"
      }
      let bgc=this.$refs.bgc;
      clearInterval(bgc[val].timer);
      bgc[val].timer = setInterval(function() {       
        let step = (50 - bgc[val].offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (bgc[val].offsetLeft == 50) {           
            clearInterval(bgc[val].timer);           
        }        
        bgc[val].style.left = bgc[val].offsetLeft + step + 'px';
    }, 30);
    },
    //鼠标离开背景颜色变浅，并实现小叉号的移出
    hideBgc(val){
      //console.log(unreadList[val].readornot)
      this.clicked=this.unReadList[val].readornot
      if(this.clicked){
        this.$refs.bgc[val].style.backgroundColor="#eee"
      }else{
        this.$refs.bgc[val].style.backgroundColor="#fff"
      }
      let bgc=this.$refs.bgc;
      clearInterval(bgc[val].timer);
      bgc[val].timer = setInterval(function() {       
        let step = (0-bgc[val].offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (bgc[val].offsetLeft == -50) {           
            clearInterval(bgc[val].timer);           
        }        
        bgc[val].style.left = bgc[val].offsetLeft + step + 'px';
    }, 30);
    },
    //点击未读消息展示未读消息模块
    showUnread(){
        this.isShowAll=!this.isShowAll
        this.isShowUnread=!this.isShowUnread
        this.$refs.all.style.color="#ccc"
        this.$refs.unread.style.color="#666"
    },
    //点击全部消息展示全部消息模块
    showAll(){
        this.isShowAll=!this.isShowAll
        this.isShowUnread=!this.isShowUnread
        this.$refs.unread.style.color="#ccc"
        this.$refs.all.style.color="#666"
    },
    //点击全部消息模块的某条消息展示其内容
    showDetail(val){
        this.count=val
        this.isShowHidden=true
    },
    //点击遮罩层区域隐藏其内容
    hideDetail(){
        this.isShowHidden=false
    },
    //点击小叉号删除列表内容
    del(val){
        // this.unReadList.splice(val,1)
        // console.log(this.unReadList);
        var index=null
        index=this.unReadList.findIndex(item=>{
          if(item.uuid===val) return true;
        })
        this.unReadList.splice(index,1)
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
  color: #ccc;
}
.header .all{
  float: left;
  width: 100px;
  height: 55px;
  margin-left: 20px;
  text-align: center;
  line-height: 55px;
  cursor: pointer;
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
.aside ul li .el-icon-close{
  position: absolute;
  top: 50%;
  left: -50px;
  transform: translateY(-50%);
  z-index: 999;
  width: 50px;
  height: 50px;
  border-top: 1px solid #ccc;
  box-sizing: content-box;
  text-align: center;
  line-height: 50px;
  float: left;
}
.aside ul li:first-child .el-icon-close{
  border-top: none;
}
.aside ul li .el-icon-close:hover{
  color: #ccc;
  font-weight: 600;
}
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
.middle-all .list{
  position: relative;
  width: 100%;
  height: 390px;
  overflow: hidden;
}
.middle-all .list ul{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.middle-all .list ul li{
  position: relative;
  width: 100%;
  height: 78px;
  border-top:1px solid #ccc;
  box-sizing: border-box;
}
.middle-all .list li:nth-child(5n+1){
  border-top: none;
}
.middle-all .list li .list-title{
  position: absolute;
  top: 50%;
  left: 100px;
  transform: translateY(-50%);
  line-height: 78px;
  text-align: center;
}
.middle-all .list li .list-time{
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
  line-height: 78px;
  text-align: center;
  font-size: 14px;
}
.middle-all .btn{
  width: 100%;
  height: 40px;
  text-align: center;
}
.middle-all .btn .pag{
  margin:0;
}
.mask .content{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 20px #ddd;
  width: 500px;
  height: 300px;
  padding: 30px;
  overflow: auto;
  background-color: #fff;
  z-index: 9999;
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, .3);
}
</style>