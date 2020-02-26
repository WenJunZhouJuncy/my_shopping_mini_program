import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
let app = getApp()
Page({

  data: {
    swiperList: [],
    catitemsList: [],
    floorList: []
  },
  async getSwiperList(){        //轮播图
    const res = await request({url: app.apiUrl.swiperdata})
    this.setData({
      swiperList: res.data.message
    })
  },
  async getCatitemsList(){        //导航菜单
    const res = await request({url: app.apiUrl.catitems})
    this.setData({
      catitemsList: res.data.message
    })
  },
  async getFloorList(){        //导航菜单
    const res = await request({url: app.apiUrl.floordata})
    this.setData({
      floorList: res.data.message
    })
  },
  onLoad: function (options) {
    this.getSwiperList()
    this.getCatitemsList()
    this.getFloorList()
  },
})