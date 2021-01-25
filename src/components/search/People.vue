<template>
	<div class="mainbox">
			<el-row>
				<el-col :span="20">
					<el-input placeholder="请输入警员工号" v-model="query" >
						<el-button slot="append" icon="el-icon-search" @click="searchPolice"></el-button>
					</el-input>
				</el-col>
			</el-row>

		
	</div>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		methods: {
			searchPolice() {
				this.$message.error('工号不存在')
			}
		}
	}
	
</script>

<style>
</style>
