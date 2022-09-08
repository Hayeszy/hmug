<template>
  <view class="goods_detail">
    <!-- 详情页轮播图 -->
    <swiper indicator-dots circular>
      <swiper-item v-for="(item, i) in goods_info.pics">
        <image @click="previewImg(i)" :src="item.pics_sma_url"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price | toFixed}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>

    <!-- 商品介绍 -->
    <!-- <view v-html="goods_info.goods_introduce"></view> -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航 -->
    <!-- <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" /> -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon url="/pages/cart/cart" link-type="switchTab" icon="cart-o" text="购物车" info="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button text="加入购物车" type="warning" />
      <van-goods-action-button text="立即购买" />
    </van-goods-action>
  </view>
</template>

<script>
  import {
    getGoodsDetail
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        goods_info: {},
        options: [{
          icon: 'headphones',
          text: '客服'
        }, {
          icon: 'shop',
          text: '店铺',
          // info: 2,
          // infoBackgroundColor:'#007aff',
          // infoColor:"red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      async loadGoodsDetail(id) {
        const res = await getGoodsDetail(id)
        res.goods_introduce = res.goods_introduce.replace(/<img /g, '<img style="display: block"')
        res.goods_introduce = res.goods_introduce.replace(/\.webp/g, '.jpg')
        this.goods_info = res
      },
      // 预览图片
      previewImg(index) {
        const urls = this.goods_info.pics.map(item => item.pics_big_url)
        uni.previewImage({
          current: index,
          urls,
          loop: true
        })
      }
    },
    onLoad(options) {
      this.loadGoodsDetail(options.id)
    }
  }
</script>

<style lang="scss">
  .goods_detail {
    padding-bottom: 50px;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域的样式
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    // 运费
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
</style>
