const db = wx.cloud.database()
const todosCollection = db.collection('todos')
const comments = db.collection('comments')
const app = getApp()

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data:{
    comment:null,
    commentList:[],
    active: 1
  },
  onLoad: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
    // ----------------------- 渲染用户评论---------------------------
    comments.get().then(res2 => {
      // console.log(res2)
      this.setData({
        comments:res2.data.reverse(),
        test:123//this.setData()方法，不用再其他地方声明初始化test，在这里set，appdata就有值
        })
    })
  },
  inputValue: '',
  data: {
    src: '',
    danmuList:
      [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }],
    

  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  // ----------------------- 上传一条评论到数据库---------------------------
  checkSubmit:function(event){
    var that=this;
    wx.showModal({
      // title: '提示',
      content: '确定发表评论？',
      duration:10000,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(that.data.comment)
          if (that.data.comment==null) {
            wx.showToast({
              title: '不可以发表空白评论',
              icon: 'none',
              duration: 2000
            })
          } else {
            console.log(that.data.comment)
            wx.cloud.callFunction({
              name: 'addComment',
              data: {
                oneComment: that.data.comment,
                avatar: app.globalData.userInfo.avatarUrl,
                nickName: app.globalData.userInfo.nickName
              }
            }).then(res => {
              console.log(res)
              that.setData({ 
                form_info: '',
                comment:null
              }) 
              that.onLoad()
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // if (!this.data.comment){
    //   console.log('')
    //   wx.showToast({
    //     title: '不可以发表空白评论',
    //     icon: 'none',
    //     duration: 1000
    //   })
    // }else{
    //   wx.cloud.callFunction({
    //     name: 'addComment',
    //     data: {
    //       oneComment: this.data.comment,
    //       avatar: app.globalData.userInfo.avatarUrl,
    //       nickName: app.globalData.userInfo.nickName
    //     }
    //   }).then(res => {
    //     console.log(res)
    //     this.setData({ form_info: '' })
    //     this.onLoad()
    //   })
    //   console.log(this)
    // }
    
  },
  commentInput: function (event) {
    console.log(event.detail)
    this.setData({comment: event.detail})
  },
  // 调试用代码
  checkUserinfo:function(){
    wx.cloud.callFunction({
      name: 'removeCollection',
      data:{
        nickName:'李嘉浩'
      }
    }).then(res => {
      console.log(res)
    })
    console.log(app.globalData.userInfo)
    console.log('app.globalData._openid=' + app.globalData._openid)//globaldata中已有openid
  }
})