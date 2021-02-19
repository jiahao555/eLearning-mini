// miniprogram/pages/learn/more/signedList/signedList.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortArr:[],
    classNum:'',
    Num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('sign' + options.classNum).where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        sortArr: res.data,
        classNum: options.classNum
      })
      })

    db.collection('sign1').where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).count().then(res => {
      console.log(res.total)
      this.setData({
        Num: (res.total-1)
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

  }
})