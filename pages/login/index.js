// pages/login/index.js
Page({
  handlGetUserInfo(e){
    let {userInfo} = e.detail;
    console.log(e)
    wx.setStorageSync('UserInfo', userInfo);
    wx.navigateBack({
      delta: 1,
    })
  }
})