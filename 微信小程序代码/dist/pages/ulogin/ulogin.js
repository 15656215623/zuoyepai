"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var url = app.globalData.url;
exports.default = Page({
  data: {
    name: "",
    pass: "",
    isname: false,
    ispass: false
  },
  ureg: function ureg() {
    wx.navigateTo({
      url: "./../user/reg"
    });
  },
  adm: function adm() {
    wx.navigateTo({
      url: "./../admin/admin"
    });
  },
  username: function username(e) {
    this.setData({ name: e.detail.value });
  },
  password: function password(e) {
    this.setData({ pass: e.detail.value });
  },
  submitHandler: function submitHandler() {
    var that = this;
    if (that.data.name == "") {
      wx.showModal({
        title: "错误",
        content: "用户名不能为空"
      });
      that.isname = false;
    } else {
      that.isname = true;
    }
    if (that.data.pass == "") {
      wx.showModal({
        title: "错误",
        content: "密码不能为空"
      });
      that.ispass = false;
    } else {
      that.ispass = true;
    }
    if (that.ispass && that.isname) {
      // 提交
      wx.request({
        url: url + "ulgn.action", //接口地址
        data: {
          username: that.data.name,
          password: that.data.pass
        },
        method: "get",
        header: {
          "content-type": "application/json"
        },
        success: function success(res) {
          var info = res.data;
          if (info == "fail") {
            wx.showModal({
              title: "错误",
              content: "用户名或者密码输入不正确"
            });
          } else {
            //存储数据
            // 同步接口立即写入
            console.log("ssss:" + that.data.name);
            wx.setStorageSync("uname", that.data.name + "");
            wx.setStorageSync("indentity", "user");
            //页面跳转
            //页面跳转
            wx.switchTab({
              url: "/pages/center/center"
            });
            console.log("页面跳转......");
          }
        }
      });
      // 提交
    }
  }
});