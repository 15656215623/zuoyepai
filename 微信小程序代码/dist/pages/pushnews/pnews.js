"use strict";

//index.js
//获取应用实例
var app = getApp();
var url = app.globalData.url;
Page({
  radioChange: function radioChange(e) {
    this.setData({ kinds: e.detail.value });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },

  gettitle: function gettitle(e) {
    this.setData({ title: e.detail.value });
  },
  getcontent: function getcontent(e) {
    this.setData({ content: e.detail.value });
  },
  data: {
    items: [{ name: "教育", value: "教育" }, { name: "成长", value: "成长", checked: "true" }, { name: "心理", value: "心理" }, { name: "课程", value: "课程" }],
    tempFilePaths: "",
    title: "",
    content: "",
    kinds: ""
  },
  pushnews: function pushnews() {
    var that = this;
    //发布新闻
    if (that.data.kinds == "" || that.data.kinds == null) {
      that.data.kinds = "成长";
    };
    wx.request({
      url: url + "pushNews.action", //接口地址

      data: {
        title: that.data.title,
        content: that.data.content,
        img: that.data.tempFilePaths,
        kinds: that.data.kinds
      },
      method: "get",
      header: {
        "content-type": "application/json"
      },
      success: function success(res) {
        //页面跳转
        wx.switchTab({
          url: '/pages/center/center'
        });
        //页面跳转
      }
    });
  },
  onLoad: function onLoad() {},
  chooseimage: function chooseimage() {
    var _this = this;
    var imgpath = "";
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function success(res) {
        wx.showToast({
          title: "正在上传...",
          icon: "loading",
          mask: true,
          duration: 1000
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        imgpath = res.tempFilePaths;
        //上传
        wx.uploadFile({
          url: url + "copyfile.action",
          filePath: imgpath[0],
          name: "file",
          header: { "Content-Type": "multipart/form-data" },
          success: function success(res) {
            console.log(res);
            if (res.statusCode != 200) {
              wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: false
              });
              return;
            }
            var data = res.data;
            console.log("新的路径:" + data);
            _this.setData({
              //上传成功修改显示头像
              tempFilePaths: data
            });
          },
          fail: function fail(e) {
            console.log(e);
            wx.showModal({
              title: "提示",
              content: "上传失败",
              showCancel: false
            });
          },
          complete: function complete() {
            wx.hideToast();
            //隐藏Toast
          }
        });
        //上传
      }
    });
  }
});