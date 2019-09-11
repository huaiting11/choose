$(function () {
    new videoList();
})
function videoList() {
    this.init();
}
videoList.prototype={
    init:function () {
        this.$typeList = $("#typeList");
        this.$typeId = $("#videoTypeId");
        var  res = sendAjax({},"getAbilityType","json");
        this.$typeId.val(res.abilityType[0].id);
        this.loadOption(res.abilityType);
        this.bindEvent();
        var data={};
        data.typeId = res.abilityType[0].id;
       // this.page(data,1);

    },
    loadOption:function (abilityType) {
        var $select = $('<select class="form-control" >');
        for (var i = 0; i < abilityType.length; i++) {
            var $option = $('<option></option>');
            $option.text(abilityType[i].name);
            $select.append($option);
        }
        this.$typeList.append($select);
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
            that.$typeId.val(id);
        })

    }/*,
    addRows:function () {

    },
    page:function (data,no) {
        var that = this;
        var data2 = {};
        if(data != undefined){
            data2 = data;
        }
        data2.pageNo = no;
        data2.pageSize=3;
        var re = sendAjax(data2,"getVideoList","json");
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
    },*/
}