//区域滚动
; (function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
        // scrollY: true, //是否竖向滚动
        // scrollX: false, //是否横向滚动
        // startX: 0, //初始化时滚动至x
        // startY: 0, //初始化时滚动至y
        // bounce: true //是否启用回弹  
    });
}())
$(function () {
    $('.ico-break').on('click', function () {
        history.back()
    })
})