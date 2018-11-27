$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (response) {
        if(!response.success){
            location.href = 'login.html'
        }
    }
});