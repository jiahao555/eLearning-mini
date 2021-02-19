// miniprogram/pages/learn/index.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    active:-1,//看过视频打钩
    activeNames: [1,2,3],//打开哪些折叠板
    courses:[],//所有章
    sections:[],//所有节
    viewedId:-1,//0代表看过1.1节，1代表看过1.2节
    show: false,//是否展示输入后台密码Dialog
    show1: false,//是否展示输入后台密码Dialog(发布签到)
    password: '', //后台密码
    notices:'初值'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('courses').where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        courses: res.data
      })
    })
    db.collection('sections').where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        sections: res.data
      })
    })
    db.collection('userInfo').where({
       _openid: app.globalData._openid // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data[0].viewedId)
      this.setData({
        viewedId: res.data[0].viewedId
      })
    })
    //注意只能get到前20条，要定期清理notices
    db.collection('notices').where({
      // _openid: app.globalData._openid // 填入当前用户 openid
    }).get().then(res => {
      var latest = res.data.length-1
      console.log(res.data)
      // var temm = res.data[0].content
      this.setData({                 //这个开发工具的this.setData()有BUG，下方同样代码却不行
        notices: res.data[latest].content
      })
      // this.setData({
      //   notices: res.data[0].notices
      // })
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
  collapseOnChange(event) {     
    this.setData({
      activeNames: event.detail
    });
  },
  noticesClick:function(){
    this.setData({
      show: true
    });
    console.log(this.data.notices)
  },
  poSignClick: function () {
    this.setData({
      show1: true
    });
  },
  confirm:function(e){
    console.log(e.detail)
    if (e.detail=='123456'){
      wx.navigateTo({
        url: '../learn/more/notices/notices',
      })
    }
  },
  // 判断进入发布签到后台密码是否正确
  confirm1: function (e) {
    console.log(e.detail)
    if (e.detail == '123456') {
      wx.navigateTo({
        url: '../learn/more/releaseSign/releaseSign',
      })
    }
  }
})