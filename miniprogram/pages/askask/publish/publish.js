// miniprogram/pages/ask/publish.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    title: '',
    imgUrl: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  textInput: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 发布问问
  pulish: function () {
    let d = new Date()
    var data = {
      image: new Array(this.data.imgUrl),
      title:this.data.title,
      content: this.data.text,
      avatar: app.globalData.userInfo.avatarUrl,
      username: app.globalData.userInfo.nickName,
      time: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
      commentNum: 0
    }

    console.log(data)

    if (data.content) {
      db.collection('posts').add({
        data: data,
        success: res => {
          console.log(res)
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(() => {

            wx.switchTab({
              url: '../askask',
            })
          }, 2000)
        },
        fail: e => {
          wx.showToast({
            title: '发布错误',
          })
          console.log(e)
        }
      })
    } else {
      wx.showToast({
        title: '请填写文字',
        icon: 'none'
      })
    }

  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = Math.floor(Math.random() * 1000000).toString() + '.png'
        //改写: 数组 多图片
        // const filePath = res.tempFilePaths, cloudPath = [];
        // filePath.forEach((item, i)=>{
        //   cloudPath.push(that.data.count + '_' + i + filePath[i].match(/\.[^.]+?$/)[0])
        // })

        console.log(cloudPath)


        // filePath.forEach((item, i) => {
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', cloudPath, res)
            that.setData({imgUrl: res.fileID})
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        // })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
})

