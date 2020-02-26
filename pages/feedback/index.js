import {showToast} from '../../utils/asyncWX/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],  //添加图片数据 
    textVal: '',    //问题描述内容
    tabs:[
      {id: 0,value: '体验问题', isActive: true},
      {id: 1,value: '商品、商家投诉',isActive: false}
    ],
    tabsIndex: 0,
    issueKind:['功能建议','购买遇到问题','性能问题','其他'],
    issueKindIndex: -1,   //按钮高亮效果
  },
  UploadFile:[],    //上传外网图片路径
  // tabs切换
  tabsChange(e){
    let index = e.detail.index;
    let {tabs} = this.data;
    tabs.forEach((e,i) => {i=== index? e.isActive = true : e.isActive = false});
    this.setData({
      tabs
    });
  },
  // 问题种类高亮效果
  handlIssueKind(e){
    let {index} = e.currentTarget.dataset;
    this.setData({
      issueKindIndex: index
    })
  },
  // 添加图片
  handlImg(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const imgList = res.tempFilePaths;
        this.setData({
          imgList: [...imgList,...this.data.imgList]
        })
      }
    })
  },
  // 删除图片
  handlIcon(e){
    let {index} = e.currentTarget.dataset;
    let {imgList} = this.data;
    imgList.splice(index,1);
    this.setData({
      imgList
    })
  },
  // 获取描述内容
  handlTextChange(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交反馈
  handlCommit(){
    let {textVal,imgList} = this.data;
    if(!textVal.trim()){
      showToast('描述不能为空')
      return;
    }
    if(imgList.length === 0){
      showToast('感谢您的反馈~')
      this.setData({
        textVal: ''
      })
    } else {
      imgList.forEach((e,i) => {
        wx.uploadFile({
          filePath: e,
          name: 'file',
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          success: res =>{
            if(i === imgList.length-1){
              this.setData({
                imgList: [],
                textVal: ''
              })
              showToast('感谢您的反馈~')
            }
          }
        })
      })
    }
    
  }
})