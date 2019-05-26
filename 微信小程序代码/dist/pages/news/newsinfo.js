"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var url = app.globalData.url;
var items = [];
for (var i = 1; i <= 30; i++) {
  items.push("\u5217\u8868\u9879\u76EE" + i);
}
exports.default = Page({
  onLoad: function onLoad(options) {
    //id、kinds、
    var id = options.nid;
    var kinds = options.kinds;
    var that = this;
    //获取当前用户名
    var uname = wx.getStorageSync("uname");
    console.log(id + ":" + kinds + ":" + uname);
    if (uname == null || uname == "undefined" || uname == "") {
      console.log("为空的用户名.................");
      uname = "";
    }
    wx.request({
      url: url + "newsInfo.action", //接口地址
      data: {
        nid: id,
        kinds: kinds,
        username: uname
      },
      method: "get",
      header: {
        "content-type": "application/json"
      },
      success: function success(res) {
        var info = res.data;
        that.setData({
          title: info.title,
          content: info.content,
          img: info.img,
          count: info.count,
          time: info.time,
          nid: info.nid
        });
        console.log(info);
      }
    });
  },
  data: {
    title: "",
    content: "",
    img: "",
    count: "",
    time: "",
    nid: "",
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
    scrollTop: 0,
    imgHeight: parseInt(wx.WIN_WIDTH / 1125 * 628),
    customStyle: {
      "background-color": "#eee",
      height: "46px",
      "line-height": "46px"
    }
  },
  onPageScroll: function onPageScroll(e) {
    console.log(e);
    this.setData({
      scrollTop: e.scrollTop
    });
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  }
});