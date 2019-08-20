// pages/userRegister/register.js
const app = getApp();
Page({
  data: {},

  formSubmit: function (e) {
    var formObject = e.detail.value;
    var username = formObject.username;
    var password = formObject.password;

    //简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      var serverUrl = app.serverUrl;
      wx.showLoading({
        title: '...',
      });
      wx.request({
        url: serverUrl + '/login',
        method: 'POST',
        header: { 'content-type': 'application/json' },// 默认值
        data: { username: username, password: password },
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          if (res.data.status === 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            })
            //将用户信息赋予到全局变量
            app.userInfo = res.data.data;
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
        },
        error: function (e) {
          console.log(e)
        }

      })
    }
  },
  formReset: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})