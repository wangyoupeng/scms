<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="分组名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">创建分组</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    components: {},
    decimalFilter: function(value) {
      if (!isNaN(value)) {
        return parseFloat(value).toFixed(2);
      }
      return value;
    },
    data() {
      return {
        form: {
          id: 0,
          name: '',
          description: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
          ],
          description: [
            { required: false, message: '请输入描述', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const forData = new FormData();
            forData.append('name', this.form.name)
            forData.append('description', this.form.description)
            // 发送创建请求
            this.$axios
            .post("/api/groups/add",forData)
            .then(res => {
              console.log("--------333---- axios res:: ", res)
              this.$message.success('创建成功')
              setTimeout(() => {
                this.$router.push('/groups')
              }, 500);
              
            })
            .catch(err => {
              this.$message.success('创建失败')
              return Promise.reject(err);
            });
          } else {
            this.$message.error('请填写正确的信息')
          }
        })
      }
    }
  }
</script>

<style>
  /* 修改 el-input 的宽度 */
  .el-input {
    width: 300px;
  }
</style>