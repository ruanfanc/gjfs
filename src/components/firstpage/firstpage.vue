<template>
    <el-menu
      :default-active="'/first'"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      style="min-width: 1200px">
      <span style="position: absolute;left: 6%;padding-top: 20px;font-size: 20px;font-weight: bold">公检法司链上存证系统</span>

      <el-menu-item  v-for="(item,i) in navList" :key="i" :index="item.name" style="position: absolute;left: 40%" >
        {{ item.navItem }}
      </el-menu-item>
      <el-menu-item index="/login" style=" color: #222;float: right;">登陆</el-menu-item>
      <i class="el-icon-menu" style="float:left;font-size: 45px;color: #222;padding-top: 8px"></i>
    </el-menu>
</template>

<script>
  export default {
    name: 'firstpage',

    data () {
      return {
        navList: [
          {name: '/first', navItem: '首页'},
          {name: '/task', navItem: '系统介绍'},
          // {name: '/noright', navItem: '图书馆'},
          // {name: '/welcom', navItem: '个人中心'}
        // ]
        ],
        login:[{name: '/login', ItemName: '登录'}]
      }
    }
    // ,
    //  methods:{
    //     gotolink(){
 
    //       //点击跳转至上次浏览页面
    //      // this.$router.go(-1)
 
    //       //指定跳转地址
    //       this.$router.replace('/login')
    //     }
    //   }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>

