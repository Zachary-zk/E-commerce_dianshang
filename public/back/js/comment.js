$(function () {
    $('.distribution').on('click', function () {
        $(this).children('div').slideToggle();
    })

    $('.lt_header a:first').on('click',function () {
        $('.lt_sidebar').toggleClass('active')
        $('.lt_header').toggleClass('active')
        $('.info').toggleClass('active')
    })

    $('.lt_header a:last').on('click',function(){
        $('#exampleModal').modal('show')
    })
    $('#logoutBtn').on('click',function(){

        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function (response) {
                console.log(response);
                if(response.success){
                    location.href='login.html'
                }
            }
        });
    })
})