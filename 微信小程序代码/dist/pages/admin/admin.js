"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    name: "",
    pass: "",
    isname: false,
    ispass: false
  },
  ulogin: function ulogin() {
    wx.navigateTo({
      url: "./../ulogin/ulogin"
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
      if (that.data.name == "admin" && that.data.pass == "admin") {
        wx.setStorageSync("uname", "admin");
        wx.setStorageSync("indentity", "admin");
        //页面跳转
        //页面跳转
        wx.switchTab({
          url: "/pages/center/center"
        });
      }
    }
  }
});