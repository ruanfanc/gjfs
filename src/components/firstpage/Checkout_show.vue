<template>
	<div class="mainbox">
		<div class="title">
			<h1>案件进度查询</h1>
			<el-divider>Case progress inquiry</el-divider>
			<p>打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链</p>
		</div>
		<div class="box">
			<el-tabs type="border-card">
				<el-tab-pane label="案件进度查询">
					<div class="formbox">
						<el-form label-position="left" :model="evidence" status-icon :rules="rules" ref="evidenceref" label-width="80px"
						 class="evidenceFrom">
							<el-form-item label="案件id" prop="caseId">
								<el-input v-model="evidence.caseId" autocomplete="off" placeholder="请输入案件id"></el-input>
							</el-form-item>
							<!-- <el-form-item label="存证编号" prop="evidenceId">
								<el-input v-model="evidence.evidenceId" autocomplete="off" placeholder="请输入存证编号"></el-input>
							</el-form-item> -->
							<el-form-item>
								<el-button type="primary" @click="dialogTableVisible = true">提交

								</el-button>
									<el-dialog title="案件进度" :visible.sync="dialogTableVisible">
									<el-table :data="gridData">
										<el-table-column property="date" label="日期" width="150"></el-table-column>
										<el-table-column property="name" label="案件名称" width="200"></el-table-column>
										<el-table-column property="address" label="处理部门"></el-table-column>

										<el-table-column property="status" label="状态"></el-table-column>
									</el-table>
									</el-dialog>
								<el-button @click="resetForm">重置</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>
				<!-- <el-tab-pane label="文书验证">
					<div class="formbox">
						<el-upload class="upload-demo" ref="upload" action="https://192.168.43.31:8082/eveidence/postevidence" :on-preview="handlePreview"
						 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</div>
				</el-tab-pane> -->

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
				},
				fileList: [],
			gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,

			}
		},
		methods: {
			// submitForm() {
			// 	this.$refs['evidenceref'].validate(valid => {
			// 		if (!valid) return
			// 		//
			// 	});
			// },
			submitForm(){
				this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '案件流程', {
				dangerouslyUseHTMLString: true
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
