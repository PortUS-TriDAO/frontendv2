export const publishSkuRules = {
  tokenId: [{ required: true, message: 'TokenId is required', trigger: 'blur' }],
  price: [{ required: true, message: 'Price is required', trigger: 'blur' }],
  ddl: [{ required: true, message: 'DDL is required', trigger: 'blur' }],
  seller: [{ required: true, message: 'Seller is required', trigger: 'blur' }],
  payToken: [{ required: true, message: 'PayToken is required', trigger: 'blur' }],
};
