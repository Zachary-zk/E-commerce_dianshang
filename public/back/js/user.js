$(function () {

    let
        pages = 1,
        pageSizes = 5;
    render()
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: pages,
                pageSize: pageSizes,
            },
            dataType: "json",
            success: function (response) {
                // console.log(response);
                $('.info table tbody').html(template('app', response))
                total = response.total

                //分页配置
                $('#paginator').bootstrapPaginator({
                    // 指定bootstrap版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: pages,
                    // 总页数
                    totalPages: Math.ceil(response.total / pageSizes),

                    // 当页面被点击时触发
                    onPageClicked: function (a, b, c, page) {
                        // page 当前点击的页码
                        pages = page;
                        // 调用 render 重新渲染页面
                        render();
                    }
                });
            }
        });
    }

    //操作功能
    $('.info table tbody').on('click', '.btn_toggel', function () {
        // console.log(1);

        $('#toggle_exampleModal').modal('show')

        var data_id = $(this).parent().data('id')
        var data_isdelete = $(this).parent().data('isdelete')

        $('#toggle_Btn').off("click").on('click', function () {
            // console.log(data_id);
            // console.log(data_isdelete);
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id : data_id,
                    isDelete : data_isdelete
                },
                dataType: "json",
                success: function (response) {
                    // console.log(response);
                    if(response.success){
                        $('#toggle_exampleModal').modal('hide')
                        render();
                    }
                }
            });
        })
    })

})
