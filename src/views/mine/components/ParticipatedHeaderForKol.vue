<template>
  <div>
    <div class="header">
      <!--for kol-->
      <div class="top-box-kol">
        <div class="title">
          <span>Echo of Intensity</span>
          <span>Echo of Intensity <em>20%</em></span>
        </div>
        <div class="content">
          <div class="left">
            <p>righted/rights: 56/200</p>
            <p>1.2 USDT</p>
          </div>
          <p-button>Apply More</p-button>
        </div>
      </div>
      <div class="top-box-project">
        <h5>Echo of Intensity</h5>
        <div class="withdraw-box">
          <div>
            <span>balance</span>
            <p-button>withdraw</p-button>
          </div>
          <p>293482043 USDC</p>
        </div>
      </div>
      <div class="bottom-box">
        <p>Dreamed of moonshots but awoke to a capitulation.</p>
        <p>Welcome to the home of Echo of Intensity by Per Kris...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.header {
  .top-box {
    &-kol {
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 34px;
        font-weight: 700;

        > span {
          margin: 0;
        }

        em {
          font-style: normal;
          color: #fa6529;
        }
      }

      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .left {
          > p {
            line-height: 29px;
            font-style: 24px;
          }
        }
      }
    }

    &-project {
      .withdraw-box {
        width: 300px;
        background-color: #f7f7f7;
        border-radius: 18px;
        margin: 10px 0;
        padding: 15px;

        > div {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          > button {
            width: 100px;
            height: 28px;
          }
        }
      }
    }
  }
}
</style>
