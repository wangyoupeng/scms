<!--
 * @Description: 菜单组件，用于首页商品展示模块的右上角菜单
 -->
<template>
<el-menu :default-openeds="['1', '3']">
  <el-submenu index="1">
    <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
    <el-menu-item-group>
      <el-menu-item index="1-1" @click="jump_to_goods">商品列表</el-menu-item>
      <el-menu-item index="1-2" @click="jump_to_categories">分类管理</el-menu-item>
      <el-menu-item index="1-3" @click="jump_to_groups">分组管理</el-menu-item>
      <!-- <el-menu-item index="1-2">商品列表</el-menu-item> -->
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="2">
    <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
    <el-menu-item-group>
      <el-menu-item index="2-1">权限</el-menu-item>
      <el-menu-item index="2-2">角色</el-menu-item>
      <el-menu-item index="2-3">用户</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
    <el-menu-item-group>
      <el-menu-item index="2-1" @click="jump_to_orders">订单列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
  props: ["val"],
  name: "MyMenu",
  data() {
    return {
      activeClass: 1
    };
  },
  methods: {
    // 通过mouseover事件控制当前显示的商品分类，1为该类别的热门商品
    mouseover(e, val) {
      this.activeClass = val;
    },
    jump_to_goods() {
      this.$router.push({
        path: '/goods'
      })
    },
    jump_to_orders() {
      this.$router.push({
        path: '/orders'
      })
    },
    jump_to_categories() {
      this.$router.push({
        path: '/categories'
      })
    },
    jump_to_groups() {
      this.$router.push({
        path: '/groups'
      })
    },
  },
  watch: {
    // 向父组件传过去当前要显示的商品分类，从而更新商品列表
    activeClass: function (val) {
      this.$emit("fromChild", val);
    }
  }
};
</script>

<style scoped>
</style>
