
let requestNum = 0;
export const request = (params)=>{
  let baseUrl = "https://api.zbztb.cn/api/public/v1";
  requestNum++
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success:res => {
        resolve(res)
      },
      fail:err => {
        reject(err)
      },
      complete:()=>{
        requestNum--;
        if(!requestNum){
          wx.hideLoading()
        }
      }
    })
  })
}