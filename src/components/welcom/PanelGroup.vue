<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper ">
          <i class="el-icon-s-order"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            案件总数
          </div>
          <div class="card-panel-num">{{countData.casesNumber}}</div>
          <!-- <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            证据总数
          </div>
           <div class="card-panel-num">{{countData.evidenceNumber}}</div>
          <!-- <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-s-check"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            刑事案件
          </div>
           <div class="card-panel-num">{{countData.casesNumberBy1}}</div>
          <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i
            class="el-icon-s-custom"
          ></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            行政案件
          </div>
              <div class="card-panel-num">{{countData.casesNumberBy0}}</div>
          <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // components: {
  //   CountTo
  // },
  data() {
    return {
      countData:{}
    }
  },
  created() {
    this.count();
  },
  methods: {
    async count(){
      const {data : res} = await this.$http.get('/api1/statistics/pick')
      console.log('res :>> ', res);
      this.countData = res.data

    },
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style scoped>
.panel-group {
  margin-top: 18px;
}
.card-panel-col {
  margin-bottom: 28px;
}

.card-panel {
  height: 130px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  display: flex;
}
.icon-people {
  color: #40c9c6;
}

.icon-message {
  color: #36a3f7;
}

.icon-money {
  color: #f4516c;
}

.icon-shopping {
  color: #34bfa3;
}

.card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  font-size: 55px;
}

.card-panel-icon {
  float: left;
  font-size: 48px;
  align-items: center;
}

.card-panel-description {
  float: right;
  font-weight: bold;
  margin-top: 26px;
  margin-left: 50px;
}
.card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}
.card-panel-num {
  font-size: 20px;
  margin-top: 20px;
}

.svg-icon {
  display: block;
  margin: 14px auto !important;
  float: none !important;
}
</style>
