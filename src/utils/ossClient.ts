import oss from 'ali-oss'
import type OSS from 'ali-oss'

const client: OSS = new oss({
  region: 'oss-cn-hongkong',
  secure: true,
  accessKeyId: 'LTAI5tBmAh12MAfiv26Cx31T',
  accessKeySecret: 'rgqlp1XOUSUEGMoBVP0chGtextfZdW',
  bucket: 'portus',
  endpoint: 'oss-cn-hongkong.aliyuncs.com'
})

export default client
