
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload/img"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  export default {
    name: 'MyUploadImage',
    props: {
      imageUrlOld: String
    },
    data() {
      return {
        imageUrl: '', 
      };
    },
    created(){
      this.imageUrl = this.imageUrlOld
    },
    activated() {
      this.imageUrl = this.imageUrlOld
    },
    methods: {
      handleAvatarSuccess(res) {
        let fullImageUrl = `http://localhost:3000${res.data.url}`
        this.imageUrl = fullImageUrl
        this.$emit('upload-image-success', {
          imageUrl: fullImageUrl, 
          time: new Date()
        });
      },
      beforeAvatarUpload(file) {
        const typeFlag = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!typeFlag) {
          this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return typeFlag && isLt2M;
      }
    }
  }
</script>

