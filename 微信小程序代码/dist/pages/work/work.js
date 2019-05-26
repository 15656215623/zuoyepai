'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var url = app.globalData.url;
exports.default = Page({
  data: {
    mydata: []
  },
  workinfo: function workinfo(e) {
    //获取wid、科目、图片地址
    var wid = e.currentTarget.dataset.wid;
    var wurl = e.currentTarget.dataset.wurl;
    var kinds = e.currentTarget.dataset.kinds;
    var username = e.currentTarget.dataset.username;
    //把这些参数全部传递到另一个页面
    wx.navigateTo({
      url: '../canvas/canvas?wid=' + wid + "&wurl=" + wurl + "&kinds=" + kinds + "&username=" + username
    });
    //把这些参数全部传递到另一个页面
  },
  onLoad: function onLoad() {
    var that = this;
    wx.request({
      url: url + "show.action", //接口地址
      data: {},
      method: "get",
      header: {
        "content-type": "application/json"
      },
      success: function success(res) {
        console.log("作业:" + res.data);
        that.setData({
          mydata: res.data
        });
      }
    });
  }
});