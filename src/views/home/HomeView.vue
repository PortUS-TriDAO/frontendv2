<template>
  <div class="homeBox">
    <div class="banner">
      <img class="center Vector2" src="../../assets/home/Vector2.png" alt="" />
      <div class="text">
        <div class="mask topDownCenter"></div>
        <i class="leftRightCenter title"
          >WHAT IS <span style="color: #00f6ea">PORTUS</span>
          <img class="Frame113" src="../../assets/home/Frame113.png" alt="" />
        </i>
        <p class="leftRightCenter langText">
          We are the first decentralized e-commerce network facilitated by NFT smart contract
          technology. Vendors and Influencers can collaborate seamlessly, without the need to build
          up a formal business contact.<br />
          <span class="readMore"> Read More </span>
        </p>
      </div>
      <div class="img">
        <div class="blur"></div>
        <div class="blur2"></div>
        <div class="SnBox center">
          <img class="Snipaste center" src="../../assets/home/S5.png" alt="" />
          <div class="block1">
            <h3>12K</h3>
            <p>Games</p>
          </div>
          <div class="block2">
            <h3>14K</h3>
            <p>Users</p>
          </div>
        </div>
      </div>
    </div>
    <div class="operate">
      <div class="operateTitle">
        <i class="title">HOW WE <span style="color: #00f6ea">OPERATE</span> </i>
        <el-button class="btn topDownCenter"
          >SEE ALL <el-icon class="el-icon--right"> <Right /> </el-icon
        ></el-button>
      </div>
      <center>
        <div class="imgBox">
          <div class="imgItem" v-for="imgItem in data.imgList" :key="imgItem.id">
            <center>
              <img :src="imgItem.img" alt="" />
            </center>
            <h4>{{ imgItem.title }}</h4>
            <p>{{ imgItem.text }}</p>
            <el-button class="btn">Read More</el-button>
          </div>
        </div>
      </center>
    </div>
    <div class="advantages">
      <center>
        <i class="title">WHY & <span style="color: rgb(0, 246, 234)">ADVANTAGES</span></i>
      </center>
      <div class="textBox">
        <span v-for="(advantage, index) in data.advantList" :key="index">
          <img class="topDownCenter" :src="advantage.img" alt="" />
          <div class="box center">
            <i>{{ advantage.title }}</i>
            <p>{{ advantage.text }}</p>
          </div>
        </span>
      </div>
    </div>
    <div class="milestones">
      <center><i class="title">MILESTONES</i></center>
      <div class="carouBox" style="">
        <el-carousel interval="5000" height="auto" autoplay>
          <!-- 
              style="position: relative" -->
          <el-carousel-item style="height: auto" v-for="carou in data.carouselList" :key="carou.id">
            <p class="leftRightCenter">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <div class="roundBtn center">
              <div class="triangle"></div>
            </div>
            <img :src="carou.img" style="width: 100vw; height: 618px" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="footerLogo">
        <img class="leftRightCenter" src="../../assets/home/PortUS.png" alt="" />
        <div class="linkLogo">
          <center>
            <!-- <img @click="goLink(0)" src="../../assets/home/link1.png" alt="" /> -->
            <img @click="goLink(0)" src="../../assets/home/link2.png" alt="" />
            <img @click="goLink(1)" src="../../assets/home/link3.png" alt="" />
            <p class="copyRight">© 2023 PortUS</p>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Rectangle from '@/assets/home/Rectangle.jpg'
import Rectangle2 from '@/assets/home/Rectangle2.jpg'
import Rectangle3 from '@/assets/home/Rectangle3.jpg'
import icon1 from '@/assets/home/icon1.png'
import icon2 from '@/assets/home/icon2.png'
import icon3 from '@/assets/home/icon3.png'
import icon4 from '@/assets/home/icon4.png'
import carouselBG from '@/assets/home/carouselBG.jpg'

const imgs = {
  Rectangle,
  Rectangle2,
  Rectangle3,
  icon1,
  icon2,
  icon3,
  icon4,
  carouselBG
}

// onMounted(async () => {
//   const route = useRoute()
//   try {
//     const refer = route.query.refer
//     if (!refer) {
//       return
//     }
//     const result = await axios.post('/user/share/statistic', {
//       data: {
//         refer_code: refer
//       }
//     })
//     if (result.success) {
//       const redirectURL =
//         result.data.redirect_url.slice(0, 4) === 'http'
//           ? `${result.data.redirect_url}?refer=${refer}`
//           : `http://${result.data.redirect_url}?refer=${refer}`
//       console.log('redirectURL', redirectURL)
//       // window.location.replace(redirectURL);
//       window.location.href = redirectURL
//     }
//   } catch (error) {}
// })

const data = reactive({
  date: '',
  type: '',
  imgList: [
    {
      id: 1,
      img: imgs.Rectangle,
      title: 'Work together',
      text: 'We allow vendors and influencers to work together with minimum communication cost. by allowing influencers to direct traffic to the vendors directly.'
    },
    {
      id: 2,
      img: imgs.Rectangle2,
      title: 'Automatically',
      text: 'Additionally, the dividends for influencers can be transferred automatically after each purchase, using our smart contract.'
    },
    {
      id: 3,
      img: imgs.Rectangle3,
      title: 'Minimum cost',
      text: 'We help vendors to get traffic with minimum cost. As well as instant return for influencers.'
    }
  ],
  advantList: [
    {
      img: imgs.icon1,
      title: 'Real-time on-chain settlement',
      text: `Any transfer of fund is completed through smart contracts, which means it happens real time and fully automated ones a commend is given.`
    },
    {
      img: imgs.icon2,
      title: 'Zero coding',
      text: `Zero coding`
    },
    {
      img: imgs.icon3,
      title: 'Real traffic',
      text: `Traffic from influencers are directly related to their interest, its near impossible to fake the traffic`
    },
    {
      img: imgs.icon4,
      title: 'Revenue sharing',
      text: `The interest and reputation between vendors and influencers are very much bounded together`
    }
  ],
  carouselList: [
    {
      id: 1,
      img: imgs.carouselBG,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 2,
      img: imgs.carouselBG,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 3,
      img: imgs.carouselBG,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 4,
      img: imgs.carouselBG,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ]
})

const links = ['https://www.twitter.com/@PortUS_DeCPS', 'mailto:info@tridao.xyz']

const goLink = (type) => {
  window.open(links[type], '_blank')
}
</script>

<style scoped lang="less">
.homeBox {
  overflow: hidden;
  background-color: #000523;
  margin-top: -20px;

  .mar50px {
    margin-right: 30px;
    position: relative;
    top: -3px;
  }

  .banner {
    width: 100vw;
    height: 860px;
    box-sizing: border-box;
    // border: 1px solid #999;
    display: flex;
    position: relative;
    top: -80px;

    .Vector2 {
      width: 300px;
      height: 300px;
      top: 370px;
      left: 51%;
    }

    > div {
      flex: 1;
      box-sizing: border-box;
      // border: 1px solid #999;
    }

    .img,
    .text {
      position: relative;

      .mask {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);
        width: 599px;
        height: 598px;
        background: #0090f7;
        opacity: 0.2;
        filter: blur(240px);
      }

      > p,
      > i {
        width: 75%;
        word-break: break-all;
        color: #fff;
        position: relative;

        .Frame113 {
          position: absolute;
          left: 163px;
          bottom: -5px;
          width: 456px;
          height: 25px;
        }
      }

      .title {
        font-size: 60px;
        top: 270px;
        left: 6vw;
        font-weight: 400;
        transform: scale(1, 1.1);
        transform-origin: center top;
        font-family: fantasy;
      }

      .langText {
        top: 380px;
        line-height: 2;
        letter-spacing: 0.5px;
        word-spacing: 3px;
        color: #ddd;
      }

      .readMore {
        position: absolute;
        bottom: -80px;
        width: 120px;
        height: 37px;
        color: #fff;
        background-color: rgb(255, 72, 58);
        border-radius: 8px;
        font-size: 13px;
        text-align: center;
        line-height: 37px;
        box-shadow: 0 2px 18px 0px rgba(255, 72, 58, 0.5);
        cursor: pointer;
      }
    }

    .img {
      position: relative;

      .blur {
        position: absolute;
        bottom: 75px;
        right: 100px;
        border-radius: 50%;
        width: 300px;
        height: 300px;
        background: #e94f30;
        opacity: 0.4;
        filter: blur(50px);
      }

      .blur2 {
        position: absolute;
        top: 270px;
        left: 270px;
        width: 300px;
        height: 300px;
        background: #0090f7;
        // border-radius: 10px;
        opacity: 0.4;
        filter: blur(30px);
      }

      .SnBox {
        top: 275px;
        width: 320px;
        height: 380px;
        // background-color: rgb(30, 24, 67);
        border-radius: 10px;
        transform: translateX(-45%);

        .Snipaste {
          // width: 100%;
          width: 400px;
          top: 9%;
          left: 60%;
        }

        > div {
          position: absolute;
          height: 60px;
          box-sizing: border-box;
          padding: 7px 15px;

          > h3,
          p {
            font-style: italic;
          }

          > p {
            font-size: 15px;
            transform: translateX(5px) scale(1.1, 1);
          }
        }

        .block1 {
          border-radius: 10px;
          color: #fff;
          right: -90px;
          top: 25px;
          width: 100px;
          background-color: rgb(217, 48, 42);
        }

        .block2 {
          border-radius: 10px;
          color: #fff;
          left: -66px;
          top: 270px;
          width: 109px;
          background-color: #00f6ea;
        }
      }
    }
  }

  .operate {
    width: 100vw;
    height: 820px;
    box-sizing: border-box;
    position: relative;

    .operateTitle {
      position: relative;

      .title {
        font-size: 60px;
        top: 270px;
        font-weight: 400;
        transform: scale(1, 1.1);
        transform-origin: center top;
        font-family: fantasy;
        color: #fff;
        margin-left: 6vw;
      }

      .btn {
        right: 6vw;
        font-style: italic;
        border-radius: 20px;
        width: 125px;
        height: 35px;
        background: #00f6ea;
        border: 0;
        color: #fff;
      }
    }

    .imgBox {
      width: 1400px;
      height: 500px;
      margin-top: 80px;
      // background-color: #fff;
      display: flex;
      justify-content: space-around;

      .imgItem {
        border-radius: 10px;
        min-width: 420px;
        width: 420px;
        position: relative;
        background-color: #1d1744;

        img {
          margin-top: 10px;
          width: 95%;
        }

        > h4,
        > p {
          color: #fff;
          text-align: left;
          box-sizing: border-box;
          padding: 0 14px;
        }

        > h4 {
          font-style: italic;
          margin: 27px 0;
        }

        > p {
          line-height: 2;
          letter-spacing: 0.5px;
          word-spacing: 3px;
          font-size: 14px;
        }

        .btn {
          position: absolute;
          bottom: 25px;
          left: 14px;
          width: 125px;
          height: 35px;
          border-radius: 18px;
          background-color: rgb(29, 23, 68);
          color: #fff;
          border-color: rgb(249, 73, 29);
        }
      }
    }

    .text {
      display: inline-block;
      width: 959px;
      line-height: 2;
      word-spacing: 3px;
      text-align-last: left;
      color: #dde;
      margin-top: 200px;
    }
  }

  .advantages {
    width: 100vw;
    height: 750px;
    box-sizing: border-box;
    margin-top: 60px;

    .title {
      font-size: 60px;
      // top: 270px;
      font-weight: 400;
      transform: scale(1, 1.1);
      transform-origin: center top;
      font-family: fantasy;
      color: #fff;
      float: left;
      margin-left: 6vw;
    }

    .textBox {
      width: 100vw;
      height: 664px;
      // background-color: #999;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      > span {
        width: 50%;
        height: 50%;
        box-sizing: border-box;
        // border: 1px solid red;
        position: relative;

        > img {
          width: 90px;
          left: 12%;
        }

        .box {
          width: 60%;
          left: 61%;
          top: 40%;

          > p,
          > i {
            color: rgb(103, 120, 150);
          }

          > i {
            font-size: 35px;
            position: relative;
            top: -40px;
            font-weight: 900;
            color: rgb(0, 246, 234);
          }

          > p {
            // font-weight: 700;
            font-style: italic;
            color: #fff;
            line-height: 2;
            letter-spacing: 0.5px;
            word-spacing: 3px;
            font-size: 15px;
          }
        }
      }

      > span:nth-child(1),
      > span:nth-child(3) {
        > img {
          left: 17%;
        }

        > .box {
          left: 65.5%;
        }
      }
    }
  }

  .milestones {
    width: 100vw;
    height: 1300px;
    box-sizing: border-box;
    padding-top: 230px;
    position: relative;

    .title {
      font-size: 60px;
      top: 270px;
      font-weight: 400;
      transform: scale(1, 1.1);
      transform-origin: center top;
      font-family: fantasy;
      color: rgb(0, 246, 234);
      float: left;
      margin-left: 6vw;
    }

    .carouBox {
      width: 100%;
      margin-top: 250px;

      :deep(.el-carousel__arrow) {
        width: 50px;
        height: 50px;
        font-size: 40px;
      }

      .roundBtn {
        width: 170px;
        height: 170px;
        background-image: linear-gradient(120deg, rgb(245, 25, 7) 0%, rgb(251, 115, 48) 100%);
        border-radius: 50%;
        z-index: 2;
        top: 270px;
        transition: 0.3s;
        cursor: pointer;

        // position: relative;
        .triangle {
          // position: absolute;
          transition: 0.3s;
          margin-top: 53px;
          margin-left: 54px;
          transform: rotate(-25deg);
          width: 0;
          height: 0;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-bottom: 50px solid #fff;
        }
      }

      // .roundBtn:hover{
      //   width: 190px;
      //   height: 190px;
      //   .triangle{
      //     margin-top: 60px;
      //     margin-left: 63px;
      //   }
      // }
      // .roundBtn:hover .tri
      p {
        color: #fff;
        position: absolute;
        top: 135px;
        width: 100vw;
        text-align: center;
        // transform: translateX(-50%) scale(1,1.15);
        font-style: italic;
        font-size: 400;
        font-family: fantasy;
        font-size: 40px;
      }
    }

    .footerLogo {
      width: 100vw;
      // height: 80px;
      position: relative;
      box-sizing: border-box;
      padding-top: 50px;

      > img {
        transform: translateX(-50%) scale(0.4);
      }

      // z-index: 2;
      .linkLogo {
        height: 50px;
        margin-top: 50px;
        transform: scale(0.4);

        img {
          margin: 0 15px;
          cursor: pointer;
        }

        .copyRight {
          color: #999;
          font-size: 30px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
