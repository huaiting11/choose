$(function () {
    new user();

})
function user() {
    this.init();
}
user.prototype  = {
    init: function () {
        var data = {};
        this.page(data,1,true);

        /*var res = sendAjax("{}","getUser?pageNo=1&&pageSize=10","json");
        var r = res.id;
        var r = res.name;*/
    },
    page:function (data,no) {
        var that = this;
        var data2 = {};
        if(data != undefined){
            data2 = data;
        }
        data2.pageNo = no;
        data2.pageSize=3;
        var re = sendAjax(data2,"getUser","json");
        var dataList = re.page;
        if (isEmpty(dataList)) return;
        var list = dataList.list;
        $(".tab").find(".line").detach();
        for (var i = 0; i < list.length; i++){
            var item = list[i];
            var row = "";
            row = this.addrows(item,i+1);
            $(".tab").append(row);
        }


    },
    addrows:function (data,i) {
        var userInfo  = $("#userInfo").clone();
        userInfo.removeAttr("id").removeAttr("style");
        userInfo.addClass("line");
        userInfo.attr("id",data.id);
        userInfo.children().each(function (index,node) {
            switch (index) {
                case 0:
                    $(node).text(i);
                    break;
                case 1:
                    $(node).text(data.name);
                    break;
                case 2:
                    $(node).text(data.name);
                    break;
                case 3:
                    $(node).text(data.name);
                    break;
            }
        });
        return userInfo;
        
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


