<template>
	<el-container class="home-container">
		<!-- 头部 -->
		<el-header>
			<div style="width: 450px;">
				<img src="" alt="" />
				<span class="title">存证系统演示</span>
			</div>
			<el-menu mode="horizontal" background-color=" #fff" text-color="#666666" active-text-color="#003366" unique-opened
			 :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
				<el-menu-item index="/welcome">
					<i class="el-icon-s-home"></i>
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>工作台</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/case" @click="saveNavState('/case')">
							<i class="el-icon-s-help"></i>案件
						</el-menu-item>
						<el-menu-item index="/work" @click="saveNavState('/work')">
							<i class="el-icon-user-solid"></i>民警
						</el-menu-item>
						<!-- <el-menu-item index="/captain" @click="saveNavState('/captain')">
							<i class="el-icon-user-solid"></i>大队长
						</el-menu-item>
						<el-menu-item index="/bigcaptain" @click="saveNavState('/bigcaptain')">
							<i class="el-icon-user-solid"></i>法制大队
						</el-menu-item> -->
						<el-menu-item index="/leader" @click="saveNavState('/leader')">
							<i class="el-icon-user-solid"></i>领导审核
						</el-menu-item>
				<!-- 		<el-menu-item index="/reporter">报警记录</el-menu-item>
						<el-menu-item index="/people">警员信息</el-menu-item> -->
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="/checkout">
					<i class="el-icon-document-checked"></i>
					<span>在线验证</span>
				</el-menu-item>
				<el-menu-item index="/publicity">
					<i class="el-icon-view"></i>
					<span slot="title">实时公示</span>
				</el-menu-item>
			</el-menu>

			<el-button type="info" @click="logout" size="mini" round>退出</el-button>
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
				activePath: '',
			}
		},
		created() {
		//	this.activePath = window.sessionStorage.getItem('activePath')
		},
		methods: {
			async logout() {
				window.sessionStorage.clear();
			        const {data: res1} = await this.$http.get('/api1/login/logout')
			        console.log(res1);
							this.$router.push("/login");
			},
			//菜单折叠
			toggleCollapse() {
				this.isCollapse = !this.isCollapse
			},
			saveNavState(activePath) {
				window.sessionStorage.setItem('activePath', activePath)
				this.activePath = activePath
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
		font-size: 22px;
		font-weight: 700;
	}

	.title {
		margin-left: 20px;
	}


	.el-main {
		background-color: #eaedf1;
		padding: 0px;

		.el-menu {
			font-size: 16px;
			font-weight: 700;
		}
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
</style>
