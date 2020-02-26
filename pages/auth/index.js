import {request} from '../../request/index.js'  //{url: app.apiUrl.key}
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import {login} from '../../utils/asyncWX/index'
const app = getApp()
Page({
  async handlUserInfo(e){
    try{
      const {encryptedData, rawData, iv, signature}= e.detail;
      const {code} = await login();
      const parmas = {encryptedData, rawData, iv, signature, code};
      const {token} = await request({url: app.apiUrl.wxlogin, data:parmas, method: 'post'});
      // wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      console.log(error)
    }
  }
})