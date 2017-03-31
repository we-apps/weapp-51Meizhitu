//app.js
var dialog = require("./utils/dialog.js")
App({
  onLaunch: function () {
    this.getTypes();
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
  getTypes:function(){
    console.log("getTypes: ");
    dialog.loading()
        var that = this
        //请求数据
        wx.request({
          url:this.globalData.api.meizhiurl+"tags",
          success:function(ret){
            ret = ret['data']
            if(ret['code'] == '0' ){
                that.globalData.types = ret.data
            }else{
              setTimeout(function(){
                dialog.toast("网络超时啦~")
              },1)
            }
          },
          complete:function(){
            wx.stopPullDownRefresh()
            setTimeout(function(){
              dialog.hide()
            },1000)
          }
        })
  },
  globalData:{
    api:{
      listBaseUrl:"https://route.showapi.com/959-1?showapi_appid=25744&showapi_sign=f3807528bd5d4a4ea6b2027e8286e0dc&type=",
      albumBaseurl:"https://route.showapi.com/959-2?id=%id%&showapi_appid=25744&showapi_sign=f3807528bd5d4a4ea6b2027e8286e0dc",
      dbmeizhiurl:"http://localhost:8090/",
      meizhiurl:"http://meizhitu.applinzi.com/",
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
      },
      {
        title:"气质美女",
        value:"qizhi",
        is_show:true
      },
      {
        title:"嫩模",
        value:"mote",
        is_show:true
      },
      {
        title:"比基尼",
        value:"bijini",
        is_show:true
      },
      {
        title:"足球宝贝",
        value:"baobei",
        is_show:true
      },
      {
        title:"萝莉",
        value:"luoli",
        is_show:true
      },
      {
        title:"90后",
        value:"wangluo",
        is_show:true
      },
      {
        title:"日韩美女",
        value:"rihan",
        is_show:true
      },
      {
        title:"欧美美女",
        value:"oumei",
        is_show:true
      },
    ]
  }
  
})