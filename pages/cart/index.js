// pages/cart/index.js
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import {getSetting, openSetting, chooseAddress, showModal, showToast} from "../../utils/asyncWX/index.js"
Page({
  data:{
    siteInfo:{},  //地址信息
    carList:[],   //购物车数据
    totalNum: 0,  //购买总数量
    totalMoney: 0, //购买总金额
    checkedAll: false //全选
  },
  //点击收货地址事件
  async getSite(){
    // 获取用户权限
    const resSetting = await getSetting()  
    let authSetting = resSetting.authSetting['scope.address'];
    // 判断用户是否授予权限
    if(authSetting === false){
      const resSetting = await openSetting()
    }
    const resAddress = await chooseAddress()
    wx.setStorageSync('Site', resAddress)
  },
  // 获取用户地址
  getSiteInfo(){
    let siteInfo = wx.getStorageSync('Site') || {};
    this.setData({
      siteInfo,
    })
  },
  // 获取购物车缓存数据
  getCarData(){
    //获取购物车缓存数据
    let carList = wx.getStorageSync('CarData') || [];
    // 全选、购买总数、总金额
    let checkedAll = carList.length? true : false;
    let totalNum = 0;
    let totalMoney = 0;
    // 计算总金额和总数量
    carList.forEach(e => {
      if(e.check){
        totalNum += e.num;
        totalMoney += e.num * e.goods_price
      } else {
        checkedAll = false
      }
    })
    this.setData({
      checkedAll,
      totalNum,
      totalMoney,
      carList
    })
  },
  // 当个复选框操作事件
  handlChange(e){
    let index = e.currentTarget.dataset.index;
    let {carList} = this.data
    carList[index].check = !carList[index].check;
    this.data.carList = true
    wx.setStorageSync('CarData',carList);
    this.getCarData()
  },
  // 全选复选框操作事件
  handlAllChange(){
    let checkedAll = !this.data.checkedAll;   // 全选按钮取反
    let {carList} = this.data;                //获取商品数据
    // 根据全选复选框操作当个复选框
    checkedAll? carList.forEach(e => { e.check = true }) : carList.forEach(e => { e.check = false })
    //  设置缓存
    wx.setStorageSync('CarData',carList)
    // 重新获取商品数据
    this.getCarData()
  },
  //更改商品数量
  async changeNum(e){
    let index = e.currentTarget.dataset.index;  //获取当前点击的商品
    let num = e.currentTarget.dataset.num;      //获取+1或-1
    let {carList} = this.data;                  //获取商品数据
    //商品数为0时，减商品数赋值为0；加商品数加1
    if(num === -1 && carList[index].num === 1){
      await showModal('是否从购物车中移除该商品');
      carList.splice(index,1)
    } else {
      carList[index].num += num;
    }
    //设置到缓存中
    wx.setStorageSync('CarData',carList)
    // 重新执行获取商品数据
    this.getCarData()
  },
  //结算啦
  clearing(){
    let {siteInfo,totalNum} = this.data;
    if (!totalNum) {
      showToast('您还未选择商品~')
    } else if (!siteInfo.userName){
      showToast('您还未添加收货地址~')
    } else {
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    }
  },
  onShow(){
    this.getSiteInfo()
    this.getCarData()
  },
})