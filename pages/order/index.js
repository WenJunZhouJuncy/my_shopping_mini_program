import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js';
const app = getApp()
Page({
  data:{
    tabs:[
      {id: 0,value: '全部', isActive: true},
      {id: 1,value: '待付款',isActive: false},
      {id: 2,value: '待收货',isActive: false},
      {id: 3,value: '退货/退款',isActive: false}
    ],
  },
  //tabs切换事件
  tabsChange(e){
    let index = e.detail.index;
    let {tabs} = this.data;
    tabs.forEach((e,i) => {i=== index? e.isActive = true : e.isActive = false});
    this.setData({
      tabs
    });
  },
  // 获取订单
  async getOrders(type){
    let index = type.type;
    let [...tabs] = this.data.tabs;
    tabs.forEach((e,i) => {i=== Number(index-1)? e.isActive = true : e.isActive = false});
    this.setData({
      tabs
    });
  },
  onShow(){
    let page = getCurrentPages();
    let {options}= page[page.length-1];
    this.getOrders(options)
  }
})