const util = require('../../utils/util.js')
// var bmap = require('../../utils/bmap-wx.min.js');
// pages/edit/edit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 600,
    weatherData: "",
    msg: "",
    weekdata: "",
    data: "",
    todoData: [],
    total: 0
  },
  // 添加todo
  addTodo: function () {
    // 判断输入的为空
    if (this.data.msg.trim() === "") return;
    let _this = this;
    let todo = this.data.todoData;
    todo.unshift({
      content: this.data.msg,
      compelted: false
    })
    let len = todo.length
    wx.setStorageSync('todoData', todo)
    _this.setData({
      todoData: todo,
      msg: "",
      total: len
    })
  },
  // 删除todo
  deleteData: function (even) {
    let index = even.currentTarget.dataset['index'],
      todos = this.data.todoData,
      _this = this;

    todos.splice(index, 1);
    var len = todos.length;

    _this.setData({
      todoData: todos
    })
    wx.setStorageSync('todoData', todos)
    _this.setData({
      todoData: todos,
      msg: "",
      total: len
    })

  },



  // 加载天气
  getWether() {
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?',
      method: 'GET',
      data: {
        city: '长春'
      },
      success: data => {
        if (data) {

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winHeight: res.windowHeight
        });
      }
    });
    // 获取本地存储
    this.setData({
      todoData: wx.getStorageSync('todoData') || [{
          content: "睡睡觉💤"
        },
        {
          content: "学习呀📚"
        },
        {
          content: "健健身💪"
        }
      ]
    })

    var _this = this
    this.setData({
      total: this.data.todoData.length,
      data: util.formatTime(new Date()),
      weekdata: util.week(new Date())
    });
    wx.getStorage({
      key: 'todoData',
      success(res) {
        var data = res.data
        _this.setData({
          total: _this.data.todoData.length,
          todoData: data
        });
      }
    })
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
    // this.getLocation()
    // this.getWether()

  },
  // 获取用户经纬度
  getLocation: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success  
        var longitude = res.longitude
        var latitude = res.latitude
        // console.log(longitude, latitude)
        page.loadCity(longitude, latitude)
      }
    })
  },

  // 获取具体城市百度地图的接口
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=vrVKGgg5VzfVmZ2Ye7F5TmiT9guf9QmX&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        // console.log(res.data.result);
        //var city = res.data.result.addressComponent.city;
        //page.setData({ currentCity: city });
      },
      fail: function () {
        page.setData({
          currentCity: "获取定位失败"
        });
      },

    })
  },
})