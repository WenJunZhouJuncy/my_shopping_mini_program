import {request} from '../../request/index.js'  //{url: app.apiUrl.key}
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import {login, requestPayment, showToast} from '../../utils/asyncWX/index'
const app = getApp()
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
  // 支付
  async handlPay(){
    try{
      // 1.判断有无token， 无 --> 跳转到授权页面
      const token = wx.getStorageSync('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo';
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        return false;
      }
      // 获取发送接口的数据
      let consignee_addr = this.data.siteInfo;
      let order_price = this.data.totalMoney;
      let goods = [];
      this.data.carList.forEach(e =>{
        goods.push({
          goods_id: e.goods_id,
          goods_number: e.goods_number,
          goods_price: e.goods_price
        })
      })
      let pramas = {consignee_addr, order_price, goods}
      // 2.调接口，生成订单获取订单编号
      const {order_number} = await request({url: app.apiUrl.create, data:pramas, method:'post'})
      // 3.获取用户信息发起微信支付
      const {pay} = await request({url: app.apiUrl.req_unifiedorder, data:order_number})
      // 4.发起微信支付
      await requestPayment(pay)
      // 5.查询后台支付状态
      const res = request({url: app.apiUrl.chkOrder, data:order_number, });
      showToast("支付成功~")
      // 6.移除缓存中购物车的数据
      let CarData = wx.getStorageSync('CarData')
      CarData = CarData.filter(e => !e.check)
      wx.setStorageSync('CarData', CarData)
    } catch (error) {
      showToast("这是个意料之外的错误~")
    }
  },
  onLoad: function (options) {
    this.getsiteInfo()
    this.getCarList()
  },
})