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
        <el-menu-item @mouseenter.native="enter" @mouseleave.native="leave">
          <template slot="title">
            <i class="el-icon-bell"></i>
            <span slot="" class="mesTitle">消息</span>
          </template>
          <!-- 下拉菜单 -->
      
          <div class="dropdown" v-show="isShow">
            <div class="jdd"></div>
            <span class="tri"></span>
            <div class="msg-header">
              <div class="unread-title">未读消息</div>
              <div class="unread-change">
                <label for="msg-checkbox">
                  <input type="checkbox" id="msg-checkbox" v-model="checked">
                  全部标为已读
                </label>
              </div>
            </div>
            <div class="msg-main">
              <!-- 当消息列表为空或者点击全部标为已读后，显示无消息状态 -->
              <p class="msg-main-none" v-show="msgList.length==0?true:false||checked">
                暂时没有消息
              </p>
              <ul v-show="!checked">
                <li v-for="item in msgList" :key="item.id">
                  <router-link to="message">
                    <div class="msg-main-title">来自{{item.id}}的消息</div>
                    <div class="msg-main-time">{{item.sendtime}}</div>
                  </router-link>
                </li>
              </ul>
              <div><el-empty description="123"></el-empty></div>
            </div>
            <div class="msg-footer">
                <router-link to="message">查看全部</router-link>    
            </div>
          </div>
          
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
//import bus from '../../eventBus.js'

export default {
  data() {
    return {
      isCollapse: false,
      activePath: "",
      msgList:[],
      checked:false,
      isShow:false
    };
  },
  created(){
    //	this.activePath = window.sessionStorage.getItem('activePath')
    this.response()  
  },
  updated(){
    this.send() //消息列表数据更新完毕后触发
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
    async response() {
        var that = this;
        await this.$http.get('http://denghuolanshan.top:8082/message/user3')
        .then(function(response) {       
          that.msgList = response.data;
          console.log(that.msgList)
        })
     },
    send(){ 
      this.$eventBus.$emit('share',this.msgList) //eventBus实现兄弟组件之间数据共享，向message.vue发送接口收到的数据
     }
   }
}

</script>

<style scoped>
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
  font-size: 15px;
}
.dropdown .msg-header .unread-change{
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: 600;
  font-size: 14px;
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
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 17px;
  font-weight: 550;
}

.msg-main ul li .msg-main-time{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
}
.dropdown .msg-footer{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px solid #ccc;
}
</style>