import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import {showToast} from '../../utils/asyncWX/index.js'
const app = getApp()
Page({
  data: {
    goodsDetailMsg: null, //商品详情
    collect: false         //收藏
  },
  goodsDetailAll: null,
  collectList:[],
  // 获取商品详情
  async getGooosDetail(goods_id){
    const res = await request({url: app.apiUrl.detail,data:goods_id})
    this.goodsDetailAll = res.data.message;
    let {pics,goods_price,goods_name,goods_introduce} = this.goodsDetailAll
    this.setData({
      goodsDetailMsg:{
        pics,goods_price,goods_name,goods_introduce
      }
    })
    // 保存浏览记录
    let historyList = wx.getStorageSync('History') || [];
    historyList = historyList.filter(e => e.goods_id !== this.goodsDetailAll.goods_id)
    wx.setStorageSync('History', [...historyList,this.goodsDetailAll]);
  },
  // 浏览轮播图图片
  browse(e){
    let current = e.currentTarget.dataset.url
    let urls = this.data.goodsDetailMsg.pics.map(e => e.pics_big)
    wx.previewImage({
      current,
      urls
    })
  },
  // 加入购物车
  joinCar(){
    let Car = wx.getStorageSync('CarData') || [];
    let index = Car.findIndex(e => e.goods_id === this.goodsDetailAll.goods_id)
    if(index === -1){
      let shoppingCarData = {...this.goodsDetailAll};
      shoppingCarData.num = 1;
      shoppingCarData.check = true;
      Car.push(shoppingCarData)
    } else {
      Car[index].num++;
    }
    showToast('加入成功！')
    wx.setStorageSync('CarData', Car);
  },
  // 收藏
  handlCollect(){
    if(this.data.collect){
      let index = this.collectList.findIndex(e => e.goods_id === this.goodsDetailAll.goods_id);
      this.collectList.splice(index,1);
      showToast('取消成功~')
    } else {
      this.collectList.push(this.goodsDetailAll)
      showToast('收藏成功~')
    }
    wx.setStorageSync('Collect', this.collectList)
    this.setData({
      collect: !this.data.collect
    })
  },
  // 查询是否已收藏该商品
  selectCollect(goods_id){
    this.collectList = wx.getStorageSync('Collect') || [];
    let collect = this.collectList.length > 0? this.collectList.some(e => e.goods_id == goods_id) : false ;
    this.setData({
      collect
    })
  },
  //立即购买
  nowBuy(){
    showToast('这是个意料之外的错误~')
  },
  onShow(){
    let pages = getCurrentPages();
    let {goods_id} = pages[pages.length -1].options;
    this.getGooosDetail({goods_id});
    this.selectCollect(goods_id);
  },
}) 