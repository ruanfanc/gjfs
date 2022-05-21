<template>
  <el-container >
    <!-- menu part -->
    <el-header >
        <firstmenu id="firstmenu">
      <el-menu :default-active="'/first'" router mode="horizontal" background-color="white" text-color="#222" active-text-color="red" >
              <!-- style="min-width: 1200px" -->
        <el-menu-item style=" position: absolute; left: 6%;  font-size: 20px; font-weight: bold; z-index=99999 color:rgba(255,255,255,1);" @click="gotolink" >
          公检法司链上存证系统 </el-menu-item>

        <el-menu-item v-for="(Item, i) in navList" :key="i"  :style="Item.sstyle" :getindex = "Item.posid" >
          <a v-bind:href= "Item.posid"  @click="jumpto(Item.posid)">{{Item.navItem}}</a>
        </el-menu-item>
      <!-- 锚点的菜单 -->


        <!-- 登录网页的跳转 -->
        <el-menu-item index="/login" style="color: #222; float: right">
        登录
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
        <div class="clear"></div>
        <div class="picture" id= "#part0" >
          <v-showall class="lunbo"></v-showall>
                    <!-- <p class="pictures_show" > -->

          <!-- <img 
            src="https://img.alicdn.com/tfs/TB15AKxo7L0gK0jSZFAXXcA9pXa-1920-800.jpg" 
          /> -->
          <!-- <img src="./show2.png" alt="">
          </p> -->
        </div>
        <!-- 介绍 -->
        <div class="clear"></div>
        <div class="cardbox" id= "#part1">
          <div class="title">
            <h1>区块链存证系统介绍</h1>
            <el-divider>BLOCKCHAIN STORAGE SYSTEM INTRODUCTION</el-divider>
            <p>
              打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链
            </p>
          </div>
          <!-- <div class="intro_table"> -->

            <div class="pic">
              <img
              src="./main1.png"
            />
            </div>

          <!-- </div> -->
          <div class="Introduce">
            <p>
            公检法司链上存证系统是将数据采集，数据上链，智能合约，数据安全性查询与区块验证等功能相结合的公检法司存证系统。本项目针对案件处理过程中产生的数据易篡改、管理成本高，以及各个部门之间缺乏协同导致信息孤岛等问题展开研究。开展公检法司链上存证关键技术的科技攻关，研发基于区块链的公检法司存证系统。通过公检法司各机构共同搭建联盟链体系，由各机构下的各个部门作为节点共同维护该联盟区块链网络，各节点分布式存储区块链完整信息，通过共识机制，实现各节点之间信息的同步共享，打破公检法司之间存在的“信息孤岛”问题，提高多方协作效率。并将案件信息提取关键内容并转化成结构化数据，通过调用事先部署的存证智能合约实现数据上链，通过Merkle树和区块链表两种哈希结构保证数据不可篡改。此外，通过在每个区块中添加案件进度信息，以供公众查询，进一步提高司法公信度。
            </p>
          </div>

           <!-- 这是icon盒子 -->
          <div >            
        <div class="page-index-contentTwo-width">
          <div  v-for="(item,id) in icon" :key="id" >
            <img :src="item.url" style="width: 100px ;height: 100px" ><p>{{item.txt}}</p></div>


          </div>
        </div>

          <!-- 操作的介绍 -->
          <div class="actionShow" >
            <div v-for="(item,id) in sysinfo" :key="id">
              <div v-if="item.setcolor =='1'">
                <div class="blackcolor">
                  <div class="blackpicshow">
                    <img :src="item.url" alt="">
                  </div>
                  <div class="syscontent">
                    <div class="systitle">{{item.txt}}</div>
                    <div class="sysmessage">{{item.message}}</div>
                  </div>
                </div>

              </div>
              <div v-else>
                <div class="whitecolor">
                    <div class="syscontent2">
                    <div class="systitle2">{{item.txt}}</div>
                    <div class="sysmessage2">{{item.message}}</div>
                  </div>
                  <div class="whpicshow2">
                    <img :src="item.url" alt="">
                  </div>

                </div>
              </div>
              
              </div>
          </div>

          <!-- 页面布局介绍测试 -->
                                  <!-- <div class="test">
              <img
              src="./main1.png"
            />
            </div> -->

        </div>
        <el-divider></el-divider>
        <!-- <br> </br> -->
        <div>
          <br/>
            <br/>
          </div>
          <div class="clear"></div>
        <div class="structure" id="#part2">
          <div class="title">
            <h1>系统框架介绍</h1>
            <el-divider>BLOCKCHAIN STORAGE SYSTEM SYSTEM FRAMEWORK INTRODUCTION</el-divider>
            <p>
              打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链
            </p>
          </div>
          
          <!-- 框架图片 -->
          <div class="clear"></div>
          <div >
            <div class="structureshow">
              <img src="./strc1.png" alt="框架流程图" title="架构图" style="position: center;border: 0;vertical-align: middle;"     >
            </div>
          <div>
            
             <!-- <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper ">
          <i class="el-icon-s-order"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            案件总数
          </div>
          <div class="card-panel-num">1</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            证据总数
          </div>
           <div class="card-panel-num">2</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-s-check"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            刑事案件
          </div>
           <div class="card-panel-num">3</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i
            class="el-icon-s-custom"
          ></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            行政案件
          </div>
              <div class="card-panel-num">4</div>
        </div>
      </div>
    </el-col>
  </el-row>
   -->
          </div>
          </div>


        </div>
        <!-- 实时展示 -->
        <div class="clear"></div>
        <!-- <public id="#part3"> </public> -->

        <div ></div>
        <!-- <Progressview id="#part3-1"> </Progressview> -->
        <progressview id="#part4"></progressview>
        <el-divider></el-divider>

              <!-- <div>
  				<el-steps :active="1" simple>
  <el-step title="步骤 1" icon="el-icon-edit"></el-step>
  <el-step title="步骤 2" icon="el-icon-upload"></el-step>
  <el-step title="步骤 3" icon="el-icon-picture"></el-step>
</el-steps>
</div> -->
      </div>
    </el-main>

<!-- 底部设计 -->
    <el-bottom class="foot">
      <div class="bottom-box">
                              <el-divider>                  
                </el-divider>

        <!-- 前面两个设计 -->
        <div class="bottom-part1">
          <div v-for="(item,i) in bottombox.slice(0,bottombox.length-1)" :key="i" >
            <!-- {{item.boxname}} -->
              <!-- <ul> -->
              <div class="itemboxname">
                <a v-for="(index,j) in item.boxindex" :key="j" :class="hengpailie">
                <!-- <a  v-bind: href= "index.indexurl"  > -->
                  <a v-bind:href= "index.indexurl" >
                  <template v-if="j < item.boxindex.length-1">                    
                    <!-- {{index.indexname}} | -->
                    {{index.indexname}}
                  </template>
                 <template v-if="j == item.boxindex.length-1">
                      {{index.indexname}} 
                  </template>

                  </a>
                </a>
                <el-divider>                  
                </el-divider>
              </div>
              <!-- </ul> -->
          </div>
        </div>
        <!--  版权信息设计 -->
        <div class="bottom-part1">
          <div v-for="(item,i) in bottombox.slice(bottombox.length-1,bottombox.length)" :key="i" >
            <!-- {{item.boxname}} -->
              <ul>
              <div class="itemboxname">
                <p v-for="(index,j) in item.boxindex" :key="j" :class="hengpailie">
                  {{index.indexname}}:{{index.indexurl}}
                </p>
                <!-- <p>666</p> -->
              </div>
              </ul>
          </div>
        </div>

      </div>
      <!-- 底部留白 -->
                      <el-divider>                  
                </el-divider>
      <div>
           
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
        <div class="clear"></div>

  </el-container>
</template>


<script>
import Public from "./publicity_show.vue";
// import HomeSwiper from './swiper/HomeSwiper'
import BackToTop from 'vue-backtotop';
import ShowAll from "./test2.vue";
import Progressview from "./Checkout_show.vue";

export default {
  name: "firstpage",

  data() {
    return {

      sysinfo:[
         {setcolor: "1",url:require("../firstpage/system_introduce/精致设计.png") , txt:"精致设计", message:"在浏览器中，支持将数据动态可视化处理。使用图表来总结复杂的数据，可以确保对关系的理解要比那些混乱的报告或电子表格更快。这提供了一种非常清晰的沟通方式，使业务领导者能够更快地理解和处理他们的信息。大数据可视化工具可以提供实时信息，使公检法司更容易对取证的情况进行评估。"},
         {setcolor: "0",url:require("../firstpage/system_introduce/便捷管理.png") , txt:"便捷管理", message:"支持查看上传记录，重复使用更方便。支持点击图片大图查看。支持删除图片（仅本地记录），界面干净。"},
         {setcolor: "1",url:require("../firstpage/system_introduce/简单上链.png") , txt:"简单上链", message:"可以上链实现区块链存证等内容，为了彻底解决上链前数据真假的问题，在数据上链过程中，区块链机不仅会用时间戳记录数据产生时间，同时采用GPS/北斗定位芯片，即位置信息，来记录数据产生服务器所在的经纬度，即同时在时空两个维度证明上链前后数据的真实性。" },
         {setcolor: "0",url:require("../firstpage/system_introduce/安全验证.png") , txt:"安全验证", message:"对安全存储的上链数据进行查询验证操作，系统中的查询用户分为两种，一种是公检法司的人员，一种是社会公众。其中，对于公众的查询，由上传者在本环节所有上链数据收集完成之后，对外界公开业务进度等明文信息，并将敏感数据与公开数据的分离，保证了系统的安全性。"},
      ],
      icon:[
        {url:require("../firstpage/icons/存储.png") ,txt:"安全存储"},
        {url:require("../firstpage/icons/分布式.png") ,txt:"分布式存储" },
        {url:require("../firstpage/icons/规章制度.png") ,txt:"链上存储" },
        {url: require("../firstpage/icons/科学技术.png") ,txt:"安全区块" },
        {url: require("../firstpage/icons/联盟链.png") ,txt:"分布节点" },
        {url: require("../firstpage/icons/全球跨境.png") ,txt:"全球跨境"},
        {url: require("../firstpage/icons/稳定可靠.png") ,txt:"稳定可靠"},
        {url: require("../firstpage/icons/业务流程.png") ,txt:"业务简化"},
        {url: require("../firstpage/icons/真实可信.png") ,txt:"真实可信"},
        {url: require("../firstpage/icons/智能合约.png") ,txt:"智能合约"},

      ],
      navList: [
        {
          name: "/first",
          navItem: "首页",
          sstyle: "position: absolute;left: 67%;",
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
        // {
        //   name: "/task",
        //   navItem: "实时公示",
        //   sstyle: "position: absolute;left: 81%;",
        //   posid: "#part3",
        // },
        {
          name: "/task",
          navItem: "案件进度",
          sstyle: "position: absolute;left: 88%;",
          posid: "#part4",
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
            { "indexname":"地址","indexurl":"海南省海口市美兰区人民大道58号　邮编：570228   " },
            {"indexname":"联系方式", "indexurl":"电话：0898-66259127 传真：0898-66259127"},
            {"indexname":"版权信息","indexurl":"Copyright(c)2020-2021公检法司链上存证系统"},
            // {"indexname":" ","indexurl":" "}
          ]
        },


      ],

      // slides:[
      //   {
      //     src:require('../firstpage/show1.png'),
      //     title:"show1",
      //     href:'detail/****'
      //   },
      //   {
      //     src:require('../firstpage/show2.png'),
      //     title:"show2",
      //     href:'detail/###'
      //   },
      //   {
      //     src:require('../firstpage/show1.png'),
      //     title:"show3",
      //     href:'detail/###'
      //   }
      // ]

    };
  },

  // 引入组件
  components: {
    Public,
    BackToTop,
    'v-showall': ShowAll,
    Progressview ,
     },

  methods:{
    jumpto(index){
      document.getElementById(index).scrollIntoView(true);
    },

     gotolink(){
        this.$router.replace('/login')
      },

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
.box {
  position: relative;
  height: 80px;
  width: 100%;
  z-index: 999;
}
/* // 监听到滚动条开始滚动后的样式 */
.box-active {
  position: fixed;
  top: 0;
}
.itemboxname a {
  margin: 0 8px;
  /* color: #0f1a25; */
  color: #fefefe;
}
.itemboxname p {
  position: relative;
  margin: 0 8px;
  /* color: #0f1a25; */
  color: #fefefe;
}
.picture {
  display: flex;
  justify-content: center;
}

/* picture {
  width: 1200px;
  height: auto;
  
element.style {
    background: url(images/banner.jpg) center top no-repeat;
    
    width: 1280px;
} */
.pic {
  width: 30%;
  height: auto;
  float: left;
  margin-top: 12px;
}
.intro_table {
  width: 1260px;
  margin: 0 auto;
  height: auto;
}
.pictures_show {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pictures_show img {
  width: 100%;
}

.Introduce p {
  margin-top: 12px;
  text-indent: 32px;
  color: #333333;
  font-size: 14px;
  text-align: left;
}
.Introduce {
  width: 64%;
  float: right;
  font-size: 16px;
  line-height: 30px;
  padding: 20px 0;
}
juzhong {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.btn-to-top {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
}
.bottom-part1 {
  /* display: flex;
  display: -webkit-flex; */
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hengpailie {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fefefe;
}
.el-divider__text {
  font-size: 12px;
  text-transform: uppercase;
  line-height: 20px;
}
.structureshow {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex-box;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
}
.clear {
  overflow: hidden;
  clear: both;
  height: 0px;
}
.foot {
  width: 100%;
  height: auto;
  background-color: #292e33;
}

/* 介绍的4个图标 */
.panel-group {
  margin-top: 18px;
}
.card-panel-col {
  margin-bottom: 28px;
}

.card-panel {
  height: 130px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  display: flex;
}
.icon-people {
  color: #40c9c6;
}

.icon-message {
  color: #36a3f7;
}

.icon-money {
  color: #f4516c;
}

.icon-shopping {
  color: #34bfa3;
}

.card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  font-size: 55px;
}

.card-panel-icon {
  float: left;
  font-size: 48px;
  align-items: center;
}

.card-panel-description {
  float: right;
  font-weight: bold;
  margin-top: 26px;
  margin-left: 50px;
}
.card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}
.card-panel-num {
  font-size: 20px;
  margin-top: 20px;
}

.svg-icon {
  display: block;
  margin: 14px auto !important;
  float: none !important;
}
.test {
  width: 200px;
  height: 200px;
  /* height: auto;
    width: auto; */
  /* background: orange; */
  transition: all 0.4s;
  -moz-transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  /* background: url('./main1.png'); */
  background-repeat: no-repeat; /* 不会重复 */
  background-position: center; /* 是为了让图片放大的时候从中部放大，不会偏移 */
  background-size: 100% 100%;
}
.test:hover {
  /* background-size: 110% 110%; */
  transform: scale(1.05);
}
.page-index-contentTwo-width div:hover {
  transform: scale(1.05);
}
.page-index-contentTwo-width {
  display: flex;
  width: 1200px;
  margin: 0 auto;
}
.page-index-contentTwo-width div {
  display: flex;
  width: 17%;
  /* height: 240px; */
  height: auto;
  margin: 10px;
  text-align: center;
  display: inline-block;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 20%);
}
.page-index-contentTwo {
  width: 100%;
  min-width: 1200px;
  padding: 48px 0 54px;
  background: #f6f6f6;
}

.blackcolor {
  display: flex;
  padding: 48px;
  text-align: left;
  background: #2e2e2e;
  overflow: hidden;
}

.blackpicshow {
  /* display: flex; */
  float: left;
  width: 58.333333333333332%;
  margin-right: 8.333333333333332%;
}
.blackpicshow img {
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.blackpicshow img:hover {
  transform: scale(1.1);
}
.syscontent {
  float: left;
  width: 41.666666666666664%;
  padding-top: 120px;
  margin-left: 10px;
}
.systitle {
  color: #4ba2e2;
  font-size: 50px;
}
.sysmessage {
  color: #fff;
  margin-top: 20px;
}

/* 白底介绍 */

.whitecolor {
  display: flex;
  padding: 48px;
  text-align: left;
  background: #fff;
  overflow: hidden;
}

.whpicshow2 {
  /* display: flex; */
  float: left;
  width: 58.333333333333332%;
  margin-left: 8.333333333333332%;
}
.whpicshow2 img {
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.whpicshow2 img:hover {
  transform: scale(1.1);
}
.syscontent2 {
  float: left;
  width: 41.666666666666664%;
  padding-top: 120px;
  margin-right: 10px;
}
.systitle2 {
  color: #4ba2e2;
  font-size: 50px;
}
.sysmessage2 {
  color: #2e2e2e;
  margin-top: 20px;
}
</style>