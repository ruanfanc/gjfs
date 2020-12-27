<template>
	<div class="mainbox">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>工作台</el-breadcrumb-item>
		  <el-breadcrumb-item>接处警</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片 -->
		<div  class="text-item" >接警民警</div>
		<el-card class="box-card">
			
		  <div>
		      <el-button type="primary"  @click="dialogVisible = true">接警登记</el-button>
					<el-button type="primary"  @click="dialogEvidence = true">证据上传</el-button>
		  </div>
		</el-card>
		<div  class="text-item" >大队长审核</div>
		<el-card class="box-card">
		  <div >
		      <el-button type="primary" disabled>受案登记表</el-button>
			  <el-button type="primary" disabled>基本案情表</el-button>
			  <el-button type="primary" disabled>笔录证据</el-button>
			  <el-button type="primary" disabled>侦查终结表</el-button>
			  <el-button type="primary" disabled>起诉报告书</el-button>
			  <el-button type="primary" disabled>传唤笔录表</el-button>
		  </div>
		</el-card>
		<!-- 接警表单对话框 -->
		<el-dialog title="接警登记表" :visible.sync="dialogVisible" width="70%">
		  <span>
			      <el-row :gutter="20">
			        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="84px"
			          label-position="left">
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
			              <el-time-picker v-model="formData.field109" format="HH:mm:ss" value-format="HH:mm:ss"
			                :picker-options='{"selectableRange":"00:00:00-23:59:59"}' :style="{width: '100%'}"
			                placeholder="请选择接警时间" clearable></el-time-picker>
			            </el-form-item>
			          </el-col>
			          <el-col :span="10">
			            <el-form-item label="报警方式" prop="field110">
			              <el-select v-model="formData.field110" placeholder="请选择报警方式" clearable :style="{width: '100%'}">
			                <el-option v-for="(item, index) in field110Options" :key="index" :label="item.label"
			                  :value="item.value" :disabled="item.disabled"></el-option>
			              </el-select>
			            </el-form-item>
			          </el-col>
			          <el-col :span="19">
			            <el-form-item label="报警人" prop="field111">
			              <el-input v-model="formData.field111" placeholder="请输入报警人" clearable :style="{width: '100%'}">
			              </el-input>
			            </el-form-item>
			          </el-col>
			          <el-col :span="19">
			            <el-form-item label="联系电话" prop="field112">
			              <el-input v-model="formData.field112" placeholder="请输入联系电话" clearable :style="{width: '100%'}">
			              </el-input>
			            </el-form-item>
			          </el-col>
			          <el-col :span="19">
			            <el-form-item label="单位或地址" prop="field113">
			              <el-input v-model="formData.field113" placeholder="请输入单位或地址" clearable :style="{width: '100%'}">
			              </el-input>
			            </el-form-item>
			          </el-col>
			          <el-col :span="19">
			            <el-form-item label="事发地点" prop="field114">
			              <el-input v-model="formData.field114" placeholder="请输入事发地点" clearable :style="{width: '100%'}">
			              </el-input>
			            </el-form-item>
			          </el-col>
			          <el-col :span="24">
			            <el-form-item label="情况概述" prop="field115">
			              <el-input v-model="formData.field115" type="textarea" placeholder="请输入情况概述"
			                :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
			            </el-form-item>
			          </el-col>
			          <el-col :span="14">
			            <el-form-item label="受伤人数" prop="field116">
			              <el-input-number v-model="formData.field116" placeholder="受伤人数"></el-input-number>
			            </el-form-item>
			          </el-col>
			          <el-col :span="14">
			            <el-form-item label="死亡人数" prop="field117">
			              <el-input-number v-model="formData.field117" placeholder="死亡人数"></el-input-number>
			            </el-form-item>
			          </el-col>
			          <el-col :span="24">
			            <el-form-item label="领导批示" prop="field118">
			              <el-input v-model="formData.field118" type="textarea" placeholder="请输入领导批示"
			                :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
			            </el-form-item>
			          </el-col>
			          <el-col :span="24">
			            <el-form-item label="" prop="field119">
			              <el-checkbox-group v-model="formData.field119" size="medium">
			                <el-checkbox v-for="(item, index) in field119Options" :key="index" :label="item.value"
			                  :disabled="item.disabled">{{item.label}}</el-checkbox>
			              </el-checkbox-group>
			            </el-form-item>
			          </el-col>
			          <el-col :span="10">
			            <el-form-item size="large">
			              <el-button type="primary" @click="submitForm">提交</el-button>
			              <el-button @click="resetForm">重置</el-button>
			            </el-form-item>
			          </el-col>
			        </el-form>
			      </el-row>
			 
		  </span>
		</el-dialog>
		<!-- 证据上传表单对话框 -->
		<el-dialog title="证据上传" :visible.sync="dialogEvidence" width="70%">
			<!-- 表单 -->
			<el-form ref="evidenceForm" :model="evidenceData" :rules="rulesevi" size="medium" label-width="100px">
			  <el-form-item label="证据类型" prop="evidenceType">
			    <el-input v-model="evidenceData.evidenceType" placeholder="请输入证据类型" clearable :style="{width: '100%'}">
			    </el-input>
			  </el-form-item>
			  <el-form-item label="证据描述" prop="evidenceDescription">
			    <el-input v-model="evidenceData.evidenceDescription" type="textarea" placeholder="请输入证据基本描述"
			      :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
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
				dialogVisible: false,
				dialogEvidence: false,
				formData: {
			        field105: undefined,
			        field108: undefined,
			        field109: null,
			        field110: undefined,
			        field111: undefined,
			        field112: undefined,
			        field113: undefined,
			        field114: undefined,
			        field115: undefined,
			        field116: 0,
			        field117: 0,
			        field118: undefined,
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
			        field110: [{
			          required: true,
			          message: '请选择报警方式',
			          trigger: 'change'
			        }],
			        field111: [{
			          required: true,
			          message: '请输入报警人',
			          trigger: 'blur'
			        }],
			        field112: [{
			          required: true,
			          message: '请输入联系电话',
			          trigger: 'blur'
			        }],
			        field113: [],
			        field114: [{
			          required: true,
			          message: '请输入事发地点',
			          trigger: 'blur'
			        }],
			        field115: [{
			          required: true,
			          message: '请输入情况概述',
			          trigger: 'blur'
			        }],
			        field116: [{
			          required: true,
			          message: '受伤人数',
			          trigger: 'blur'
			        }],
			        field117: [{
			          required: true,
			          message: '死亡人数',
			          trigger: 'blur'
			        }],
			        field118: [],
			        field119: [{
			          required: true,
			          type: 'array',
			          message: '请至少选择一个field119',
			          trigger: 'change'
			        }],
			      },
			      field110Options: [{
			        "label": "电话",
			        "value": "telephone"
			      }, {
			        "label": "短信",
			        "value": "text"
			      }, {
			        "label": "现场",
			        "value": "here"
			      }, {
			        "label": "其他",
			        "value": "other"
			      }],
			      field119Options: [{
			        "label": "立为刑事案件",
			        "value": 1
			      }, {
			        "label": "作治安案件查处",
			        "value": 2
			      }, {
			        "label": "调解处理",
			        "value": ""
			      }, {
			        "label": "其他",
			        "value": ""
			      }],
				  evidenceData: {
				      evidenceType: '',
				      evidenceDescription:'',
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
		handelEvi(){
			this.$refs['evidenceForm'].validate(async valid => {
			  if (!valid) return
			  // TODO 提交表单
			  await this.$http.post('/api2/police/officePolice/PostEvidence',this.evidenceData)
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

