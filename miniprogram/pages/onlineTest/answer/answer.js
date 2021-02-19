// miniprogram/pages/onlineTest/answer/answer.js
const db = wx.cloud.database()
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions:[],//该套题全部题目信息
    indexQuestion:{},//当前页面显示的题目信息
    index:0,//当前题号
    chooseList:[
      { option: "A", value: "" },
      { option: "B", value: "" },
      { option: "C", value: "" },
      { option: "D", value: "" }
    ],
    choosenList:[],//答题记录
    misIdList:[],//错题序号
    misAnswerList:[],//错误回答
    choosenOption:'',
    score:0,
    showNextBut:true,
    chapterNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id.charAt(7))
    this.setData({
      chapterNum: options.id.charAt(7)
    })
    db.collection('chapter1').where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => {
      var index= this.data.index
      var questionNum=res.data.length
      //判断是否最后一题
      if (this.data.index == questionNum-1){
        wx.showToast({
          title: '最后一题，答完请"交卷"',
          icon: 'none',
          duration: 1500,
        })
        this.setData({
          showNextBut: false
        })
      }
      this.setData({ 
        questions: res.data,
        indexQuestion: res.data[index],
        chooseList: res.data[index].chooseList
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
    var questionId = this.data.index-1
    this.setData({ index: questionId })
    console.log(this.data.index)
    this.onLoad({ id:"chapter"+this.data.chapterNum})
  },
  nextClick:function(){
    var questionId=this.data.index+1
    var choosenOption=this.data.choosenOption
    //录入答题记录
    this.data.choosenList.push(choosenOption)
    console.log(this.data.choosenList)
    // 判断是否最后一题
    console.log(questionId)
    console.log(this.data.questions.length)
    if (questionId == this.data.questions.length) {
      wx.showToast({
        title: '题目已答完,请"交卷"',
        icon: 'none',
        duration: 1500
      })
    }
    else {
      this.setData({
        index: questionId,
      })
      this.onLoad({ id: "chapter" + this.data.chapterNum })
    }
    //计算暂时得分
    if (choosenOption==this.data.indexQuestion.answer){
      var score1=this.data.score+1
      this.setData({
        score: score1
      })
    }
    // 记录回答错误即记录题目的index和错误的选项
    else{
      this.data.misIdList.push(this.data.index-1)
      this.data.misAnswerList.push(choosenOption)
    }
    console.log('当前得分是：',this.data.score,'分')
  },
  radioChange(e) {
    this.setData({
      choosenOption: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //交卷触发函数
  submit:function(){
    var that=this
    var choosenOption = this.data.choosenOption
    wx.showModal({
      content: '是否提交答案？',
      success(res) {           //注意回调风格不同promise风格，promise风格不能直接用that
        if (res.confirm) {
          //把所选答案录入答题记录
          that.data.choosenList.push(that.data.choosenOption)
          app.globalData.choosenList = that.data.choosenList
          // console.log(app.globalData.choosenList)

          //计算所答最后一题得分
          if (choosenOption == that.data.indexQuestion.answer) {
            var score1 = that.data.score + 1
            that.setData({
              score: score1
            })
          }
          // 记录回答错误即记录题目的index和错误的选项
          else {
            that.data.misIdList.push(that.data.index)
            that.data.misAnswerList.push(choosenOption)
          }

          // 排名：上传用户信息和分数到云端对应章集合
          console.log('rank' + that.data.chapterNum)
          db.collection('rank' + that.data.chapterNum).add({
            // data 字段表示需新增的 JSON 数据
            data: {
              avatar: app.globalData.userInfo.avatarUrl,
              nickName: app.globalData.userInfo.nickName,
              score: that.data.score
            }
          })
            .then(res => {
              console.log(res)
            })
            .catch(console.error)

          // 上传答题记录到云端用户答题记录
          db.collection('answerRecord').where({
            _id: app.globalData._openid + that.data.chapterNum//_openid+chapterNum构成唯一的该用户某章的答题记录
          }).count().then(res => {
            if (res.total == 0) {
              db.collection('answerRecord').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  _id: app.globalData._openid + that.data.chapterNum, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                  "choosenList": that.data.choosenList,
                  "misIdList": that.data.misIdList,
                  "misAnswerList": that.data.misAnswerList
                }
              })
                .then(res => {
                  console.log(res)
                })
                .catch(console.error)
            } else {
              console.log('数据库answerRecord已有该用户')
              db.collection('answerRecord').doc(app.globalData._openid + that.data.chapterNum).update({
                // data 传入需要局部更新的数据
                data: {
                  // 表示将 done 字段置为 true
                  "choosenList": that.data.choosenList,
                  "misIdList": that.data.misIdList,
                  "misAnswerList": that.data.misAnswerList
                }
              })
                .then(console.log)
                .catch(console.error)
            }
          })


          
          

          //跳转到答题成绩
          wx.redirectTo({
            url: '../score/score?score=' + that.data.score + '&questionNum=' + that.data.questions.length + '&id=' + that.data.chapterNum,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})