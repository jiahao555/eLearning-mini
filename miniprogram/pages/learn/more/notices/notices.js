// miniprogram/pages/learn/more/notices/notices.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  commentInput: function (event) {
    console.log(event.detail)
    this.setData({ comment: event.detail })
  },

  // ----------------------- 上传通知到数据库---------------------------
  checkSubmit: function (event) {
    var that = this;
    wx.showModal({
      // title: '提示',
      content: '确定发表通知？',
      duration: 10000,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(that.data.comment)
          if (that.data.comment == '') {
            wx.showToast({
              title: '不可以发表空白通知',
              icon: 'none',
              duration: 2000
            })
          } else {
            console.log(that.data.comment)
            db.collection('notices').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                content: that.data.comment
              }
            })
              .then(res => {
                console.log(res)
                wx.showToast({
                  title: '发布成功！',
                }),
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '../../index',
                    })
                  }, 1100)
              })
              .catch(console.error)

            // db.collection('notices').doc('3fc2c9075caccf93032ec36a61890711').update({
            //   // data 传入需要局部更新的数据
            //   data: {
            //     // 表示将 done 字段置为 true
            //     content: that.data.comment
            //   }
            // })
            //   .then(
            //     console.log,
            //     wx.showToast({
            //       title: '发布成功！',
            //     }),
            //     setTimeout(() => {
            //       wx.reLaunch({
            //         url: '../../index',
            //       })
            //   }, 1100)
            //   )
            //   .catch(console.error)
            // db.collection('notices').add({
            //   // data 字段表示需新增的 JSON 数据
            //   data: {
            //     content: that.data.comment
            //   }
            // })
            //   .then(res => {
            //     console.log(res)
            //   })
            //   .catch(console.error)
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})