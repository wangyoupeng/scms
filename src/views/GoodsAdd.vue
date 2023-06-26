<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="图片" prop="imageUrl">
        <MyUploadImage @upload-image-success="handleUploadImageSuccess"></MyUploadImage>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input type="number" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="stock">
        <el-input type="number" v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import MyUploadImage from '../components/MyUploadImage.vue';
  export default {
    components: {
      MyUploadImage
    },
    data() {
      return {
        form: {
          id: 0,
          imageUrl: '',
          name: '',
          description: '',
          price: 0,
        },
        rules: {
          imageUrl: [
            {  message: '请上传图片', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入商品描述', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 5 到 100 个字符', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            // { type: 'number', message: '必须为数字值' }
          ],
          stock: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            // { type: 'number', message: '必须为数字值' }
          ],
        }
      }
    },
    methods: {
      handleUploadImageSuccess(imageInfo){
        this.form.imageUrl = imageInfo.imageUrl || ""
      },
      submitForm(formName) {
        // console.log("-----111------- formName: ", formName)
        // console.log("--------22---- this.$refs:", typeof this.$refs, this.$refs)
        this.$refs[formName].validate(valid => {
          if (valid) {
            const forData = new FormData();
            forData.append('imageUrl', this.form.imageUrl)
            forData.append('name', this.form.name)
            forData.append('description', this.form.description)
            forData.append('price', this.form.price)
            forData.append('stock', this.form.stock)
            // 发送创建商品请求
            this.$axios
            .post("/api/goods/add",forData)
            .then(res => {
              console.log("--------333---- axios res:: ", res)
              this.$message.success('创建商品成功')
              setTimeout(() => {
                this.$router.push('/goods')
              }, 500);
              
            })
            .catch(err => {
              this.$message.success('创建商品失败')
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