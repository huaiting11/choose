$(function () {
    new userList();

})
function userList() {
    this.init();
}
userList.prototype  = {
    init: function () {
        this.bindEvent();
        this.$page = $(".paging");
        var data = {};
        this.page(data,1);
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
            row = this.addRows(item,i+1);
            $(".tab").append(row);
        }
        $(".paging").html(getStr(dataList.pageNum,dataList.pages));
        if(dataList.count == 0){
            $(".count").hide();
        }else {
            $(".count").show();
            this.paging();
            $("#p_info").find(".total").text(dataList.total);
            $("#p_info").find(".pageSize").text(dataList.pageSize);
        }

    },
    bindEvent:function(){
        /**
         * 搜索框事件改变，重新加载数据以及画行
         */
        $(".form-control").change(function(){
            var name = $(this).children('option:selected').val();
            $(this).children().removeClass("selected");
            $(this).children('option:selected').addClass("selected");
        })
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
    addRows:function (data,i) {
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




