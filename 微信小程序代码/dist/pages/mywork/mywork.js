"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var url = app.globalData.url;
exports.default = Page({
  data: {
    mydata: []
  },
  onLoad: function onLoad() {
    var that = this;
    //查询当前的用户名，然后进行后台查询，显示在页面上面
    var uname = wx.getStorageSync("uname");
    //发布新闻
    wx.request({
      url: url + "look.action", //接口地址
      data: {
        user: uname
      },
      method: "get",
      header: {
        "content-type": "application/json"
      },
      success: function success(res) {
        //页面跳转
        that.setData({
          mydata: res.data
        });
        console.log(res.data);
        //页面跳转
      }
    });
    //查询当前的用户名，然后进行后台查询，显示在页面上面
  }
});