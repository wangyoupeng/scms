<template>
  <div class="goods-manage">
    <div class="search-bar">
      <el-input placeholder="商品名称" v-model="filterText"></el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <div class="create-bar">
        <el-button type="primary" @click="handleGoodsAdd">新建</el-button>
      </div>
      
    </div>
      
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column :label="label">
        <template slot-scope="{ row }">
          <img :src="row.imageUrl" class="goods-img">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <!-- <el-table-column prop="price" label="商品价格"></el-table-column> -->
      <el-table-column prop="price" label="商品价格/¥">
        <template slot-scope="{ row }">
          {{ formatPrice(row.price) }}
        </template>
      </el-table-column>

      <el-table-column prop="stock" label="商品库存"></el-table-column>
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
      goodsList: [],
      filterText: '',
      pageSize: 5,
      currentPage: 1,
      label: '商品图片'
    }
  },
  created() {
    // this.methods.handleSearch()
    const params = { filterText: this.filterText, pageSize: this.pageSize, currentPage: this.currentPage }
    this.$axios.get('/api/goods',{ params })
      .then(res => {
        this.goodsList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log("errorrrr:::: ", error);
      });
  },
  computed: { // 计算
    pageGoodsList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.filterGoodsList.slice(start, end)
    }
  },
  methods: {
    handleSearch() {
      const params = { filterText: this.filterText, pageSize: this.pageSize, currentPage: this.currentPage }
      this.$axios.get('/api/goods',{ params })
      .then(res => {
        this.goodsList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleEdit(goodsItem) {
      console.log('============ goodsItem to edit', goodsItem)
      this.$router.push({
        name: 'GoodsEdit',
        params: {
          goodsItem
        }
      })
      // 商品编辑逻辑
    },
    handleDelete(goods_id) {
      // 商品删除逻辑
      this.$axios.delete('/api/goods/delete',{ goods_id })
      .then((res) => {
        // this.$router.push('/goods')
        if(res.data.message == 'ok'){
          this.$message.success('删除成功')
          this.handleSearch()
        }
       
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleGoodsAdd() {
      this.$router.push('/goods/add')
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
  .goods-manage {
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

.goods-img {
  width: 100%;
  height: 80px;
  object-fit: contain;
}
</style>

