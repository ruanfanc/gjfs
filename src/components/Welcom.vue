<template>
	<div class="mainset">
		<el-row class="elrow" :gutter="5">
			<el-col>
				<el-carousel  :autoplay="false" height="350px">
					<el-carousel-item>
						<img class="img1" src="../assets/banner4.jpg">
					</el-carousel-item>
					<el-carousel-item>
						<img src="../assets/banner-1.jpg">
						
					</el-carousel-item>
				</el-carousel>
			</el-col>
		</el-row>
		<!-- 	<el-row>
			<el-col>
				<el-carousel height="60px" :autoplay="false" indicator-position="none">
					<el-carousel-item >
						<img src="../assets/biaoyu.jpg" />
					</el-carousel-item>
				</el-carousel>
			</el-col>
		</el-row> -->
		<div class="cardcontainer">
			<el-row :gutter="10">
				<el-col :xs="24" :sm="8" :lg="8">
					<div class="boxcard">
						<div id="main" style="height:100%;width: 100%;"></div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="8" :lg="8">
					<div class="boxcard">
						<div id="barchar" style="height:100%;width: 100%;"></div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="8" :lg="8">
					<div class="boxcard">
						<div id="linechar" style="height:100%;width: 100%;"></div>
					</div>
				</el-col>

			</el-row>
			<el-row>
				<el-col style="height: 230px; background-color: #FFFFFF;">
					<div class="titlebox">
						<a  target="_blank" href="http://123.207.23.242:5002/WeBASE-Front/?#/home" >
						
						
						<div class="title">
							<div class="p-title">区块链数据统计</div>
							<div class="p-date">(截至2020年12月29日)</div>
							<el-row >
								<el-col span="8" class="colstyle">
									<div class="p1"><span class="number">34765</span>件</div>
									<div class="p2" >累计上链文书</div>
								</el-col>
								<el-col span="8">
									<div class="p1"><span class="number">587342</span>条</div>
									<div class="p2">累计上链物证</div>
								</el-col>
								<el-col span="8">
									<div class="p1"><span class="number">19834</span>G</div>
									<div class="p2">累计区块数据</div>
								</el-col>
							</el-row>
						</div>
						</a>
					</div>
				</el-col>
			</el-row>
		</div>

	</div>



</template>
<script>
	var echarts = require('echarts');
	//require('echarts/theme/macarons') // echarts theme
	export default {
		data() {
			return {};
		},
		
		created() {

		},
		mounted() {
			this.useEchart()
		},
		methods: {
			
			useEchart() {
				//init
				var myChart1 = echarts.init(document.getElementById('barchar'));
				var myChart2 = echarts.init(document.getElementById('linechar'));
				var myChart3 = echarts.init(document.getElementById('main'));
				//option line
				let optionline = {

					tooltip: {
						trigger: 'axis'
					},
					legend: {
						top: 20,
						data: ['警情', '刑事', '行政']
					},
					toolbox: {
						show: true,
						feature: {
							magicType: {
								show: true,
								type: ['stack', 'tiled']
							},
							saveAsImage: {
								show: true
							}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '警情',
							type: 'line',
							smooth: true,
							data: [10, 12, 21, 54, 260, 830, 710]
						},
						{
							name: '刑事',
							type: 'line',
							smooth: true,
							data: [30, 182, 434, 791, 390, 30, 10]
						},
						{
							name: '行政',
							type: 'line',
							smooth: true,
							data: [550, 880, 601, 234, 120, 90, 20]
						}
					]
				};

				//option bar
				let optionbar = {
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['pie', 'funnel']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					dataset: {
						source: [
							['score', 'amount', 'product'],
							[89.3, 582, '美兰区'],
							[57.1, 782, '龙华区'],
							[74.4, 410, '琼山区'],
							[30.6, 1018, '秀英区']
							/* 	[89.7, 201, 'Cocoa'],
								[68.1, 791, 'Tea'],
								[19.6, 918, 'Juice'],
								[10.6, 1018, 'Lemon'],
								[32.7, 201, 'Walnut'] */
						]
					},
					grid: {
						containLabel: true
					},
					xAxis: {
						name: ''
					},
					yAxis: {
						type: 'category'
					},
					visualMap: {
						orient: 'horizontal',
						left: 'center',
						bottom: '20',
						min: 10,
						max: 100,
						// Map the score column to color
						dimension: 0,
						inRange: {
							color: ['#D7DA8B', '#E15457']
						}
					},
					series: [{
						center: ['50%', '40%'],
						type: 'bar',
						encode: {
							// Map the "amount" column to X axis.
							x: '数量',
							// Map the "product" column to Y axis
							y: 'product'
						}
					}]
				};

				//option pie
				let option = {
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['pie', 'funnel']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},

					tooltip: {
						trigger: 'itme',
						formatter: '{a} <br/>{b}: {c} ({d}%)万人'
					},
					legend: {
						type: 'scroll',
						left: 'center',
						bottom: 20,
						data: ['流动人口', '常住人口', '特殊人群', '其他']
					},
					series: [{
							name: '人口类型',
							type: 'pie',
							radius: [10, 70],
							center: ['50%', '40%'],
							roseType: 'radius',

							emphasis: {
								label: {
									show: true
								}
							},
							data: [

								{
									value: 10,
									name: '流动人口'
								},
								{
									value: 12,
									name: '其他'
								},
								{
									value: 20,
									name: '特殊人群'
								},
								{
									value: 30,
									name: '常住人口'
								},

							]
						},
						/* {
						            name: '单位类型',
						            type: 'pie',
						            radius: [10, 40],
						            center: ['70%', '40%'],
						            roseType: 'area',
						            data: [
						                {value: 10, name: '重点单位'},
						                {value: 5, name:  '危爆行业'},
						                {value: 25, name: '娱乐场所'},
						                {value: 35, name: '其他'}
						            ]
						        } */
					]
				};

				//set
				myChart1.setOption(option);
				myChart2.setOption(optionbar);
				myChart3.setOption(optionline);
			}
		}
	}
</script>
<style scoped>
	.mainset {
		height: 100%;
		width: 100%;
	}
	.el-row {
		margin-left: 0px;
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}


	.img {
		height:100%;
		width: auto;
		position: relative;
	}

	.img1 {
		height: 100%;
		width: 100%;
		position: relative;
	}

		.cardcontainer {
			width: auto;
			margin: auto;
			padding: 0 15px;
		}

	.boxcard {
		height: 250px;
		background-color: #FFFFFF;
		cursor: pointer
	}

	.titlebox {
		padding: 30px;
		height: 100%;
		weight: 100%;
		cursor: pointer
	}

	.title {
		text-align: center;
		margin-bottom: 5px;
	}

	.p-title {
		font-size: 23px;
		font-weight: bold;
		line-height: 40px;
	}
	.colstyle {
		text-align: center;
	}
	.number {
		    color: #df951f;
		    font-size: 30px;
		    font-weight: bold;
		    margin-right: 5px;
	}
	.p2{
		color: #666666;
	}
	.p1 {
		margin-top: 25px;
		margin-bottom: 10px;
	}
</style>
