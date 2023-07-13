<template>
  <div class="categories-manage">
    <div class="search-bar">
      <el-input placeholder="分类名称" v-model="filterText"></el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <div class="create-bar">
        <el-button type="primary" @click="handleCategoriesAdd">新建</el-button>
      </div>
      
    </div>
      
    <el-table :data="categoriesList" style="width: 100%">
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
      style="margin-top: 20px;"
      layout="total,prev,pager,next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>




<script>
export default {
  data() {
    return {
      total: 0,
      categoriesList: [],
      filterText: '',
      pageSize: 5,
      currentPage: 1,
      label: '分类图片'
    }
  },
  created() {
    // this.methods.handleSearch()
    const params = { filterText: this.filterText, pageSize: this.pageSize, currentPage: this.currentPage }
    this.$axios.get('/api/categories',{ params })
      .then(res => {
        this.categoriesList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log("errorrrr:::: ", error);
      });
  },
  computed: { // 计算
    pagecategoriesList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.filtercategoriesList.slice(start, end)
    }
  },
  methods: {
    handleSearch() {
      const params = { filterText: this.filterText, pageSize: this.pageSize, currentPage: this.currentPage }
      this.$axios.get('/api/categories',{ params })
      .then(res => {
        console.log('============ categoriesItem list res: ', res.data.list)
        this.categoriesList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleEdit(categoriesItem) {
      console.log('============ categoriesItem to edit', categoriesItem)
      this.$router.push({
        name: 'categoriesEdit',
        params: {
          categoriesItem
        }
      })
      // 分类编辑逻辑
    },
    handleDelete(categories_id) {
      // 分类删除逻辑
      this.$axios.post('/api/categories/delete',{ categories_id })
      .then((res) => {
        // this.$router.push('/categories')
        if(res.data.message == 'ok'){
          this.$message.success('删除成功')
          this.handleSearch()
        }
       
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleCategoriesAdd() {
      this.$router.push('/categories/add')
    },
    handleCurrentChange(val) {
      // console.log('---val:', val)
      this.currentPage = val
      this.handleSearch()
    },
    formatPrice(price) { // 分转元
      return (price / 100).toFixed(2)
    },
  },
  // 在从详情页返回时重新加载列表数据
  activated() {
    this.handleSearch();
  }
}
</script>


<style scoped>
  .categories-manage {
  /* padding: 20px; */
}

.search-bar {
  margin-bottom: 20px;
}
.search-bar .el-input{
  width: 200px;
  margin-right: 5px;
}

.create-bar {
  float: right;
  margin-right: 10px;
}

.categories-img {
  width: 100%;
  height: 80px;
  object-fit: contain;
}
</style>

