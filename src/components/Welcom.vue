<template>
		  <el-carousel height="155px" direction="vertical" :autoplay="false">
		    <el-carousel-item :key="1">
		      <img src="../assets/banner-1.jpg"  class="img">
		    </el-carousel-item>
		  </el-carousel>

</template>
<style>
	.img{
		width:auto;
		height:auto;
		max-width: 100%;
		
	}
	 .el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 200px;
	    margin: 0;
	  }
	  
	  .el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	  }
</style>