import requests from './request'
import mockRequests from './mockRequests'
export const reqList = () => {
 return requests({url:'/product/getBaseCategoryList',method:'get'})
}
export const reqBannerList = () => {
  return mockRequests({url:'/banner',method:'get'})
}
export const reqFloorList = () => {
  return mockRequests({url:'/floor',method:'get'})
}
export const reqSearchList = (params) => {
  return requests({url:'/list',method:'post',data:params})
}
export const reqGoodsList = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: 'get' })
}
export const reqGoodsCartList = (skuId,skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
export const reqCartList = () => {
  return requests({url:'/cart/cartList',method:'get'})
}
export const reqDeleteCart = (skuId) => {
  return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}
export const reqUpdateisChecked = (skuId,isChecked) => {
  return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}
export const reqCode = (phone) => {
  return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
export const reqRegister = (data) => {
  return requests({url:`/user/passport/register`,data,method:'post'})
}
export const reqLogin = (data) => {
  return requests({url:`/user/passport/login`,data,method:'post'})
}
export const reqUserInfo = () => {
  return requests({url:`/user/passport/auth/getUserInfo`,method:'get'})
}
export const reqLogout = () => {
  return requests({url:`/user/passport/logout`,method:'get'})
}
export const reqReceInfo = () => {
  return requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'})
}
// export const reqOrderInfo = () => {
//   return requests({url:`/order/auth/trade`,method:'get'})
// }
export const reqOrderInfo = () => {
  return mockRequests({url:'/orderinfo',method:'get'})
}
export const submitOrderInfo = (tradeNo,data) => {
  return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'get'})
}
export const getPayInfo = (orderId) => {
  return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}
export const getIfPay = (orderId) => {
  return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}
export const getOrderList = (page,limit) => {
  return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}

