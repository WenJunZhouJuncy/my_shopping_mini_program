import {showToast} from "../../utils/asyncWX/index"
Page({
  data: {
    collectList:[],     //收藏商品
    historyList:[],     //我的足迹
    tabs:[
      {id: 0,value: '收藏的店铺', isActive: true},
      {id: 1,value: '收藏的品牌',isActive: false},
      {id: 2,value: '收藏的商品',isActive: false},
      {id: 3,value: '我的足迹',isActive: false}
    ],
    tabsIndex:0,
  },
  
  // tabs切换
  tabsChange(e){
    let index = e.detail.index;
    let {tabs} = this.data;
    tabs.forEach((e,i) => {i=== index? e.isActive = true : e.isActive = false});
    this.setData({
      tabs
    });
  },
  // 根据条件高亮Tabs
  handlTabsIndex(index){
    let {tabs} = this.data;
    tabs.forEach((e,i) => { i == index? e.isActive = true : e.isActive = false});
    this.setData({
      tabs
    })
  },
  // 获取收藏
  getCollect(){
    let collectList = wx.getStorageSync('Collect') || [];
    this.setData({
      collectList
    })
  },
  // 获取浏览历史
  getHistory(){
    let historyList = wx.getStorageSync('History') || [];
    this.setData({
      historyList
    })
  },
  onShow(){
    let pages = getCurrentPages();
    let {index} = pages[pages.length - 1].options;
    this.getCollect()
    this.getHistory()
    this.handlTabsIndex(index)
  }
})