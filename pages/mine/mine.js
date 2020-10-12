const util = require('../../utils/util.js')

Page({
  data: {
    numToday: 0,
    today: "",
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    courese: null, // 长按保存索引
    week: null, //  长按保存索引
    // 当天的课表
    todayCourse: [{
      name: "高数",
      classAd: "三教301"
    }],
    // 一周的课表
    weekdayCourse: [
      [{
          name: "长安添加课程",
          classAd: "&教师"
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        }
      ],
      [{
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        }
      ],
      [{
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        }
      ],
      [{
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        }
      ],
      [{
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        }
      ],
      [

        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        },
        {
          name: "",
          classAd: ""
        }
      ]

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('localSourse')) {
      this.setData({
        weekdayCourse: wx.getStorageSync('localSourse')
      })
    }

    var that = this;

    var day = util.week(new Date(), false)
    var numTo = util.week(new Date(), true)
    if(numTo == 0){
      numTo = 7
    }
    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          today: day,
          numToday: numTo
        });
      }
    });


  },
  //  tab切换逻辑
  swichNav: function (e) {

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  // 长按添加事件
  longPress: function (event) {
    var _this = this
    if ((event.currentTarget.dataset['course']) != undefined) {
      let cour = event.currentTarget.dataset['course']
      _this.setData({
        courese: cour
      })
    }
    if ((event.currentTarget.dataset['week']) != undefined) {
      let wee = event.currentTarget.dataset['week']
      _this.setData({
        week: wee
      })
    }
    if (this.data.courese != undefined && this.data.week != undefined) {
      let [week, courese, weekdayCourseTemp] = [this.data.week, this.data.courese, this.data.weekdayCourse]
      wx.navigateTo({
        url: `add1/add1`,
        events: {
          inputValue: function (data) {
            weekdayCourseTemp[courese][week].name = data.name;
            weekdayCourseTemp[courese][week].classAd = data.ad;
            _this.setData({
              weekdayCourse: weekdayCourseTemp,
            })
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            // 返回页面
            wx.navigateBack()
            // 本地存储
            wx.setStorageSync('localSourse', weekdayCourseTemp)
          }
        }
      })
      this.setData({
        courese: null,
        week: null
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})