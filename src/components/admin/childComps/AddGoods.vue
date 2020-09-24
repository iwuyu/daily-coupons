<template>
  <div id="add-goods">
    <h2><i class="el-icon-plus"></i> 添加商品</h2>
    <br>
    <el-form :model="formAdd" status-icon :rules="rules" ref="formAdd"class="demo-formAdd">
      <el-form-item prop="name">
        <label for="name"><i class="iconfont">&#xe614; 商品名</i></label>
        <el-input type="text" id="name" v-model="formAdd.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <label><i class="iconfont">&#xe658; 封面图</i></label>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formAdd.imageUrl" :src="formAdd.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="froms">
        <label><i class="iconfont">&#xe603; 来源</i></label><br/>
        <el-select v-model="formAdd.froms" id="froms" placeholder="请选择">
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
        <el-radio v-model="radio" label="1">包邮</el-radio>
        <el-radio v-model="radio" label="2">不包邮</el-radio>
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
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <label><i class="iconfont">&#xe658; 分享图</i></label>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleShareImageSuccess"
          :before-upload="beforeShareImageUpload">
          <img v-if="formAdd.shareImage" :src="formAdd.shareImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="paperwork">
        <label for="paperwork"><i class="iconfont">&#xe616; 文案</i></label>
        <el-input type="textarea" :rows="3" maxlength="300" show-word-limit id="paperwork" v-model="formAdd.paperwork" autocomplete="off"></el-input>
      </el-form-item> 
      <el-form-item>
        <el-button type="danger" class="submit" @click="submitForm('formAdd')">添 加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addGoods} from "network/adminOperation/goods";
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
    /* 验证来源 */
    let validateFroms = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择来源'));
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
        name:"",
        price:"",
        orgPrice:"",
        discount:"",
        introduce:"",
        paperwork:"",
        imageUrl: "",
        froms:"",
        detailsFigure:"",
        shareImage:""
      },
      fromsArray:[{value:1,label:"淘宝"},{value:2,label:"天猫"},{value:3,label:"京东"},{value:4,label:"拼多多"}],
      radio:"1",
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        froms: [
          { validator: validateFroms, trigger: 'blur' }
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleShareImageSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeShareImageUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    /* 确认提交 */
    submitForm(formAdd) {
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          alert('submit!');
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