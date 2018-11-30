$(function () {

    let
        pages = 1,
        pageSizes = 5;

    render()
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: pages,
                pageSize: pageSizes
            },
            dataType: "json",
            success: function (response) {
                // console.log(response);
                $('.info table tbody').html(template('app', response))

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

    //添加分类
    $('.add_class').on('click', function () {
        $('#add_class').modal('show')

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                $('.dropdown-menu').html(template('map', response))
            }
        });
    })

    // 配置表单验证
    //使用表单校验插件
    $('#form').bootstrapValidator({

        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            // 品牌名称
            brandName: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            // 一级分类的id
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            // 图片的地址
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });

    // 通过事件委托 添加事件
    $('.dropdown-menu').on('click', 'a', function () {
        $('.dropdown-toggle span:first').text($(this).text())

        $('[name = "categoryId"]').val($(this).data('id'))

        // 需要将校验状态置成 VALID
        // 参数1: 字段
        // 参数2: 校验状态
        // 参数3: 配置规则, 来配置我们的提示文本
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    //配置图片上传
    $('#fileupload').fileupload({
        // 指定数据类型为 json
        dataType: "json",
        // done, 当图片上传完成, 响应回来时调用
        done: function (e, data) {
            console.log(data)
            // 获取上传成功的图片地址
            var picAddr = data.result.picAddr;
            // 设置图片地址
            $('#imgBox img').attr("src", picAddr);
            // 将图片地址存在隐藏域中
            $('[name="brandLogo"]').val(picAddr);

            // 重置校验状态
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
        }
    });

    //校监成功后 通过Ajax添加
    $("#form").on("success.form.bv", function (e) {
        // 阻止默认的提交
        e.preventDefault();

        $.ajax({
            url: "/category/addSecondCategory",
            type: "post",
            data: $('#form').serialize(),
            success: function (info) {
                console.log(info)

                // 关闭模态框
                $('#add_class').modal("hide");
                // 重置表单里面的内容和校验状态
                $('#form').data("bootstrapValidator").resetForm(true);

                // 重新渲染第一页
                pages = 1;
                render();

                // 找到下拉菜单文本重置
                $('#dropdownText').text("请选择1级分类")

                // 找到图片重置
                $('#imgBox img').attr("src", "img/none.png")
            }
        })
    })

})