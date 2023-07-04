<template>
  <div class="register">
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      }
    };
  },
  created() {
    this.resetForm()
  },
  methods: {
    submitForm() {
      console.log("---this.form: ", this.form)
      if(!this.form.username){
        this.$message.error('请填写 用户名')
        return
      }
      if(!this.form.password){
        this.$message.error('请填写 密码')
        return
      }
      if(this.form.password != this.form.confirmPassword){
        console.log("")
        this.$message.error('密码不一致 ！')
        return
      }

      this.$axios.post('/api/regist', { ...this.form }).then((res) => {
          // console.log("------ /api/regist resss: ", res)
          if(res.data.message != "ok"){
            if(res.data.token) localStorage.setItem('token', res.data.token)
            if(res.data.userInfo) localStorage.setItem('userInfo', res.data.userInfo)
            this.$message.error(res.data.message || "注册失败")
          } else {
            this.$message.success('注册成功')
              setTimeout(() => {
                this.$router.push('/login')
              }, 500);
          }
        });

    },
    resetForm() {
      this.from = {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      }
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}
</style>