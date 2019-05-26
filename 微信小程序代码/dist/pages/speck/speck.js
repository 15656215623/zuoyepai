'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var url = app.globalData.url;
var wid = '';
var username = '';
exports.default = Page({
  pushcon: function pushcon() {
    var that = this;
    //发布新闻
    wx.request({
      url: url + "save.action", //接口地址
      data: {
        wid: wid,
        teacher: 'admin',
        km: that.data.kinds,
        pl: that.data.content,
        url: that.data.wurl,
        user: username
      },
      method: "get",
      header: {
        "content-type": "application/json"
      },
      success: function success(res) {
        //页面跳转
        wx.navigateTo({
          url: "./../work/work"
        });
        //页面跳转
      }
    });
  },
  onLoad: function onLoad(options) {
    this.setData({
      wurl: options.wurl,
      kinds: options.kinds
    });
    wid = options.wid;
    username = options.username;
  },
  data: {
    content: '',
    kinds: '',
    wurl: ''
  },
  getcontent: function getcontent(e) {
    this.setData({ content: e.detail.value });
  }

});