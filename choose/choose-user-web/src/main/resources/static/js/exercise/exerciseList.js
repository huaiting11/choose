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
        this.$options = $(".options_abcd");
        var data= {};
        data.userId="111";
        var res = sendAjax(data,"getCarrorByUser","json");
        var dataList = res.userCarr;
        this.loadCarr(dataList);
        //加载试题;
        var  userCarr = {};
        userCarr.carrId = dataList[0].careerOrientation.id;
        var res1 = sendAjax(userCarr,"getExercisesByCarr","json");
        this.exerList =  res1.exerList;
        this.currentIndex = 0;
        this.loadExerList(this.exerList[0]);
        this.bindEvents();

    },
    loadCarr:function (dataList) {
        var that = this;
        for (var i = 0; i < dataList.length; i++) {
            var item = dataList[i];
            var $li = $('<li class="tab_li"></li>');
            $li.attr("id",item.careerOrientation.id);

            $li.text(item.careerOrientation.name);
            this.$tab.append($li);
            $li.click(function (index,ele) {
                alert("切换职业方向类型,之前保存的做题记录会丢失");
                var carrId = $li.attr("id");
                var  userCarr = {};
                userCarr.carrId =carrId;
                var res = sendAjax(userCarr,"getExercisesByCarr","json");
                that.exerList =  res.exerList;
                that.currentIndex = 0;
                that.loadExerList(that.exerList[0]);
            })
        }

    },
    loadExerList:function (exerList) {
        $(".options_subject").text(exerList.title);
       $(".options_abcd").detach();
        var arr=["optionA","optionB","optionC","optionD","A:","B:","C:","D:"];
        var $ul =$('<ul class="options_abcd"></ul>');
        for(var i = 0; i < 4; i++){
            var $li = $('<li></li>');
            var option = arr[i]
            var options = arr[i+4];
            $li.text(options+exerList[option]);
            $ul.append($li);
        }
        $(".options_subject").after($ul);

    },
    bindEvents :function () {
        var that = this;
        $(".center_left_image img").click(function () {
            if(that.currentIndex == 0){
                return;
            }else{
                that.currentIndex = that.currentIndex-1;
                that.loadExerList(that.exerList[that.currentIndex]);
            }
            $(".options_Choice li input").removeAttr("checked");
            $(".options_Choice li input").each(function (index,ele) {
                var option = $(ele).val();
                if(option=== that.exerList[that.currentIndex].userOption){
                    $(ele).prop("checked",true);
                }
            })

        })
        $(".center_right_image img").click(function (){
            if(that.currentIndex == that.exerList.length-1){
                return
            }else{
                that.currentIndex = that.currentIndex+1;
                that.loadExerList(that.exerList[that.currentIndex]);
            }
            $(".options_Choice li input").removeAttr("checked");
            $(".options_Choice li input").each(function (index,ele) {
                var option = $(ele).val();
                if(option=== that.exerList[that.currentIndex].userOption){
                    $(ele).prop("checked",true);
                }
            })

        })
        $(".options_Choice li input").click(function(){
            $(".options_Choice li input").removeAttr("checked");
            $(this).prop("checked",true);
            var option = $(this).val();
            that.exerList[that.currentIndex].userOption= option;
            console.log(that.exerList[that.currentIndex]);
        });
        $("#saveBtn").click(function () {
            alert("还有多少道题目没有做");
            
        })
    },

}