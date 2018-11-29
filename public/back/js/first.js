$(function () {

    let
        pages = 1,
        pageSizes = 5;
    render()
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: pages,
                pageSize: pageSizes
            },
            dataType: "json",
            success: function (response) {
                // console.log(response);
                $('.info table tbody').html(template('app1', response))

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

    //添加分类功能
    $('.add_classification').on('click', function () {
        $('#add_exampleModal').modal('show')


    })

    // 添加是否为空验证
    $("#form").bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            categoryName: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.success) {
                    $('#add_exampleModal').modal('hide')
                    pages = 1;
                    render()
                }

                // 重置表单校验状态和 表单内容
                // 传 true 不仅可以重置 状态, 还可以重置内容
                $('#form').data("bootstrapValidator").resetForm(true);
            }
        });
    });

})