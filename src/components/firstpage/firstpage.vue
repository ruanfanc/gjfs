<template>
  <el-container >
    <!-- menu part -->
    <el-header >
        <firstmenu id="firstmenu">
      <el-menu :default-active="'/first'" router mode="horizontal" background-color="white" text-color="#222" active-text-color="red" >
              <!-- style="min-width: 1200px" -->
        <div style=" position: absolute; left: 6%; padding-top: 20px; font-size: 20px; font-weight: bold; z-index=99999" @click="gotolink" >
          公检法司链上存证系统
          </div>

        <el-menu-item v-for="(Item, i) in navList" :key="i"  :style="Item.sstyle" :getindex = "Item.posid" >
          <a v-bind:href= "Item.posid"  @click="jumpto(Item.posid)">{{Item.navItem}}</a>
        </el-menu-item>
      <!-- 锚点的菜单 -->


        <!-- 登录网页的跳转 -->
        <el-menu-item index="/login" style="color: #222; float: right">
        登陆
        </el-menu-item>
        <i
          class="el-icon-menu"
          style="float: left; font-size: 45px; color: #222; padding-top: 8px"
        ></i>
      </el-menu>
      </firstmenu>
    </el-header>

    <!-- main part to show -->
    <el-main>
      <div class="main">
        <!-- 展示图片，后面考虑轮播 -->
        <div class="picture" id= "#part0" >
          <p class="pictures_show" >

          <img 
            src="https://img.alicdn.com/tfs/TB15AKxo7L0gK0jSZFAXXcA9pXa-1920-800.jpg" 
          />
          </p>
        </div>
        <!-- 介绍 -->
        <div class="cardbox" id= "#part1">
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
        <!-- <el-divider></el-divider> -->
        <br></br>
        <div class="structure" id="#part2">
          <div class="title">
            <h1>系统框架介绍</h1>
            <el-divider>BLOCKCHAIN STORAGE SYSTEM SYSTEM FRAMEWORK INTRODUCTION</el-divider>
            <p>
              打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链
            </p>
          </div>
          
          <!-- 框架图片 -->
          <div >
            <div class="structureshow">
              <img src="./strc1.png" alt="框架流程图" title="架构图" style="position: center;border: 0;vertical-align: middle;"     >
            </div>

          </div>
        </div>
        <!-- 实时展示 -->
        <public id="#part3"> </public>
      </div>
    </el-main>

<!-- 底部设计 -->
    <el-bottom>
      <div class="bottom-box">
        <!-- 前面两个设计 -->
        <div class="bottom-part1">
          <div v-for="(item,i) in bottombox.slice(0,bottombox.length-1)" :key="i" >
            {{item.boxname}}
              <ul>
              <div class="item.boxname">
                <a v-for="(index,j) in item.boxindex" :key="j" :class="hengpailie">
                <!-- <a  v-bind: href= "index.indexurl"  > -->
                  <a v-bind:href= "index.indexurl" >
                  <template v-if="j < item.boxindex.length-1">                    
                    {{index.indexname}}  |
                  </template>
                 <template v-if="j == item.boxindex.length-1">
                      {{index.indexname}} 
                  </template>

                  </a>
                </a>
                <el-divider>                  
                </el-divider>
              </div>
              </ul>
          </div>
        </div>
        <!--  版权信息设计 -->
        <div class="bottom-part1">
          <div v-for="(item,i) in bottombox.slice(bottombox.length-1,bottombox.length)" :key="i" >
            {{item.boxname}}
              <ul>
              <div class="item.boxname">
                <p v-for="(index,j) in item.boxindex" :key="j" :class="hengpailie">
                  {{index.indexname}}:{{index.indexurl}}
                </p>
                <el-divider>                  
                </el-divider>
              </div>
              </ul>
          </div>
        </div>

      </div>
    </el-bottom>


<!-- 悬浮的内容 -->
    <el-xuanfu>
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
        </el-xuanfu>
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

      bottombox :[
        
        {
        "boxname": '相关机构',
        "boxindex": [
          {"indexname": "最高人民法院","indexurl":"http://www.court.gov.cn/"},
          {"indexname": "浙江省高级人民法院","indexurl":"http://www.zjcourt.cn/"},
          {"indexname": "中国法院网","indexurl":"http://www.chinacourt.org/index.shtml"},
          {"indexname": "中国裁判文书网","indexurl":"http://www.court.gov.cn/zgcpwsw/"},
          {"indexname": "中国庭审公开网","indexurl":"http://tingshen.court.gov.cn/"},
          {"indexname": "人民法院报","indexurl":"http://rmfyb.chinacourt.org/"},
          {"indexname": "法制日报","indexurl":"http://www.legaldaily.com.cn/"},
          {"indexname": "北大法律信息网","indexurl":"http://www.chinalawinfo.com/"},
          {"indexname": "国家法官学院","indexurl":"http://njc.chinacourt.org/"},
          ],
        },
        {
        "boxname": '友情链接',
        "boxindex": [
          {"indexname": "海口市公安局","indexurl":"http://police.haikou.gov.cn/"},
          {"indexname": "海口市人民检察院","indexurl":"https://www.hi.jcy.gov.cn/haikou.html/"},
          {"indexname": "海口市中级人民法院","indexurl":"http://hkfy.gov.cn/default.html/"},
          ]
        },
        {
          "boxname": '公检法司链上存证系统',
          "boxindex": [
            { "indexname":"地址","indexurl":"海南省海口市美兰区人民大道58号　邮编：570228" },
            {"indexname":"联系方式", "indexurl":"电话：0898-66259127 传真：0898-66259127"},
            {"indexname":"版权信息","indexurl":"Copyright(c)2020-2021公检法司链上存证系统"},

          ]
        },


      ],
    };
  },

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
      },
      // 监听事件
      // window.addEventListener('scroll', function(){
      //   let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
      //   if(t>0){
      //     $('.box').addClass('box-active')
      //   }else{
      //     $('.box').removeClass('box-active')
      //   }
      // })
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
firstmenu {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  /* background-color: #cc0000; */
  color: white;
  z-index: 9998;
  opacity: 0.75;
  /* color:rgba(255,255,255,0.1); */
  /* alpha: 0.3; */
  /* background-color：#55585a+7a; */
  /* font-family: 'Exo 2', sans-serif; */
  /* padding: 1em;  */


    /* width:500px; */
  /* margin:0px auto; */
  /* position:fixed;  */
  /* 固定作用 */
  /* top:0px; */
  /* left:490px; */
  /* ie6下样式，加下划线表示只针对ie6 的hack */
  /* _position:absolute; */
  /* 把导航栏位置定义为绝对位置  关键 */
  /* _top:expression(documentElement.scrollTop + "px");  */
  /* 把导航栏位置放在浏览器垂直滚动条的顶端  关键 */
  /* z-index:9999;  */
  /* 让导航栏浮在网页的高层位置，遇到flash和图片时候也能始终保持最外层 */
  /* text-align:left; */
/* 
  position: sticky;
  position: -webkit-sticky;    /* 兼容 -webkit 内核的浏览器*/
  /* top: 10px;                          必须设一个值，否则不生效 */ 

}
.box{
position: relative;
height: 80px;
width: 100%;
z-index: 999;
}
/* // 监听到滚动条开始滚动后的样式 */
.box-active{
position: fixed;
top: 0;
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
.bottom-part1{
  /* display: flex;
  display: -webkit-flex; */
  align-items:center;
  justify-content:center;
  text-align:center;
}
.hengpailie{
  display: flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:center;
  text-align:center;
}
.el-divider__text {
  font-size: 12px;
  text-transform: uppercase;
  line-height: 20px;
}
.structureshow {
	display:-webkit-box;
	display:-ms-flexbox;
	display:flex-box;
	display:flex;
	-webkit-box-align:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-box-pack:center;
	-ms-flex-pack:center;
	justify-content:center;
	text-align:center;
}
</style>

