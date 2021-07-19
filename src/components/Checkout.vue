<template>
	<div class="mainbox">
		<div class="title">
			<h1>数据安全性校验</h1>
			<el-divider>Data security verification</el-divider>
			<p>打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链</p>
		</div>
		<div class="box">
			<el-tabs type="border-card">
				<el-tab-pane label="证据验证">
					<div class="formbox">
						<el-form label-position="left" :model="evidence" status-icon :rules="rules" ref="evidenceref" label-width="80px"
						 class="evidenceFrom">
							<el-form-item label="案件id" prop="caseId">
								<el-input v-model="evidence.caseId" autocomplete="off" placeholder="请输入案件id"></el-input>
							</el-form-item>
							<el-form-item label="存证编号" prop="evidenceId">
								<el-input v-model="evidence.evidenceId" autocomplete="off" placeholder="请输入存证编号"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm">提交</el-button>
								<el-button @click="resetForm">重置</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="文书验证">
					<div class="formbox">
						<el-upload class="upload-demo" ref="upload" action="https://192.168.43.31:8082/eveidence/postevidence" :on-preview="handlePreview"
						 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</div>
				</el-tab-pane>

			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				evidence: {
					caseId: '',
					evidenceId: ''
				},
				rules: {
					caseId: [{
						required: true,
						message: '请输入案件id',
						trigger: 'change'
					}],
					evidenceId: [{
						required: true,
						message: '请输入存证编号',
						trigger: 'change'
					}]
				},
				fileList: []

			}
		},
		methods: {
			submitForm() {
				this.$refs['evidenceref'].validate(valid => {
					if (!valid) return
					//
				});
			},
			resetForm() {
				this.$refs['evidenceref'].resetFields();
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		}
	}
</script>

<style>
	.mainbox {
		background: #FFFFFF;
		padding: 35px;
		border-radius: 10px;
		margin: 15px;
	}

	.title {
		text-align: center;
	}

	.title h1 {
		font-size: 25px;
		color: #2b7ec2;
		line-height: 10px;
	}

	.title p {
		font-size: 8px;
		color: #565656;
		line-height: 10px;

	}

	.el-divider__text {
		font-size: 12px;
		text-transform: uppercase;
		line-height: 20px;
	}

	.box {

		width: 60%;
		margin: 40px auto;
	}

	.formbox {
		padding: 20px;
	}
</style>
