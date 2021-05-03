<template>
  <div class="mainset">
    <el-row  class="boxcard" style="height:50px; padding:30px; padding-top:15px">
     
      <el-col :lg="4">
        姓名：{{information.name}}
      </el-col>
       <el-col :lg="4">
        工号：{{information.id}}
      </el-col>
      <el-col :lg="4" v-if="information.departmentId==101">
        所属机构：公安局
      </el-col>
       <el-col :lg="4" v-if="information.departmentId==102">
        所属机构： 检察院
      </el-col>
      <el-col :lg="4" v-if="information.departmentId==103">
         所属机构：法院
      </el-col>
       <el-col :lg="4" v-if="information.departmentId==104">
         所属机构：司法局
      </el-col>
    </el-row>
	   <panel-group  />
    <div class="cardcontainer">
       <el-row :gutter="32" >
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
          <div class="boxcard">
            <div id="main" style="height:100%;width: 100%;"></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32" >
       
        <el-col :xs="24" :sm="12" :lg="12" class="card-panel-col">
          <div class="boxcard">
            <div id="barchar" style="height:100%;width: 100%;"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12" class="card-panel-col">
          <div class="boxcard">
            <div id="linechar" style="height:100%;width: 100%;"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        
        <el-col style="height: 300px; background-color: #FFFFFF;">
          <div class="titlebox">
            <a
              target="_blank"
              href="http://123.207.23.242:5002/WeBASE-Front/?#/home"
            >
              <div class="title">
                <div class="p-title">区块链数据统计</div>
                <div class="p-date">(截至2020年12月29日)</div>
                <el-row>
                  <el-col span="8" class="colstyle">
                    <div class="p1"><span class="number">34765</span>件</div>
                    <div class="p2">累计上链文书</div>
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
var echarts = require("echarts");
import PanelGroup from "./PanelGroup";
//require('echarts/theme/macarons') // echarts theme
export default {
  components: {
    PanelGroup
  },
  data() {
    return {
      information:{
        name:'',
        id:'',
        departmentId:''
      }
    };
  },

  created() {
    this.information.name =  window.sessionStorage.getItem('name');
    this.information.id =  window.sessionStorage.getItem('id');
    this.information.departmentId =  window.sessionStorage.getItem('departmentId');
    console.log('this.information :>> ', this.information);
  },
  mounted() {
    this.useEchart();
  },
  methods: {
    useEchart() {
      //init
      var myChart1 = echarts.init(document.getElementById("barchar"));
      var myChart2 = echarts.init(document.getElementById("linechar"));
      var myChart3 = echarts.init(document.getElementById("main"));
      //option line
      let optionline = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: 20,
          data: ["警情", "刑事", "行政"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              show: true,
              type: ["stack", "tiled"]
            },
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "警情",
            type: "line",
            smooth: true,
            data: [10, 12, 21, 54, 260, 830, 710]
          },
          {
            name: "刑事",
            type: "line",
            smooth: true,
            data: [30, 182, 434, 791, 390, 30, 10]
          },
          {
            name: "行政",
            type: "line",
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
              type: ["pie", "funnel"]
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
            ["score", "amount", "product"],
            [89.3, 582, "美兰区"],
            [57.1, 782, "龙华区"],
            [74.4, 410, "琼山区"],
            [30.6, 1018, "秀英区"]
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
          name: ""
        },
        yAxis: {
          type: "category"
        },
        visualMap: {
          orient: "horizontal",
          left: "center",
          bottom: "20",
          min: 10,
          max: 100,
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#D7DA8B", "#E15457"]
          }
        },
        series: [
          {
            center: ["50%", "40%"],
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "数量",
              // Map the "product" column to Y axis
              y: "product"
            }
          }
        ]
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
              type: ["pie", "funnel"]
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
          trigger: "itme",
          formatter: "{a} <br/>{b}: {c} ({d}%)万人"
        },
        legend: {
          type: "scroll",
          left: "center",
          bottom: 20,
          data: ["流动人口", "常住人口", "特殊人群", "其他"]
        },
        series: [
          {
            name: "人口类型",
            type: "pie",
            radius: [10, 70],
            center: ["50%", "40%"],
            roseType: "radius",

            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              {
                value: 10,
                name: "流动人口"
              },
              {
                value: 12,
                name: "其他"
              },
              {
                value: 20,
                name: "特殊人群"
              },
              {
                value: 30,
                name: "常住人口"
              }
            ]
          }
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
};
</script>
<style scoped>
.mainset {
  height: 100%;
  padding: 32px;
  
}

.card-panel-col {
  margin-bottom: 28px;
}
.el-row {
	margin-bottom: 0px;
}



.cardcontainer {
  width: auto;
  margin: auto;

}

.boxcard {
  height: 300px;
  background-color: #ffffff;
  cursor: pointer;
}

.titlebox {
  padding: 30px;
  height: 100%;
  weight: 100%;
  cursor: pointer;
}

.title {
	padding: 20px;
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
.p2 {
  color: #666666;
}
.p1 {
  margin-top: 25px;
  margin-bottom: 10px;
}
</style>
