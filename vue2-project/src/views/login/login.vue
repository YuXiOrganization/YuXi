<template>
  <div class="loginbao">
    <!-- <img class="loginimg" src="@/assets/image/login.jpg" alt="无法显示" /> -->
    <div class="loginbaobao">
      <div class="login-wrap">
        <el-form
          class="login-form"
          :label-position="labelPosition"
          label-width="80px"
          :model="formdata"
        >
          <h2>用户登录</h2>
          <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formdata.password"></el-input>
          </el-form-item>
          <el-button class="login-btn" type="primary" @click="getlogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formdata: {
        username: "",
        password: "",
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
<style scoped>
.loginbao {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.loginbaobao {
  position: absolute;
  width: 100%;
  height: 100%;
}
.loginimg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.login-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-btn {
  margin: 20px 0 10px 0;
  width: 100%;
}
</style>
