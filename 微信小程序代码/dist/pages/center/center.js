"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//引入文件
exports.default = Page({
  data: {
    navigationBarTitleText: "个人中心",
    login: false,
    name: "",
    iden: false
  },
  //退出
  exit: function exit() {
    wx.clearStorageSync();
    this.setData({
      login: false
    });
  },
  pnews: function pnews() {
    wx.navigateTo({
      url: "./../pushnews/pnews"
    });
  },
  //批改作业
  pgzy: function pgzy() {
    wx.navigateTo({
      url: "./../work/work"
    });
  },
  //用户查看我的作业
  myzy: function myzy() {
    var uname = wx.getStorageSync("uname");
    if (uname == null || uname == "undefined" || uname == "") {
      wx.showModal({
        title: "未登录",
        content: "你还没有登录"
      });
    } else {
      wx.navigateTo({
        url: "./../mywork/mywork"
      });
    }
  },
  repass: function repass() {
    var uname = wx.getStorageSync("uname");
    console.log("uanme:" + uname);
    if (uname == null || uname == "undefined" || uname == "") {
      wx.showModal({
        title: "未登录",
        content: "你还没有登录"
      });
    } else {
      if (uname == "admin") {
        wx.showModal({
          title: "友情提示",
          content: "管理员可在后台修改密码"
        });
      } else {
        wx.navigateTo({
          url: "./../setpass/setpass"
        });
      }
    }
  },
  tologin: function tologin() {
    wx.navigateTo({
      url: "./../ulogin/ulogin"
    });
  },
  onShow: function onShow() {
    var uname = wx.getStorageSync("uname");
    var that = this;
    //如果身份是管理员的话，就显示批改作业，不然的话就显示我的作业
    var indentity = wx.getStorageSync("indentity");
    if (indentity == "admin") {
      that.setData({
        iden: true
      });
    } else {
      that.setData({
        iden: false
      });
    }
    console.log("用户:" + uname);
    // 同步接口立即返回值
    if (uname == null || uname == "undefined" || uname == "") {
      that.setData({
        login: false
      });
    } else {
      that.setData({
        name: uname,
        login: true
      });
    }

    //判断一下存储的用户名
  }
});