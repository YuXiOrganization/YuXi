<template>
  <div class="login">
    <div class="login-wrap">
      <h2 class="login-wrap-title">Yu Xi Admin</h2>

      <el-form
        :label-position="labelPosition"
        :model="formdata"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" v-model="formdata.username">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="resource">
          <el-input placeholder="请输入密码" v-model="formdata.password">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="resource">
          <el-input
            popper-class="my-autocomplete"
            v-model="formdata.verify_code"
            placeholder="请输入验证码"
            @keyup.enter.native="getlogin"
          >
            <!-- <i class="el-icon-edit el-input__icon" slot="suffix"> </i> -->

            <el-image
              class="login-wrap-img"
              slot="suffix"
              :src="formdata.img"
              @click="getLoginVerifyCode()"
            ></el-image>
            <!-- <img :src="formdata.img" @click="getLoginVerifyCode()" /> -->
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="getlogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postAction, postFormAction } from "@/api/currencyApi";
import { sortFun, handleTree } from "@/utils/collectionMethods/arrayMethods";
export default {
  data() {
    return {
      labelPosition: "left",
      formdata: {
        username: "admin",
        password: "123456",
        img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
      // 表单数据

      menuListone: [
        {
          name: "adminSystem",
          path: "/adminSystem",
          hidden: false,
          meta: {
            title: "用户管理",
            icon: "el-icon-s-tools",
            noCache: false,
            link: null,
          },
          children: [
            {
              name: "admin",
              path: "/admin",
              hidden: false,
              meta: {
                title: "管理员列表",
                icon: "el-icon-s-tools",
                noCache: false,
                link: null,
              },
              children: [
                {
                  name: "admin",
                  path: "/admin",
                  hidden: false,
                  component: "adminSystem/admin",
                  meta: {
                    title: "管理员列表",
                    icon: "el-icon-s-tools",
                    noCache: false,
                    link: null,
                  },
                },
                {
                  name: "users",
                  path: "/users",
                  hidden: false,
                  component: "adminSystem/user",
                  meta: {
                    title: "管理员列表",
                    icon: "el-icon-s-tools",
                    noCache: false,
                    link: null,
                  },
                },
              ],
            },
            {
              name: "users",
              path: "/users",
              hidden: false,
              component: "adminSystem/user",
              meta: {
                title: "管理员列表",
                icon: "el-icon-s-tools",
                noCache: false,
                link: null,
              },
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getLoginVerifyCode();
  },
  methods: {
    // 图片验证码
    async getLoginVerifyCode() {
      const { data, success } = await postAction("/getLoginVerifyCode");
      if (success) {
        // console.log("data", data);
        this.formdata.img = data.img;
        this.formdata.jwt_verify_code = data.VERIFY_CODE;
      }
    },
    async getlogin() {
      //把Request Payload转为Form Data 案例
      const { msg, success } =await this.$store.dispatch("user/Login", this.formdata);

      console.log("success",success)
      if (success) {
        this.$message({
          message: msg,
          type: "success",
        });
        this.$router.push({ path: "/" });
      } else {
        this.$message({
          message: msg,
          type: "warning",
        });
      }

      // let testArray = [
      //   {
      //     children: [
      //       {
      //         children: [],
      //         iconcls: "2",
      //         id: "2",
      //         text: "2",
      //         url: "2",
      //       },
      //     ],
      //     iconcls: "1",
      //     id: "1",
      //     text: "1",
      //     url: "1",
      //   },
      //   {
      //     children: [
      //       {
      //         children: [],
      //         iconcls: "4",
      //         id: "4",
      //         text: "4",
      //         url: "4",
      //       },
      //     ],
      //     iconcls: "3",
      //     id: "3",
      //     text: "3",
      //     url: "3",
      //   },
      // ];
      // console.log("testArray", testArray);
      // let getfun = handleTree(testArray);

      // console.log("getfun", getfun);

      // if (this.formdata.username == "admin" && this.formdata.password == "123456") {
      //   localStorage.setItem("rightList", JSON.stringify(this.menuListone));
      //   localStorage.setItem("token", this.formdata.username);

      //   this.$store.dispatch("user/Login",this.menuListone)

      //   this.$router.push({ path: "/" });
      // } else {
      //   this.$message({
      //     message: "账号或密码错误",
      //     type: "warning",
      //   });
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #abd9b5;
  .login-wrap {
    border-radius: 8px;
    width: 300px;
    padding: 20px;
    background-color: rgb(255 255 255 / 0.2);
    box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;

    .el-input {
      display: flex;
      flex-direction: row;
      .el-input__suffix {
        border-radius: 4px;
        overflow: hidden;
        right: 0;
      }
      .login-wrap-img {
        margin-top: 1px;
        display: flex;
        // flex: auto;
        width: 80px;
        height: 38px;
      }
    }

    .login-wrap-title {
      padding: 10px 0 20px 0;
      font-weight: normal;
      text-align: center;
    }
  }
}
</style>
