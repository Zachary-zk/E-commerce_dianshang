$(function () {
    $('.distribution').on('click', function () {
        $(this).children('div').slideToggle();
    })

    $('.lt_header a:first').on('click',function () {
        $('.lt_sidebar').toggleClass('active')
        $('.lt_header').toggleClass('active')
        $('.info').toggleClass('active')

    })
})