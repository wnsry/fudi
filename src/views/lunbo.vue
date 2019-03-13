<template>
  <div class="lunbo">
    <div class="main">
      <div class="swiper-container gallery-top">
        <div class="swiper-wrapper">
          <!-- <div class="swiper-slide" :style="'background-image:url(\'static/img/'+btnscard.back+'\')'"><img :src="banner" alt=""></div> -->
          <div class="swiper-slide" v-for="(it,i) in tulist" :key="i" :style="'background-image:url('+it.pic+')'"></div>
          <!-- <div class="swiper-slide" v-for="(it,i) in tulist" :key="i">
            <img :src="it.pic" alt="">
          </div> -->
          <!-- <div class="swiper-slide" :style="'background-image:url('+left+')'"></div>
          <div class="swiper-slide" :style="'background-image:url('+goods+')'"></div>
          <div class="swiper-slide" :style="'background-image:url('+right+')'"></div> -->
          <!-- <div class="swiper-slide"><img :src="left" alt=""></div>
          <div class="swiper-slide"><img :src="goods" alt=""></div>
          <div class="swiper-slide"><img :src="right" alt=""></div> -->
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-next swiper-button-white"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
      </div>
      <div class="swiper-container gallery-thumbs">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(it,i) in tulist" :key="i" :style="'background-image:url('+it.pic+')'"></div>
          <!-- <div class="swiper-slide" v-for="(it,i) in tulist" :key="i">
            <img :src="it.pic" alt="">
          </div> -->
          <!-- <div class="swiper-slide" :style="'background-image:url('+left+')'"></div>
          <div class="swiper-slide" :style="'background-image:url('+goods+')'"></div>
          <div class="swiper-slide" :style="'background-image:url('+right+')'"></div> -->
          <!-- <div class="swiper-slide"><img :src="banner" alt=""></div>
          <div class="swiper-slide"><img :src="left" alt=""></div>
          <div class="swiper-slide"><img :src="goods" alt=""></div>
          <div class="swiper-slide"><img :src="right" alt=""></div> -->
        </div>
      </div>
    </div>
    <div class="bj" @click="fanhui()"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

import left from 'Imgs/left.png'
import right from 'Imgs/right.png'
import goods from 'Imgs/goods.png'
import banner from 'Imgs/banner.png'

export default {
    data () {
        return {
            left,
            right,
            goods,
            banner,
            zuopinid:0,
            tulist:[]
        }
    },
    mounted() {
      this.zuopinid = this.$route.params.id
      this.$post(this.$api.picTurns,{waresId:this.zuopinid}).then(res=>{
        this.tulist=res.data
        this.$nextTick(() => {  // 下一个UI帧再初始化swiper
          this.swp();
        });
      })
    },
    methods:{
      swp(){
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true
        });
        var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            thumbs: {
              swiper: galleryThumbs
            }
        });
      },
      fanhui(){
        this.$router.back()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lunbo{
  width: 1024px;
  margin: 0 auto;
  height: 768px;
  position: relative;
  .main{
    position: absolute;
    top: 68px;
    left: 62px;
    z-index: 13;
  }
  .bj{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
  }
}
.swiper-container {
      width: 900px;
      height: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .swiper-slide {
      background-size: cover;
      background-position: center;
    }
    // .gallery-top {
    //   height: 80%;
    //   width: 100%;
    // }
    .gallery-thumbs {
      height: 50px;
      box-sizing: border-box;
      padding: 10px 0;
    }
    .gallery-thumbs .swiper-slide {
      width: 50px;
      height: 50px;
      opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-thumb-active {
      opacity: 1;
    }
</style>

