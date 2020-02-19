
Page({
  data: {
    siteInfo: null, //用户地址信息
    carList: [],  //购物车数据
    totalNum: 0,  //购买总数量
    totalMoney: 0, //购买总金额
  },
  //获取用户收地址
  getsiteInfo(){
    let siteInfo = wx.getStorageSync('Site');
    this.setData({
      siteInfo
    })
  },
  //获取购物车数据
  getCarList(){
    let carList = wx.getStorageSync('CarData').filter(e => e.check);
    let totalNum = 0; //总数量
    let totalMoney = 0; //总金额
    carList.forEach(e => {
      totalNum += e.num
      totalMoney += e.num * e.goods_price
    })
    this.setData({
      carList,
      totalNum,
      totalMoney
    })
  },
  onLoad: function (options) {
    this.getsiteInfo()
    this.getCarList()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})