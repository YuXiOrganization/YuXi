<template>
  <div class="login">
    <div class="login-wrap">
      <h2 class="login-wrap-title">Yu Xi Admin</h2>

      <el-form :label-position="labelPosition" :model="formdata">
        <el-form-item>
          <el-input placeholder="请输入账号" v-model="formdata.username">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" v-model="formdata.password">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
          <!-- <el-input type="password" v-model="formdata.password"></el-input> -->
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="getlogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
      formdata: {
        username: "admin",
        password: "123456",
      },
      // 表单数据

      menuListone: [
        {
          name: "adminSystem",
          path: "/adminSystem",
          hidden: false,
          component: "/system/user/index",
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
      ],
    };
  },
  created() {},
  methods: {
    async getlogin() {
      //   let option = {
      //     account: this.formdata.username,
      //     password: this.formdata.password,
      //   };
      //   const res = await this.api.user.login(option);

      //   const { msg } = res;
      //   if (res.code == 1) {
      //     localStorage.setItem("token", res.msg);
      //     window.sessionStorage.setItem("token", res.msg);
      //     this.$router.push("/");
      //     console.log("csc");

      //     localStorage.setItem("rightList", JSON.stringify(this.menuListone));
      //     this.$message({
      //       message: msg,
      //       type: "success",
      //     });
      //   } else {
      //     this.$message({
      //       message: msg,
      //       type: "warning",
      //     });
      //   }

      if (this.formdata.username == "admin" && this.formdata.password == "123456") {
        localStorage.setItem("rightList", JSON.stringify(this.menuListone));
        localStorage.setItem("token", this.formdata.username);
        this.$router.push({ path: "/" });
      } else {
        this.$message({
          message: "账号或密码错误",
          type: "warning",
        });
      }
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

    .login-wrap-title {
      padding: 10px 0 20px 0;
      font-weight: normal;
      text-align: center;
    }
  }
}
</style>
