<template>
	<el-container class="home-container">
		<!-- 头部 -->
	  <el-header>
		  <div>
			  <img src="" alt="" />
			  <span>公检法司管理系统</span>
		  </div>
		  <el-button type="info" @click="logout" size="mini" round>退出</el-button>
	  </el-header>
	  <!-- 主体-->
	  <el-container>
		  <!-- 侧边栏-->
	    <el-aside :width="isCollapse ? '64px' : '200px'">
			<div class="toggle-button" @click="toggleCollapse">|||</div>
			<!-- 菜单 -->
			  <el-menu
			      background-color="#333744"
			      text-color="#fff"
			      active-text-color="#ffd04b"
				  unique-opened
				  :collapse="isCollapse"
				  :collapse-transition="false"
				  router
				  :default-active="activePath">
				  <el-menu-item index="/home">
				    <i class="el-icon-s-home"></i>
				    <span slot="title">首页</span>
				  </el-menu-item>
			      <el-submenu index="2">
			        <template slot="title">
			          <i class="el-icon-menu"></i>
			          <span>工作台</span>
			        </template>
			        <el-menu-item-group>
						<el-menu-item index="2-2">待办任务</el-menu-item>
			            <el-menu-item index="/work" @click = "saveNavState('/work')" >接处警</el-menu-item>
						<el-menu-item index="2-4">案件办理</el-menu-item>
						<el-menu-item index="2-2">案件管理</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			     
			      <el-submenu index="3">
			        <template slot="title">
			          <i class="el-icon-search"></i>
			          <span>查询</span>
			        </template>
			        <el-menu-item-group>
			      		<el-menu-item index="/reporter">报警记录</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-menu-item index="4">
			        <i class="el-icon-setting"></i>
			        <span slot="title">导航四</span>
			      </el-menu-item>
			    </el-menu>
		</el-aside>
		<!-- 右侧主体 -->
	    <el-main>
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			isCollapse : false,
			activePath:'',
		}
	},
	created() {
		this.activePath = window.sessionStorage.getItem('activePath')
	},
	methods:{
		logout() {
			window.sessionStorage.clear();
			this.$router.push("/login");
		},
		//菜单折叠
		toggleCollapse() {
			this.isCollapse = !this.isCollapse
		},
		saveNavState(activePath) {
			window.sessionStorage.setItem('activePath',activePath)
			this.activePath = activePath
		}
	}
}
</script>

<style lang="less" scoped>
.el-header {
	background-color: #373d41;
	display: flex;
	justify-content: space-between;
	padding-left:0 ;
	align-items: center;
	color: #fff;
	font-size: 20px;
	> div {
		display: flex;
		align-items:center ;
		margin-left: 15px;
	}
}
.el-aside {
	background-color: #333744;
	.el-menu {
		border-right: none;
	}
}
.el-main {
	background-color: #eaedf1;
}
.toggle-button {
	background-color: #4A5064;
	font-size: 10px;
	line-height: 24px;
	color: #fff;
	text-align: center;
	letter-spacing: 0.2em;
	cursor:pointer;
}
.home-container {
	height: 100%;
}
</style>
