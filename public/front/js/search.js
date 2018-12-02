$(function(){

    let jsonstr = localStorage.getItem('search_list')
    let arr = JSON.parse(jsonstr)

    $('.botton-location').html( template('app',{list:arr}) )

    
})