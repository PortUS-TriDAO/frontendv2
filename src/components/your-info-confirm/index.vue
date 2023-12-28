<template>
  <el-dialog v-model="dialogTableVisible" title="Your Info">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="top">
      <el-form-item label="Name">
        <el-input v-model="ruleForm.name" autocomplete="off" placeholder="Your Name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="ruleForm.email" autocomplete="off" placeholder="you@email.com" />
      </el-form-item>
      <el-form-item label="參加者手機號碼/Attendee Mobile Phone Number">
        <el-input v-model="ruleForm.mobile" autocomplete="off" placeholder="+1 201 555 0123" />
      </el-form-item>
      <el-form-item label="行業/Industry">
        <el-select v-model="ruleForm.industry" placeholder="Select..." style="width: 100%">
          <el-option
            v-for="item in industryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公司/Company">
        <el-input v-model="ruleForm.company" autocomplete="off" />
      </el-form-item>
      <el-form-item label="蹴务/ Job Title">
        <el-input v-model="ruleForm.jobTitle" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所在或家或地品/Country or Region">
        <el-input v-model="ruleForm.countryOrRegion" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { computed, reactive, ref, watch } from 'vue';

// 區塊鏈/Web3 Blockchain/Web3, 互聯網及信息服務 Internet/IT, 金融 Finance, 投資 Investment,
// 科技 Technology, 製造業 Manufacturing, 農業 Agriculture, 交通運輸 Transportation, 批發零售 Wholesale / Retail,
// 建築 Architecture, 教育 Education, 文娛 Culture & Entertainment, 醫療健康 Healthcare, 商務服務 Business Service,
// 住宿餐飲 Accommodation & Catering, 大宗商品貿易 Commodity, 跨境貿易 Cross - border Trade, 直播 Livestream, 媒體 Media, 其他 Others, 能源 Energy
const industryList = [
  { label: 'Blockchain/Web3', value: 'web3' },
  { label: 'Internet/IT', value: 'it' },
  { label: 'Finance', value: 'finance' },
  { label: 'Investment', value: 'investment' },
  { label: 'Technology', value: 'technology' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'Transportation', value: 'transportation' },
  { label: 'Wholesale / Retail', value: 'wholesale_retail' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Education', value: 'education' },
  { label: 'Culture & Entertainment', value: 'culture&entertainment' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Business Service', value: 'businessService' },
  { label: 'Accommodation & Catering', value: 'accommodation&catering' },
  { label: 'Commodity', value: 'commodity' },
  { label: 'Cross - border Trade', value: 'crossBorderTrade' },
  { label: 'Livestream', value: 'livestream' },
  { label: 'Media', value: 'media' },
  { label: 'Others', value: 'others' },
  { label: 'Energy', value: 'energy' },
];

defineOptions({
  name: 'BuyTicketConfirm',
});
const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits(['close', 'submit']);

const dialogTableVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    if (!value) {
      close();
    }
  },
});

watch(dialogTableVisible, () => {
  if (dialogTableVisible.value === true) {
    resetForm();
  }
});

interface RuleForm {
  name: string;
  email: string;
  mobile: string;
  industry: string;
  company: string;
  jobTitle: string;
  countryOrRegion: string;
}

const ruleFormDefault = {
  name: '',
  email: '',
  mobile: '',
  industry: '',
  company: '',
  jobTitle: '',
  countryOrRegion: '',
};

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>(ruleFormDefault);
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
  ],
  mobile: [{ required: true, message: 'Please input phone number', trigger: 'blur' }],
  industry: [{ required: true, message: 'Please select industry', trigger: 'change' }],
  company: [{ required: true, message: 'Please input company', trigger: 'blur' }],
  jobTitle: [{ required: true, message: 'Please input job title', trigger: 'blur' }],
  countryOrRegion: [{ required: true, message: 'Please input region', trigger: 'blur' }],
});

const close = () => {
  // resetForm();
  emit('close');
};

const resetForm = () => {
  ruleForm.name = '';
  ruleForm.email = '';
  ruleForm.mobile = '';
  ruleForm.industry = '';
  ruleForm.company = '';
  ruleForm.jobTitle = '';
  ruleForm.countryOrRegion = '';
};

const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    loading.value = true;
    const pass = await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!', fields);
        //
        return true;
      } else {
        console.log('error submit!', fields);
        return false;
      }
    });
    if (pass) {
      console.log('ruleForm=', ruleForm);
      // TODO: 实际购买
      emit('submit', ruleForm);
      // 成功后，关闭
      close();
    }
  } finally {
    loading.value = false;
  }
};
</script>
<style lang="less"></style>
