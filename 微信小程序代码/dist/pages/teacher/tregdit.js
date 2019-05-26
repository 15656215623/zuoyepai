'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  radioChange: function radioChange(e) {
    this.setData({ km: e.detail.value });
    console.log('radio发生change事件，携带value值为：', e.detail.value);
  },

  data: {
    items: [{ name: 'yw', value: '语文' }, { name: 'wx', value: '数学', checked: 'true' }, { name: 'yy', value: '英语' }],
    name: "",
    pass: "",
    rpass: "",
    tell: "",
    km: '',
    isname: false,
    istell: false,
    ispass: false
  },
  tlogin: function tlogin() {
    wx.navigateTo({
      url: "./../tlogin/tlogin"
    });
  },
  ureg: function ureg() {
    wx.navigateTo({
      url: "./../ulogin/ulogin"
    });
  },
  tell: function tell(e) {
    this.setData({ tell: e.detail.value });
  },
  username: function username(e) {
    this.setData({ name: e.detail.value });
  },
  password: function password(e) {
    this.setData({ pass: e.detail.value });
  },
  rpassword: function rpassword(e) {
    this.setData({ rpass: e.detail.value });
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
    if (that.data.pass != that.data.rpass || that.data.pass == "" || that.data.rpass == "") {
      wx.showModal({
        title: "错误",
        content: "两次密码输入不一致"
      });
      that.ispass = false;
    } else {
      that.ispass = true;
    }
    if (that.data.tell.length != 11) {
      wx.showModal({
        title: "错误",
        content: "手机格式有误"
      });
      that.istell = false;
    } else {
      that.istell = true;
    }

    if (that.istell && that.ispass && that.isname) {
      // 提交
      wx.request({
        url: "http://localhost:8080/Teacher/tregedit.action", //接口地址
        data: {
          username: that.data.name,
          password: that.data.pass,
          tell: that.data.tell,
          kinds: that.data.km
        },
        method: "get",
        header: {
          "content-type": "application/json"
        },
        success: function success(res) {
          //页面跳转
          wx.navigateTo({
            url: "./../tlogin/tlogin"
          });
          //页面跳转
        }
      });
      // 提交
    }
  }
});