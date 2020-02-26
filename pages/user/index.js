// pages/user/index.js
Page({
  data: {
    userInfo:null,
    collectNum: 0, //收藏数量
    historyNum:0, //浏览数量
    orderList: [
      {icon:'icon-dingdan',txt:'全部订单'},
      {icon:'icon-daifukuan',txt:'待付款'},
      {icon:'icon-daishouhuo',txt:'待收货'},
      {icon:'icon-refund',txt:'退货/退款'}
    ],
  },
  //登录获取用户信息
  getUserInfo(){
    let userInfo = wx.getStorageSync('UserInfo');
    this.setData({
      userInfo
    })
  },
  // 获取收藏数量
  getCollect(){
    let collectList = wx.getStorageSync('Collect') || [];
    let collectNum = collectList.length;
    this.setData({
      collectNum
    })
  },
  // 获取浏览历史
  getHistory(){
    let historyList = wx.getStorageSync('History') || [];
    let historyNum = historyList.length;
    this.setData({
      historyNum
    })
  },
  //跳转订单页面
  handlOrderAll(e){
    let token = wx.getStorageSync('token')
    let {index} = e.currentTarget.dataset;
    // token是否存在
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   })
    //   return;
    // }
    wx.navigateTo({
      url: '/pages/order/index?type=' + (index+1),
    })
  },
  onShow(){
    this.getUserInfo()
    this.getCollect()
    this.getHistory()
  }
})