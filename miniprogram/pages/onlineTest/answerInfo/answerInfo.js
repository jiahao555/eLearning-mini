// miniprogram/pages/onlineTest/answerInfo/answerInfo.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    questionMenu: '',
    questionNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    db.collection('questionMenu').where({
      id: options.id
    }).get().then(res => {
      this.setData({
        id: options.id,
        questionMenu: res.data[0].name,
        questionNum: res.data[0].questionNum
      })
      console.log(this.data)
    }).catch(err => {
      console.error(err)
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
  onUnload: function (e) {
    
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
  start:function(){
    wx.redirectTo({
      url: '../answer/answer?id=' + this.data.id + '&questionMenu=' + this.data.questionMenu
    })
  }
})