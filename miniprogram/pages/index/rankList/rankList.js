// miniprogram/pages/index/rankList/rankList.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('rank' + options.id.charAt(7)).where({
      // _openid: 'xxx' // 填入当前用户 openid
    }).get().then(res => { 
      console.log(res.data)
      // sort() 数组对象排序
      var compare = function (obj1, obj2) {
        var val1 = obj1.score;
        var val2 = obj2.score;
        if (val1 < val2) {
          return 1;
        } else if (val1 > val2) {
          return -1;
        } else {
          return 0;
        }
      }
      console.log("数组对象排序：");
      var sortArr = res.data.sort(compare);
      this.setData({
        sortArr: sortArr
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

  }
})