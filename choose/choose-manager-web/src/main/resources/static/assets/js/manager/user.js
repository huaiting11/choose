$(function () {
    new user();

})
function user() {
    this.init();
}
user.prototype  = {
    init: function () {
        var res = sendAjax("{}","getUser?pageNo=1&&pageSize=10","json");
        var r = res.id;
        var r = res.name;
    }
}
function sendAjax(data, url, dataType, callback, sync){
    var result = {};
    $.ajax({
        type : "post",
        dataType : dataType,
        data : data,
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : url,
      //  async : isEmpty(sync)? false : sync,
        async:false,
        success : function(re, status, xhr) {
            if(xhr.getResponseHeader("sessionstatus") == "timeout"){
                window.location.href = "login";
                return;
            }
            result = re;
            if(callback != undefined){
                callback(re);
            }
        },
        error : function(xhr) {
            if(xhr.getResponseHeader("sessionstatus") == "timeout"){
                window.location.href = "login";
                return;
            }
        }
    });
    return result;
}


