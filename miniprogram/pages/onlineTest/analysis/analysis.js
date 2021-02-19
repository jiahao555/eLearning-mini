// miniprogram/pages/onlineTest/analysis/analysis.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],//该套题全部题目信息
    indexQuestion: {},//当前页面显示的题目信息
    index: 0,//当前题号
    chooseList: [
      { option: "A", value: "" },
      { option: "B", value: "" },
      { option: "C", value: "" },
      { option: "D", value: "" }
    ],
    choosenOption: '',
    score: 0,
    showNextBut: true,
    answer:'',
    yourAnswer:'',
    analysis:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('chapter1').where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => {
      var index = this.data.index
      var questionNum = res.data.length
      var yourAnswer=app.globalData.choosenList[index]
      var analysis = res.data[this.data.index].analysis
      this.setData({
        yourAnswer: yourAnswer
      })
      console.log(this.data.yourAnswer)
      //判断是否最后一题,如果是则不显示“下一题”按键
      if (this.data.index == questionNum - 1) {
        this.setData({
          showNextBut: false
        })
      }
      this.setData({
        questions: res.data,
        indexQuestion: res.data[index],
        chooseList: res.data[index].chooseList,
        answer: res.data[index].answer,
        analysis: analysis
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
  lastClick: function () {
    var questionId = this.data.index - 1
    this.setData({ 
      index: questionId,
      showNextBut:true
    })
    console.log(this.data.index)
    this.onLoad()
  },
  nextClick: function () {
    var questionId = this.data.index + 1
    this.setData({
      index: questionId,
    })
    this.onLoad()
  }
})