"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var url = app.globalData.url;
var imgpath = "";
var kk = "";
exports.default = Page({
  data: {
    tempFilePaths: ""
  },
  upfile: function upfile(imgpath) {
    var _this = this;
    //开始判断用户是否登录，如果没有登录不执行上传功能
    var uname = wx.getStorageSync("uname");
    if (uname == null || uname == "undefined" || uname == "") {
      wx.showModal({
        title: "未登录",
        content: "您还没有登录，不能发布作业哟",
        showCancel: false
      });
    } else {
      //上传
      wx.uploadFile({
        url: url + "copyfile.action",
        filePath: imgpath[0],
        name: "file",
        header: { "Content-Type": "multipart/form-data" },
        //成功
        success: function success(res) {
          var data = res.data;
          console.log("新的路径:" + data);
          _this.setData({
            //上传成功修改显示头像
            tempFilePaths: data
          });

          //保存作业
          wx.request({
            url: url + "savework.action", //接口地址
            data: {
              username: uname,
              wurl: _this.data.tempFilePaths,
              kinds: kk
            },
            method: "get",
            header: {
              "content-type": "application/json"
            },
            success: function success(res) {
              wx.showModal({
                title: "发布成功",
                content: "稍等片刻，作业正在审批中，系统会自动通知你作业审批情况",
                showCancel: false
              });
              //把用户名、科目传给后台
            }
          });
          //保存作业
        }
        //成功
      });
      //上传
    } //else
  },
  chooseimage: function chooseimage(e) {
    //方法内部
    kk = e.currentTarget.dataset.kinds;
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["original"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        imgpath = res.tempFilePaths;
        _this.upfile(imgpath);
      } //success
      //方法内部
    });
    //判断
  }
  //最后一个
});