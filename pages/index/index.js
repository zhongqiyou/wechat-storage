Page({
 data:{
   imageSrc:"" , 
   videoSrc:"" ,
   fileSrc:""
 } , 
  // 上传图片并展示
  getImageSrc(){
    var _this = this;
    // 本地选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // 文件后缀名处理
        var src = res.tempFilePaths[0];
        var index = src.lastIndexOf(".");
        var suffix = src.slice(index , src.length);
        // 图片上传
        wx.cloud.uploadFile({
          cloudPath: Math.random() + suffix, // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 获取图片路径并赋值
            _this.setData({
              imageSrc: res.fileID
            })
          },
          fail: console.error
        })
      }
    })
  } , 
 // 上传视屏并展示
  getVideoSrc(){
    var _this = this;
     // 本地选择s视屏
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
         // 文件后缀名处理
        var src = res.tempFilePath;
        var index = src.lastIndexOf(".");
        var suffix = src.slice(index , src.length);
        // 视屏上传
        wx.cloud.uploadFile({
          cloudPath: Math.random() + suffix, // 上传至云端的路径
          filePath: src, // 小程序临时文件路径
          success: res => {
              // 获取视屏路径并赋值
            _this.setData({
              videoSrc: res.fileID
            })
          },
          fail: console.error
        })
      }
    })
  } , 

 // 上传文件word或excel
  getFileSrc(){
    var _this = this;
    // 选择文件
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
         // 文件后缀名处理
        var src = res.tempFiles[0].path;
        var index = src.lastIndexOf(".");
        var suffix = res.tempFiles[0].path.slice(index , src.length);
        // 上传文件
        wx.cloud.uploadFile({
          cloudPath: Math.random() + suffix, // 上传至云端的路径
          filePath: src, // 小程序临时文件路径
          success: res => {
            // 获取视屏路径并赋值
           _this.setData({
             fileSrc: res.fileID
           })
          },
          fail: console.error
        })
      }
    })
  } ,

// 下载文件并打开
getDownloadOpen(){
  var _this = this;
  // 下载文件
  wx.cloud.downloadFile({
    fileID: _this.data.fileSrc, // 文件 ID
    success: res => {
      // 返回临时文件路径
      console.log(res.tempFilePath)
      // 打开文件
      wx.openDocument({
        filePath: res.tempFilePath,
        success: function (result) {
          console.log('打开文档成功' , result)
        }
      })
    },
    fail: console.error
  })
}
  
})
