//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'test-fph51'
    })
  }
})