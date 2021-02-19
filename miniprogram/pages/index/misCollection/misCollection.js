// miniprogram/pages/index/misCollection/misCollection.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionMenu: [],
    selectQuestionMenu: '请选择',
    objectQuestionMenu: {},
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('questionMenu').get().then(res => {
      var questionMenu = [];
      if (res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
          questionMenu.push(res.data[i].name);//questionMenu只是存了各套题的名字，全部的题目信息在objectQuestionMenu
        }
      }
      console.log(questionMenu);
      console.log(res.data)
      this.setData({
        questionMenu: questionMenu,
        objectQuestionMenu: res.data
      })
      console.log(this.data.objectQuestionMenu)
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
  /**
   * 选择题库
   */
  changeMenu(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
      selectQuestionMenu: this.data.questionMenu[e.detail.value]
    })
    wx.navigateTo({
      url: '../misAnalysis/misAnalysis?id=' + this.data.objectQuestionMenu[this.data.index].id 
    })
  }
})