<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <Form v-slot="{meta}">
      <div class="register">
        <h3>
          注册新用户
          <span class="go"
            >我有账号，去 <a href="login.html" target="_blank">登陆</a>
          </span>
        </h3>
        <div class="content">
          <label>手机号:</label>
          <Field
            name="phone"
            type="text"
            placeholder="请输入你的手机号"
            :rules="validatephone"
            v-model="phone"
          />
          <span class="error-msg"> <ErrorMessage name="phone" /></span>
        </div>
        <div class="content">
          <label>验证码:</label>
          <Field
            name="code"
            type="text"
            placeholder="请输入验证码" 
            :rules="validatecode"        
            v-model="code"
          />
          <!-- <input type="text" placeholder="请输入验证码" v-model="code" :rules="validatepassword" /> -->
          <button style="width: 109px; height: 38px" @click="getCode">
            获取验证码
          </button>
          <span class="error-msg"><ErrorMessage name="code"></ErrorMessage></span>
        </div>
        <div class="content">
          <label>登录密码:</label>
          <Field
            autocomplete='false'
            name="password"
            type="password"
            placeholder="请输入您的登录密码"
            v-model="password"
            :rules="validatepassword"
          />
          <span class="error-msg"><ErrorMessage name="password" /></span>
        </div>
        <div class="content">
          <label>确认密码:</label>
          <Field
          autocomplete='false'
          name="password1"
            type="password"
            placeholder="请输入确认密码"
            :rules="validatepassword1"
            v-model="password1"
          />
          <span class="error-msg"><ErrorMessage name="password1"></ErrorMessage></span>
        </div>
        <div class="controls">
          <Field name="m1" type="checkbox" v-model="agree" :rules="validateagree"
           :value="true"/>
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg"><ErrorMessage name="m1"></ErrorMessage></span>
        </div>
        <div class="btn">
          <button @click="finishRegister(meta.valid)">完成注册</button>
        </div>
      </div>
    </Form>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>
<script>
// import { veeForm, Form, Field, ErrorMessage } from 'vee-validate'
import { Form as VeeForm, Field, ErrorMessage ,Form} from 'vee-validate';
export default {
  name: 'Register',
  components: {
    Form,
    Field,
    ErrorMessage,
    VeeForm
  },
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      password1: '',
      agree: '',
      name: '',
    }
  },
  methods: {
    async getCode() {
      try {
        let { phone } = this
        phone && (await this.$store.dispatch('getCode', phone))
        this.code = this.$store.state.user.codeInfo
      } catch (error) {
        alert(error.message)
      }
    },
    async finishRegister(s) {
      if (s) {
        const { phone, password, password1, code } = this
      // console.log(this)
      try {
        if (phone && code && password == password1) {
          await this.$store.dispatch('getRegister', { phone, password, code })
          this.$router.push('/login')
        }
      } catch (error) {
        alert(error.message)
      }
      }
      
    },
    validatephone(value) {
      // if the field is empty
      if (!value) {
        return '请输入手机号！'
      }
      // if the field is not a valid email
      const regex =/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/i
      if (!regex.test(value)) {
        return '手机号格式无效！'
      }
      // All is good
      return true
    },
    validatepassword(value) {
      // if the field is empty
      if (!value) {
        return '请输入密码！'
      }
      // if the field is not a valid email
      const regex =/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/i
      if (!regex.test(value)) {
        return '请输入8-16位格式的密码！'
      }
      // All is good
      return true
    },
    validatecode(value) {
      // if the field is empty
      if (!value) {
        return '请输入验证码！'
      }
      // if the field is not a valid email
      const regex =/^\d{6}$/i
      if (!regex.test(value)) {
        return '请输入6位验证码！'
      }
      // All is good
      return true
    },
    validatepassword1(value) {
      // if the field is empty
      if (!value) {
        return '请输入确认密码！'
      }
      // if the field is not a valid email
      // const regex =/^\d{6}$/i
      if (value!=this.password) {
        return '密码不一致！'
      }
      // All is good
      return true
    },
    validateagree(value) {
      if (!value) {
        return '请勾选同意协议！'
      }
      return true
    },
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
