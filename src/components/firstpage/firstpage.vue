<template>
  <el-container>
    <!-- menu part -->
    <el-header>
      <el-menu
        :default-active="'/first'"
        router
        mode="horizontal"
        background-color="white"
        text-color="#222"
        active-text-color="red"

      >
              <!-- style="min-width: 1200px" -->
        <a
          style="
            position: absolute;
            left: 6%;
            padding-top: 20px;
            font-size: 20px;
            font-weight: bold;
          "
          @click="gotolink"
          >公检法司链上存证系统</a>
        <!-- <a>
        hhhhhh
      </a> -->
        <!-- <el-menu-item style="position: absolute;left: 6%;padding-top: 20px;font-size: 20px;font-weight: bold" >
        公检法司链上存证系统
      </el-menu-item> -->
      <!-- 循环取出，存储的跳转的网页 -->
        <!-- <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name" :style="item.sstyle"        >
          {{ item.navItem }}
        </el-menu-item> -->

        <el-menu-item v-for="(Item, i) in navList" :key="i"  :style="Item.sstyle" :getindex = "Item.posid" >
          <!-- {{item.posid}} -->
          <a v-bind:href= "Item.posid"  @click="jumpto(Item.posid)">{{Item.navItem}}</a>
        </el-menu-item>
      <!-- 锚点的菜单 -->
         <!-- <el-menu-item  style="position: absolute;left: 70%;">
          <a href="#contone" @click="Tocontone">1</a>
         </el-menu-item>
          <el-menu-item index="/login" style="color: #222; float: right"
          >登陆</el-menu-item> -->

        <!-- 登录网页的跳转 -->
        <el-menu-item index="/login" style="color: #222; float: right">
        登陆
        </el-menu-item>
        <i
          class="el-icon-menu"
          style="float: left; font-size: 45px; color: #222; padding-top: 8px"
        ></i>
        <!-- <el-menu-item style="left:50%">
            <a href="#contone" @click="Tocontone">测试</a>
        </el-menu-item> -->
      </el-menu>
    </el-header>

    <!-- main part to show -->
    <el-main>
      <div class="main">
        <!-- 展示图片，后面考虑轮播 -->
        <div class="picture" id="#part0" >
          <p class="pictures_show" >

          <img 
            src="https://img.alicdn.com/tfs/TB15AKxo7L0gK0jSZFAXXcA9pXa-1920-800.jpg" 
          />
          </p>
        </div>
        <!-- 介绍 -->
        <div class="cardbox" id="#part1">
          <div class="title">
            <h1>区块链存证系统介绍</h1>
            <el-divider>BLOCKCHAIN STORAGE SYSTEM INTRODUCTION</el-divider>
            <p>
              打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链
            </p>
          </div>
          <div class="pic">
            <img
              src="http://tpl.bjinternetcourt.gov.cn:8080/tpl/images/vd.jpg"
            />
          <!-- </div> -->
          <div class="Introduce">
            <p>
            公检法司链上存证系统是将数据采集，数据上链，智能合约，数据安全性查询与区块验证等功能相结合的公检法司存证系统。本项目针对案件处理过程中产生的数据易篡改、管理成本高，以及各个部门之间缺乏协同导致信息孤岛等问题展开研究。开展公检法司链上存证关键技术的科技攻关，研发基于区块链的公检法司存证系统。通过公检法司各机构共同搭建联盟链体系，由各机构下的各个部门作为节点共同维护该联盟区块链网络，各节点分布式存储区块链完整信息，通过共识机制，实现各节点之间信息的同步共享，打破公检法司之间存在的“信息孤岛”问题，提高多方协作效率。并将案件信息提取关键内容并转化成结构化数据，通过调用事先部署的存证智能合约实现数据上链，通过Merkle树和区块链表两种哈希结构保证数据不可篡改。此外，通过在每个区块中添加案件进度信息，以供公众查询，进一步提高司法公信度。
            </p>
          </div>
          </div>
        </div>
        <div class="structure" id="#part2">

        </div>
        <!-- 实时展示 -->
        <public id="#part3"> </public>
      </div>
    </el-main>

        <!-- in your template -->
    <back-to-top bottom="50px" right="50px">
      <button type="button" class="btn btn-info btn-to-top">
        <i class="el-icon-arrow-up">
          <!-- <a font-size=10px>
              到达顶部
            </a> -->
        </i>
        </button>
    </back-to-top>
  </el-container>
</template>


<script>
import Public from "./publicity_show.vue";
import BackToTop from 'vue-backtotop'
export default {
  name: "firstpage",

  data() {
    return {
      navList: [
        {
          name: "/first",
          navItem: "首页",
          sstyle: "position: absolute;left: 69%;",
          posid: "#part0",
        },
        {
          name: "/task",
          navItem: "系统介绍",
          sstyle: "position: absolute;left: 74%;",
          posid: "#part1",
        },
         {
          name: "/task",
          navItem: "系统框架",
          sstyle: "position: absolute;left: 81%;",
          posid: "#part2",
        },
        {
          name: "/test",
          navItem: "实时公示",
          sstyle: "position: absolute;left: 88%;",
          posid: "#part3",
        },

        // {name: '/noright', navItem: '图书馆'},
        // {name: '/welcom', navItem: '个人中心'}
        // ]
      ],
      login: [{ name: "/login", ItemName: "登录" }],
    };
  },
  // ,
  //  methods:{
  //     gotolink(){

  //       //点击跳转至上次浏览页面
  //      // this.$router.go(-1)

  //       //指定跳转地址
  //       this.$router.replace('/login')
  //     }
  //   }

  // 引入组件
  components: {
    Public,
    BackToTop,
     },
  methods:{
        jumpto(index){
      // document.querySelector("#contone2").scrollIntoView(true);
      //  document.getElementsByClassName('#contone').scrollIntoView();
      document.getElementById(index).scrollIntoView(true);
    },

          gotolink(){

        //点击跳转至上次浏览页面
       // this.$router.go(-1)

        //指定跳转地址
        this.$router.replace('/login')
      }

  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

span {
  pointer-events: none;
}
el-menu-item {
  position: absolute;
  left: 70%;
}
el-menu {
  width: 100px;
}

/* picture {
  width: 1200px;
  height: auto;
  
element.style {
    background: url(images/banner.jpg) center top no-repeat;
    
    width: 1280px;
} */
pic {
  width: 35%;
  height: auto;
  float: left;
  margin-top: 12px;
}
.pictures_show{
  display: flex;
  justify-content: center;
  align-items: center;  
}
.pictures_show img{
  width : 100%;
}

.Introduce p{
    margin-top: 12px;
  text-indent: 32px;
  color: #333333;
  font-size: 14px;
  text-align: left;
}
.Introduce{
    width: 64%;
    float: right;
    font-size: 16px;
    line-height: 30px;
    padding: 20PX 0;
}
juzhong{
  display: flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:center;
}
.btn-to-top {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
}
</style>

