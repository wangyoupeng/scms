<!--
@Description: 项目根组件
-->

<template>
  <div id="app" name="app">
    <el-container>
      <el-header>
        <div class="logo"> C M S </div>
      </el-header>
      <el-container style="position: fixed;top: 60px;bottom:60px;right:0;left:0">
        <el-aside width="200px" v-if="show_menu" >
          <MyMenu></MyMenu>
        </el-aside>
        <el-main style="width:100%;padding-bottom: 160px;">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
      <el-footer style="position: fixed;bottom: 0;width:100%">
        八维版权所有 &copy; 2023-2025
      </el-footer>
    </el-container>
    
    
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import MyMenu from "./components/MyMenu.vue";

export default {
  beforeUpdate() {
    console.log("---------this.$route.fullPath:: ",this.$route.fullPath)
    this.show_menu =( this.$route.fullPath != "/login" && this.$route.fullPath != "/")
  },
  components: {
    "MyMenu": MyMenu,
  },
  data() {
    return {
      register: false, // 是否显示注册组件
      visible: false, // 是否退出登录
      show_menu : true // !(this.$route.path == "/login" || this.$route.path == "/"),
    };
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem("user")));
    }
  },
  computed: {
    ...mapGetters(["getUser", "getNum"])
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function(val) {
      if (val === "") {
        // 用户没有登录
        this.setShoppingCart([]);
      } else {
        // 用户已经登录,获取该用户的购物车信息
        this.$axios
          .post("/api/user/shoppingCart/getShoppingCart", {
            user_id: val.user_id
          })
          .then(res => {
            if (res.data.code === "001") {
              // 001 为成功, 更新vuex购物车状态
              this.setShoppingCart(res.data.shoppingCartData);
            } else {
              // 提示失败信息
              this.notifyError(res.data.msg);
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
    }
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
    login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // 退出登录
    logout() {
      // 删除 token
    },
  }
};
</script>

<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  /* float: right; */
  /* left:200px; */
  background-color: #E9EEF3;
  color: #333;
  min-height: 700px;
  padding: 20px 0;

  left: 0;
  padding-left: 20px;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 顶部导航栏CSS */
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #1d1d1d1d;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ff6700;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}
/* 顶部导航栏CSS END */

/* 顶栏容器CSS */
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}
.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
  margin-right: 100px;
}
.el-header .so {
  margin-top: 10px;
  width: 300px;
  float: right;
}
/* 顶栏容器CSS END */

.el-aside {
    background-color: #333;
    color: #333;
    text-align: center;
    position: relative;
    z-index: 9999;
  }


/* body > .el-container {
    margin-bottom: 40px;
  } */
  .el-aside {
    line-height: 700px;
    background-color: #333;
  }

  .el-header, .el-footer {
    background-color: #ccc;
    color: #333;
    text-align: center;
    line-height: 60px;
  }


</style>