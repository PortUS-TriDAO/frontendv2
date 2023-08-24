<template>
  <div class="main-width page-project-detail">
    <img
      src="https://dynamic-kvl-assets.dappradar.com/b99dd80ca18445f9bf2bb121dc9fb968.jpg"
      alt=""
    />
    <div class="project-info">
      <img
        src="https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png"
        alt=""
      />
      <div class="project-info-detail">
        <h3>Farmers World</h3>
        <span>Stephen Enzo</span>
        <p>Farmers World is the first farming game to function on the NFTs platformRead more.</p>
      </div>
    </div>
    <el-divider />
    <p class="project-desc">
      Farmers World is the first farming game to function on the NFTs platform. Pick for yourself
      suitable tools, exploit various resourcesbuy land to build enormous farms, and enjoy the
      fascinating experiences of a farmer working in Farmers World’s Ecosystem.
    </p>
    <div class="swiper">
      <el-carousel trigger="click" height="219px">
        <el-carousel-item v-for="item in 4" :key="item">
          <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
          <div class="swiper-item-box">
            <img
              src="https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-image1_0dde67f18f3585e4cd5f70386cc1df88.png"
              alt=""
            />
            <img
              src="https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-image2-500x315_ae97fa670d1af1c025ce23ad1fc12856.png"
              alt=""
            />
            <img
              src="https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-image3-500x315_e5b4ceeb96c05e25adfb058c9fe3cb23.png"
              alt=""
            />
            <img
              src="https://dashboard-assets.dappradar.com/document/20005/hooked-dapp-other-bsc-image2-500x315_dd3a0ade17b2cc54e0a783b6ee7fa2b4.png"
              alt=""
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.page-project-detail {
  min-width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 70px;
  > img {
    width: 100%;
    height: 300px;
    border-radius: 10px;
  }
  .project-info {
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    > img {
      width: 160px;
      height: 160px;
      border-radius: 10px;
      margin-right: 24px;
    }
    &-detail {
      position: relative;
      width: 100%;
      height: 160px;
      > h3 {
        font-size: 28px;
        font-weight: bold;
        line-height: 150%;
        margin-bottom: 9px;
      }
      > span {
        font-size: 20px;
        font-weight: 500;
        line-height: 150%;
        color: #333333;
      }
      > p {
        font-size: 16px;
        font-weight: normal;
        line-height: 150%;
        color: #666;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
  .project-desc {
    margin-top: 40px;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
  .swiper {
    margin-top: 30px;
    height: 219px;
    .swiper-item-box {
      display: flex;
      flex: 1;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      > img {
        width: 329px;
        height: 219px;
        border-radius: 10px;
      }
    }
  }
}
</style>
