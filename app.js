//app.js

App({
    onLaunch: function(options) {
        // 1.进入时判断小程序用户的信息是否授权过 userInfo
        wx.getSetting({
            success: res => {
                //1.-->1.如果用户已经授权了则直接调用userInfo,发送数据给后台
                if (res.authSetting['scope.userInfo']) {
                    //获取code
                    wx.login({
                        success: res => {

                            //保存code
                            this.globalData.other.code = res.code;

                            wx.getUserInfo({
                                success: res => {
                                    //保存微信用户开放信息
                                    this.globalData.userInfo = res.userInfo;
                                    this.globalData.isGetInfo = true;
                                    if (this.getInfoReadyCallback) {
                                        this.getInfoReadyCallback(res);
                                    }
                                    //发送给后台,判断用户是否注册过,若有则获得信息,若无则获得提示
                                    wx.request({
                                        url: 'https://www.gdutcatming.top/BottleProject/user/loginByWeChar.do',
                                        data: {
                                            code: this.globalData.other.code,
                                            iv: res.iv,
                                            data: res.encryptedData
                                        },
                                        method: "POST",
                                        success: (res) => {
                                            console.log(res)
                                            //如果用户没注册但授权,则弹至手机按钮注册界面
                                            if (res.data.code == 1) {
                                                wx.navigateTo({
                                                    url: '/pages/getInfo/getInfo?getInfo=1',
                                                })
                                            } else { //否则 ->用户已经注册了!获取到了用户信息,写入到全局变量中
                                                this.globalData.userData = res.data.data;
                                                this.globalData.isGetData = true;
                                                this.globalData.isLogin = true;
                                                if (this.getDataReadyCallback) {
                                                    this.getDataReadyCallback(res);
                                                }
                                            }

                                        },

                                    })
                                }
                            })

                        }
                    })

                } else {
                    //没有授权UserInfo,则转至授权界面,弹出授权窗口
                    //切换到手机授权界面
                    wx.navigateTo({
                        url: '/pages/getInfo/getInfo?getInfo=0'
                    })
                }
            }
        })






        console.log('app开启触发',options);

        wx.showToast({
            title: JSON.stringify(options.query),
            icon: 'none',
        })

        

    },
    onShow: function(options) {
        //console.log("场景值:" + options.scene);
        //console.log(options)


        if (options.scene == 1017) {
            // wx.navigateTo({
            //     url: '/pages/score/score?score=' score+,
            // })
        }
    },

    globalData: {
        userInfo: null,
        requestHub: {
            ip: {
                // lym:'http://116.62.46.122:8080'
                //lym: 'http://192.168.1.104:8080'
                lym: 'http://www.gdutcatming.top'
            },
            projName: {
                bottleProj: '/BottleProject'
            },
            interfaceName: {
                wxLogin: '/user/loginByWeChar.do',
                bindCard: '/card/bindCard.do'
            }
        },
        other: {
            code: ''
        },
        userData: null,
        isGetData:false,
        isGetInfo:false,
        isLogin:false,
    }
})