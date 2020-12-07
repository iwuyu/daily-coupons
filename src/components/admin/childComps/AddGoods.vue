<template>
  <div id="add-goods">
    <h2><i class="el-icon-plus"></i> 添加商品</h2>
    <br>
    <el-form :model="formAdd" status-icon :rules="rules" ref="formAdd" class="demo-formAdd">
      <el-form-item prop="name">
        <label for="name"><i class="iconfont">&#xe614; 商品名</i></label>
        <el-input type="text" id="name" v-model="formAdd.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="category">
        <label for="category"><i class="iconfont">&#xe65e; 分类名</i></label><br/>
        <el-select v-model="formAdd.category" id="category" placeholder="请选择分类">
          <el-option
            v-for="item in categoryArray"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <label><i class="iconfont">&#xe658; 封面图</i></label>
        <el-upload
          class="avatar-uploader"
          ref="avatar"
          name="avatar"
          :action="uploadAvatar"
          :show-file-list="false"
          :auto-upload="false"
          :with-credentials="true"
          :on-change="avatarSaveToUrl"
          :on-success="avatarSuccess">
          <img v-if="localImageUrl.avatorImageUrl" :src="localImageUrl.avatorImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="froms">
        <label><i class="iconfont">&#xe603; 来源</i></label><br/>
        <el-select v-model="formAdd.froms" id="froms" placeholder="请选择来源(淘宝、天猫...)">
          <el-option
            v-for="item in fromsArray"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <label><i class="iconfont">&#xe605; 包邮</i></label><br/>
        <el-radio v-model="formAdd.packageMail" label="1">包邮</el-radio>
        <el-radio v-model="formAdd.packageMail" label="2">不包邮</el-radio>
      </el-form-item>
      <el-form-item prop="store">
        <label for="store"><i class="el-icon-s-shop"> 店铺名称</i></label>
        <el-input type="text" id="store" v-model="formAdd.store" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="orgPrice">
        <label for="orgPrice"><i class="iconfont">&#xe653; 原价</i></label>
        <el-input type="text" id="orgPrice" v-model="formAdd.orgPrice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="discount">
        <label for="discount"><i class="iconfont">&#xe637; 优惠券额度</i></label>
        <el-input type="text" id="discount" v-model="formAdd.discount" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="price">
        <label for="price"><i class="iconfont">&#xe653; 券后价</i></label>
        <el-input type="text" id="price" v-model="formAdd.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="introduce">
        <label for="introduce"><i class="iconfont">&#xe72f; 商品介绍</i></label>
        <el-input type="textarea" :rows="3" maxlength="300" show-word-limit id="introduce" v-model="formAdd.introduce" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <label><i class="iconfont">&#xe622; 详情图集</i></label>
        <el-upload
          :action="uploadDetail"
          multiple
          ref="detail"
          name="detail"
          list-type="picture-card"
          :auto-upload="false"
          :with-credentials="true"
          :on-change="detailSaveToUrl"
          :on-remove="handleRemove"
          :on-success="detailSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="localImageUrl.dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <label><i class="iconfont">&#xe658; 分享图</i></label>
        <el-upload
          class="avatar-uploader"
          :action="uploadShare"
          ref="share"
          name="share"
          :show-file-list="false"
          :auto-upload="false"
          :with-credentials="true"
          :on-change="shareSaveToUrl"
          :on-success="shareSuccess">
          <img v-if="localImageUrl.shareImageUrl" :src="localImageUrl.shareImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="paperwork">
        <label for="paperwork"><i class="iconfont">&#xe616; 文案</i></label>
        <el-input type="textarea" :rows="3" maxlength="300" show-word-limit id="paperwork" v-model="formAdd.paperwork" autocomplete="off"></el-input>
      </el-form-item> 
      <el-form-item>
        <el-button type="danger" class="submit" @click="submitForm('formAdd')">{{submitTxt}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addGoods} from "network/adminOperation/goods";
import upload from "network/upload";
export default {
  name:"AddGoods",
  data() {
    /* 验证商品名 */
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品名'));
      } else {
        callback();
      }
    };
    /* 验证商品分类 */
    let validateCategory = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品分类'));
      } else {
        callback();
      }
    };
    /* 验证来源 */
    let validateFroms = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择来源'));
      } else {
        callback();
      }
    };
    /* 验证店铺名称 */
    let validateStore = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入店铺名称'));
      } else {
        callback();
      }
    };
    /* 验证价格 */
    let validatePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入价格'));
      } else {
        callback();
      }
    };
    /* 验证原价 */
    let validateOrgPrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原价'));
      } else {
        callback();
      }
    };
    /* 验证优惠券额度 */
    let validateDiscount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入优惠券额度'));
      } else {
        callback();
      }
    };
    /* 验证商品介绍 */
    let validateIntroduce = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品介绍'));
      } else {
        callback();
      }
    };
    /* 验证文案 */
    let validatePaperwork = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文案'));
      } else {
        callback();
      }
    };
    return {
      formAdd:{
        name:"", // 商品名称
        price:"", // 现价
        category:"", // 分类
        store:"", // 店铺
        orgPrice:"", // 原价
        discount:"", // 优惠额度
        introduce:"", // 商品介绍
        paperwork:"", // 文案
        image: "", // 封面图
        froms:"", // 商品出处(淘宝、天猫...)
        packageMail:"1", // 包邮(默认为1:包邮,0:不包邮)
        detailsFigure:"", // 详情图集
        shareImage:"" // 分享图
      },
      submitTxt:"确认添加",
      baseurl:upload.UPLOADIMG.BASEURL, // baseurl
      uploadAvatar:upload.UPLOADIMG.BASEURL + upload.UPLOADIMG.UPLOADAVATAR,  // 封面图地址
      uploadDetail:upload.UPLOADIMG.BASEURL + upload.UPLOADIMG.UPLOADDETAIL,  // 详情图地址
      uploadShare:upload.UPLOADIMG.BASEURL + upload.UPLOADIMG.UPLOADSHARE,  // 分享图地址
      localImageUrl:{avatorImageUrl:"",dialogImageUrl:"",shareImageUrl:""}, // 本地暂存图片
      fromsArray:[{value:1,label:"淘宝"},{value:2,label:"天猫"},{value:3,label:"京东"},{value:4,label:"拼多多"}], // 优惠券出处
      categoryArray:[{value:1,label:"男装"},{value:2,label:"女装"},{value:3,label:"鞋品"},{value:4,label:"生活用品"},{value:5,label:"食品"}], // 优惠券出处
      dialogVisible: false,
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        category: [
          { validator: validateCategory, trigger: 'blur' }
        ],
        froms: [
          { validator: validateFroms, trigger: 'blur' }
        ],
        store: [
          { validator: validateStore, trigger: 'blur' }
        ],
        price: [
          { validator: validatePrice, trigger: 'blur' }
        ],
        orgPrice: [
          { validator: validateOrgPrice, trigger: 'blur' }
        ],
        discount: [
          { validator: validateDiscount, trigger: 'blur' }
        ],
        introduce: [
          { validator: validateIntroduce, trigger: 'blur' }
        ],
        paperwork: [
          { validator: validatePaperwork, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    /* 图片保存本地 */
    imageSaveToLocal(event,Path){  
      let path = this.localImageUrl;
      if(window.createObjectURL != undefined){
        path[Path] = window.createObjectURL(event.raw);
      }else if(window.URL != undefined){
        path[Path] = window.URL.createObjectURL(event.raw);
      }else if(window.webkitURL != undefined){
        path[Path] = window.webkitURL.createObjectURL(event.raw);
      }
    },
    /* 保存数据流 */
    imageSaveToSend(file,Path){
      let path = this.formAdd;
      const isJPG = file.type === 'image/jpeg'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if(isJPG && isLt2M) {
        Path == "detailsFigure"?path[Path].push(file):path[Path] = file;
      }
      return;
    },
    /* 封面图片保存本地 */
    avatarSaveToUrl(event) {
      let even = event;
      this.imageSaveToLocal(even,"avatorImageUrl");
    },
    /* 封面图上传成功 保存图片路径 */
    avatarSuccess(res) {
      if (res.statusCode == 200) {
        this.formAdd.image = res.data.imgUrl;
      } else {
        this.$message({
          message: "封面图上传失败",
          type: 'error'
        });
      }
    },
    /* 详情图集保存本地 */
    detailSaveToUrl(event) {
      let even = event;
      this.imageSaveToLocal(even,"dialogImageUrl");
    },
    /* 移除详情图 */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    /* 详情图上传成功 保存路径 */
    detailSuccess(res) {
      if (res.statusCode == 200) {
        this.formAdd.detailsFigure = this.formAdd.detailsFigure + res.data.imgUrl + "-";
      }else {
        this.$message({
          message: "详情图上传失败",
          type: 'error'
        });
      }
    },
    /* 分享图保存本地 */
    shareSaveToUrl(event) {
      let even = event;
      this.imageSaveToLocal(even,"shareImageUrl");
    },
    /* 分享上传成功 保存路径 */
    shareSuccess(res) {
      if (res.statusCode == 200) {
        this.formAdd.shareImage = res.data.imgUrl;
      }else {
        this.$message({
          message: "分享图上传失败",
          type: 'error'
        });
      }
    },
    /* 确认提交 */
    submitForm(formAdd) {
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          this.submitTxt = "上传中";
          this.$refs.avatar.submit();
          this.$refs.detail.submit();
          this.$refs.share.submit();
          let timer = "";
          clearTimeout(timer);
          timer = setTimeout(() => {
          if(this.formAdd.image != "" && this.formAdd.detailsFigure != "" &&this.formAdd.shareImage != "" ){
            addGoods(this.formAdd).then(res => {
              let data = res.data;
              if(data.statusCode === 200) {
                this.$refs[formAdd].resetFields(); // 上传成功，清空表单
                this.localImageUrl.avatorImageUrl = "";
                this.localImageUrl.dialogImageUrl = "";
                this.localImageUrl.shareImageUrl = "";
                this.$refs.detail.clearFiles();
                this.submitTxt = "确认添加";
                this.$message({
                  message: data.message,
                  type: 'success'
                });
              }else {
                this.submitTxt = "再次上传";
                this.$message({
                  message: 'data.message',
                  type: 'error'
                });
              }
            }).catch(err => {
              console.log(err);
              this.$message({
                type: 'error',
                message: "出错了，请稍后重试！"
              })
            })
          }else{
            this.$message({
              type: 'error',
              message: "图片上传失败！"
            })
          }
          },2000)
        } else {
          this.$message.error('错了哦，请验证信息是否完整正确!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  #add-goods {
    padding: 2rem 3rem;
    .demo-formAdd{
      margin: 0 auto;
      width: 50%;
    }
    .avatar-uploader {
      border: 1px dashed #d9d9d9 ;
      border-radius: 6px;
      width: 178px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .submit {
      margin-top: 2rem;
      float: right;
      width: 178px;
    }
  }
</style>