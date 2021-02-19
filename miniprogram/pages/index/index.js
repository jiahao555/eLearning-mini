//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    _openid:null,
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasUserInfo:app.globalData.hasUserInfo,
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 去tab learn
  icoursesClick:function(){
    wx.switchTab({
      url: '../learn/index'
    })
  },

  getUserInfo: function (result) {
    this.setData({ 
      userInfo: result.detail.userInfo,
      hasUserInfo: true
    })
    app.globalData.userInfo = result.detail.userInfo
    app.globalData.hasUserInfo = true
    console.log(app.globalData.userInfo)
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        app.globalData._openid = res.result.event.userInfo.openId
        userInfo.where({
          _openid: res.result.event.userInfo.openId
        }).count().then(res => {
          if (res.total == 0) {
            userInfo.add({
              data: result.detail.userInfo
            }).catch(err => {
              console.error(err)
            })
            } else {
                console.log('数据库userInfoCollection已有该用户')
            }
          });

      }
    })

  }
})