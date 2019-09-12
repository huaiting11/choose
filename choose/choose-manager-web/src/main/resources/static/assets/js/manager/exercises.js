$(function () {
    new exercises();
})
function exercises(){
    this.init();
}
exercises.prototype={
    init:function () {

        this.$page = $(".paging");
        //配置options
        var res = sendAjax({},"getType","json");
        this.addType(res.typeList);
        var data = {};
        this.page(data,1);
        this.bindEvent();
    },
    addType:function(typeList){
        var $select = $('<select class="form-control"></select>');
        for(var i = 0; i < typeList.length;i++){
            var $option = $('<option></option>');
            $option.val(typeList[i].id).text(typeList[i].name);
            $select.append($option);
        }
        $("#typeList").append($select);
    },
    bindEvent:function(){
        /**
         * 搜索框事件改变，重新加载数据以及画行
         */
        var that = this;
        $(".form-control").change(function(){
            var id = $(this).children('option:selected').val();
            $(this).children().removeClass("selected");
            $(this).children('option:selected').addClass("selected");
            //重新加载数据
            var data= {};
            var exr ={};
            data.exr = JSON.stringify(exr);
            data.careerId = id;
            that.page(data,1);
        })
    },
    page:function (data,no) {
        var that = this;
        var data2 = {};
        if(data != undefined){
            data2 = data;
        }
        data2.pageNo = no;
        data2.pageSize=3;
        var re = sendAjax(data2,"getExer","json");
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
        var userInfo  = $("#exercise").clone();
        userInfo.removeAttr("id").removeAttr("style");
        userInfo.addClass("line");
        userInfo.attr("id",data.id);
        userInfo.children().each(function (index,node) {
            switch (index) {
                case 0:
                    $(node).text(i);
                    break;
                case 1:
                    $(node).text(data.title);
                    break;
                case 2:
                    $(node).text(data.optionA);
                    break;
                case 3:
                    $(node).text(data.optionB);
                    break;
                case 4:
                    $(node).text(data.optionC);
                    break;
                case 5:
                    $(node).text(data.optionD);
                    break;
                case 6: //编辑 删除
                    $(node).children().each(function (index,ele) {
                        if(index == 0){
                            $(ele).click(function () {
                                sendAjax({},"link","json",function (re) {
                                    window.location.href = "/exercises/exerEdit?exerId="+userInfo.attr("id");
                                })
                            })
                        }
                        if(index == 1){
                            $(ele).click(function () {
                                $(".del").modal("show");
                                /*if(isDel){
                                   // sendAjax("")
                                    alert("dfdfdsfsd");
                                }*/
                            })
                        }
                    })
                    break;
            }
        });
        return userInfo;
    }
}