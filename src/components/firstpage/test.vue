<template>
<el-containner>
    <div class="tab">
  <a href="#" @click="Tocontone">基本信息</a>
  <a href="#" @click="Toconttwo">使用状态</a>
  <a href="#" @click="Tocontthree">位置信息</a>
  <a href="#" @click="Tocontfour">采购信息</a>
  <a href="#" @click="Tocontfive">质保信息</a>
  <a href="#" @click="Tocontsix">折旧信息</a>
    </div>
 
    <div >
        <!-- 第一部分 -->
        <div class="infocontent" id="contone">
          <div class="information">
            <div class="informationtap">
              <p>基本信息</p>
            </div>
          </div>
          <div class="informationdetail">
            <div class="infoimg">
              <!-- <div><img src="../../assets/images/informationview/infomate.png" alt=""></div> -->
            </div>
            <div class="infodetail">
              <table>
                <tr>
                  <td>设备编号</td>
                  <td>{{equipmentInfo.equipmentNo}}</td>
                  <td>规格</td>
                  <td>{{equipmentInfo.specification}}</td>
                  <td>创建时间</td>
                  <td>{{equipmentInfo.addDateTime}}</td>
                  <td>参数1</td>
                  <td>{{equipmentInfo.parameter1}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- 第二部分 -->
        <div class="infocontent"  id="conttwo">
          <div class="information">
            <div class="informationtap">
              <p>使用状态</p>
            </div>
          </div>
          <div class="usingstate">
            <div class="statetable">
              <table>
                <tr>
                  <td>使用状态</td>
                  <td>{{useStatus.useStatus}}</td>
                  <td>界限值-高</td>
                  <td>{{useStatus.limitValueHigh}}</td>
                  <td>报警值-高</td>
                  <td>{{useStatus.alertValueHigh}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- 第三部分 -->
        <div class="infocontent"  id="contthree">
          <div class="information">
            <div class="informationtap">
              <p>位置信息</p>
            </div>
          </div>
          <div class="locationinfo">
            <div class="locationdetail">
              <table>
                <tr>
                  <td>街区编码</td>
                  <td>{{locationInfo.locationNo}}</td>
                  <td>街区名称</td>
                  <td>{{locationInfo.locationName}}</td>
                  <td>大厦编码</td>
                  <td>{{locationInfo.buildingNo}}</td>
                  <td>大厦名称</td>
                  <td>{{locationInfo.buildingName}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- 第四部分 -->
        <div class="infocontent"  id="contfour">
          <div class="information">
            <div class="informationtap">
              <p>采购信息</p>
            </div>
          </div>
          <div class="purchasing">
            <div class="purchasinfo">
              <table>
                <!-- <tr v-for="pur in purchase.supplierPerson"> -->
                  <td>{{purchase.supplierName}}</td>
                  <td></td>
                  <td>联系人</td>
                  <td>{{pur.supplierPersonName}}</td>
                  <td>电话</td>
                  <td>{{pur.supplierPhone}}</td>
                  <td>岗位</td>
                  <td>{{pur.supplierPost}}</td>
                <!-- </tr> -->

              </table>
            </div>
          </div>
        </div>
        <!-- 第五部分 -->
        <div class="infocontent" id="contfive">
          <div class="information">
            <div class="informationtap">
              <p>时间日期</p>
            </div>
          </div>
          <div class="timedate">
            <div class="dateinfo">
              <table>
                <tr>
                  <td>生产日期</td>
                  <td>{{timeDate.productionDate}}</td>
                  <td>采购日期</td>
                  <td>{{timeDate.purchaseDate}}</td>
                  <td>入库日期</td>
                  <td>{{timeDate.storageDate}}</td>
                  <td>启用日期</td>
                  <td>{{timeDate.runDate}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- 第六部分 -->
        <div class="infocontent" id="contsix">
          <div class="information">
            <div class="informationtap">
              <p>文档信息</p>
            </div>
          </div>
          <div class="documentinfo">
            <div >
              <table>
                <tr>
                  <td>文档名称</td>
                  <td>文档类型</td>
                  <td>文档概述</td>
                  <td>上传时间</td>
                  <td>上传人</td>
                  <td>操作</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
</el-containner>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    methods:{
    Tocontone(){
      document.querySelector("#contone").scrollIntoView(true);
    },
    Toconttwo(){
      document.querySelector("#conttwo").scrollIntoView(true);
    },
    Tocontthree(){
      document.querySelector("#contthree").scrollIntoView(true);
    },
    Tocontfour(){
      document.querySelector("#contfour").scrollIntoView(true);
    },
    Tocontfive(){
      document.querySelector("#contfive").scrollIntoView(true);
    },
    Tocontsix(){
      document.querySelector("#contsix").scrollIntoView(true);
  }
}
})
</script>
