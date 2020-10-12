// pages/mine/add1/add1.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    courseName: "", // 存储输入的课程名
    courseAd: "",   // 存储输入的地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winHeight: res.windowHeight
        });
      }
    });
  },
  // 点击按钮添加课程
  addCourse() {
    // if (this.data.courseName.trim() == "" || this.data.courseAd.trim() == "") {
    //   wx.showToast({
    //     title: '内容不为空',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // } else {
      // 向父组件传值
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('inputValue', {
        name: this.data.courseName,
        ad: this.data.courseAd
      });
    // }
  },

})