<template>
  <div class="mainbox">
    <div class="title">
      <h1>案件进度查询</h1>
      <el-divider>Case progress inquiry</el-divider>
      <p>打造使用复杂度低、安全可信度高、办案作用力大的公检法司联盟区块链</p>
    </div>
    <div class="box">
      <el-tabs type="border-card">
        <el-tab-pane label="案件进度查询">
          <div class="formbox">
            <el-form
              label-position="left"
              :model="evidence"
              status-icon
              :rules="rules"
              ref="evidenceref"
              label-width="80px"
              class="evidenceFrom"
            >
              <el-form-item
                label="案件id"
                prop="caseId"
                :rules="[{ required: true, message: '案件id' }]"
              >
                <el-input
                  type="caseId"
                  v-model="evidence.caseId"
                  autocomplete="off"
                  placeholder="请输入案件id"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="存证编号" prop="evidenceId">
								<el-input v-model="evidence.evidenceId" autocomplete="off" placeholder="请输入存证编号"></el-input>
							</el-form-item> -->
              <el-form-item>
                <!-- <el-button type="primary" @click="login">提交</el-button> -->
                <el-button type="primary" @click="login()">提交</el-button>

                <el-dialog
                  v-if="this.showdata.msg != '未查询到相关案件'"
                  :title="showdata.caseName + '  ' + '案件进度'"
                  :visible.sync="dialogTableVisible"
                >
                  <!-- <div> -->
                  <el-card>
                    <!-- <div>{{this.showdata.activeIndex}}</div> -->
                    <el-steps :active="this.showdata.activeIndex" align-center>
                      <!-- this.messa -->

                      <!-- <el-step title="公安局" v-if="active === 1" icon="el-icon-edit"></el-step>
                    <el-step title="检察院" v-if="active === 2" icon="el-icon-s-platform"></el-step>
                    <el-step title="法  院" v-if="active === 3" icon="el-icon-picture"></el-step>
                    <el-step title="司法局" v-if="active === 4" icon="el-icon-s-order" description="这是一段很长很长很长的描述性文字"></el-step> -->
                      <el-step title="公安局" icon="el-icon-edit">
                        <!-- <span v-if="active == 1">
                          审核中
                      </span> -->
                      </el-step>
                      <el-step title="检察院" icon="el-icon-s-platform">
                        <!-- <span v-if="active == 2">
                          审核中
                      </span> -->
                      </el-step>
                      <el-step
                        title="法  院"
                        icon="el-icon-picture"
                        :description="showdata.reasons"
                      >
                        <!-- <span v-if="active == 3">
                          审核中
                      </span> -->
                      </el-step>
                      <el-step title="司法局" icon="el-icon-s-order">
                        <!-- <span v-if="active == 4">
                          审核中
                      </span>
                      <template v-if="active == 4">
                          审核中

                      </template> -->
                      </el-step>
                    </el-steps>
                    <el-row>
                      <!-- <el-card >
                      {{this.showdata.reasons}}
                    </el-card> -->
                    </el-row>
                  </el-card>

                  <!-- </div> -->
                  <!-- <el-table :data="gridData">
                    <el-table-column
                      property="date"
                      label="日期"
                      width="150"
                    ></el-table-column>
                    <el-table-column
                      property="name"
                      label="案件名称"
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      property="address"
                      label="处理部门"
                    ></el-table-column>

                    <el-table-column
                      property="status"
                      label="状态"
                    ></el-table-column>
                  </el-table> -->
                </el-dialog>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="文书验证">
					<div class="formbox">
						<el-upload class="upload-demo" ref="upload" action="https://192.168.43.31:8082/eveidence/postevidence" :on-preview="handlePreview"
						 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</div>
				</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evidence: {
        caseId: "",
      },
      uploadKey: {
        caseId: "",
      },
      showdata: {
        code: "",
        caseName: "",
        part: "",
        reason: "",
        status: "",
        time: "",
        msg: "",
        activeIndex: "",
        caseStatus: "",
      },

      rules: {
        caseId: [
          {
            required: true,
            message: "请输入案件id",
            trigger: "change",
          },
        ],
      },
      fileList: [],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
    };
  },
  methods: {
    login() {
      var api_console =
        "http://152.136.254.142:8082/case-status/getCasesStatus/";
      var obj1 = Object.create(null);
      // var showdata=new this.showdata();
      // this.uploadKey.caseId=
      this.$refs["evidenceref"].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
        } else {
          return false;
        }
        /* 配置请求路径，对接口 */
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
        myHeaders.append("Content-Length", "");

        var formdata = new FormData();
        formdata.append("caseId", this.evidence.caseId);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch(api_console, requestOptions)
          .then((response) => response.json())
          .then((json) => {
            if (json.code == 0) {
              this.dialogTableVisible = true;
              this.$message.success(json.msg);
            } else {
              this.getList(obj1);
            }
          })
          .catch((err) => {
            console.log("Request Failed", err);
            setTimeout(() => {
              this.showdata.code = Object.code;
              this.showdata.msg = Object.msg;
            }, 1000);
            this.$message.false(this.showdata.msg);
            console.log(this.showdata.msg);
          });
      });
    },
    getList(Object) {
      // 模拟数据获取
      // console.log(Object.code);
      if (Object.data != null) {
        this.showdata = { ...Object, activeIndex: Object.data.status - 100 };
      } else {
        this.showdata.code = Object.code;
        this.showdata.caseName = "";
        this.showdata.part = "";
        this.showdata.reason = "";
        this.showdata.status = "";
        this.showdata.time = "";
        this.showdata.msg = Object.msg;
        this.showdata.activeIndex = 0;
        this.dialogTableVisible = false;
      }

      // this.tableData = tableData;
    },
  },
};
</script>

<style>
.mainbox {
  background: #ffffff;
  padding: 35px;
  border-radius: 10px;
  margin: 15px;
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

.box {
  width: 60%;
  margin: 40px auto;
}

.formbox {
  padding: 20px;
}
.steps {
  width: 120px;
  height: 120px;
}
</style>
