$(function () {
    new exerEdit();

})
function exerEdit() {
    this.init();

}
exerEdit.prototype =  {
    init:function () {
        this.$exerId = $("#exerId").val();
        this.$title = $("#title");
        this.$optionA = $("#optionA");
        this.$optionB = $("#optionB");
        this.$optionC = $("#optionC");
        this.$optionD = $("#optionD");
        this.$answer = $("#answer");
        this.bindEvent();
        //判断id为空吗？
        if(!isEmpty(this.$exerId)){
            var data = {};
            data.exerId = this.$exerId;
            var res =  sendAjax(data,"getExerById","json");
            this.loadData(res.exercises);
        }
    },
    loadData:function(data){
        this.$optionA.val(data.optionA);
        this.$optionB.val(data.optionB);
        this.$optionC.val(data.optionC);
        this.$optionD.val(data.optionD);
        this.$title.val(data.title);
        //专业类型
        //答案
    },
    bindEvent:function(){
        /**
         * 搜索框事件改变，重新加载数据以及画行
         */
        var that = this;
        $(".form-control").change(function(){
            $(this).children().removeClass("selected");
            $(this).children('option:selected').addClass("selected");
        })
        $(".btn").click(function () {

            var data = {};
            var exer = {};
            if(!isEmpty(that.$exerId)){
                exer.id = that.$exerId;
            }
            exer.optionA =  that.$optionA.val();
            exer.optionB = that.$optionB.val();
            exer.optionC = that.$optionC.val();
            exer.optionD = that.$optionD.val();
            exer.title  = that.$title.val();
            data.exer =JSON.stringify(exer);
            window.event.returnValue=false
            sendAjax(data,"savaExer","json",function (re) {
                window.location.href = "/exercises/index";
            })
        })
    },
}
