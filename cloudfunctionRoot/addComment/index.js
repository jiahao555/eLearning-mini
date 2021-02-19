// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const commentsCollection = db.collection('comments')

// 云函数入口函数
exports.main = async (event, context) => {
    return await commentsCollection.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        avatar:event.avatar,
        nickName:event.nickName,
        oneComment: event.oneComment,
      }
    })
}