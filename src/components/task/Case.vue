<template>
  <div class="mainbox">
    <!-- 操作按钮 -->
    <div class="filter-container">
      <el-input
        v-model="searchKey"
        placeholder="请输入案件描述关键词"
        style="width: 250px"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button
        v-if="departmentId == 101 || departmentId == 103"
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="creatCaseDia = true"
      >
        创建案件
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>

    <el-table
      highlight-current-row
      :data="
        nocheck.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table
      highlight-current-row
      :data="
        nocheck.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      style="width: 100%"
    > -->
      <!-- handleSelectionChange(val) {
      this.multipleSelection = val;
    }, -->
      <el-table-column
        prop="哈哈哈"
        type="selection"
        label="全选按钮"
        width="53"
      />
      <!-- <el-table-column label="全选" type="selection" align="center" width="58"> -->
      <el-table-column prop="caseId" label="案件编号"></el-table-column>
      <el-table-column prop="caseName" label="案件名称"></el-table-column>
      <el-table-column
        prop="caseDecription"
        label="案情描述"
        width="350"
      ></el-table-column>
      <el-table-column
        sortable
        prop="time"
        label="创建时间"
        width="100"
      ></el-table-column>
      <el-table-column prop="caseTypeId" label="案件类型"></el-table-column>
      <el-table-column label="重要程度">
        <template slot-scope="{ row }">
          <el-tag type="danger" v-if="row.importace == 1">重案要案</el-tag>
          <el-tag v-else>一般案件</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="staffId" label="负责人"></el-table-column>

      <el-table-column label="操作" width="300">
        <!-- eslint-disable -->
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click="lookevidence(row.caseId)"
            >证据链</el-button
          >

          <el-button
            v-if="departmentId == 101 || departmentId == 103"
            type="success"
            size="mini"
            @click="dialogupload(row.caseId)"
            >上传证据</el-button
          >
          <!-- <el-button
            v-if="departmentId == 101 || departmentId == 103"
            type="primary"
            size="mini"
            @click="caseDetail(row.caseId)"
            >案件详情</el-button
          > -->

          <el-button
            v-else
            type="warning"
            size="mini"
            @click="dialogupload(row.caseId)"
            >补充材料</el-button
          >
        </template>
      </el-table-column>
      <!-- <el-table-column label="审核" width="150">

					<el-button type="success" icon="el-icon-check" size="mini" @click="pass"></el-button>
					<el-button type="danger" icon="el-icon-warning" size="mini"></el-button>

				</el-table-column> -->
    </el-table>
    <!-- 纯前端分页 -->
    <div class="pagebox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="nocheck.length"
        style="float: right; margin-top: 15px"
      >
      </el-pagination>
    </div>

    <!-- 证据弹窗 dialogVisible1-->
    <el-dialog
      title="证据链"
      :visible.sync="dialogVisible1"
      width="80%"
      fullscreen
    >
      <div class="searchEvidence-container">
        <el-input
          v-model="searchEviKey"
          placeholder="请输入证物描述关键词"
          style="width: 250px"
          class="filter-item"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search">
          搜索
        </el-button>
      </div>
      <span>
        <el-table :data="evidence" stripe style="width: 100%">
          <el-table-column prop="evidenceId" label="存证编号"></el-table-column>
          <el-table-column prop="note" label="证物描述"></el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="{ row }">
              <el-tag type="info" v-if="!row.examine">未审核</el-tag>
              <el-tag
                v-else-if="
                  row.examine == '法院审核通过' ||
                  row.examine == '检察院审核通过' ||
                  row.examine == '司法局审核通过' ||
                  row.examine == '公安部门审核通过'
                "
                type="success"
                >{{ row.examine }}</el-tag
              >
              <el-tag v-else type="danger"> {{ row.examine }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="date"
            label="搜集时间"
          ></el-table-column>
          <el-table-column label="操作" width="150">
            <!-- eslint-disable -->
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="lookevidenceinfo(row.evidenceId)"
                >校验</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="审核" width="250">
            <!-- eslint-disable -->
            <template slot-scope="{ row }">
              <el-button
                type="success"
                size="mini"
                @click="passExamine(row.evidenceId, row.caseId)"
                >通过</el-button
              >
              <el-button
                type="warning"
                size="mini"
                @click="noPass(row.evidenceId, row.caseId)"
                >不通过</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button
          @click="openFullScreen1"
          type="success"
          v-loading.fullscreen.lock="fullscreenLoading"
          >安全性检查</el-button
        > -->
        <el-button type="primary" @click="dialogVisible1 = false"
          >返 回</el-button
        >
      </span>
    </el-dialog>
    <!-- 详情弹窗 dialogVisibleinfo -->
    <el-dialog title="证据详情" :visible.sync="dialogVisibleinfo" width="70%">
      <div class="imgbox">
        <img
          :src="objectUrl"
          style="width: 70%; height: auto; border: 1px solid #000"
        />
      </div>
      <div class="textbox">
        <i class="el-icon-success" style="color: green; margin-right: 5px"></i>
        区块链校验通过 <a :href="objectUrl" :download="fileName"> 点击下载</a>
      </div>
      <div class="textbox">区块HASH：{{ blockHash }}</div>
    </el-dialog>

    <!-- 未通过批复弹窗 dialogVisibleNoPass-->
    <el-dialog :visible.sync="dialogVisibleNoPass" width="80%">
      <el-form :model="noPassForm" size="medium" label-width="100px">
        <el-form-item label="证据编号" prop="evidenceId">
          <el-input
            v-model="noPassForm.evidenceId"
            disabled
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="原因" prop="value">
          <el-input
            v-model="noPassForm.value"
            placeholder="未通过原因"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-button
          style="margin-left: 10px"
          size="small"
          type="primary"
          @click="noPassSubmit"
          >提交</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 查看案件详情弹框 caseDetail -->
    <el-dialog title="案件详情" :visible.sync="caseDetailVisiable">
      <el-form
        :model="caseDetailForm"
        :disabled="isEdit"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="案件编号" style="width: 100%">
          <el-input
            v-model="caseDetailForm.caseId"
            autocomplete="off"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="案件名称">
          <el-input
            v-model="caseDetailForm.caseName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="案情描述">
          <el-input
            type="textarea"
            v-model="caseDetailForm.caseDecription"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="caseDetailForm.time"
            style="width: 140px"
          ></el-date-picker>
          <!-- <el-input v-model="caseDetailForm.time" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="案件类型">
          <el-radio-group v-model="caseDetailForm.caseTypeId" size="medium">
            <el-radio
              v-for="(item, index) in caseTypeOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="重要程度">
          <el-radio-group v-model="caseDetailForm.importace" size="medium">
            <el-radio :label="0">一般案件</el-radio>
            <el-radio :label="1">重案要案</el-radio>
          </el-radio-group>
          <!-- <el-input v-model="caseDetailForm.importace" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="负责人">
          <el-input
            v-model="caseDetailForm.staffId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEdit = false">编 辑</el-button>
        <el-button @click="(caseDetailVisiable = false), (isEdit = true)"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="(caseDetailVisiable = false), (isEdit = true)"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 创建案件弹框 creatCaseDia -->
    <el-dialog title="创建案件" :visible.sync="creatCaseDia" width="70%">
      <span>
        <el-row :gutter="20">
          <el-form
            :model="newCaseForm"
            size="medium"
            label-width="84px"
            label-position="left"
            ref="elForm"
          >
            <el-col :span="14">
              <el-form-item label="案件编号" prop="caseId">
                <el-input
                  v-model="newCaseForm.caseId"
                  placeholder="请输入接警案件编号"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="19">
              <el-form-item label="案件名称" prop="caseName">
                <el-input
                  v-model="newCaseForm.caseName"
                  placeholder="案件名称"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="案件描述" prop="caseDescription">
                <el-input
                  v-model="newCaseForm.caseDescription"
                  type="textarea"
                  placeholder="案件描述"
                  :autosize="{ minRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="案件类型" prop="caseType">
                <el-radio-group v-model="newCaseForm.caseType" size="medium">
                  <el-radio
                    v-for="(item, index) in caseTypeOptions"
                    :key="index"
                    :label="item.value"
                    :disabled="item.disabled"
                    >{{ item.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="重要程度" prop="importace">
                <el-radio-group v-model="newCaseForm.importace" size="medium">
                  <el-radio label="0">一般案件</el-radio>
                  <el-radio label="1">重案要案</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="可见部门">
                <el-checkbox-group v-model="newCaseForm.ids">
                  <el-checkbox
                    v-for="(item, index) in DepartmentIdsOptions"
                    :key="index"
                    :label="item.value"
                    :disabled="item.disabled"
                    >{{ item.label }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item size="large">
                <el-button type="primary" @click="submitCaseForm"
                  >提交</el-button
                >
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </span>
    </el-dialog>

    <!-- <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<span>
				是否将物证上传至区块链网络？
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取消</el-button>
				<el-button type="primary" @click="uploadevi">确 定</el-button>
			</span>
		</el-dialog> -->
    <el-dialog title="证据上传" :visible.sync="dialogVisible2" width="70%">
      <!-- 表单 -->
      <el-form
        ref="evidenceForm"
        :model="evidenceData"
        :rules="rulesevi"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="案件编号" prop="caseId">
          <el-input
            v-model="evidenceData.caseId"
            disabled
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="证据编号" prop="evidenceId">
          <el-input
            v-model="evidenceData.evidenceId"
            placeholder="请输入证据编号"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="证据描述" prop="note">
          <el-input
            v-model="evidenceData.note"
            type="textarea"
            placeholder="请输入证据基本描述"
            :autosize="{ minRows: 4 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="可见部门">
          <el-checkbox-group v-model="evidenceData.departmentIds">
            <el-checkbox
              v-for="(item, index) in DepartmentIdsOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-upload
          drag
          style="margin: 30px"
          class="upload-demo"
          ref="upload"
          action="/api2/uploadFile"
          name="fileName"
          limit:1
          :file-list="fileList"
          list-type="text"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handelSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或 &nbsp;
            <el-button slot="trigger" size="small" type="primary"
              >选取文件
            </el-button>
          </div>
        </el-upload>
        <el-button
          style="margin-left: 700px"
          type="success"
          @click="submitUpload"
          >提交</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  //inject: ['reload'],
  data() {
    return {
      searchKey: "", //搜索案件关键词
      searchEviKey: "", //搜索证据关键词
      fileUrl: "",
      pageSize: 10, //每页多少条
      currentPage: 1, // 当前页
      loading: true,
      isEdit: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      creatCaseDia: false,
      dialogVisibleNoPass: false,
      fileList: [],
      fullscreenLoading: false,
      activeName: "first",
      nocheck: [],
      evidence: [],
      noPassForm: {},
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisibleinfo: false,
      caseDetailVisiable: false,
      Id: 61232764,
      token: "",
      imgurl: "",
      caseId: "",
      newCaseForm: {
        ids: [101],
      },
      evidenceData: {
        departmentIds: [101],
        evidenceId: undefined,
        caseId: "",
        token: "",
        note: "",
      },
      caseDetailForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      caseTypeOptions: [
        {
          label: "刑事案件",
          value: "刑事案件",
        },
        {
          label: "行政案件",
          value: "行政案件",
        },
        {
          label: "民事诉讼",
          value: "民事诉讼",
        },
      ],
      DepartmentIdsOptions: [
        {
          label: "公安局",
          value: 101,
        },
        {
          label: "检察院",
          value: 102,
        },
        {
          label: "法院",
          value: 103,
        },
        {
          label: "司法局",
          value: 104,
        },
      ],
      rulesevi: {
        evidenceId: [
          {
            required: true,
            message: "请输入证据编号",
            trigger: "blur",
          },
        ],
        note: [
          {
            required: true,
            message: "请输入证据基本描述",
            trigger: "blur",
          },
        ],
      },
      departmentId: "",
      bolckHash: "",
      objectUrl: "",
      fileName: "",
      multipleSelection: [],
    };
  },
  watch: {
    searchKey(value, oldValue) {
      if (value) {
        this.nocheck = this.nocheck.filter((item) => {
          return (
            item.caseDecription.includes(value) ||
            item.caseId.includes(value) ||
            item.caseName.includes(value)
          );
        });
      } else {
        this.noCheck();
      }
    },
    searchEviKey(newValue, oldValue) {
      if (newValue) {
        this.evidence = this.evidence.filter((item) => {
          return (
            item.note.includes(newValue) || item.evidenceId.includes(newValue)
          );
        });
      }
      console.log(newValue, oldValue);
    },
  },
  created() {
    this.noCheck();
    this.departmentId = window.sessionStorage.getItem("departmentId");
  },
  methods: {
    //   获取全部案件
    async noCheck() {
      // this.token = window.sessionStorage.getItem('token')
      // console.log(this.token)
      /* var formData = new FormData();
				formData.append("token",window.sessionStorage.getItem('token')); */
      const { data: res } = await this.$http.post("/api1/cases/getcase");
      if (res.code !== 0) return this.$message.error("获取数据失败！");
      this.nocheck = res.data;
      if (this.nocheck) {
        this.nocheck.forEach((item) => {
          item.time = new Date(Date.parse(item.time)).toLocaleDateString();
        });
      }
    },
    // 审核通过
    async passExamine(id, caseId) {
      this.$confirm("确认通过审核？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(async (action) => {
        if (action === "confirm") {
          const { data: res } = await this.$http.put(
            "/api1/examine/passEXamine/" + id
          );
          this.lookevidence(caseId);
          return this.$message.success("审核通过");
        }
      });
    },
    // 审核不通过
    noPass(id, caseId) {
      this.caseId = caseId;
      this.noPassForm.evidenceId = id;
      this.dialogVisibleNoPass = true;
    },
    async caseDetail(caseId) {
      this.caseDetailVisiable = true;
      const { data: res } = await this.$http({
        method: "put",
        url: "/api1/cases/get/" + caseId,
      });
      if (res.code !== 0) return this.$message.error("获取数据失败！");
      this.caseDetailForm = res.data;
      if (this.caseDetailForm) {
        this.caseDetailForm.time = new Date(
          Date.parse(this.caseDetailForm.time)
        ).toLocaleDateString();
      }
    },
    async noPassSubmit() {
      const { data: res } = await this.$http({
        method: "put",
        url: "/api1/examine/RefuseExamine",
        data: this.noPassForm,
      });
      this.dialogVisibleNoPass = false;
      this.lookevidence(this.caseId);
      return this.$message.success("提交成功");
    },
    // 创建案件
    async submitCaseForm() {
      const { data: res } = await this.$http.post(
        "/api1/cases/addCase",
        this.newCaseForm
      );
      this.creatCaseDia = false;
      if (res.code == 0) {
        this.noCheck();
        return this.$message.success("创建成功！");
      }
      return this.$message.error("操作失败！");
      console.log("res", res);
    },
    //导出表格
    handleDownload1() {
      import("../../vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "案件编号",
          "案件名称",
          "案情描述",
          "创建时间",
          "案件类型",
          "重要程度",
          "负责人",
        ];
        const filterVal = [
          "caseId",
          "caseName",
          "caseDecription",
          "time",
          "caseTypeId",
          "importace",
          "staffId",
        ];
        const list = this.nocheck;
        const data = this.formatJson(filterVal, list);
        //console.log(list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "案件导出",
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("../../vendor/Export2Excel").then((excel) => {
          console.log(1);
          const tHeader = [
            "案件编号",
            "案件名称",
            "案情描述",
            "创建时间",
            "案件类型",
            "重要程度",
            "负责人",
          ];
          const filterVal = [
            "caseId",
            "caseName",
            "caseDecription",
            "time",
            "caseTypeId",
            "importace",
            "staffId",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "案件导出",
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "请最少选择一个案件",
          type: "warning",
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "importace") {
            if (v[j] == "1") {
              return (v[j] = "重案要案");
            } else {
              return (v[j] = "一般案件");
            }
          }
          return v[j];
        })
      );
    },

    // 证据对比
    async openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
      const { data: res } = await this.$http.get("/api5/scc/insert/get/2");
      console.log(res);
      if (res.ok) return this.$message.success("比对成功！");
      return this.$message.error("证据描述被篡改！请联系管理员");
    },

    /* 证据链弹窗 */
    async lookevidence(id) {
      console.log(id);
      this.dialogVisible1 = true;
      const { data: res } = await this.$http.post(
        "/api1/evidence/getevidence",
        {
          token: this.token,
          caseId: id,
        }
      );

      this.evidence = res.data;
      //添加caseId
      this.evidence.forEach((item) => {
        item.caseId = id;
        item.date = new Date(Date.parse(item.date)).toLocaleDateString();
      });
      console.log("caseid :>> ", this.evidence);
    },

    /* 查看证据详情弹窗 */
    async lookevidenceinfo(id) {
      // this.dialogVisible1 = false;

      const { data: res } = await this.$http.get("/api1/evidence/getone/" + id);
      console.log(res);
      if (res.code === 1001) {
        return this.$message.error("证据被篡改," + res.msg + ",请联系管理员!");
      } else if (res.code === 0) {
        this.dialogVisibleinfo = true;
        this.$message.success("区块链校验通过！");
        const { data } = res;
        this.blockHash = data.blockHash;
        let url =
          "/api2/download?fullPath=" + data.evidenceUrl.replace(/\//g, "%2F");
        await this.$http({
          url: url,
          method: "get",
          data: {},
          responseType: "blob",
        }).then((res) => {
          let fileName =
            res.headers["content-disposition"].split("filename=")[1];
          this.downLoadBlobFile(res.data, fileName);
        });
      }
    },
    downLoadBlobFile(blob, fileName) {
      let URL = window.URL || window.webkitURL;
      this.objectUrl = URL.createObjectURL(blob);
      this.fileName = fileName;
    },

    /* 确定上传 */
    uploadevi() {
      this.dialogVisible2 = false;
      this.$message.success("上传成功！");
    },
    // 移除文件
    handleRemove(file, fileList) {
      console.log("移除", file, fileList);
    },

    // 打开证据上传弹窗，并绑定caseId
    dialogupload(caseId) {
      this.dialogVisible2 = true;
      //初始化
      this.fileList = [];
      this.evidenceData.note = "";
      this.evidenceData.evidenceId = "";
      this.evidenceData.departmentIds = [101];
      this.evidenceData.caseId = caseId;
      this.evidenceData.token = window.sessionStorage.getItem("token");
    },

    /*上传文件*/
    // httpRequest(files){
    //   this.formData.append('file',files.file);
    // },

    async submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.warning("请选取文件");
        return;
      }
      console.log("this.evidenceData :>> ", this.evidenceData);
      await this.$http
        .post("/api1/evidence/postevidence", this.evidenceData)
        .then((res) => {
          console.log("res :>> ", res);
          if (res.status === 200) {
            this.$message.success("上传成功！");
            this.fileList = [];
          } else {
            this.$message.error("上传失败！");
          }
        });
    },

    // submitUpload() {//点击上传
    //   this.$refs.upload.submit();
    // },
    //
    // async httpRequest(param){
    //   let file = param.file;
    //   console.log(file);
    //   let formData = new FormData();
    //   formData.append('file', file);
    //   //let config = {'Content-Type':'multipart/form-data'};
    //   await this.$http.post("/api8/uploadMultiFile",formData,{headers:{'Content-Type':'multipart/form-data'}});
    // },

    //
    // /*判断文件类型*/
    // beforeUpload(file){
    //   let fileType = file.name.substring(file.name.lastIndexOf('.')+1);
    //   if(fileType !== 'pdf' && fileType !== 'doc' && fileType !== 'docx' && fileType !== 'jpg' && fileType !== 'jpeg'){
    //     this.$alert('文件格式错误',{
    //       confirmButtonText: '确定',
    //       callback: action => {
    //         this.fileList = [];
    //       }
    //     })
    //   }
    // },
    // 证据文件上传前数据绑定
    handleChange(file, fileList) {
      console.log(file);
      this.fileList = fileList.slice(-1);
    },
    handelSuccess(response) {
      console.log("response :>> ", response);
      if (response.code === 0) {
        let url = "/api2/getHash?path=" + response.path.replace(/\//g, "%2F");
        this.$http.post(url).then((res) => (this.evidenceData.hash = res.data));
        this.evidenceData.evidenceUrl = response.path;
      }
      console.log("this.evidenceData :>> ", this.evidenceData);
    },

    // 重置表单
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    // 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style>
.filter-container {
  padding-bottom: 30px;
}
.searchEvidence-container {
  padding-bottom: 30px;
}
.imgbox {
  display: flex;
  justify-content: center;
}
.textbox {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-item {
  padding: 15px;
  color: gray;
}
.pagebox {
  padding: 20px;
  padding-bottom: 40px;
}
.el-table {
  font-size: 10px;
}

/* 全选的实现
<style> */

.el-table__header .el-table-column--selection .cell .el-checkbox:after {
  /* color: #333; */
  content: "全选";
  /* font-size: 10px; */
  /* margin-left: 4px; */
  /* margin-bottom: 2px; */
  /* font-weight: bold; */
}
</style>
