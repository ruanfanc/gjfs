<template>
  <div class="mainbox">
    <!-- 操作按钮 -->
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.title"
        placeholder="案件描述"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.importance"
        placeholder="办案人"
        style="width: 200px;"
        class="filter-item"
      >
      </el-input>
      <el-select
        v-model="listQuery.type"
        placeholder="案件类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.importance"
        placeholder="重要程度"
        clearable
        style="width: 130px"
        class="filter-item"
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button> -->
      <el-button
        v-if="departmentId == 101 || departmentId == 103"
        class="filter-item"
        style="margin-left: 10px;"
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
      stripe
      style="width: 100%"
    >
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

      <el-table-column label="操作" width="250">
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
    <div class="pagebox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="nocheck.length"
        style="float:right;margin-top:15px;"
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
      <span>
        <el-table :data="evidence" stripe style="width: 100%">
          <el-table-column prop="evidenceId" label="存证编号"></el-table-column>
          <el-table-column prop="note" label="证物描述"></el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="{ row }">
              <el-tag type="info" v-if="!row.examine">未审核</el-tag>
              <el-tag
                v-else-if="
                  row.examine ==
                    ('法院审核通过' ||
                      '检察院审核通过' ||
                      '司法局审核通过' ||
                      '公安部门审核通过')
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
      <div class="imgbox" v-if="imgurl !== ''">
        <img
          :src="imgurl"
          v-if="imgurl !== ''"
          style="width: 50%;height: auto;"
        />
      </div>

      <div class="textbox" v-if="imgurl">
        <el-button type="success" icon="el-icon-check" circle></el-button>
        区块链校验通过 <a class="file" :href="fileUrl">点击下载</a>
      </div>
    </el-dialog>
    <!-- 未通过批复弹窗 dialogVisibleNoPass-->
    <el-dialog :visible.sync="dialogVisibleNoPass" width="80%">
      <el-form :model="noPassForm" size="medium" label-width="100px">
        <el-form-item label="证据编号" prop="evidenceId">
          <el-input
            v-model="noPassForm.evidenceId"
            disabled="true"
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
          style="margin-left: 10px;"
          size="small"
          type="primary"
          @click="noPassSubmit"
          >提交</el-button
        >
      </el-form>
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
              <el-form-item label="可见部门" prop="ids">
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
            disabled="true"
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
        <el-form-item label="可见部门" prop="DepartmentIds">
          <el-checkbox-group v-model="evidenceData.DepartmentIds">
            <el-checkbox
              v-for="(item, index) in DepartmentIdsOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

<!--        <el-upload-->
<!--          limit="1"-->
<!--          drag="true"-->
<!--          style="margin: 30px;"-->
<!--          class="upload-demo"-->
<!--          ref="upload"-->
<!--          action="/api1/evidence/postevidence"-->
<!--          :multiple="true"-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :file-list="fileList"-->
<!--          :auto-upload="false"-->
<!--          name="evidenceUrl"-->
<!--          :data="evidenceData"-->
<!--          list-type="text"-->
<!--          :on-success="handelsuccess"-->
<!--          :before-upload="handelUpload"-->
<!--        >-->
        <el-upload
          drag
          style="margin: 30px;"
          class="upload-demo"
          ref="upload"
          action=""
          multiple
          name="files"
          :file-list="fileList"
          :auto-upload="false"
          list-type="text"
          :on-change="handleChange"
          :on-preview="handlePreview"
          :on-success="handelSuccess"
          :before-upload="handelUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或<el-button
              slot="trigger"
              size="small"
              type="primary"
              >选取文件</el-button
            >
          </div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <el-button
          style="margin-left: 700px;"
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
      fileUrl: "",
      pageSize: 10, //每页多少条
      currentPage: 1, // 当前页
      loading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
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
      Id: 61232764,
      token: "",
      imgurl: "",
      caseId: "",
      newCaseForm: {
        ids: [101]
      },
      evidenceData: {
        DepartmentIds: [101],
        evidenceId: undefined,
        caseId: "",
        token: "",
        note: ""
      },
      caseTypeOptions: [
        {
          label: "刑事案件",
          value: "刑事案件"
        },
        {
          label: "行政案件",
          value: "行政案件"
        },
        {
          label: "民事诉讼",
          value: "民事诉讼"
        }
      ],
      DepartmentIdsOptions: [
        {
          label: "公安局",
          value: 101
        },
        {
          label: "检察院",
          value: 102
        },
        {
          label: "法院",
          value: 103
        },
        {
          label: "司法局",
          value: 104
        }
      ],
      rulesevi: {
        evidenceId: [
          {
            required: true,
            message: "请输入证据编号",
            trigger: "blur"
          }
        ],
        note: [
          {
            required: true,
            message: "请输入证据基本描述",
            trigger: "blur"
          }
        ],
        DepartmentIds: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个可见部门",
            trigger: "change"
          }
        ]
      },
      departmentId: ""
    };
  },
  created() {
    this.noCheck();
    this.departmentId = window.sessionStorage.getItem("departmentId");
    console.log("this.departmentId :>> ", this.departmentId);
  },
  methods: {
    //   获取全部案件
    async noCheck() {
      // this.token = window.sessionStorage.getItem('token')
      // console.log(this.token)
      /* var formData = new FormData();
				formData.append("token",window.sessionStorage.getItem('token')); */
      const {data: res} = await this.$http.post("/api1/cases/getcase");
      if (res.code !== 0) return this.$message.error("获取数据失败！");
      this.nocheck = res.data;
      if (this.nocheck) {
        this.nocheck.forEach(item => {
          item.time = new Date(Date.parse(item.time)).toLocaleDateString();
        });
      }
    },
    // 审核通过
    async passExamine(id, caseId) {
      this.$confirm("确认通过审核？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(async action => {
        if (action === "confirm") {
          const {data: res} = await this.$http.put(
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
    async noPassSubmit() {
      const {data: res} = await this.$http({
        method: "put",
        url: "/api1/examine/RefuseExamine",
        data: this.noPassForm
      });
      this.dialogVisibleNoPass = false;
      this.lookevidence(this.caseId);
      return this.$message.success("提交成功");
    },
    // 创建案件
    async submitCaseForm() {
      const {data: res} = await this.$http.post(
        "/api1/cases/addCase",
        this.newCaseForm
      );
      this.creatCaseDia = false;
      if (res.code == 0) {
        return this.$message.success("创建成功！");
      }
      return this.$message.error("操作失败！");
      console.log("res", res);
    },
    //导出表格
    handleDownload() {
      import('../../vendor/Export2Excel').then(excel => {
        const tHeader = ['案件编号', '案件名称', '案情描述', '创建时间', '案件类型', '重要程度', '负责人']
        const filterVal = ['caseId', 'caseName', 'caseDecription', 'time', 'caseTypeId', 'importace', 'staffId']
        const list = this.nocheck
        const data = this.formatJson(filterVal, list)
        //console.log(list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '案件导出'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'importace') {
          if (v[j] == '1') {
            return v[j] = "重案要案"
          } else {
            return v[j] = "一般案件"
          }
        }
        return v[j]
      }))

    },

    // 证据对比
    async openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
      const {data: res} = await this.$http.get("/api5/scc/insert/get/2");
      console.log(res);
      if (res.ok) return this.$message.success("比对成功！");
      return this.$message.error("证据描述被篡改！请联系管理员");
    },

    /* 查看证据弹窗 */
    async lookevidence(id) {
      console.log(id);
      this.dialogVisible1 = true;
      const {data: res} = await this.$http.post(
        "/api1/evidence/getevidence",
        {
          token: this.token,
          caseId: id
        }
      );

      this.evidence = res.data;
      //添加caseId
      this.evidence.forEach(item => {
        item.caseId = id;
        item.date = new Date(Date.parse(item.date)).toLocaleDateString();
      });
      console.log("caseid :>> ", this.evidence);
    },

    /* 查看证据详情弹窗 */
    async lookevidenceinfo(id) {
      console.log(id);

      // this.dialogVisible1 = false;
      this.dialogVisibleinfo = true;
      this.imgurl = "";
      this.fileUrl = "";
      // this.loading = true;
      const {data: res} = await this.$http.get("/api1/evidence/getone/" + id);
      if (res.code !== 0) {
        this.dialogVisibleinfo = false;
        return this.$message.error("加载失败，请刷新后重试");
      }
      if (res.data.isImg == 0) {
        this.fileUrl = res.data.evidenceUrl;
        let blob = new Blob([this.fileUrl], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }); // for .xlsx files

        // 通过URL.createObjectURL生成文件路径
        this.fileUrl = window.URL.createObjectURL(blob);
      }
      this.imgurl = "data:image/jpeg;base64," + res.data.evidenceUrl;

      console.log("this.fileUrl :>> ", this.fileUrl);
    },

    /* 确定上传 */
    uploadevi() {
      this.dialogVisible2 = false;
      this.$message.success("上传成功！");
    },

    /* 审核通过 */
    // async pass() {
    //   this.$confirm("确认通过审核？", "提示", {
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消"
    //   })
    //     .then(async action => {
    //       if (action === "confirm") {
    //         const { data: res } = await this.$http.post(
    //           "/api3/basic/examine/success?id=61232764"
    //         );
    //         this.noCheck();
    //         return this.$message.success("审核通过");
    //       }
    //     })
    //     .catch(() => {});
    // },
    /* 	handelEvi() {
				this.$refs['evidenceForm'].validate(async valid => {
					if (!valid) return
					// 提交表单
					await this.$http.post('/api2/police/officePolice/PostEvidence', this.evidenceData)
					this.dialogVisible2 = false
					return this.$message.success('上传成功，等待大队长审核')
				})
			}, */
    // 打开证据上传弹窗，并绑定caseId
    dialogupload(caseId) {
      this.dialogVisible2 = true;
      //初始化
      this.evidenceData = {};
      this.evidenceData.caseId = caseId;
      this.evidenceData.token = window.sessionStorage.getItem("token");
    },

    /*上传文件*/
    // httpRequest(files){
    //   this.formData.append('file',files.file);
    // },

    async submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.warning('请选取文件');
      }
      //console.log(this.fileList);
      const formData = new FormData();
      this.fileList.forEach((file) => {
        formData.append('files', file.raw);
      })
      // formData.forEach((value, key) => {
      //   console.log(`key ${key}: value ${value}`);
      // })
      await this.$http.post("/api8/uploadMultiFile",formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
        if(res.status === 200){
          this.$message.success("上传成功！");
          this.fileList=[];
        }
        else{
          this.$message.error("上传失败！");
        }
      })
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
    handleChange(fileList) {
      this.fileList.push(fileList)
    },

    handelUpload(file) {
      this.evidenceData.isImg = file.type == "image/png" ? 1 : 0;
    },

    handlePreview(file) {
      console.log(file);
    },

    handelSuccess(response) {
      console.log(this.evidenceData);
      if (response.code == 0) {
        this.dialogVisible2 = false;
        return this.$message.success("证据已上传至区块链！");
        // !!bug here
      } else {
        this.dialogVisible2 = false;
        return this.$message.success("证据已上传至区块链！");
      }
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
    }
  }
};
</script>

<style>
.filter-container {
  padding-bottom: 30px;
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
</style>
