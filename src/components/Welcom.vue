<template>
	<div class="mainset">
		<el-row class="elrow">
			<el-col>
				<el-carousel height="155px" :autoplay="false">
					<el-carousel-item>
						<img src="../assets/banner-1.jpg"  >
					</el-carousel-item>
					<el-carousel-item>
						<img src="../assets/banner2.jpg"  >
					</el-carousel-item	 >		
				</el-carousel>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-carousel height="60px" :autoplay="false" indicator-position="none">
					<el-carousel-item >
						<img src="../assets/biaoyu.jpg" />
					</el-carousel-item>
				</el-carousel>
			</el-col>
		</el-row>
		<div class="cardcontainer">
			<el-row gutter="20">
				 <el-col :span="8">
					 <el-card class="boxcard">
						 
					 </el-card>
				 </el-col>
				 <el-col :span="8">
				 				 <el-card class="boxcard">
				 					 
				 				 </el-card>
				 </el-col>
				 <el-col :span="8">
				 				 <el-card class="boxcard">
				 					 
				 				 </el-card>
				 </el-col>
			</el-row>
			<el-row gutter="20">
				 <el-col :span="8">
					 <el-card class="boxcard">
						 
					 </el-card>
				 </el-col>
				 <el-col :span="16">
				 				 <el-card class="boxcard">
				 					 
				 				 </el-card>
				 </el-col>
				
			</el-row>
		</div>
		
	</div>
	
		 

</template>
<style scoped>
	
	.el-row {
		margin-left: 0px;
		 margin-bottom: 20px;
		    &:last-child {
		      margin-bottom: 0;
		    }
	}

  
	 .el-carousel__item img {
	    height: 100%;
	    width: 100%;
	    position: relative;
	  }
	  .img {
		  height: 100%;
		  width: 100%;
		  position: absolute;
		  
	  }
	
	 .cardcontainer {
		 margin: 30px;
	 }
	 .boxcard {
	 		  height: 160px;
			  cursor:pointer
	 }
</style>