App({
  onLaunch: function () {
    console.log('App Launch')
    if(!wx.cloud){
      console.error('请调用2.2.2或以上的基础库以使用云能力')
    }else{
      wx.cloud.init({
        env:'celestial-928fcf',
        traceUser:true
      })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },

  // appData: {
  //   userinfo: null,
  // },

  globalData: {
    hasUser: false, // 数据库中是否有用户
    hasUserInfo: false, // 小程序的userInfo是否有获取
    userInfo: null,
    _openid: null,
    id: null,
    choosenList:[]//用户当前的答题记录
  }


})