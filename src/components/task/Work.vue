<template>
	<div class="mainbox">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>工作台</el-breadcrumb-item>
			<el-breadcrumb-item>民警</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片 -->
		<div class="text-item">接警民警</div>
		<el-card class="box-card">

			<div>
				<el-button type="primary" @click="dialogVisible = true">接警登记</el-button>

			</div>
		</el-card>
		<div class="text-item">办案民警</div>
		<el-card class="box-card">
			<div>
				<el-row gutter="10">
					<el-button type="primary" @click="dialogAccepted = true">受案记录表</el-button>
					<el-button type="primary" @click="dialogDeposition = true">传唤笔录</el-button>
				</el-row>
			</div>
		</el-card>
		<el-card class="box-card">
			<el-row gutter="10">
				<el-button type="primary" @click="dialogDecisionOfCase = true">立案报告</el-button>
				<el-button type="primary" @click="dialogEvidence = true" >证据上传</el-button>
				<!-- <el-button type="info" @click="dialogDeposition = true">起诉报告</el-button> -->
				<el-button type="primary" @click="dialogArrest = true">逮捕报告</el-button>
				<el-button type="primary" @click="dialogWarrantForArrest = true">逮捕书</el-button>
		
				<el-button type="primary" @click="dialogDeposition = true">侦查终结</el-button>
			</el-row>
			<el-row gutter="10">
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-row gutter="10">
				<el-button type="primary" @click="dialogEnd = true">结案申请</el-button>
			</el-row>

		</el-card>
		<!-- 接警表单对话框 -->
		<el-dialog title="接警登记表" :visible.sync="dialogVisible" width="70%">
			<span>
				<el-row :gutter="20">
					<el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="84px" label-position="left">
						<el-col :span="14">
							<el-form-item label="接警民警" prop="field105">
								<el-input v-model="formData.field105" placeholder="请输入接警民警姓名" clearable :style="{width: '100%'}">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="工号" prop="field108">
								<el-input v-model="formData.field108" placeholder="请输入工号" clearable :style="{width: '100%'}">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="14">
							<el-form-item label="接警时间" prop="field109">
								<el-time-picker v-model="formData.field109" format="HH:mm:ss" value-format="HH:mm:ss" :picker-options='{"selectableRange":"00:00:00-23:59:59"}'
								 :style="{width: '100%'}" placeholder="请选择接警时间" clearable></el-time-picker>
							</el-form-item>
						</el-col>

						<el-col :span="19">
							<el-form-item label="报警人" prop="ReporterName">
								<el-input v-model="formData.ReporterName" placeholder="请输入报警人" clearable :style="{width: '100%'}">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="19">
							<el-form-item label="联系电话" prop="ReporterPhone">
								<el-input v-model="formData.ReporterPhone" placeholder="请输入联系电话" clearable :style="{width: '100%'}">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="19">
							<el-form-item label="单位或地址" prop="ReporterAddress">
								<el-input v-model="formData.ReporterAddress" placeholder="请输入单位或地址" clearable :style="{width: '100%'}">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="情况概述" prop="field115">
								<el-input v-model="formData.field115" type="textarea" placeholder="请输入情况概述" :autosize="{minRows: 4, maxRows: 4}"
								 :style="{width: '100%'}"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="24">
							<el-form-item label="案件类型" prop="field119">
								<el-radio-group v-model="formData.field119" size="medium">
									<el-radio v-for="(item, index) in field119Options" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item size="large">
								<el-button type="primary" @click="submitForm">提交</el-button>
								<el-button @click="resetForm">重置</el-button>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>

			</span>

		</el-dialog>
		<!-- 受案登记表 -->
		<el-dialog title="受案登记表" :visible.sync="dialogAccepted" width="70%"></el-dialog>
		<!-- 传唤笔录 -->
		<el-dialog title="传唤笔录表" :visible.sync="dialogDeposition" width="70%"></el-dialog>
		<!-- 证据上传表单对话框 -->
		<el-dialog title="证据上传" :visible.sync="dialogEvidence" width="70%">
			<!-- 表单 -->
			<el-form ref="evidenceForm" :model="evidenceData" :rules="rulesevi" size="medium" label-width="100px">
				<el-form-item label="证据类型" prop="evidenceType">
					<el-input v-model="evidenceData.evidenceType" placeholder="请输入证据类型" clearable :style="{width: '100%'}">
					</el-input>
				</el-form-item>
				<el-form-item label="证据描述" prop="evidenceDescription">
					<el-input v-model="evidenceData.evidenceDescription" type="textarea" placeholder="请输入证据基本描述" :autosize="{minRows: 4, maxRows: 4}"
					 :style="{width: '100%'}"></el-input>
				</el-form-item>
				<el-form-item label="案件单号" prop="acceptedCaseRegisterId">
					<el-input v-model="evidenceData.acceptedCaseRegisterId" placeholder="请输入对应案件单号" clearable :style="{width: '100%'}">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="closeevi">取消</el-button>
				<el-button type="primary" @click="handelEvi">确定</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		components: {},
		props: [],
		data() {
			return {
				//对话框隐藏
				dialogDeposition:false,
				dialogAccepted: false,
				dialogVisible: false,
				dialogEvidence: false,
				formData: {
					field105: undefined,
					field108: undefined,
					field109: null,
					ReporterName: "",
					ReporterPhone: undefined,
					ReporterAddress: undefined,

					field115: undefined,
					field119: [],
				},
				rules: {
					field105: [{
						required: true,
						message: '请输入接警民警姓名',
						trigger: 'blur'
					}],
					field108: [{
						required: true,
						message: '请输入工号',
						trigger: 'blur'
					}],
					field109: [{
						required: true,
						message: '请选择接警时间',
						trigger: 'change'
					}],
					ReporterName: [{
						required: true,
						message: '请输入报警人',
						trigger: 'blur'
					}],
					ReporterPhone: [{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					}],
					ReporterAddress: [],

					field115: [{
						required: true,
						message: '请输入情况概述',
						trigger: 'blur'
					}],
				},
				field119Options: [{
					"label": "立为刑事案件",
					"value": 1
				}, {
					"label": "作治安案件查处",
					"value": 2
				}, {
					"label": "调解处理",
					"value": "3"
				}, {
					"label": "其他",
					"value": "4"
				}],
				evidenceData: {
					evidenceType: '',
					evidenceDescription: '',
					acceptedCaseRegisterId: '',
				},
				rulesevi: {
					evidenceType: [{
						required: true,
						message: '请输入证据类型',
						trigger: 'blur'
					}],
					evidenceDescription: [{
						required: true,
						message: '请输入证据基本描述',
						trigger: 'blur'
					}],
					acceptedCaseRegisterId: [{
						required: true,
						message: '请输入对应案件单号',
						trigger: 'blur'
					}],
				},

			}
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			submitForm() {
				this.$refs['elForm'].validate(valid => {
					if (!valid) return
					// TODO 提交表单
				})
			},
			resetForm() {
				this.$refs['elForm'].resetFields()
			},
			handelEvi() {
				this.$refs['evidenceForm'].validate(async valid => {
					if (!valid) return
					// TODO 提交表单
					await this.$http.post('/api2/police/officePolice/PostEvidence', this.evidenceData)
					this.dialogEvidence = false
					return this.$message.success('上传成功，等待大队长审核')
				})
			}
		}
	}
</script>

<style>
	.text-item {
		padding: 15px;
		color: gray
	}

	.mainbox {
		padding: 20px;
	}
</style>
