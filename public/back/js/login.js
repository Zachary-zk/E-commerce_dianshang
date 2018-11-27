$(function () {
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应input表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 4,
                        max: 12,
                        message: '用户名长度必须在4到12之间'
                    },
                    callback:{
                        message: '用户名不存在！！'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 4,
                        max: 15,
                        message: '密码长度必须在4到15之间'
                    },
                    callback:{
                        message: '密码输入错误！！'
                    }
                }
            }
        }
    })

    //ajax提交功能
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $('form').serialize(),
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if(response.error === 1000){
                    // alert(response.message)
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(response.error === 1001){
                    // alert(response.message)
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
                if(response.success){
                    location.href='index.html'
                }

            }
        });
    });

    $('.reset').on('click',function(){
        $('#form').data('bootstrapValidator').resetForm(true);
    })
})