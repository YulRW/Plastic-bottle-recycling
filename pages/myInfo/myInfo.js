// pages/myInfo/myInfo.js
//获取app
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},
        userDataA:{
            //瓶子数量积累
            bottleCount:0,
            //减少碳排放量累计
            gCount:0,
            //兑换价钱记录
            exchangeCount:0,
            //客服电话
            tel:"020-38936673"
        },
        userData:{
            telephoneNumber: '199****9999',
            score:'0'
        },
        isLogin:false

    },
    login(){
        wx.navigateTo({
            url: '/pages/getInfo/getInfo',
        })

    },
    faceLogin(){
        wx.showToast({
            title: '该功能暂未开放,敬请期待',
            icon: 'none',

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {





    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //判断是否已经登录
        if (app.globalData.isLogin) {    //如果登录
            this.setData({
                isLogin : true
            })
        }

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
            })
        }
        if (app.globalData.userData) {
            this.setData({
                userData: app.globalData.userData
            })
        }

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})