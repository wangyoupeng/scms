<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="图片" prop="imageUrl">
        <MyUploadImage @upload-image-success="handleUploadImageSuccess" :imageUrlOld="this.$route.params.goodsItem ? this.$route.params.goodsItem.imageUrl : ''"></MyUploadImage>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="商品价格/元" prop="price">
        <el-input v-model="form.price" :value="form.price | decimalFilter"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="stock">
        <el-input type="number" v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">修改</el-button>
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
    filters: {
    decimalFilter: function(value) {
        if (!isNaN(value)) {
          return parseFloat(value).toFixed(2);
        }
        return value;
      }
    },
    data() {
      return {
        form: {
          id: 0,
          imageUrl: '',
          name: '',
          description: '',
          price: 0,
          stock: 0,
        },
        editItem: {},
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
    create(){
      let editItem = this.$route.params.goodsItem;
      editItem.price = this.$route.params.goodsItem.price / 100
      this.form = {... editItem}
      this.editItem = {... editItem}
      
    },
    activated() {
      let editItem = this.$route.params.goodsItem;
      editItem.price = this.$route.params.goodsItem.price / 100
      this.form = {... editItem}
      this.editItem = {... editItem}
    },
    methods: {
      handleUploadImageSuccess(imageInfo){
        this.form.imageUrl = imageInfo.imageUrl || ""
      },
      // formatPrice(price) { // 分转元
      //   return (price / 100).toFixed(2)
      // },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const forData = {};
            forData.id = this.form.id
            if(this.form.imageUrl != this.editItem.imageUrl) forData.imageUrl = this.form.imageUrl
            if(this.form.name != this.editItem.name) forData.name = this.form.name
            if(this.form.description != this.editItem.description) forData.description = this.form.description
            if(this.form.price != this.editItem.price) forData.price = this.form.price
            if(this.form.stock != this.editItem.stock) forData.stock = this.form.stock
            if(Object.keys(forData).length < 2) {
              this.$message.success('无修改..')
              return
            }
            // 发送创建商品请求
            this.$axios
            .put("/api/goods/edit",forData)
            .then(res => {
              console.log("--------333---- axios res:: ", res)
              this.$message.success('修改成功')
              setTimeout(() => {
                // this.$router.go(-1) //
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