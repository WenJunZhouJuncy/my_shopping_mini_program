import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js';
const app = getApp()
Page({
  data: {
    tabs:[
      {id:0,value: '综合', isActive: true},
      {id: 1,value: '销量',isActive: false},
      {id: 2,value: '价格',isActive: false}
    ],
    goodsList: []
  },
  questData : {
    query : "",
    cid : "",
    pagenum : 1,
    pagesize : 10
  },
  dataTotal: '',
  //综合 销量 价格切换事件
  tabsChange(e){
    let index = e.detail.index;
    let [...tabs] = this.data.tabs;
    tabs.forEach((e,i) => {i=== index? e.isActive = true : e.isActive = false});
    this.setData({
      tabs
    });
  },
  // 商品列表数据请求
  async getGoodsList(){
    const res = await request({url:app.apiUrl.search, data:this.questData});
    let messageAll = res.data.message;
    let goodsList = messageAll.goods;
    this.dataTotal = Math.ceil(messageAll.total / this.questData.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList,...goodsList]
    })
    wx.stopPullDownRefresh();
  },
  onLoad: function (options) {
    this.questData.cid = options.cid;
    this.getGoodsList();
  },
  // 下拉刷新
  onPullDownRefresh: function(){
    this.setData({
      goodsList: []
    });
    this.questData.pagenum = 1;
    this.getGoodsList();
  },
  // 下拉触底
  onReachBottom: function () {
    if(this.dataTotal > this.questData.pagenum){
      this.questData.pagenum++;
      this.getGoodsList()
    } else {
      wx.showToast({
        title: '没有数据啦~',
        icon: 'none'
      })
    }
  },
})