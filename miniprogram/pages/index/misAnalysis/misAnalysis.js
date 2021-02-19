// miniprogram/pages/index/misAnalysis/misAnalysis.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],//该套题全部题目信息
    misQuestions: [],//错题全部题目信息
    indexQuestion: {},//当前页面显示的题目信息
    index: 0,//当前错题题号
    i: 0,//用于阻止misQuestions给重复push元素
    chooseList: [
      { option: "A", value: "" },
      { option: "B", value: "" },
      { option: "C", value: "" },
      { option: "D", value: "" }
    ],
    choosenList:[],
    choosenOption: '',
    score: 0,
    showNextBut: true,
    answer: '',//该题答案
    yourAnswer: '',
    analysis: '',
    id:"",//如“chapter1”,
    misIdList:[],
    misAnswerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
    })
    // 向数据库取得该用户该章答题记录
    db.collection('answerRecord').doc(app.globalData._openid + options.id.charAt(7)).get().then(res => {
      console.log(res.data.choosenList)
      // 如果该用户在这章全部都答对了，那misIdList=[]
      console.log(res.data.misIdList)
      // var allRight=[]
      // if (res.data.misIdList == allRight){
      //   wx.showToast({
      //     title: '该章测试无错题i',
      //   })
      //   wx.navigateBack({
      //     delta: 1
      //   })
      // }
      this.setData({
        choosenList: res.data.choosenList,
        misIdList: res.data.misIdList,
        misAnswerList: res.data.misAnswerList,
      })
    })
    // 获取该章所有题目信息,并根据misIdList如【2，5】创建错题集【0，1】(misQuestions)，这样这样后面的代码就不用改
    db.collection(options.id).where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      console.log(this.data.misIdList)
      var misQuestions = [];
      var i = this.data.i
      for (; i < this.data.misIdList.length; i++) {
        this.data.misQuestions.push(res.data[this.data.misIdList[i]]);
      }
      console.log(i)
      //阻止misQuestions给重复push元素
      this.setData({
        i: i
      })
      // 成功创建错题集
      console.log(this.data.misQuestions)
      var index = this.data.index
      var questionNum = this.data.misQuestions.length
      var yourAnswer = this.data.misAnswerList[index]
      var analysis = this.data.misQuestions[index].analysis
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
        indexQuestion: this.data.misQuestions[index],
        chooseList: this.data.misQuestions[index].chooseList,//chooseList是当前题的所有选项
        answer: this.data.misQuestions[index].answer,
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
      showNextBut: true
    })
    console.log(this.data.index)
    this.onLoad({ id: this.data.id })
  },
  nextClick: function () {
    var questionId = this.data.index + 1
    this.setData({
      index: questionId,
    })
    this.onLoad({id:this.data.id})
  },
})