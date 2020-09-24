<template>
  <div id="admin-login">
    <div class="admin-login">
      <el-form :model="formLogin" status-icon :rules="rules" ref="formLogin" label-width="100px" class="demo-formLogin">
        <el-form-item prop="email">
          <label for="email">邮箱</label>
          <el-input type="text" id="email" v-model="formLogin.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <label for="passwd">密码</label>
          <el-input type="password" id="passwd" v-model="formLogin.passwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code"> 
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="16"><el-input id="code" type="text" class="code-text" v-model="formLogin.code" autocomplete="off"></el-input></el-col>
            <el-col :span="8"><el-button type="success" @click="sendEmail('formLogin')" :disabled="codeButton.codeButtonState" class="code-btn">{{codeButton.codeButtonTxt}}</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="submit" @click="submitForm('formLogin')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-error">
      <p><i class="iconfont icon-jinggao"></i></p>
      <p>当前环境下不适合操作，请去PC端登录吧！！！</p>
    </div>
  </div>
</template>

<script>
import { sendMail, adminLogin } from "network/adminOperation/login";
export default {
  name:"AdminLogin",
  data() {
    /* 验证邮箱 */
    let validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; // 邮箱格式正则表达式
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }else if(!reg.test(value)){
        callback(new Error('邮箱格式有误'));
      }else {
        callback();
      }
    };
    /* 验证密码 */
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    /* 验证验证码 */
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      }else {
        callback();
      }
    };
    return {
      formLogin: {
        email: '',
        passwd: '',
        code:''
      },
      // 验证码按钮
      codeButton:{
        codeButtonState:false,
        codeButtonTxt:'获取验证码'
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 验证码倒计时 */
    countDown(number){
      let time = number;
      let timer = setInterval(() => {
        time--;
        if(time === 0){
          clearInterval(timer);
          this.codeButton.codeButtonState = false;
          this.codeButton.codeButtonTxt = '再次发送';
        }else{
          this.codeButton.codeButtonTxt = `倒计时${time}秒`;
        }

      },1000)
    },

    /* 发送邮箱验证码 */
    sendEmail(formLogin) {
      this.$refs[formLogin].validateField("email", err => {
        if (!err) {
          this.codeButton.codeButtonTxt = '发送中';
          this.codeButton.codeButtonState = true;
          // 延迟两秒发送请求
          setTimeout(() => {
            this.countDown(60); 
            let param = {mail:this.formLogin.email}
            sendMail(param).then(res => {
              let data = res.data;
              if(data.statusCode === 200) {
                this.$message({
                  message: data.message,
                  type: 'success'
                });
              }else {
                this.$message({
                  message: data.message,
                  type: 'error'
                });
              }
            }).catch(err => {
              console.log(err)
            });
          },2000);
        } else {
          return false;
        }
      });
    },
    
    /* 登录请求 */
    submitForm(formLogin) {
      this.$refs[formLogin].validate((valid) => {
        if (valid) {
          let param = {
            email: this.formLogin.email,
            password: this.formLogin.passwd,
            code: this.formLogin.code
          }
          adminLogin(param).then(res => {
            let data = res.data;
            if(data.statusCode === 200) {
              this.$message({
                message: data.message,
                type: 'success'
              });
              this.$router.replace('/admin');
            }else {
              this.$message({
                message: data.message,
                type: 'error'
              });
            }
          })
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
  #admin-login {
    background-color: #344a5f;
    height: 100vh;
    .admin-login {
      margin: auto;
      padding-top: 10rem;
      padding-bottom: 1rem;
      width: 30rem;
      box-sizing: border-box;
      border-radius: 10px;
      label {
        color: #fff;
      }
      .code-btn {
        width: 100%;
      }
      .submit {
        width: 100%;
        margin-top: 1rem;
      }
    }
    .login-error {
      padding-top: 200px;
      p {
        text-align: center;
        color: yellow;
        font-size: 1.2rem;
        line-height: 2rem;
        margin-bottom: 2rem;
        i{
          color: red;
          font-size: 3rem;
          line-height: 3rem;
        }
      }
    }
  }
  @media screen and (max-width:1200px) {
    .admin-login {
      display: none;
    }
    .login-error {
      display: block;
    }
  }
  @media screen and (min-width:1200px) {
    .admin-login {
      display: block;
    }
    .login-error {
      display: none;
    }
  }
</style>