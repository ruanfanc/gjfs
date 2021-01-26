<template>
	<div class="mainbox">
		<el-tabs v-model="leaderName" @tab-click="leaderClick">
			<el-tab-pane label="待审核" name="leader1">
				<div class="text-item">案件审核</div>
				<el-table :data="nocheck" stripe style="width: 100%">
				
					<el-table-column sortable prop="basicCondition.acceptedTime" label="案发时间"></el-table-column>
					<el-table-column prop="basicCondition.caseRegisterDetails" label="案件概述"></el-table-column>
					<el-table-column prop="policeman.policemanName" label="负责民警"></el-table-column>
					<el-table-column prop="basicCondition.examineStatus" label="处理状态"></el-table-column>
					<el-table-column label="操作" width="150">
						<!-- eslint-disable -->
						<template slot-scope="scope">
							<el-tooltip effect="dark" content="查看案件文书" placement="top" :enterable="false">
								<el-button type="primary" icon="el-icon-view" size="mini" @click="lookevidence"></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column label="审核" width="150">
				
						<!-- 审核按钮 -->
						<el-button type="success" icon="el-icon-check" size="mini" @click="pass"></el-button>
						<el-button type="danger" icon="el-icon-warning" size="mini"></el-button>
				
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="待提交" name="leader2">配置管理</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leaderName: 'leader1',
				nocheck: [],
			}
			
		},
		created() {
			this.noCheck()
		},
		methods: {
			leaderClick(tab, event) {
				console.log(tab, event);
			},
			async noCheck() {
				const {
					data: res
				} = await this.$http.get('/api1/examine/fazhidadui/acceptedCaseRegister/listNoCheck')
				console.log(res)
				if (res.code !== 0) return this.$message.error('获取未审核数据失败！')
				this.nocheck = res.data
			},
		},
	}
</script>

<style>
</style>
