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
    //绑定用户职业方向
    loadCarr:function (dataList) {
        var that = this;
        for (var i = 0; i < dataList.length; i++) {
            var item = dataList[i];
            var $li = $('<li class="tab_li"></li>');
            if(i==0){
                $li.addClass("selectLi");
            }
            $li.attr("id",item.careerOrientation.id);
            $li.text(item.careerOrientation.name);
            this.$tab.append($li);
        }

    },
    //加载试题
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
    changeExer:function(){
        var that = this;
        $(".options_Choice li input").removeAttr("checked");
        $(".options_Choice li input").each(function (index,ele) {
            var option = $(ele).val();
            if(option=== that.exerList[that.currentIndex].userOption){
                $(ele).prop("checked",true);
            }
        })
        var index = that.currentIndex+1;
        $(".Progress_img div").width(28*index);
        $(".Progress_text").text(index+"/15");
    },
    bindEvents :function () {
        var that = this;
        $(".tab_li").click(function () {
            var isChange = confirm("切换类型，之前数据丢失");
            if(isChange){
                var carrId = $(this).attr("id");
                var  userCarr = {};
                userCarr.carrId =carrId;
                var res = sendAjax(userCarr,"getExercisesByCarr","json");
                that.exerList =  res.exerList;
                that.currentIndex = 0;
                that.loadExerList(that.exerList[0]);
                $(".tab_li").removeClass("selectLi");
                $(this).addClass("selectLi");
            }
        })
        // 上一题
        $(".center_left_image img").click(function () {
            if(that.currentIndex == 0){
                return;
            }else{
                that.currentIndex = that.currentIndex-1;
                that.loadExerList(that.exerList[that.currentIndex]);
            }
            that.changeExer();

        })
        //下一题
        $(".center_right_image img").click(function (){
            if(that.currentIndex == that.exerList.length-1){
                return
            }else{
                that.currentIndex = that.currentIndex+1;
                that.loadExerList(that.exerList[that.currentIndex]);
            }
            that.changeExer();

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