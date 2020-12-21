<template>
	<el-container class="home-container">
		<!-- 头部 -->
	  <el-header>Header</el-header>
	  <!-- 主体-->
	  <el-container>
		  <!-- 侧边栏-->
	    <el-aside width="200px">Aside</el-aside>
		<!-- 右侧 -->
	    <el-main>Main</el-main>
	  </el-container>
	</el-container>
</template>

<script>
</script>

<style lang="less" scoped>
.el-header {
	background-color: #373d41;
}
.el-aside {
	background-color: #333744;
}
.el-main {
	background-color: #eaedf1;
}
.home-container {
	height: 100%;
}
</style>
