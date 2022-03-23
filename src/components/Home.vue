<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header style="height: 66px">
      <div style="width: 450px">
        <img src="" alt="" />
        <span class="title">公检法司链上存证系统</span>
      </div>
      <el-menu
        mode="horizontal"
        background-color=" #fff"
        text-color="#666666"
        active-text-color="#003366"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="activePath"
      >
        <el-menu-item index="/welcome">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/case">
          <i class="el-icon-menu"></i>
          <span slot="title">案件</span>
        </el-menu-item>
        <el-menu-item index="/checkout">
          <i class="el-icon-document-checked"></i>
          <span>在线验证</span>
        </el-menu-item>
        <el-menu-item index="/publicity">
          <i class="el-icon-view"></i>
          <span slot="title">实时公示</span>
        </el-menu-item>
        <!-- 消息模块 -->
        <el-menu-item @mouseenter.native="enter" @mouseleave.native="leave" @click.native="jumpToMessage">
          <template slot="title">
            <i class="el-icon-bell"></i>
            <span slot="" class="mesTitle">消息</span>
          </template>
          <!-- 下拉菜单 -->
          <transition name="slide-fade">
          <div class="dropdown" v-show="isShow">
            <div class="jdd"></div>
            <span class="tri"></span>
            <div class="msg-header">
              <div class="unread-title">全部消息</div>
              <div class="unread-change">
                <label for="msg-checkbox">
                  <input type="checkbox" id="msg-checkbox" v-model="checked">
                  全部标为已读
                </label>
              </div>
            </div>
            <div class="msg-main">
              <!-- 当消息列表为空或者点击全部标为已读后，显示无消息状态 -->
              <p class="msg-main-none" v-show="unReadmsgList.length==0?true:false||checked">
                暂时没有消息
              </p>
              <ul v-show="!checked">
                <li v-for="(item,index) in unReadmsgList" :key="item.uuid" @click="sendIndex(index)" v-show="!item.readornot">
                  <router-link to="message">
                    <div class="msg-main-title" :title="item.messageinfo">来自{{item.id}}的消息: {{item.messageinfo}}</div>
                    <div class="msg-main-time">{{new Date(item.sendtime).toLocaleString()}}</div>
                  </router-link>
                </li>
              </ul>
              <div><el-empty description="123"></el-empty></div>
            </div>
            <div class="msg-footer">
                <div class="msg-footer-route">
                  <router-link to="message">查看全部</router-link>
                </div>    
            </div>
          </div>
          </transition>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span class="spanTitle">个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="logout"> 退出登录 </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <!-- <el-button type="info" @click="logout" size="mini" round>退出</el-button> -->
    </el-header>
    <!-- 主体 -->

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      isCollapse: false,
      activePath: "",
      msgList:[],
      unReadmsgList:[],
      checked:false,  //点击全部标为已读赋值为true，为true时不展示未读消息内容
      isShow:false,

    };
  },
  watch:{
    checked:function(oldValue,newValue){
      console.log(oldValue,newValue);
      this.msgList.every(item=>(item.readornot=true))
    }
  },
  created(){
    //	this.activePath = window.sessionStorage.getItem('activePath')
    this.response()  
  },
  updated(){
    this.sendMsgList()
 //消息列表数据更新完毕后触发
  },
  methods: {
    async logout() {
      window.sessionStorage.clear();
      const { data: res1 } = await this.$http.get("/api1/login/logout");
      console.log(res1);
      this.$router.push("/login");
    },
    //菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    enter(){
      this.isShow=true;
    },
    leave(){
      this.isShow=false;
    },
    jumpToMessage(){
      this.$router.push('/message')
    },
    async response() {
        var that = this;
        await this.$http.get('/api1/messagecommunication/string')
        .then(function(response) {       
          that.msgList = response.data.data
          that.unReadmsgList=that.msgList.filter((item) => item.readornot == false)
          console.log(that.msgList)
          console.log(that.unReadmsgList);
        })
     },
    sendMsgList(){ 
      this.$eventBus.$emit('shareMsgList',this.msgList)
     },
    sendIndex(val){
      this.$eventBus.$emit('shareIndex',val)//发送当前这条未读消息的索引
      this.$http.put('/api1/messagecommunication/string',{
            "messageinfo": `${this.unReadmsgList[val].messageinfo}`,
            "id": "user1",
            "icon": "usericon",
            "sendtime": `${this.unReadmsgList[val].sendtime}`,
            "readornot": true,
            "sendto": null,
            "uuid": `${this.unReadmsgList[val].uuid}`
        })
    }
   }
}

</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #003366;
  font-size: 26px;
  font-weight: 700;
}

.title {
  margin-left: 20px;
}

.el-main {
  background-color: #f0f2f5;
  padding: 0px;
}

.el-menu-item {
  font-size: 16px;
}
.spanTitle {
  font-size: 16px;
}
.mesTitle{
  font-size:16px;
}
.toggle-button {
  background-color: #43495b;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.home-container {
  height: 100%;
}
.dropdown{
  position: absolute;
  top: 70px;
  right: -50px;
  background-color: #fff;
  width: 300px;
  height: 500px;
  box-shadow: 0 2px 10px 0 rgba(185, 182, 182, 0.2);
  font-size: 14px;
  border-radius: 5px;
  z-index: 999;
  box-sizing:border-box;
  font-weight: 500;
}
.dropdown .jdd{
  position: absolute;
  left: 0;
  top: -10px;
  width: 100%;
  height: 10px;
}
.dropdown .tri {
  position: absolute;
  right: 90px;
  top: -20px;
  height: 0;
  width: 0;
  line-height: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #fff;
}
.dropdown .msg-header{
  position: relative;
  width: 100%;
  height: 40px;
  border-bottom:1px solid #ccc ;
}

.dropdown .msg-header .unread-title{
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
}
.dropdown .msg-header .unread-change{
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: 100;
  font-size: 12px;
  display: flex;
  justify-content:center;
  color: #999999;
}

.dropdown .msg-main{
  width: 100%;
  height: 420px;
  overflow-y: auto;
  overflow-x: hidden;
}
.dropdown .msg-main .msg-main-none{
  position: relative;
  padding-top: 70px;
  margin-top: 80px;
  text-align: center;
  line-height: 13px;
}
.dropdown .msg-main .msg-main-none::before{
  content: "";
  position: absolute;
  top: 13px;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 45px;
  background: url(https://iknowpc.bdimg.com/static/common/widget/js/logic/msg-new/img/i-bell.2ec17fe.png) no-repeat;
  background-size: contain;
}
*{
  padding: 0;
  margin: 0;
}
li {
  list-style: none;

}
a{
  text-decoration: none;
}
.msg-main ul li {
  position: relative;
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.msg-main ul li .msg-main-title{
  position: absolute;
  top: 40%;
  left: 0px;
  transform: translateY(-50%);
  width: 252px;
  height: 48px;
  white-space: normal;
  line-height: 24px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 100;
  overflow: hidden;
}

.msg-main ul li .msg-main-time{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #b3b3b3
}
.dropdown .msg-footer{
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px solid #ccc;
  font-weight: 700;
}
.dropdown .msg-footer .msg-footer-route{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 56px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
</style>