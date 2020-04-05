const ip = {
    lym: 'https://www.gdutcatming.top'
}

const project = {
    bottle: '/BottleProject'
}

const requestName = {
    loginByWeChar: '/user/loginByWeChar.do',    //登录接口
    bindCard: '/card/bindCard.do',  //绑定卡
    getGiftRecordByUid: '/giftRecord/getGiftRecordByUid.do', //查询兑换记录
    findRecordByUid: '/bottleRecord/findRecordByUid.do', //投瓶历史
    getGiftList: '/gift/getGiftList.do' //查看礼物所有信息
}

const Url = {
    loginByWeChar:ip.lym+project.bottle+requestName.loginByWeChar,
    bindCard: ip.lym + project.bottle + requestName.bindCard,
    getGiftRecordByUid: ip.lym + project.bottle + requestName.getGiftRecordByUid,
    findRecordByUid: ip.lym + project.bottle + requestName.findRecordByUid,
    getGiftList: ip.lym + project.bottle + requestName.getGiftList,

}


module.exports={
    loginByWeChar:Url.loginByWeChar,
    bindCard: Url.bindCard,
    getGiftRecordByUid: Url.getGiftRecordByUid,
    findRecordByUid: Url.findRecordByUid,
    getGiftList: Url.getGiftList,
}



