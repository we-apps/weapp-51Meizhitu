//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    let types = wx.getStorageSync("types");
    if(!types){
      wx.setStorageSync("types", this.globalData.types);
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    api:{
      listBaseUrl:"https://route.showapi.com/959-1?showapi_appid=25744&showapi_sign=f3807528bd5d4a4ea6b2027e8286e0dc&type=",
      albumBaseurl:"https://route.showapi.com/959-2?id=%id%&showapi_appid=25744&showapi_sign=f3807528bd5d4a4ea6b2027e8286e0dc",
      dbmeizhiurl:"http://localhost:8090/",
      meizhiurl:"http://localhost:8080/",
      meizhiurl_detail:"http://localhost:8080/detail?d=",
    },
    currentType:'',
    types:[
      {
        title:"性感",
        value:"xinggan",
        is_show:true
      },
      {
        title:"私房",
        value:"sifang",
        is_show:true
      },
      {
        title:"清纯",
        value:"qingchun",
        is_show:true
      },
      {
        title:"萌妹子",
        value:"meizi",
        is_show:true
      },
      {
        title:"小清新",
        value:"xiaoqingxin",
        is_show:true
      },
      {
        title:"女神",
        value:"nvshen",
        is_show:true
      }
    ]
  },
  
})