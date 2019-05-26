"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var url = app.globalData.url;
exports.default = Page({
  data: {
    tell: "",
    pass: "",
    rpass: "",
    istell: false,
    ispass: false
  },
  rtn: function rtn() {
    wx.switchTab({
      url: "/pages/center/center"
    });
  },
  tell: function tell(e) {
    this.setData({ tell: e.detail.value });
  },
  password: function password(e) {
    this.setData({ pass: e.detail.value });
  },
  rpassword: function rpassword(e) {
    this.setData({ rpass: e.detail.value });
  },
  submitHandler: function submitHandler() {
    var that = this;
    if (that.data.tell == "") {
      wx.showModal({
        title: "错误",
        content: "预留手机号码不能为空"
      });
      that.istell = false;
    } else {
      that.istell = true;
    }
    if (that.data.pass != that.data.rpass || that.data.pass == "" || that.data.rpass == "") {
      wx.showModal({
        title: "错误",
        content: "两次密码输入不一致"
      });
      that.ispass = false;
    } else {
      that.ispass = true;
    }
    var uname = wx.getStorageSync("uname");
    //获取身份，如果是用户就修改用户的
    var indentity = wx.getStorageSync("indentity");
    console.log("身份：" + indentity);
    if (that.ispass && that.istell) {
      // 判断
      if (indentity == "user") {
        console.log(uname + "==" + that.data.tell + "==" + that.data.pass);
        //提交
        wx.request({
          url: url + "repass.action", //接口地址
          data: {
            username: uname,
            tell: that.data.tell,
            password: that.data.pass
          },
          method: "get",
          header: {
            "content-type": "application/json"
          },
          success: function success(res) {
            var info = res.data;
            console.log(info);
            if (info == "fail") {
              wx.showModal({
                title: "错误",
                content: "手机号码输入不正确"
              });
            } else {
              wx.showModal({
                title: "成功",
                content: "密码重置成功"
              });
              wx.switchTab({
                url: "/pages/center/center"
              });
            }
          }
        });
        // 提交
        //提交
      } else {}
      //判断
    }
  }
});