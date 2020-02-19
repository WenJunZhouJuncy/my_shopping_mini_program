import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import {showToast} from '../../utils/asyncWX/index.js'
const app = getApp()
Page({
  data: {
    goodsDetailMsg: null,
  },
  goodsDetailAll: null,
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
  onLoad(options){
    this.getGooosDetail({goods_id:options.goods_id})
  },
}) 