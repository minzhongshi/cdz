/**
 * 接口基地址
 * 个人中心
 * 7001
 */

export const PERSONAL_URL=  'http://47.111.72.160:7001'


/**
 * 所有充电站
 *类型 POST
 */
export const CHARGING_STATION_URL=  '/person/chargeStation/selectAppChargingStations'

/**
 * 充电站所有充电桩
 * 类型 POST
 */
export const CHARGING_PILE_URL=  '/person/chargeStation/selectAllChargingPileUnderOneStation'

/**
 * 验证码
 * 参数 mobile
 * 类型 String
 * 描述 电话
 * 请求类型 get
 */
export const CAPTCHA_URL=  '/auth/authentication/getVerifyCode?mobile='

/**
 * 验证码验证
 * 参数 grant_type（mobile_code）  mobile verifyCode
 * 类型 string string string
 * 描述 类型 电话 验证码
 * 请求类型 post
 */
export const VERIFICATION_CODE_URL='/auth/oauth/token'

/**
 * 上传头像
 * 请求类型 post
 *
 */
export const AvatarUpload_URL="http://47.111.72.160:4523/picture/updatePictures/uploadAvatar"

/**
 * 修改手机号验证码
 * 请求类型 get
 *
 */
export const MODIFY_MOBILE_PHONE_VERIFICATION_CODE_URL="http://47.111.72.160:4523/verify/sendCode"

/**
 * 校验修改手机号验证码
 * 请求类型 get
 *
 */
export const VERIFY_AND_MODIFY_THE_QR_CODE_OF_THE_MOBILE_PHONE_URL="http://47.111.72.160:4523/verify/verifyCode"

/**
 * 修改电话号码
 * 请求类型 post
 *
 */
export const SUBMIT_CHANGES_URL="http://47.111.72.160:7001/person/center/updateInfo"


/**
 * 获取用户信息
 * 请求类型 post
 */
export const GET_USER_INFORMATION_URL="http://47.111.72.160:7001/person/center/queryInfo"

/**
 * 查看可领优惠卷
 * 请求类型 GET
 */
export const YET_GET_COUPON_URL="http://47.111.72.160:7001/pay/userCoupon/queryValidCoupon"


/**
 * 我的优惠劵
 * 请求类型 GET
 */
export const COUPON_URL="http://47.111.72.160:7001/pay/userCoupon/queryCouponsUserReceived"


/**
 * 领取优惠卷
 * 请求类型 POST
 * 参数  couponId（优惠劵ID）
 */
export const GET_COUPON_URL= "http://47.111.72.160:7001/pay/userCoupon/getSelectedCoupons"

/**
 * 获取用户账户信息
 *请求类型 Get
 */
export const ACCOUNT_INFORMATION_url="http://47.111.72.160:7001/person/center/getUserAccount"


/**
 * 需要付款的金额
 *请求类型 GET
 */
export const INQUIRY_AMOUNT_URL="http://47.111.72.160:7001/pay/charge/queryUserPayRecordToUI"


/**
 * 我的订单
 *请求类型 Get
 */
export const ORDER_FORM_URL="http://47.111.72.160:7001/person/center/getTransactionRecord"


/**
 * 充电记录
 *请求类型 Get
 */
export const CHARGE_RECORD_URL="http://47.111.72.160:7001/person/center/getChargingRecord"


/**
 * 上传驾驶证
 * 请求类型 POST
 */
export const UPLOAD_DRIVER_S_LICENSE_URL="http://47.111.72.160:7001/picture/updatePictures/uploadLicense"


/**
 * 行驶证信息
 *请求类型 Get
 */
export const DRIVING_LICENSE_URL="http://47.111.72.160:7001/person/center/getDrivingLicenseList"


/**
 * 交易记录
 *请求类型 Get
 */
export const TRANSACTION_RECORD_URL="http://47.111.72.160:7001/person/center/getTransactionRecord"


/**
 * 充值
 *请求类型 POST
 */
export const RECHARGE_YRL="http://47.111.72.160:7001/pay/charge/simulateRecharge"


/**
 * 支付
 *请求类型 POST
 */
export const DEFRAY_URL="http://47.111.72.160:7001/pay/charge/payYourElectricityBill"


/**
 * 反馈内容
 *请求类型 GET
 */
export const FEEDBACK_URL="http://47.111.72.160:7001/person/center/getFeedbackByUserId"


/**
 * 提交反馈
 *请求类型 POST
 */
export const SUBMIT_URL="http://47.111.72.160:7001/person/center/submitFeedback"


/**
 * 上传图片
 * 请求类型 POST
 */
export const IMAGE_URL="http://47.111.72.160:7001/picture/updatePictures/uploadImages"


/**
 * 开始充电
 * 请求类型 post
 */
export const CHARGE_URL="http://47.111.72.160:7001/mqtt/pile/start"


/**
 * 停止充电
 * 请求类型 post
 */
export const STOP_CHARGING_URL="http://47.111.72.160:7001/mqtt/pile/stop"


/**
 * 获取充电状态
 * 请求类型 post
 */
export const FETTLE_URL="http://47.111.72.160:7001/mqtt/pile/readChargingDataInRealTime"
