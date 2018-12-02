
//一级分类
$.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (response) {
        // console.log(response);
        $('.first-left').html(template('first', response))

        render(0)
        // console.log($('.first-left li').eq(0).data('id'));

    }
});
//二级分类
function render(i) {
    $.ajax({
        type: "get",
        url: "/category/querySecondCategory",
        data: {
            id: $('.first-left li').eq(i).data('id')
        },
        dataType: "json",
        success: function (response) {
            // console.log(response);
            $('.last-right').html( template('last',response) )
        }
    });
}

//事件委托切换
$('.first-left').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')

    // console.log($(this).index());
    render( $(this).index() )
})