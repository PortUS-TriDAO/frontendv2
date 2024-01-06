export const publishSkuRules = {
  tokenId: [{ required: true, message: 'TokenId is required', trigger: 'blur' }],
  price: [{ required: true, message: 'Price is required', trigger: 'blur' }],
  ddl: [{ required: true, message: 'DDL is required', trigger: 'blur' }],
  seller: [{ required: true, message: 'Seller is required', trigger: 'blur' }],
  payToken: [{ required: true, message: 'PayToken is required', trigger: 'blur' }],
};

export const deployAltcRules = {
  contractName: [
    { required: true, message: 'Name is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Name must be between 1 and 100 characters', trigger: 'blur' },
  ],
  symbol: [
    { required: true, message: 'Symbol is required', trigger: 'blur' },
    { message: 'Symbol of contract', trigger: 'blur' },
  ],
  sharePercentage: [
    { required: true, message: 'Percent is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Percent must be between 1 and 100', trigger: 'blur' },
  ],
  rightQuantity: [
    { required: true, message: 'rightQuantity is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'rightQuantity must be number', trigger: 'blur' },
  ],
  briefIntro: [{ required: true, message: 'Brief introduction is required', trigger: 'blur' }],
  payToken: [
    { required: true, message: 'Pay token is required', trigger: 'blur' },
    {
      min: 1,
      max: 100,
      message: 'Pay token must be between 1 and 100 characters',
      trigger: 'blur',
    },
  ],
  description: [{ required: true, message: 'Description is required', trigger: 'blur' }],
};
