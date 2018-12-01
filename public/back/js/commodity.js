$(function () {
    let
        picArr = [],
        pages = 1,
        pageSizes = 3;

    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: pages,
                pageSize: pageSizes
            },
            dataType: "json",
            success: function (response) {
                // console.log(response);
                $('.info tbody').html(template('app', response));

                //分页
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

    //添加商品功能
    $('.add_commodity').on('click', function () {
        //显示添加商品模态框
        $('#add_commodity').modal('show');

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (response) {
                // console.log(response);

                $('.dropdown-menu').html(template('map', response))

            }
        });
    })

    //通过事件委托，注册事件
    $('.dropdown').on('click', 'a', function () {
        $('.dropdown span:first').text($(this).text());

        $('#brandId').val($(this).data('id'))
    })

    // 4. 配置上传图片回调函数
    $('#fileupload').fileupload({
        // 返回数据类型
        dataType: "json",
        // 上传完图片, 响应的回调函数配置
        // 每一张图片上传, 都会响应一次
        done: function (e, data) {
            // console.log(data);
            // 获取图片地址对象
            var picObj = data.result;
            // 获取图片地址
            var picAddr = picObj.picAddr;

            // 新得到的图片对象, 应该推到数组的最前面    push pop shift unshift
            picArr.unshift(picObj);
            // 新的图片, 应该添加到 imgBox 最前面去
            $('#imgBox').prepend('<img src="' + picAddr + '" width="100">');

            // 如果上传的图片个数大于 3个, 需要将最旧的那个(最后面的哪项), 要删除
            if (picArr.length > 3) {
                // 删除数组的最后一项
                picArr.pop();
                // 除了删除数组的最后一项, 还需要将页面中渲染的最后一张图片删除掉
                // 通过 last-of-type 找到imgBox盒子中最后一个 img 类型的标签, 让他自杀
                $("#imgBox img:last-of-type").remove();
            }


            // 如果处理后, 图片数组的长度为 3, 说明已经选择了三张图片, 可以进行提交
            // 需要将表单 picStatus 的校验状态, 置成 VALID
            if (picArr.length === 3) {
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
            }

        }
    });

    //表单校验
    $('#form').bootstrapValidator({
        //将默认的排除想，重置掉（默认会对：hidden,:disabled等进行排除）
        excluded: [],

        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置校验字段
        fields: {
            // 二级分类id, 归属品牌
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            // 商品名称
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            // 商品描述
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            //商品库存
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    //正则效验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },
            // 商品价格
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品价格"
                    }
                }
            },
            // 商品原价
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            // 标记图片是否上传满三张
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }
    })

    //效验成功后提交
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        let fromStr = $('#form').serialize()

        fromStr += `
                    &picName1=${picArr[0].picName}&picAddr1=${picArr[0].picAddr}
                    &picName2=${picArr[1].picName}&picAddr2=${picArr[1].picAddr}
                    &picName3=${picArr[2].picName}&picAddr3=${picArr[2].picAddr}
                    `
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: fromStr,
            dataType: "json",
            success: function (response) {
                if (response.success) {

                    $('#add_commodity').modal('hide');
                    $('#form').data("bootstrapValidator").resetForm(true);
                    pages = 1;
                    render();

                    // 手动重置, 下拉菜单
                    $('.dropdown span:first').text("请选择二级分类")

                    // 删除结构中的所有图片
                    $('#imgBox img').remove();
                    // 重置数组 picArr
                    picArr = [];
                }
            }
        });
    })
})