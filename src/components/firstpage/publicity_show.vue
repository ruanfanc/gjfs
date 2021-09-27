<template>
  <div class="mainbox">
    <div class="cardbox">
      <div class="title">
        <h1>上链数据实时公示</h1>
        <el-divider>Blockchain Real time publicity</el-divider>
        <p>打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链</p>
      </div>

      <div class="gezi">
        <h3 style="color: #4f8fc3;line-height: 30px; padding-bottom: 10px;">
          累计数据统计
        </h3>
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="gezitext">链上证据数</div>
          </el-col>
          <el-col :span="6">
            <div class="gezitext">链上文书数</div>
          </el-col>
          <el-col :span="6">
            <div class="gezitext">在线证据验证数</div>
          </el-col>
          <el-col :span="6">
            <div class="gezitext">在线文书验证数</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="grid-content">1002</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">860</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">407</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">303</div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div class="tablebox">
        <h3 style="color: #4f8fc3;line-height: 30px;">实时数据统计</h3>
        <div class="tableone">
          <el-table :data="tableData" style="width: 100%" max-height="250" v-fit-columns>
            <el-table-column 
              fixed
              prop="blockNumber"
              label="区块高度"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="transactionNum" label="存证数" width="80">
            </el-table-column>
            <el-table-column prop="dataHash" label="区块HASH" width="500">
            </el-table-column>
            <el-table-column prop="createTime" label="时间" width="200">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
import Vue from 'vue';
import Plugin from 'v-fit-columns';
Vue.use(Plugin);
<script>
export default {
  created() {
	  this.getMessData();
  },
  mounted() {
    this.getTableData();
    this.timer = window.setInterval(() => {
      setTimeout(() => {
        this.getTableData();
      }, 0);
    }, 2000);
  },
  methods: {
    async getMessData() {
      const { data: res } = await this.$http.post("/api1/message/getList", {
        end: -1,
        start: 1
      });
	  this.messageData = res.data
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    async getTableData() {
      const { data: res } = await this.$http.get(
        "/api7/tpl/cross_origin.php?interface=getTopNBlockInfo&protocol=CORS"
      );
      console.log(res);
      this.tableData = res.data;
    }
  },
  data() {
    return {
      tableData: [],
      messageData: []
    };
  },
  destroyed() {
    window.clearInterval(this.timer);
  }
};
</script>

<style scoped>
.mainbox {
  padding: 15px;
  width: auto;
}

.cardbox {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

.title {
  text-align: center;
}

.title h1 {
  font-size: 25px;
  color: #2b7ec2;
  line-height: 10px;
}

.title p {
  font-size: 8px;
  color: #565656;
  line-height: 10px;
}

.el-divider__text {
  font-size: 12px;
  text-transform: uppercase;
  line-height: 20px;
}

.gezi {
  padding: 25px;
}

.gezitext {
  text-align: center;
  font-size: 9px;
  color: #333333;
}

.el-row {
  margin-bottom: 10px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #e6e6e6;
  text-align: center;
  color: #333333;
  font-size: 12px;
  line-height: 45px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.tablebox {
  padding-left: 1%;
  padding-top: 1%;
}

.tableone {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}

.el-table {
  font-size: 10px;
}

</style>
