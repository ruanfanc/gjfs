<template>
	<div>
	<!-- 	<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>查询</el-breadcrumb-item>
		  <el-breadcrumb-item>报警记录</el-breadcrumb-item>
		</el-breadcrumb> -->
	
	<el-tabs v-model="activeName" @tab-click="handleClick">
		 <el-tab-pane label="报警人信息" name="first">
			 <el-row>
				<el-col :span="20">
					<el-input placeholder="请输入内容" >
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
			</el-row>
		<!-- 报警人记录表 -->
			 <el-table :data="reporterlist" stripe style="width: 100%">
				<el-table-column type="index" > </el-table-column>
				<el-table-column prop="reporterName" label="报警人姓名"></el-table-column>
				<el-table-column prop="reporterPhone" label="联系电话"></el-table-column>
				<el-table-column prop="reporterAddress" label="家庭或单位地址" ></el-table-column>
				<el-table-column label="操作" width="180">
					<!-- eslint-disable -->
					<template slot-scope="scope">
						<!-- 操作按钮 -->
						<el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
							<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
						</el-tooltip>
						<el-tooltip  effect="dark" content="预警" placement="top" :enterable="false">
							<el-button type="danger" icon="el-icon-message-solid" size="mini"></el-button>
						</el-tooltip>
						<el-tooltip  effect="dark" content="联系" placement="top" :enterable="false">
							<el-button type="warning" icon="el-icon-phone-outline"  size="mini"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			  </el-table>
			  <!-- 分页-->
			    <el-pagination
			         @size-change="handleSizeChange"
			         @current-change="handleCurrentChange"
			         :current-page="queryInfo.pagenum"
			         :page-sizes="[5, 15, 25, 50]"
			         :page-size="queryInfo.pagesize"
			         layout="total, sizes, prev, pager, next, jumper"
			         :total="totalreporter">
			       </el-pagination>
			  </el-tab-pane>
				 <el-tab-pane label="案件信息" name="second">
					 <el-row>
					 		<el-col :span="20">
					 			<el-input placeholder="请输入内容" >
					 				<el-button slot="append" icon="el-icon-search"></el-button>
					 			</el-input>
					 		</el-col>
					 	</el-row>
					 <!-- 案件记录表 -->
					 	 <el-table :data="recordlist" stripe style="width: 100%">
					 		<el-table-column type="index" > </el-table-column>
					 		<el-table-column prop="reportTime" label="报案时间"></el-table-column>
					 		<el-table-column prop="reportDescription" label="案情描述"></el-table-column>
					 		<el-table-column prop="policemanId" label="接警工号" ></el-table-column>
					 		<el-table-column label="操作" width="180">
					 			<!-- eslint-disable -->
					 			<template slot-scope="scope">
					 				<!-- 操作按钮 -->
					 				<el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
					 					<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
					 				</el-tooltip>
					 				<el-tooltip  effect="dark" content="预警" placement="top" :enterable="false">
					 					<el-button type="danger" icon="el-icon-message-solid" size="mini"></el-button>
					 				</el-tooltip>
					 				<el-tooltip  effect="dark" content="详情" placement="top" :enterable="false">
					 					<el-button type="warning" icon="el-icon-view"  size="mini"></el-button>
					 				</el-tooltip>
					 			</template>
					 		</el-table-column>
					 	  </el-table>
					 	  <!-- 分页-->
					 	    <el-pagination
					 	         @size-change="handleSizeChange"
					 	         @current-change="handleCurrentChange"
					 	         :current-page="queryInfo.pagenum"
					 	         :page-sizes="[5, 15, 25, 50]"
					 	         :page-size="queryInfo.pagesize"
					 	         layout="total, sizes, prev, pager, next, jumper"
					 	         :total="toltalrecord">
					 	       </el-pagination>
				 </el-tab-pane>
				
		 </el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo: {
					query:'',
					pagenum: 1,
					pagesize:5
				},
				//报警人
				reporterlist: [],
				//案件
				recordlist: [],
				
				totalreporter: 0,
				toltalrecord:0,
				activeName: 'first'
			}
	},
	created() {
		this.queryReporterList(),
		this.recordList()
	},
	methods: {
		async queryReporterList(){
			const { data: res} = await this.$http.get('/api1/queryReporterList')
			if(res.code !== 0) return this.$message.error('获取报警记录失败！')
			this.reporterlist = res.data
			this.totalreporter = res.data.length
			console.log(res)
		},
		async recordList(){
			const { data: res} = await this.$http.get('/api1/queryReportRecordList')
			if(res.code !== 0) return this.$message.error('获取报警记录失败！')
			this.recordlist = res.reportRecords
			this.toltalrecord = res.reportRecords.length
		
			console.log(res)
		},
		handleClick(tab, event) {
		        console.log(tab, event)
		      },
		/* 每页条数监听 */
		handleSizeChange(newSize){
			console.log(newSize)
		},
		/* 页码数监听 */
		handleCurrentChange(newPage){
			
		}
	},
	}
</script>

<style>
	.el-row{
		 margin-bottom: 20px;
		 margin-left: 5px;
	}
	.el-table{
		font-size: 12px;
	}
</style>
