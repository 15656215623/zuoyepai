"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//引入文件
var app = getApp();
var path = app.globalData.url;
exports.default = Page({
  data: {
    contentshow: 0,
    mydata: []
  },
  newsinfo: function newsinfo(e) {
    //获取nid
    var nid = e.currentTarget.dataset.id;
    //获取当前的kinds类型和当前的用户名
    var kinds = e.currentTarget.dataset.kinds;
    wx.navigateTo({
      url: "./../news/newsinfo?nid=" + nid + "&kinds=" + kinds
    });
  },
  show: function show(k) {
    var that = this;
    var uname = wx.getStorageSync("uname");
    var urls = "";
    if (k == "推荐") {
      if (uname == null || uname == "undefined" || uname == "" || uname == "admin") {
        uname = "";
      }
      urls = path + "push.action";
    } else {
      urls = path + "queryNews.action";
    }
    console.log("心的:" + k);
    console.log("path:" + urls);
    //如果类型是推荐的话，
    wx.request({
      url: urls, //接口地址
      data: {
        kinds: k,
        name: uname
      },
      method: "get",
      header: {
        "content-type": "application/json"
      },
      success: function success(res) {
        console.log("真实的类型是:" + k);
        console.log(res.data);
        that.setData({
          mydata: res.data
        });
      }
    });
  },
  onShow: function onShow() {
    var k = "推荐";
    this.show(k);
  },
  changeTab2: function changeTab2(e) {
    var that = this;
    var kk = ["推荐", "教育", "成长", "心理", "课程"];
    var index = e.detail.index;
    that.contentshow = index;
    var k = kk[index];
    that.show(k);
  }
});