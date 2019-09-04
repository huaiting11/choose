$(function () {
    new user();

})
function user() {
    this.init();
}
user.prototype  = {
    init: function () {
        var data = {};
        this.$page = $(".paging");
        this.page(data,1,true);
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
        $(".paging").html(getStr(dataList.pageNum,dataList.pages));
        if(dataList.count == 0){
            $(".count").hide();
        }else {
            $(".count").show();
            this.paging();
            $(".paging").find(".total").text(dataList.count);
            $(".paging").find(".pageSize").text(dataList.pageSize);
        }

    },
    paging:function(){
        var that = this;
        var activePage = parseInt(that.$page.find(".activePage").text());
        var lastPage = that.$page.children().length - 2;
        that.$page.children().each(function (dex,ele) {
            $(ele).click(function () {
                if ($(ele).hasClass("activePage")) return;
                if ($(ele).text() == "...") return;
                //上一页
                if (dex == 0 && activePage > 1){
                    that.page(undefined, activePage - 1);
                    return;
                }
                //下一页
                if (dex == lastPage + 1 && activePage < lastPage){
                    that.page(undefined, activePage + 1);
                    return;
                }
                if ($(ele).text() == "") return;
                //其他页
                that.page(undefined, parseInt($(ele).text()));
            });
        });
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
function getStr(pageNo,last) {
    var str="";
    if(pageNo > 1){
        str="<span></span>";
    }else{
        str="<span></span>";
    }
    if(last < 6){
        if(pageNo >= 6) {
            str +="<span>1</span><span>2</span><span>...</span>";
            if(last >= pageNo + 5) {
                for(var i = pageNo-2; i <= pageNo + 2; i++) {
                    if(pageNo == i) {
                       str +="<span class='activePage'>"+ i +"</span>";
                    }else {
                        str+="<span>"+ i +"</span>";
                    }
                }
                str +="<span>...</span>";
                str +="<span>"+ (last - 1) +"</span>";
                str +="<span>"+ last +"</span>";
                str +="<span></span>";
            }else{
                for(var i = pageNo - 2; i <= last ; i++) {
                    if(pageNo == i) {
                       str += "<span class='activePage'>"+ i +"</span>";
                    }else {
                        str += "<span>"+ i +"</span>";
                    }
                }
                str += "<span></span>";
            }

        }else {
            for(var i = 1; i <= last; i++) {
                if(pageNo == i) {
                    str+="<span class='activePage'>"+ i +"</span>";
                }else {
                    str+="<span>"+ i +"</span>";
                }
            }
            if(pageNo == last) {
                str+="<span></span>";
            }else {
               str+="<span></span>";
            }
        }
    }
    return str;

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


