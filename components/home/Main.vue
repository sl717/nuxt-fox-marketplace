<template>
  <div id="hero" class="section is-fullheight">
    <div class="hero-body box flexheight">
      <div class="container">
        <h1 class="title">
          Shop
        </h1>
        <p class="subtitle">Welcome to the Fox NFT Marketplace Alpha (v0.9)! This is an early release candidate made available for viewing and using by our FOX users. To acquire any of our NFTs, click the Acquire button.</p>
        <div class="filter">
          <div class="sort">
            <label for="sort">Sort by: </label>
            <el-select v-model="value" @change="onChange" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search">
            <el-input placeholder="Search..." v-model="input"></el-input>
          </div>
          
        </div>
        <div v-if="validProduct" class="nft-fox-product">
          <div v-for="(item, index) in validProduct" :key="index" class="nft-fox-product-item">
            <ProductItem :productData="item" :buyProduct="onBuyProduct" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductItem from '../product/ProductItem'
export default {
  name: 'Main',
  components: { ProductItem },
  data () {
    return {
      tableData: [],
      productList: [],
      options: [{
          value: 'inc',
          label: 'Low Price'
        }, {
          value: 'desc',
          label: 'High Price'
        }],
      value: 'inc',
      input: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters({ getters: 'genesis/allGenesis', productsGetter: 'products/allProducts' }),
    validProduct () {
      const filterData = this.productList.filter(i => (i.quantity > 0 || i.isAuction) && (i.title.toLowerCase().includes(this.input.toLowerCase())))
      const sortedData = filterData.sort((a, b) => {
          if (this.value === 'inc') {
            return a.price - b.price 
          } else {
            return b.price - a.price
          }
        })
      return sortedData
    }
  },
  async mounted () {
    this.loading = true
    const loadingComponent = this.$buefy.loading.open({
                    container: null
                })
    await this.getProducts()
    this.productList = this.productsGetter
    this.loading = false
    loadingComponent.close()
  },
  methods: {
    ...mapActions({ getGenesis: 'genesis/getGenesis', getProducts: 'products/getProducts' }),
    switchToComponent (section) {
      window.location.href = section
    },
    async onBuyProduct () {
      await this.getProducts()
      this.productList = this.productsGetter
    },
    onChange () {
      console.log(this.value)
    }
  }
}
</script>

<style>
.heroButtomButtons:hover {
  transform: scale(1.1);
}

.hero-body {
  margin-top: 50pt;
}

.flexheight {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height : 80vh;
}

.nft-fox-product{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 90%;
  margin: auto;
}

.nft-fox-product-item{
  margin-bottom: 50px;
}

.stake-table-wrap{
  color: #000;
  word-break: break-all;
  word-wrap: break-word !important;
}
p{
  color: #000;
}

.filter{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
}

.filter>div{
  padding: 20px;
}

.filter .sort label{
  color: #000;
}

.filter .search{
  width: 257px;
}

@media (max-width: 540px) {
  .title{
    font-size: 20px!important;
  }
  .subtitle{
    font-size: 16px!important;
  }
  .filter{
    flex-direction: column;
    align-items: center;
  }
}
</style>
