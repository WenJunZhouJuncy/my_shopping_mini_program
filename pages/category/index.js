import {request} from '../../request/index.js'  //{url: app.apiUrl.key}
import regeneratorRuntime from '../../lib/runtime/runtime.js';
let app = getApp()
Page({
  data: {
    allList: [],        //所有数据
    leftMeuList: [],    //左侧分类数据
    rigthClassList: [], //右侧分类数据
    leftIndex: 0,       //左侧列表索引
    scrollTop: 0        //右侧滚动高度
  },
  onLoad: function (options) {
    let Cate = wx.getStorageSync('Cate');
    if(!Cate){
      this.getCategories()
    } else if(Date.now() - Cate.time > 1000*10) {
      this.getCategories()
    } else {
      let allList = Cate.data
      let leftMeuList = Cate.data.map(v => v.cat_name)
      let rigthClassList = Cate.data[0].children
      this.setData({
        allList,
        leftMeuList,
        rigthClassList
      })
    }
  },
  // 获取分类接口
  async getCategories(){
    const res =await request({url: app.apiUrl.categories})
    let allList = res.data.message
    let leftMeuList = allList.map(v => v.cat_name)
    let rigthClassList = allList[0].children
    wx.setStorageSync('Cate', {time: Date.now(), data: allList})
    this.setData({
      allList,
      leftMeuList,
      rigthClassList
    })
  },
  // 左侧分类点击事件
  switchCategor(e){
    let leftIndex = e.currentTarget.dataset.index;
    let rigthClassList = this.data.allList[leftIndex].children
    this.setData({
      leftIndex,
      rigthClassList,
      scrollTop: 0
    })
  }
})