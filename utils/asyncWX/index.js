
// 获取用户授权
export const getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 未授权是引导用户授权
export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
//获取用户收货地址
export const chooseAddress = () => {
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (res) => {
        resolve(res)
      },
      fail:err => {
        reject(err)
      }
    })
  })
}
// 对话框
export const showModal = msg => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: msg,
      success (res) {
        if (res.confirm) {
          resolve()
        }
      }
    })
  })
}
//  消息提示
export const showToast = msg => {
  wx.showToast({
    title: msg,
    icon: 'none',
  })
}