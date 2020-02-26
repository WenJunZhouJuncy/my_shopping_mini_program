
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
let app = getApp()
Page({
  data: {
    searchList:[],
    searchValue:''
  },
  timeId:'',
  handlInput(e){
    let query = e.detail.value;
    this.setData({
      searchValue: query
    })
    if(query.trim()){
      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        this.query(query)
      }, 1000); 
    }else{
      this.setData({
        searchList:[]
      })
    }
  },
  async query(query){
    const res = await request({url:app.apiUrl.qsearch,data:{query}});
    this.setData({
      searchList:res.data.message,
    })
  },
  handlButton(){
    this.setData({
      searchList:[],
      searchValue:''
    })
  }
})