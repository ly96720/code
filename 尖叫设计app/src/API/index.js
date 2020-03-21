import service from './request'
export const getData1 = (tabId, currentPage) => {
  return service(`/my/v2/page?pageId=1&tabId=${tabId}&currentPage=${currentPage}&pageSize=8&_=1579347242770`)
}
export const getClassify = (id, page, sort, order) => {
  return service({
    url: `/my/pages/category/${id}?currentPage=${page}&sort=${sort}&order=${order}&_=1573478159647`
  })
}
export const getDetailList = (goodsId) => {
  return service({
    url: `/my/itemdetail/skuInfos/${goodsId}?_=1579677112849`
  })
}
export const getDetail = (parentProductId) => {
  return service({
    url: `/my/itemdetail/spuInfos/${parentProductId}?_=1579678760950`
  })
}
export const itemDetail = (goodsId) => {
  return service({
    url: `/my/recommend/item?skuId=${goodsId}&_=15796799373510`
  })
}
// export const getCart = () => {
//   return service({
//     url: `/my/recommend/cart?currentPage=1&_=1579695981805`
//   })
// }
export const toAddCart = (productItemId) => { // 加入购物车
  return service({
    url: `/my/itemdetail/spec/toAddCart/${productItemId}?_=1579747648503`
  })
}
export const selectGoodAttrs = (productItemId) => {
  // 加入购物车时选中某个商品的属性
  return service({
    url: `/my/itemdetail/spec/specific/${productItemId}?_=1579747649585`
  })
}
export const getMessage = () => {
  // 加入购物车时选中某个商品的属性
  return service({
    url: '/my/message/messageMain?_=1579958566091'
  })
}
export const getSearch = (keyword, sort, order, currentPage) => {
  console.log(keyword)
  // 加入购物车时选中某个商品的属性
  return service({
    url: `/my/product/search?keyword=${keyword}&sort=${sort}&order=${order}&currentPage=${currentPage}&_=1580043478612`
  })
}
