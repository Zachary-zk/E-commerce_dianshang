$(function () {

    

    //获取本地localStorage  并渲染
    function getLocalStorage() {
        let jsonstr = localStorage.getItem('search_list')
        let arr = JSON.parse(jsonstr)
        return arr || [];
    }
    function setLocalStorage(arr) {
        let str = JSON.stringify(arr)
        localStorage.setItem('search_list', str)
    }

    render()
    function render() {
        $('.botton-location').html(template('app', { list: getLocalStorage() }))
    }

    //点击搜索将搜索记录添加到搜索历史里面
    $('.btn-search').on('click', function () {
        let val = $(this).siblings().val().trim()

        if (val === '') {
            mui.toast('请输入搜索关键字')
            return;
        }

        let arr = getLocalStorage()
        let index = arr.indexOf(val)
        if (index !== -1) {
            arr.splice(index, 1)
        }

        if (arr.length > 6) {
            arr.pop()
        }
        arr.unshift(val)

        setLocalStorage(arr)
        $(this).siblings().val('')

        render()

        //跳转页面
        location.href = 'serchList.html?key='+val
    })

    //通过事件委托 进行单个历史记录的删除
    $('.botton-location').on('click', '.btn-delete', function () {
        let arr = getLocalStorage()
        let index = $(this).parent().data('index')

        arr.splice(index, 1)

        setLocalStorage(arr)

        render()

    })

    //删除全部的历史记录
    $('.botton-location').on('click', '.ico-del', function () {
        mui.confirm('您确定要清空历史纪录吗？', '温馨提示', ['取消', '确认'], function (e) {
            if (e.index) {
                localStorage.removeItem('search_list')
                render()
            }
        })
    })
})