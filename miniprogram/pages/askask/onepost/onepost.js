// miniprogram/pages/ask/onepost.js
const db = wx.cloud.database()
const respond = db.collection('respond')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postInfo:{},
    postId:"",
    imgUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    this.setData({ postId: options.id})
    // 获取该问问的内容
    wx.showLoading({
      title: '加载中',
    })
    db.collection('posts').where({
      _id: options.id
    }).get({
      success: res => {
        console.log(res)
        this.setData({
          postInfo: res.data[0],
          imgUrl: res.data[0].image[0]
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
// 获取该问问的回复(为了防止postId被刷新，所以不在showpage函数中调用onload函数，回复某个问问后，不能自动刷新答复，需要推出，返回上一级才能看见自己的回复)
    db.collection('respond').where({
      postId: options.id
    }).get({
      success: res => {
        console.log(res)
        this.setData({
          respond: res.data
        })
        wx.hideLoading()
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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