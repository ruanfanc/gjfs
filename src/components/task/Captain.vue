<template>
	<div class="mainbox">
	<el-tabs v-model="activeName" @tab-click="handleClick">
	    <el-tab-pane label="待审核" name="first">
			<div  class="text-item" >证据审核</div>
			<el-table :data="nocheck" stripe style="width: 100%" >
							
							<el-table-column sortable prop="writtenDecisionOfCaseFiling.acceptedCaseRegister.basicCondition.acceptedTime" label="案发时间"></el-table-column>
							<el-table-column sortable prop="writtenDecisionOfCaseFiling.acceptedCaseRegister.acceptedCaseRegister.acceptedCaseRegisterTime" label="结案时间"></el-table-column>
							<el-table-column prop="writtenDecisionOfCaseFiling.acceptedCaseRegister.basicCondition.caseRegisterDetails" label="案件概述" ></el-table-column>
							<el-table-column prop="writtenDecisionOfCaseFiling.acceptedCaseRegister.policemanInfo.policemanName" label="负责民警" ></el-table-column>
							<el-table-column label="操作" width="150" >
								<!-- eslint-disable -->
								<template slot-scope="scope">
									<el-tooltip  effect="dark" content="查看证据" placement="top" :enterable="false">
										<el-button type="primary" icon="el-icon-view" size="mini" @click="lookevidence"></el-button>
									</el-tooltip>
									<el-tooltip  effect="dark" content="证据上链" placement="top" :enterable="false">
										<el-button type="info" icon="el-icon-upload" size="mini" @click="dialogVisible2 = true"></el-button>
									</el-tooltip>
								</template>
									</el-table-column>
							<el-table-column label="审核" width="150">
							
								<!-- 审核按钮 -->
								<el-button type="success" icon="el-icon-check" size="mini"></el-button>
								<el-button type="danger" icon="el-icon-warning" size="mini"></el-button>	
							
							</el-table-column>
			 </el-table>
		</el-tab-pane>
	    <el-tab-pane label="待提交" name="second">配置管理</el-tab-pane>
	</el-tabs>
  
  <el-dialog
    title="证据链"
    :visible.sync="dialogVisible1"
    width="80%"
    :before-close="handleClose">
    <span>
		<el-table :data="evidence" stripe style="width: 100%" >
						
						<el-table-column prop="evidenceDescription" label="证据描述"></el-table-column>
						<el-table-column prop="evidenceType" label="证物类型"></el-table-column>
						<el-table-column  sortable prop="updateTime" label="搜集时间" ></el-table-column>
						
						
		 </el-table>
	</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="openFullScreen1" type="success"    v-loading.fullscreen.lock="fullscreenLoading">安全性检查</el-button>
      <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
    </span>
  </el-dialog>
  
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible2"
    width="30%"
    :before-close="handleClose">
    <span>
  		是否将物证上传至区块链网络？
  	</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取消</el-button>
      <el-button type="primary" @click="uploadevi">确 定</el-button>
    </span>
  </el-dialog>
  
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fullscreenLoading: false,
				activeName: 'first',
				nocheck: [],
				evidence:[],
				dialogVisible1: false,
				dialogVisible2: false,
				
			}
		},
		created() {
			this.noCheck()
		},
	methods: {	
		async noCheck(){
			const { data: res} = await this.$http.get('/api3/end/list/nocheck')
			if(res.code !== 0) return this.$message.error('获取未审核数据失败！')
			this.nocheck = res.data
	
			console.log(res)
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
				const { data: res} = await this.$http.get('/api5/scc/insert/get/2')
				console.log(res)
				if (res.ok) return this.$message.success('比对成功！') 
				return this.$message.error("证据描述被篡改！请联系管理员")
				 },
		/* 查看证据弹窗 */
		async lookevidence () {
			this.dialogVisible1 = true
			const { data: res} = await this.$http.get('/api4/evidence/getEvidence')
			this.evidence = res
				
		
	},
	/* 确定上传 */
		uploadevi () {
			this.dialogVisible2 = false
			this.$message.success("上传成功！")
	},
	}}
</script>

<style>
.text-item {
	padding: 15px;
	color: gray
	}
.el-table{
	font-size: 10px;
	}
</style>
