<template>
  <div class="mine-profile">
    <el-form v-show="editMode" :model="form" label-width="180px">
      <el-form-item label="Name">
        <el-input v-model="form.nickName" placeholder="Nick name"></el-input>
      </el-form-item>
      <el-form-item label="HomePage">
        <el-input v-model="form.homePage" placeholder="homePage"></el-input>
      </el-form-item>
      <el-form-item label="X">
        <el-input v-model="form.twitter" placeholder="X"></el-input>
      </el-form-item>
      <el-form-item label="Discord">
        <el-input v-model="form.discord" placeholder="discord"></el-input>
      </el-form-item>
      <el-form-item label="Instagram">
        <el-input v-model="form.instagram" placeholder="Instagram"></el-input>
      </el-form-item>
      <el-form-item label="Avatar">
        <uploader :src="form.logo" @on-success="onAvatarSuccess"></uploader>
      </el-form-item>
      <el-form-item>
        <p-button @click="onSubmit">Submit</p-button>
        <p-button @click="handleCancel">Cancel</p-button>
      </el-form-item>
    </el-form>
    <div v-show="!editMode" class="profile">
      <img :src="form.logo" alt="" />
      <div class="profile-right">
        <div class="contact">
          <span>{{ form.nickName }}</span>
          <a
            v-if="form.homePage"
            class="icon-social-1"
            ref="noopener noreferrer"
            target="_blank"
            :href="form.homePage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24"
              width="27.09"
              height="34"
              style=""
              filter="none"
            >
              <g>
                <path
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </a>

          <a
            v-if="form.twitter"
            class="icon-social-2"
            ref="noopener noreferrer"
            target="_blank"
            :href="form.twitter"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </g>
            </svg>
          </a>

          <a
            v-if="form.discord"
            class="icon-social-3"
            ref="noopener noreferrer"
            target="_blank"
            :href="form.discord"
          >
            <svg
              width="800px"
              height="800px"
              viewBox="0 -28.5 256 256"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                  fill="currentColor"
                  fill-rule="nonzero"
                ></path>
              </g>
            </svg>
          </a>

          <a
            v-if="form.instagram"
            class="icon-social-4"
            ref="noopener noreferrer"
            target="_blank"
            :href="form.instagram"
          >
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                fill="currentColor"
              />
              <path
                d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <!-- <a class="twitter" target="_blank" :href="form.twitter"></a>
          <a class="homepage" target="_blank" :href="form.homePage"></a>
          <a class="discord" target="_blank" :href="form.discord"></a>
          <a class="instagram" target="_blank" :href="form.instagram"></a> -->
        </div>
        <div class="ben">
          <p-button @click="handleEdit">Edit</p-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAccount } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref, toRaw } from 'vue';

import { getKolInfo, postKolInfo } from '@/api';
import Uploader from '@/components/Uploader.vue';

const defaultForm = {
  kolAddress: '',
  nickName: '',
  twitter: '',
  discord: '',
  instagram: '',
  homePage: '',
  logo: '',
};
const editMode = ref(false);

const form = reactive({ ...defaultForm });

const onAvatarSuccess = (url: string) => {
  form.logo = url;
};
onMounted(async () => {
  const { address } = getAccount();
  const { data } = await getKolInfo({ kolAddress: address });
  Object.assign(form, data);
});

const handleEdit = () => {
  editMode.value = true;
};

const handleCancel = () => {
  editMode.value = false;
};

const onSubmit = async () => {
  const { address } = getAccount();
  const params = toRaw(form);
  params.kolAddress = address;
  try {
    const result = await postKolInfo(params);
    if (result.success) {
      ElMessage.success('submit profile info success');
      // resetForm();
      editMode.value = false;
    } else {
      ElMessage('submit profile info failed');
    }
  } catch (error) {
    ElMessage('submit profile info failed');
  }
};
</script>

<style lang="less" scoped>
.mine-profile {
  .profile {
    display: flex;
    flex-direction: row;
    > img {
      width: 150px;
      height: 150px;
      margin-right: 15px;
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .contact {
        display: flex;
        flex-direction: row;
        align-items: center;

        > a {
          display: block;
          width: 32px;
          height: 32px;
          color: rgba(35, 115, 192, 1);
          margin: 0 5px;
          > svg {
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      .profile-right {
        margin: 20px 0;
      }
    }
  }
}
</style>
