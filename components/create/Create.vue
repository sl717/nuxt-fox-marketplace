<template>
  <div class="create-section">
    <h1>Create your NFT for marketplase</h1>
    <div class="create-box">
      <p>Please input the metadata</p>
      <el-input v-model="metadata" placeholder="Enther or replace the meta url" />
      <div class="meta-form">
        <v-skeleton-loader
          width="210"
          height="240"
          type="image"
          v-if="isLoading"
        ></v-skeleton-loader>
        <img v-else src="/img/default.jpg" alt="">
        <div class="meta-content">
          <p>Title</p>
          <v-skeleton-loader
            width="210"
            height="30"
            type="image"
            v-if="isLoading"
          ></v-skeleton-loader>
          <h3 v-else class="title">
            Fox Top Holder Coin
          </h3>
          <p>Description</p>
          <v-skeleton-loader
            width="210"
            height="80"
            type="sentences@4"
            v-if="isLoading"
          ></v-skeleton-loader>
          <h3 v-else>
            This 3D Fox Top Holder Coin is yours to show you're part of the FOX family, holding proud!
          </h3>
        </div>
      </div>
      <div class="control-params">
        <div class="params-item">
          <p>Price :</p>
          <el-input v-model="price" type="number" />
        </div>
        <div class="params-item">
          <p>Quantity :</p>
          <el-input v-model="quantity" type="number" />
        </div>
      </div>
      <div class="create-action">
        <button class="save">
          Save
        </button>
        <button>
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      metadata: '',
      price: '',
      quantity: '',
      description: '',
      isLoading: true
    }
  },
  mounted () {
  },
  inject: {
    theme: {
      default: { isDark: false }
    }
  }
}
</script>
<style lang="scss" scoped>
.create-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 60px;
  h1 {
    text-align: left;
    padding-top: 100px;
  }
  .create-box {
    width: 500px;
    .meta-form {
      display: flex;
      margin-top: 30px;
      img {
        width: 210px;
        height: 240px;
        object-fit: cover;
        border-radius: 4px;
        box-shadow: 0 4px 10px #00000059;
      }
      .meta-content {
        margin-left: 20px;
        text-align: left;
        width: calc(100% - 230px);
        p {
          font-size: 12px;
        }
        .title {
          font-size: 20px;
          color: #fff;
          margin: 0;
        }
      }
    }
    p {
      padding: 10px 0;
      font-size: 1rem;
      color: #fff;
      text-align: left;
    }
  }
  .create-action {
    padding-top: 30px;
    button {
      border: none;
      background: #ccc;
      padding: 10px 20px;
      font-size: 1rem;
      min-width: 120px;
      border-radius: 4px;
      margin: 0 10px;
      font-weight: bold;
      color: #333;
      &:hover {
        background: #a5a5a5;
      }
    }
    .save {
      background: olivedrab;
      color: #fff;
      &:hover {
        background: #527015;
      }
    }
  }
  .control-params {
    display: flex;
    .params-item {
      width: calc(50% - 10px);
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
  }
}
@media (max-width: 576px) {
  .create-box {
    width: calc(100% - 30px) !important;
    margin-left: 15px;
    margin-right: 15px;
    .meta-form {
      flex-direction: column;
      align-items: center !important;
      .meta-content {
        margin-left: 0 !important;
      }
    }
  }
}
</style>
