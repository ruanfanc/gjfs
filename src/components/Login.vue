<template>
	<div class = "login_container">
		<!-- 登陆组件 -->
		<div class="login_box">
			<!-- 头像 -->
			<div class="avater_box">
				<img src="../assets/logo.png">
			</div>
			<!-- 登录表单 -->
			<el-form :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
				</el-form-item>
				<el-form-item class="btns" >
					<el-button type="primary">登录</el-button>
					<el-button type="info">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username:'',
					password:''
				},
				//验证规则
				loginFormRules: {
				username: [
					{ required: true, message:"请输入用户名", trigger: "blur"}
				],
				password: [
					{ required: true, message:"请输入密码", trigger: "blur"}
				]
			}
		}
	}
}
</script>
<!--  -->
<style lang="less" scoped>
	.login_container {
		background-color: #2b4b6b;
		height: 100%;
	}
	.login_box{
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		.avater_box{
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
			background-color: #fff;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}
	.login_form{
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
	.btns {
		display: flex;
		justify-content: flex-end;
	}
</style>
