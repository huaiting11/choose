$(function () {
    new grow();
})
function  grow() {
    this.init();
}
grow.prototype={
    init:function () {
        this.$page = $(".paging");
        this.$tab =$(".tab");
        var res = sendAjax({},"getAbilityType","json");
        this.loadSort(res.abilityType);

        this.bindEvent();
        this.loadData();

    },
    loadSort:function(typeList){
        var that = this;
        for (var i = 0; i < typeList.length; i++) {
            var item = typeList[i];
            var $li =$("<li class='tab_li '></li>");
            if(i == 0){
                $li.addClass("font_blue");
            }
            $li.attr("id",item.id);
            $li.click(function () {
                $(this).siblings().removeClass("font_blue");
                $(this).addClass("font_blue");
                //重新画视频的东西
            });
            $li.text(item.name);
            that.$tab.append($li);
        }
    },
    loadData:function () {

    },
    bindEvent:function () {

    }
}