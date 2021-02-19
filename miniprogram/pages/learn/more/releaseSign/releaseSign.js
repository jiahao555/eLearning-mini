// miniprogram/pages/learn/more/releaseSign/releaseSign.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: '',
    _id:"",
    latitude: "",
    longitude: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('toSignClass').where({
    }).get().then(res => {
      console.log(res.data)
      var latest = res.data.length - 1
      this.setData({
        _id: res.data[latest]._id,
        classNum: res.data[latest].classNum
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
  commentInput: function (event) {
    console.log(event.detail)
    this.setData({ comment: event.detail })
  },

  checkList:function(){
    wx.navigateTo({
      url: '../signedList/signedList?classNum='+this.data.classNum
    })
  },

  endSign:function(event) {
    console.log(this.data._id)
    db.collection('toSignClass').doc(this.data._id).update({
      data: {
        signing: false
      }
    })
      .then(
        console.log,
        wx.showToast({
          title: '已停止签到！',
        }),
      setTimeout(() => {
        wx.reLaunch({
          url: '../../index',
        })
      }, 1100)
        )
      .catch(console.error)
  },

  // ----------------------- 上传要签到课时到数据库---------------------------
  checkSubmit: function (event) {
    var that = this;
    wx.showModal({
      // title: '提示',
      content: '确定发表签到？',
      duration: 10000,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(that.data.comment)
          if (that.data.comment == '') {
            wx.showToast({
              title: '不可以发表空白签到',
              icon: 'none',
              duration: 2000
            })
          } else {
            console.log(that.data.comment)
            let d = new Date()
            var time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

            // 获取地理位置
            // var that =this
            wx.getLocation({
              type: 'wgs84',
              success(res) {
                // const latitude = res.latitude
                // const longitude = res.longitude
                // const accuracy = res.accuracy
                console.log(res.latitude)
                that.setData({
                  latitude: res.latitude,
                  longitude: res.longitude
                })
              }
            })
            // db.collection('toSignClass').add({
            //   // data 字段表示需新增的 JSON 数据
            //   data: {
            //     classNum: that.data.comment,
            //     date: time
            //   }
            // })
            //   .then(res => {
            //     console.log(res)
            //   })
            //   .catch(console.error)
            //需要用上面代码add之后才能update
            //update只能update一个字段的信息?
            setTimeout(() => {
              db.collection('toSignClass').add({
                // data 传入需要局部更新的数据
                data: {
                  classNum: that.data.comment,
                  date: time,
                  signing: true,
                  latitude: that.data.latitude,
                  longitude: that.data.longitude
                }
              })
                .then(
                  console.log,
                  wx.showToast({
                    title: '发布成功！',
                  }),
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '../../index',
                    })
                  }, 1100)
                )
                .catch(console.error)
            }, 1500)

            
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})