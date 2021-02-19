// miniprogram/pages/learn/more/sign/sign.js
const db = wx.cloud.database()
// var Util = require("../../../../utils/util.js");
const app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classNum: "", 
    date: "",
    signing:false,
    teacherLatitude:"",
    teacherLongitude: "",
    // latitude:"",
    // longitude:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //注意只能get到前20条，要定期清理
      db.collection('toSignClass').where({
      }).get().then(res => {
      var latest = res.data.length - 1
      this.setData({
        classNum: res.data[latest].classNum,
        date: res.data[latest].date,
        signing: res.data[latest].signing,
        teacherLatitude: res.data[latest].latitude,
        teacherLongitude: res.data[latest].longitude
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  signClick:function(){
    wx.showLoading({
      title: '签到校对中',
    })
    var that = this
    // 获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        // const accuracy = res.accuracy
        // console.log(res.latitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })

    setTimeout(() => {
      //计算两经纬度之间的距离，返回单位米
      function getDistance(lat1, lng1, lat2, lng2) {
        lat1 = lat1 || 0;
        lng1 = lng1 || 0;
        lat2 = lat2 || 0;
        lng2 = lng2 || 0;
        var rad1 = lat1 * Math.PI / 180.0;
        var rad2 = lat2 * Math.PI / 180.0;
        var a = rad1 - rad2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var r = 6378137;
        return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0);
      }

      var distance = getDistance(that.data.latitude, that.data.longitude, that.data.teacherLatitude, that.data.teacherLongitude);
      if (distance < 100) {
        db.collection('sign' + this.data.classNum).add({
          // data 字段表示需新增的 JSON 数据
          data: {
            avatar: app.globalData.userInfo.avatarUrl,
            nickName: app.globalData.userInfo.nickName
          }
        })
          .then(res => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '签到成功!',
            })
          })
          .catch(console.error)
      }
      else {
        wx.hideLoading()
        wx.showToast({
          title: '签到失败，您不在课室',
        })
      }
    }, 1500)
    
  }
  
})