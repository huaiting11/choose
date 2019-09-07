$(function () {
    new exerciseList();
})
function exerciseList() {
    this.init();
}
exerciseList.prototype={
    init:function () {
        // 获取用户的方向类型
        this.$tab = $(".tab");
        var data= {};
        data.userId="111";
        var res = sendAjax(data,"getCarrorByUser","json");
        var dataList = res.userCarr;
        this.loadCarr(dataList);
        //加载试题;
        var  userCarr = {};
        userCarr.carrId = dataList[0].careerOrientation.id;
        var res = sendAjax(userCarr,"","json");
        this.exerList =  res.exerList;

    },
    loadCarr:function (dataList) {
        for (var i = 0; i < dataList.length; i++) {
            var item = dataList[i];
            var $li = $('<li class="tab_li"></li>');
            $li.attr("id",item.careerOrientation.id);

            $li.text(item.careerOrientation.name);
            this.$tab.append($li);
            $li.click(function () {
                alert("切换职业方向类型");
            })
        }

    },
    loadExerList:function () {
        

    }
}