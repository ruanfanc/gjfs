<template>
	<div class="mainbox">
		<el-table :data="nocheck" stripe style="width: 100%">

			<el-table-column prop="caseId" label="案件编号"></el-table-column>
			<el-table-column prop="caseName" label="案件名称"></el-table-column>
			<el-table-column prop="caseDecription" label="案情描述"></el-table-column>
			<el-table-column prop="time" label="创建时间"></el-table-column>
			<el-table-column prop="typeName" label="案件类型"></el-table-column>
			<el-table-column prop="staffId" label="负责人">
				<template slot-scope="{row}">
					<span v-if="row.staffId== '1001'">张志和</span>
					<span v-if="row.staffId== '1002'">谢燕</span>
					<span v-if="row.staffId== '1003'">王爱国</span>
					<span v-if="row.staffId== '1004'">李建国</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="150">
				<!-- eslint-disable -->
				<template slot-scope="{row}">
					<el-tooltip effect="dark" content="查看证据" placement="top" :enterable="false">
						<el-button type="primary" icon="el-icon-view" size="mini" @click="lookevidence(row.caseId)"></el-button>
					</el-tooltip>
					<el-tooltip effect="dark" content="上传证据" placement="top" :enterable="false">
						<el-button type="success" icon="el-icon-upload" size="mini" @click="dialogupload(row.caseId)"></el-button>
					</el-tooltip>
				</template>
			</el-table-column>
			<!-- <el-table-column label="审核" width="150">
		
					<el-button type="success" icon="el-icon-check" size="mini" @click="pass"></el-button>
					<el-button type="danger" icon="el-icon-warning" size="mini"></el-button>
		
				</el-table-column> -->
		</el-table>

		</el-tabs>

		<el-dialog title="证据链" :visible.sync="dialogVisible1" width="80%" :before-close="handleClose">
			<span>
				<el-table :data="evidence" stripe style="width: 100%">

					<el-table-column prop="evidenceId" label="存证编号"></el-table-column>
					<el-table-column prop="note" label="证物描述"></el-table-column>
					<el-table-column sortable prop="date" label="搜集时间"></el-table-column>
					<el-table-column label="操作" width="150">
						<!-- eslint-disable -->
						<template slot-scope="{row}">
							<el-tooltip effect="dark" content="查看证照" placement="top" :enterable="false">
								<el-button type="primary" icon="el-icon-view" size="mini" @click="lookevidenceinfo(row.evidenceId)"></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="openFullScreen1" type="success" v-loading.fullscreen.lock="fullscreenLoading">安全性检查</el-button>
				<el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="证据详情" :visible.sync="dialogVisibleinfo" width="80%" :before-close="handleClose">
			<img :src="imgurl" style="width: 50%;height: auto;" />
		</el-dialog>

		<!-- <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<span>
				是否将物证上传至区块链网络？
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取消</el-button>
				<el-button type="primary" @click="uploadevi">确 定</el-button>
			</span>
		</el-dialog> -->
		<el-dialog title="证据上传" :visible.sync="dialogVisible2" width="70%">
			<!-- 表单 -->
			<el-form ref="evidenceForm" :model="evidenceData" :rules="rulesevi" size="medium" label-width="100px" >
				<el-form-item label="案件编号" prop="caseId">
					<el-input v-model="evidenceData.caseId" disabled="true" clearable :style="{width: '100%'}">
					</el-input>
				</el-form-item>
				<el-form-item label="证据编号" prop="evidenceId">
					<el-input v-model="evidenceData.evidenceId" placeholder="请输入证据编号" clearable :style="{width: '100%'}">
					</el-input>
				</el-form-item>
				<el-form-item label="证据描述" prop="note">
					<el-input v-model="evidenceData.note" type="textarea" placeholder="请输入证据基本描述" :autosize="{minRows: 4, maxRows: 4}"
					 :style="{width: '100%'}"></el-input>
				</el-form-item>
				  <el-form-item label="可见部门" prop="DepartmentIds">
				    <el-checkbox-group v-model="evidenceData.DepartmentIds">
				      <el-checkbox v-for="(item, index) in DepartmentIdsOptions" :key="index" :label="item.value"
				                 :disabled="item.disabled">{{item.label}}</el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>
			
				<el-upload style="margin: 30px;" class="upload-demo" ref="upload" action="/api1/evidence/postevidence"
				 :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" name="evidenceUrl" :data="evidenceData"  list-type="picture" :on-success="handelsuccess">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					
				</el-upload>
			</el-form>
		</el-dialog>


	</div>
</template>

<script>
	export default {
		//inject: ['reload'],
		data() {
			return {
				fileList: [],
				fullscreenLoading: false,
				activeName: 'first',
				nocheck: [],
				evidence: [],
				dialogVisible1: false,
				dialogVisible2: false,
				dialogVisibleinfo: false,
				Id: 61232764,
				token: '',
				imgurl: '',
				evidenceData: {
					DepartmentIds: [101],
					evidenceId:undefined,
					caseId:'',
					token:'',
					note:''
				},
				 DepartmentIdsOptions: [{
				        "label": "公安局",
				        "value": 101
				      }, {
				        "label": "检察院",
				        "value": 102
				      },
					  {
					    "label": "法院",
					    "value": 103
					  },
					  {
					    "label": "司法局",
					    "value": 104
					  }],
				rulesevi: {
					evidenceId: [{
						required: true,
						message: '请输入证据编号',
						trigger: 'blur'
					}],
					note: [{
						required: true,
						message: '请输入证据基本描述',
						trigger: 'blur'
					}],
					DepartmentIds:[{
						type: 'array', required: true, message: '请至少选择一个可见部门', trigger: 'change'
					}]
				},


			}
		},
		created() {
			this.noCheck()
		},
		methods: {

			async noCheck() {
				this.token = window.sessionStorage.getItem('token')
				console.log(this.token)
				/* var formData = new FormData();
				formData.append("token",window.sessionStorage.getItem('token')); */
				const {
					data: res
				} = await this.$http.post('/api1/cases/getcase')
				if (res.code !== 0) return this.$message.error('获取数据失败！')
				this.nocheck = res.data
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			async openFullScreen1() {
				this.fullscreenLoading = true;
				setTimeout(() => {
					this.fullscreenLoading = false;
				}, 2000);
				const {
					data: res
				} = await this.$http.get('/api5/scc/insert/get/2')
				console.log(res)
				if (res.ok) return this.$message.success('比对成功！')
				return this.$message.error("证据描述被篡改！请联系管理员")
			},
			/* 查看证据弹窗 */
			async lookevidence(id) {
				console.log(id)
				this.dialogVisible1 = true
				const {
					data: res
				} = await this.$http.post('/api1/evidence/getevidence', {
					"token": this.token,
					"caseId": id				})
				console.log(res)
				this.evidence = res.data
			},
			/* 查看证据详情弹窗 */
			async lookevidenceinfo(id) {
				console.log(id)
				this.dialogVisible1 = false
				this.dialogVisibleinfo = true
				const {
					data: res
				} = await this.$http.get('/api1/evidence/getone/' + id)
				console.log(res)
				this.imgurl = 'data:image/jpeg;base64,' + res.data.evidenceUrl
			},
			/* 确定上传 */
			uploadevi() {
				this.dialogVisible2 = false
				this.$message.success("上传成功！")
			},
			/* 审核通过 */
			async pass() {
				this.$confirm('确认通过审核？', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消'
					})
					.then(async (action) => {
						if (action === 'confirm') {
							const {
								data: res
							} = await this.$http.post('/api3/basic/examine/success?id=61232764')
							this.noCheck();
						}
					})
					.catch(() => {

					});
			},
		/* 	handelEvi() {
				this.$refs['evidenceForm'].validate(async valid => {
					if (!valid) return
					// TODO 提交表单
					await this.$http.post('/api2/police/officePolice/PostEvidence', this.evidenceData)
					this.dialogVisible2 = false
					return this.$message.success('上传成功，等待大队长审核')
				})
			}, */
			dialogupload(caseId) {
				this.dialogVisible2 = true
				this.evidenceData.caseId = caseId
				this.evidenceData.token = window.sessionStorage.getItem('token')

			},
			submitUpload() {
				this.$refs.upload.submit();
				

			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handelsuccess(response){
				console.log(response)
				if(response.code == 0){
					this.dialogVisible2=false
					return this.$message.success("证据已上传至区块链！")
				}
				return this.$message.error("图片过大，请压缩后上传")
			}
		}
	}
</script>

<style>
	.text-item {
		padding: 15px;
		color: gray
	}

	.el-table {
		font-size: 10px;
	}
</style>
