// miniprogram/pages/onlineTest/score/score.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    total:0,
    beatNum:0,
    average:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      score: options.score,
      total: options.questionNum
    })
    //查询并计算击败考生数和本站平均分
    db.collection('rank' + options.id).where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      var scoreMenu = [];
      var allUserScore=0
      var average=0
      var beatNum=0
      if (res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
          if (this.data.score > res.data[i].score){
            beatNum++
          }
          scoreMenu.push(res.data[i].score);
          allUserScore = allUserScore+res.data[i].score
        }
      }
      console.log(scoreMenu)
      average = (allUserScore / res.data.length)
      console.log(average.toFixed(1))
      this.setData({
        average: average.toFixed(1),
        beatNum:beatNum
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
  backIndex:function(){
    console.log('hello')
    wx.reLaunch({
      url: '../../onlineTest/onlineTest',
    })
  },
  //查看解析
  viewAnalysis:function(){
    wx.navigateTo({
      url: '../analysis/analysis',
    })
  }
})