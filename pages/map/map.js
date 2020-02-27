// pages/map/map.js

// 引入SDK核心类
const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //地址输入值
        inputAdd: "地址",
        //地址列表
        addList: [],
        //回收箱地址
        find_title: "A204回收箱",
        //具体地址
        find_add: "在广州大学城广东工业大学1号教学楼201室旁",
        //初始坐标(纬度/经度)
        latitude: 23.0374000000,
        longitude: 113.3972300000,
        //定位精确度
        accuracy: '',
        //样式
        b_width: "",
        //当前信息
        localtionNow: {},
        markers: [],
        boxList: [{
            "lng": "113.39494",
            "lat": "23.03857",
            "box_name": "C.A.T 总部",
            "box_image": "/img/BOX.png",
        }, {
            "lng": "113.39454",
            "lat": "23.04002",
            "box_name": "广东工业大学大学城校区-教学六号楼",
            "box_image": "/img/BOX.png",

        }, {
            "lng": "113.39871",
            "lat": "23.03675",
            "box_name": "广东工业大学大学城校区-工学三号馆",
            "box_image": "/img/BOX.png",
        }],
        //标记名称
        box_name: "",
        //标记图片
        box_img: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //调整布局
        this.layoutSet();
        //获取箱子
        this.getboxes();

        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: '7U4BZ-3OEW6-DJLSE-EOYQM-BD7V2-VCFBZ'
        });

        //获取当前位置
        this.myLocal();
    },
    //获取箱子数据
    getboxes() {
        let markers = [];
        for (let i = 0; i < this.data.boxList.length; i++) {
            let marker = this.createMarker(this.data.boxList[i]);
            //把遍历的每个marker存放进去
            markers.push(marker);
        }

        let boxitem = this.data.boxList[0];
        this.setData({
            markers: markers,
            box_image: boxitem.box_image,
            box_name: boxitem.box_name,
        })

    },
    /**
     * 创建marker对象
     */
    createMarker(point) {
        let marker = {
            //每个marker的ID
            id: point || 0,
            //纬度
            latitude: point.lat,
            //经度
            longitude: point.lng,
            //标注点名
            title:point.box_name,
            //显示层级
            // zIndex:num
            //图标地址
            iconPath: "/img/dp.png",
            //旋转角度
            rotate:0,
            //透明度
            alpha:1,
            //图标宽度和高度
            width: 30,
            height: 30,
            name: point.box_name || '',
            label:{
                content:""
            },
            callout:{
                content: point.box_name,
                color: "#00a0ae",
                fontSize:"30rpx",
                borderRadius:"15rpx",
                borderWidth:"6rpx",
                borderColor:"black",
                bgColor:"white",
                padding:"15rpx",
                display:"BYCLICK",
                textAlign:"center",
            }
        };
        return marker;
    },

    /**
     * 点击marker
     */
    markertap (boxitem) {
        console.log("点击盒子获取",boxitem);
        this.setData({
            box_image: boxitem.markerId.box_image,
            box_name: boxitem.markerId.box_name,
        })
    },
    //获取搜索输入框数据并搜索
    getAdd(e) {
        //把搜索组件中输入框的值传入到对象中
        this.setData({
            inputAdd: e.detail.text.detail.value
        })
        this.searchAdd();
    },
    //地图视野变化监听函数
    regionChange() {
        // console.log("地图视野变化");
    },
    //布局调整
    layoutSet() {
        let h = wx.getSystemInfoSync().windowHeight;
        let b_width = parseInt(h) - 0.25 * parseInt(h) - 48 + "px";
        this.setData({
            b_width
        })
    },
    //搜索并把数据放入addList对象中
    searchAdd() {
        //调用地图地址搜索API
        qqmapsdk.search({
            //地址
            keyword: this.data.inputAdd,
            //成功回调
            success: (res) => {
                // console.log(res);
                this.setData({
                    addList: res.data,
                })
            },
            //失败回调
            fail: (res) => {
                console.log(res);
            },
        });
    },

    //更新定位并显示在
    // data:{
    //     data.title           ---主地址
    //     data.address         ---详细地址
    //     data.location.lat    ---纬度
    //     data.location.lng    ---经度
    // }
    reLocation(data) {
        if (data.detail.num === undefined) {
            data = this.localtionNow;
        } else {
            this.localtionNow = data.detail.num;
            data = this.localtionNow;

        }
        console.log("获取到的", data);
        this.setData({
            find_title: data.title,
            find_add: data.address,
            latitude: data.location.lat,
            longitude: data.location.lng,
        })

    },
    myLocal() {
        console.log("重新定位");
        // 定位中...
        wx.showLoading({
            title: "定位中",
            mask: true
        })
        //获取当前位置
        wx.getLocation({
            // gcj02 返回可用于 wx.openLocation 的坐标
            type: 'gcj02',
            //高精度定位
            isHighAccuracy: true,
            //定位成功，更新定位结果
            success: (res) => {
                console.log("更新定位结果", res);
                //经纬度
                let latitude = res.latitude;
                let longitude = res.longitude;
                //位置的精确度
                let accuracy = res.accuracy;
                //设置返回信息
                this.setData({
                    longitude: longitude,
                    latitude: latitude,
                    accuracy: accuracy
                })
            },
            //定位失败回调
            fail: () => {
                wx.showToast({
                    title: "定位失败",
                    icon: "none"
                })
            },
            //定位完成回调
            complete: () => {
                //隐藏定位中信息进度
                wx.hideLoading();
            }
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}

})