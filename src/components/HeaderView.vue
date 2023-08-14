<template>
  <div class="headBox">
    <div class="logo topDownCenter">
      <img src="../assets/home/PortUS.png" alt="" />
    </div>
    <div class="nav topDownCenter">
      <div class="navItem" v-for="(nav, index) in data.navList" :key="nav.id">
        <span
          style="width: 100%; height: 100%; display: inline-block"
          v-if="!nav.children"
          :class="{ active: nav.isActive }"
          @click="goNav(nav.router, nav)"
          >{{ nav.name }}
        </span>
        <span
          style="width: 100%; height: 100%; display: inline-block"
          class="item"
          v-else
          :key="nav.id"
          @click.stop="putDownNav(nav.id, nav.type, index)"
          >{{ nav.name }}
          <ArrowRightBold :id="nav.id" class="arrow" />
          <ul :id="'id' + nav.id">
            <li
              class="ele"
              v-for="chdNav in nav.children"
              :key="chdNav.id"
              :class="{ active: chdNav.isActive }"
              @click="goNav(chdNav.router, chdNav)"
            >
              {{ chdNav.name }}
              <img class="navArrow" src="../assets/common/navArrow.png" alt="" />
            </li>
          </ul>
        </span>
      </div>
    </div>
    <el-button class="topDownCenter connect" round @click="openConnectDialog">
      <div class="dot" :class="{ success: data.currentAddress.loginStatus }"></div>
      <img class="icon" src="../assets/home/Vector.png" alt="" />
      <span v-if="!data.currentAddress.loginStatus">Connect</span>
      <div v-else class="loginState">
        <p><span>Chain: </span>{{ data.currentAddress.chain }}</p>
        <p style="color: #57fe05"><span>Account:</span>{{ data.currentAddress.acount }}</p>
      </div>
    </el-button>
  </div>
  <el-dialog v-model="data.connectDialogV">
    <el-card>
      <center>
        <el-button class="topDownCenter connect metaMaskBtn meta" round @click="connectWallet">
          <img class="icon" src="../assets/home/Vector.png" alt="" />
          Connect Metamask</el-button
        >
      </center>
      <center>
        <el-button class="topDownCenter connect metaMaskBtn conWat" round @click="walletConnet">
          <img class="icon" src="../assets/home/Vector.png" alt="" />
          Connect wallet</el-button
        >
      </center>
    </el-card>
  </el-dialog>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'fa9681b4696d945b7a1446be41240f2c'

// 第三方钱包登录
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const web3modal = new Web3Modal({ projectId }, ethereumClient)

const router = useRouter()
const route = useRoute()
const reload = inject('reload')
const data = reactive({
  navList: [],
  connectDialogV: false,
  userInfo: {},
  currentAddress: {
    chain: '',
    acount: '',
    loginStatus: false
  }
})

// 获取chainId方法
const getChainId = async () => {
  // let userInfo, provider
  // const userInfoRes = await getUserInfo()
  // if (userInfoRes.resCode == 200) {
  //   userInfo = userInfoRes.data
  // }
  // provider = new ethers.providers.Web3Provider(window.ethereum)
  // let chainId = await provider.getNetwork()
  // console.log(chainId)
  // return chainId.chainId
}

var changeNavLength = (length) => {
  const nav = document.querySelector('.nav')
  if (length == 4) {
    nav.style.width = '40vw'
  } else {
    nav.style.width = '30vw'
  }
}

// 点击链接，打开选择哪一个钱包链接
const openConnectDialog = () => {
  data.connectDialogV = true
}

const walletConnet = async () => {
  await web3modal.openModal()
  data.connectDialogV = false
}

// 链接钱包,并存下用户信息
const connectWallet = async ($event, address) => {
  const result = await getUserInfo()
  if (result.resCode != 200) return
  data.userInfo = result.data

  const params = { walletAddress: data.userInfo.account[0] }
  const res = await innerPersons(params)
  if (res.resCode == 200) {
    data.navList = navListAbi(res.data)
    changeNavLength(data.navList.length)
    sessionStorage.setItem('navList', JSON.stringify(data.navList))

    reload()
    ElMessage({
      type: 'success',
      message: 'Login successful',
      showClose: true
    })
  }
  data.connectDialogV = false
}
web3modal.subscribeModal(async (newState) => {
  if (newState.open == false && ethereumClient.getAccount().address) {
    if (
      JSON.parse(sessionStorage.getItem('userInfo')) &&
      ethereumClient.getAccount().address ==
        JSON.parse(sessionStorage.getItem('userInfo')).account[0]
    ) {
      return
    }
    // connectWallet();
    // ethereumClient.getAccount().address
    let userInfo = {
      account: [ethereumClient.getAccount().address]
    }
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    const newAccount = userInfo.account[0]
    const res = await innerPersons({ walletAddress: newAccount })
    if (res.resCode == 200) {
      data.navList = navListAbi(res.data)
      changeNavLength(data.navList.length)
      sessionStorage.setItem('navList', JSON.stringify(data.navList))
      if (res.data == 0 && route.path == '/contracts') {
        router.push('/home')
      } else {
        router.push(route.path)
      }
      ElMessage({
        type: 'success',
        message: 'Switch success',
        showClose: true
      })
    }
    data.currentAddress.chain = await getChainId()
    data.currentAddress.acount = subAddress(newAccount)
    data.currentAddress.loginStatus = true
  } else if (newState.open == false && ethereumClient.getAccount().address == undefined) {
    sessionStorage.clear()
    changeNavLength(3)
    data.navList = navListAbi(false)
    data.currentAddress.loginStatus = false
    ElMessage({
      type: 'success',
      message: 'Exit successfully',
      showClose: true
    })
  }
})

// 更改导航为active效果
const letActive = (id) => {
  data.navList.forEach((item) => {
    if (item.children) {
      item.children.forEach((item2) => {
        if (item2.id == id) {
          item2.isActive = true
        } else {
          item2.isActive = false
        }
      })
    } else {
      if (item.id == id) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    }
  })
}
// 点击了导航
const goNav = (nav, item) => {
  letActive(item.id)
  router.push(nav)
}
// 关闭子菜单
document.addEventListener('click', () => {
  data.navList.forEach((item) => {
    if (item.type) {
      const menu = document.querySelector('#id' + item.id)
      const arrow = document.querySelector('#' + item.id)
      arrow.style.transform = 'translateX(5px) translateY(3px) rotate(0deg)'
      menu.style.height = '0px'
      item.type = false
    }
  })
})
// 展开子菜单
const putDownNav = (id, type, index) => {
  const arrow = document.querySelector('#' + id)
  const menu = document.querySelector('#id' + id)
  if (type) {
    arrow.style.transform = 'translateX(5px) translateY(3px) rotate(0deg)'
    menu.style.height = '0px'
  } else {
    arrow.style.transform = 'translateX(2px) translateY(4px) rotate(90deg)'
    menu.style.height = data.navList[index].children.length * 55 + 10 + 'px'
  }
  data.navList[index].type = !type
}
</script>

<style lang="less" scoped>
.active {
  color: rgb(255, 90, 45) !important;
}

.loginState {
  display: inline-block;

  > p {
    width: 113px;
    font-size: 12px;
    text-align: left;
    font-style: italic;
    white-space: nowrap;

    > span {
      display: inline-block;
      width: 50px;
      text-align: left;
    }
  }
}

.connect {
  position: absolute;
  left: 82vw;
  width: 190px;
  height: 40px;
  background: linear-gradient(90deg, #f51806 0%, #fb7631 100%);
  border: 0;
  border-radius: 20px;
  color: #fff;
  font-style: italic;
  font-size: 16px;

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-top: -3px;
  }

  .dot {
    position: absolute;
    left: 35px;
    top: 19px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #999;
  }

  .success {
    background-color: #57fe05;
  }
}

.connect:hover {
  color: #fff;
}

.metaMaskBtn {
  margin-top: 0px;
  margin-bottom: 12px;
  padding: 0;
  position: relative;
  left: 0;

  .icon {
    width: 17px;
    height: 17px;
    margin-right: 7px;
  }
}

.meta {
  margin-top: 50px;
}

.conWat {
  background: none;
  background: linear-gradient(90deg, rgb(30, 122, 207) 0%, rgb(102, 170, 233) 100%);
}

.headBox {
  width: 100vw;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #000523;
  // overflow: hidden;
  transition: 0.3s;

  .navArrow {
    width: 20px;
    transform: translateY(5px);
    margin-left: 5px;
  }

  .logo {
    left: 4.5vw;
    // top: 2px;
    text-align: center;
    line-height: 80px;
    width: 135px;
    height: 25px;
    color: #fff;

    img {
      width: 100%;
      transform: translateY(-23px) scale(1.3);
    }
  }

  .nav {
    // width: 30vw;
    height: 80px;
    right: 23vw;
    display: flex;
    // justify-content: center;
    transition: 0.3;
    align-items: center;

    .navItem {
      //  flex-basis: 10vw !important;
      height: 80px;
      line-height: 80px;
      flex: 1;
      text-align: center;
      color: #fff;
      font-size: 17.5px;
      font-weight: 700;
      font-style: italic;
      // transform: scale(1);
      // font-family: "Times New Roman";

      font-family: 'fantasy';
      cursor: pointer;

      > span {
        border-radius: 10px;
      }

      > span:hover {
        background-color: #23232e;
      }

      .arrow {
        width: 20px;
        transform: translateY(3px) translateX(5px);
        transition: 0.1s linear;
        transform-origin: 50% 50%;
        margin-left: 5px;
      }

      .item {
        position: relative;

        > ul {
          position: absolute;
          height: 0;
          box-sizing: border-box;
          z-index: 999;
          overflow: hidden;
          transition: 0.2s linear;
          padding: 0;
          width: 10vw;
          background-color: #000523;
          border-radius: 10px;
          border-top-right-radius: 0px;
          border-top-left-radius: 0px;

          > li {
            font-size: 15px;
            width: 100%;
            line-height: 55px;
            font-family:
              PingFangSC-Medium,
              PingFang SC;
            font-style: normal;
            font-weight: normal;
            border-radius: 10px;
            border-bottom: 1px solid #999;
            // border-bottom-width: 9vw;
            color: #eee;
          }

          > li:last-of-type {
            border-bottom: 0;
          }

          > li:hover {
            background-color: #23232e;
          }
        }
      }
    }
  }
}
</style>
