function getChinaNum(digit){
    digit = typeof digit === 'number' ? String(digit) : digit;
    var zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var unit = ['千', '百', '十', ''];
    var quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];
    var breakLen = Math.ceil(digit.length / 4);
    var notBreakSegment = digit.length % 4 || 4;
    var segment;
    var zeroFlag = [], allZeroFlag = [];
    var result = '';
    while (breakLen > 0) {
        if (!result) { // 第一次执行
            segment = digit.slice(0, notBreakSegment);
            var segmentLen = segment.length;
            for (var i = 0; i < segmentLen; i++) {
                if (segment[i] != 0) {
                    if (zeroFlag.length > 0) {
                        result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
                        // 判断是否需要加上 quot 单位
                        if (i === segmentLen - 1 && breakLen > 1) {
                            result += quot[breakLen - 2];
                        }
                        zeroFlag.length = 0;
                    } else {
                        result += zh[segment[i]] + unit[4 - segmentLen + i];
                        if (i === segmentLen - 1 && breakLen > 1) {
                            result += quot[breakLen - 2];
                        }
                    }
                } else {
                    // 处理为 0 的情形
                    if (segmentLen == 1) {
                        result += zh[segment[i]];
                        break;
                    }
                    zeroFlag.push(segment[i]);
                    continue;
                }
            }
        } else {
            segment = digit.slice(notBreakSegment, notBreakSegment + 4);
            notBreakSegment += 4;

            for (var j = 0; j < segment.length; j++) {
                if (segment[j] != 0) {
                    if (zeroFlag.length > 0) {
                        // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
                        if (j === 0) {
                            result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
                        } else {
                            result += '零' + zh[segment[j]] + unit[j];
                        }
                        zeroFlag.length = 0;
                    } else {
                        result += zh[segment[j]] + unit[j];
                    }
                    // 判断是否需要加上 quot 单位
                    if (j === segment.length - 1 && breakLen > 1) {
                        result += quot[breakLen - 2];
                    }
                } else {
                    // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
                    if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
                        result += quot[breakLen - 1];
                        zeroFlag.length = 0;
                        zeroFlag.push(segment[j]);
                    } else if (allZeroFlag.length > 0) {
                        // 执行到最后
                        if (breakLen == 1) {
                            result += '';
                        } else {
                            zeroFlag.length = 0;
                        }
                    } else {
                        zeroFlag.push(segment[j]);
                    }

                    if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
                        // 如果执行到末尾
                        if (breakLen === 1) {
                            allZeroFlag.length = 0;
                            zeroFlag.length = 0;
                            result += quot[breakLen - 1];
                        } else {
                            allZeroFlag.push(segment[j]);
                        }
                    }
                    continue;
                }
            }
            --breakLen;
        }
        return result;
    }
}
//通过A标签跳转
function goToOtherPage(saved){
	$("a").click(function(event){
		aclicked = this;
		if(!saved){
			event.preventDefault();
			/*$("#confirmDialog .modal-body").addClass("paddingM");*/
			showConfirmDialog("当前页面数据还未保存，离开后当前编辑的数据将全部丢失。确定离开吗？", "提示", function(){
				window.location.href = $(aclicked).attr("href");
			})
		}
	});
}
//str是空的情况下  返回reback
function isUndefined(str,reback){
	if(isEmpty(str)) return reback==undefined?"":reback;
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
        async : isEmpty(sync)? false : sync,
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
function loadRight(url, callback, content){
    if(isEmpty(content)){
        content = ".content";
    }
    $(content).load(url, function(html, status, xhr){
        if(xhr.getResponseHeader("sessionstatus") == "timeout"){
            window.location.href = "login";
            return;
        }
        callback(html, status, xhr);
    })
}
function getRandomStr(len) {
    var data=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K",
        "L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
        "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var result="";
    for(var i=0;i<len;i++){
        var r=Math.floor(Math.random()*62);
        result+=data[r];
    }
    return result;
}
function getDurationType(type, year, grow){
	grow = false;
    var d = new Date();
    var curMonth = d.getMonth() + 1;
    var curYear = d.getFullYear();
    if(type == "半年度"){
        if(year == curYear && curMonth > 6 && grow){
            return "下半年";
        }
        return "上半年,下半年";
    }
    if(type == "季度"){
        if(year == curYear && grow){
            if(curMonth > 3 && curMonth <= 6){
                return "二季度,三季度,四季度";
            }else if(curMonth > 6 && curMonth <= 9){
                return "三季度,四季度";
            }else if(curMonth > 9){
                return "四季度";
            }
        }
        return "一季度,二季度,三季度,四季度";
    }
    if(type == "月度"){
        var str = "";
        if(year == curYear && grow){
            for(var i = curMonth; i <= 12; i++){
                if (i == 1){
                    str+="1月,";
                }else if (i == 2){
                    str+="2月,";
                }else if (i == 3){
                    str+="3月,";
                }else if(i == 4){
                    str+="4月,";
                }else if (i == 5){
                    str+="5月,";
                }else if (i == 6){
                    str+="6月,";
                }else if (i == 7){
                    str+="7月,";
                }else if (i == 8){
                    str+="8月,";
                }else if(i == 9){
                    str+="9月,";
                }else if( i == 10){
                    str+="10月,";
                }else if( i == 11){
                    str+="11月,";
                }else if(i == 12){
                    str+="12月,"
                }
            }
            return str.substr(0, str.length - 1);
        }
        return "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月";
    }
    return "";
}
function setOnlyNumStyle(ele, decimal, maxLen, allowNegative){
    setContentStyle(ele, true, maxLen, false, false, undefined, allowNegative, decimal);
}
function setContentStyle(ele, onlynum, maxLen, setH,allowEnter, setHcallBack, allowNegative, decimal){
    var eventType = "keypress keyup";
    if($(ele).is("input")){
        eventType = "keyup keydown";
    }
    $(ele).on(eventType,function (event) {
        var code = event.keyCode;
        if(allowEnter == undefined){
            allowEnter = true;
        }
        if (!allowEnter && code == 13){//限制回车
            event.preventDefault();
            return false;
        }
        if(event.ctrlKey) return;
        if($(this).prop('comStart') && event.keyCode != 999999){
            if(code == 229 && event.originalEvent.code == "Enter" && event.type == "keydown"){
                setTimeout(function(){
                    var e = jQuery.Event("keyup");
                    e.which = 13;
                    e.keyCode = 999999;
                    $(ele).trigger(e);
                }, 50);
            }
            return;
        }
        setCellValue($(this),onlynum, maxLen, setH,allowEnter, setHcallBack, allowNegative, decimal);
    }).on('compositionstart', function(){
        if(!onlynum){
            $(this).prop('comStart', true);
        }
    }).on('compositionend', function(){
        $(this).prop('comStart', false);
        setCellValue($(this),onlynum, maxLen, setH,allowEnter, setHcallBack);
    }).blur(function(){
        if(onlynum){
            var text = $(this).is("input")? $(this).val() : $(this).text();
            var replace = false;
            if(/\.$/.test(text)){
                text = text.substring(0, text.length - 1);
                replace = true;
            }
            if(/^0+/.test(text) && !/^0\./.test(text)) {
                replace = true;
                if (/0{2,}\./.test(text)) {
                    text = text.replace(/^0+/g, "0");
                } else {
                    text = text.replace(/^0+/g, "");
                }
                if (text.length == 0) {
                    text = "0";
                }
            }
            if(replace){
                if($(this).is("input")){
                    $(this).val(text);
                }else{
                    $(this).text(text);
                }
            }
        }
    });
    $(ele).on("paste",function (event) {
        //去掉自动加链接
        try {
            document.execCommand("AutoUrlDetect", false, false);
        } catch (event) {}
        event = event || window.event;
        if (event && event.preventDefault){
            event.preventDefault();
        }else {
            window.event.returnValue = false;
        }
        var onlyText = "";
        if(window.clipboardData && clipboardData.setData) {
            // IE
            onlyText = window.clipboardData.getData('text');
        } else {
            onlyText = (event.originalEvent || event).clipboardData.getData('text/plain');
        }
       /* if (onlyText != null){
            onlyText = $(this).is("input")? $(this).val() : $(this).text() + onlyText;
        }
        if(maxLen < onlyText.length){
            onlyText = onlyText.substr(0,maxLen);
        }*/
        if(document.body.createTextRange) {
            if(document.selection) {
                var textRange = document.selection.createRange();
            } else if(window.getSelection) {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0);
                // 创建临时元素
                var tempEl = document.createElement("span");
                tempEl.innerHTML = "&#FEFF;";
                range.deleteContents();
                range.insertNode(tempEl);
                textRange = document.body.createTextRange();
                textRange.moveToElementText(tempEl);
                tempEl.parentNode.removeChild(tempEl);
            }
            textRange.text = onlyText;
            textRange.collapse(false);
            textRange.select();
        } else {
            // Chrome
            document.execCommand("insertText", false, onlyText);
        }
        setCellValue($(this),onlynum, maxLen, setH,allowEnter, setHcallBack);
    });
    //去除快捷键
    $(ele).on('keydown', function(e) {
        // e.metaKey for mac
        if (e.ctrlKey || e.metaKey) {
            switch (e.keyCode) {
                case 66: //ctrl+B or ctrl+b
                case 98:
                case 73: //ctrl+I or ctrl+i
                case 105:
                case 85: //ctrl+U or ctrl+u
                case 117: {
                    e.preventDefault();
                    break;
                }
            }
        }
        //限制tab
        if(e.keyCode == 9){
            e.preventDefault();
            return false;
        }
    });
}
function setCellValue($this, onlynum, maxLen, setH,allowEnter, setHcallBack, allowNegative, decimal){
    if ($this.prop('comStart') && event.keyCode != 999999) return;
    var msg = "当前输入框只允许输入"+ maxLen +"个字符！";
    var text = $this.is("input")? $this.val() : $this.text();
    var $row = $this.parent();
    var $prev = $this.prev();
    decimal = isEmpty(decimal)? true : decimal;
    if($prev.hasClass("commonSelect") || $prev.hasClass("commonSelected")){
        $row = $row.parent();
    }
    if(setH == undefined || setH){
        setRowHeight($row, undefined, undefined, setHcallBack);
    }
    if(onlynum){
        var reg = "^([0-9]+)([.]{1}[0-9]+){0,1}$";
        var match = text.match(reg);
        if(match == null){
            var dot = false;
            var len = 0;
            for(var d = 0; d < text.length; d++){
                var chr = text.charAt(d);
                if(chr.match("\\d") == null){
                    if(chr == '-' && allowNegative && d == 0){
                        maxLen++;
                        continue;
                    }
                    if(chr == "." && decimal){
                        if(dot || d == 0){
                            text = text.substring(0, d);
                            if($this.is("input")){
                                $this.val(text);
                            }else{
                                $this.text(text);
                                setCusor($this.get(0));
                            }
                            break;
                        }else{
                            maxLen++;
                            dot = true;
                            continue;
                        }
                    }else {
                        text = text.substring(0, d);
                        if($this.is("input")){
                            $this.val(text);
                        }else{
                            $this.text(text);
                            setCusor($this.get(0));
                        }
                        break;
                    }
                }else if(dot){
                    if(len < 2){
                        maxLen++;
                        len++;
                    }else{
                        break;
                    }
                }
            }
        }else if(!isEmpty(match[1]) && match[1].length > maxLen){
            var maxNum = "";
            for(var x = 0; x < maxLen; x++){
                maxNum+="9";
            }
            msg = "当前输入框允许的最大值为："+ maxNum;
        }else if(!isEmpty(match[2])){
            if(match[1].length < maxLen){
                maxLen = match[1].length;
            }
            if(match[2].length > 3){
                msg = "当前输入框允许输入两位小数";
            }
            maxLen+= (match[2].length>3? 3 : match[2].length);
        }
    }
    if(maxLen != -1 && text.length > maxLen){
        text = text.substr(0, maxLen);
        if($this.is("input")){
            $this.val(text);
        }else{
            if($this.children().length > 0){
                var html = $this.html().replace(/<div>/g, "<br/>").replace(/<\/div>/g, "");
                $this.html(html.substr(0, maxLen));
            }else{
                $this.html(text);
            }
            setCusor($this.get(0));
        }
        //setRowHeight($row);
        showDialog(msg);
    }
}
function setCusor(ele){
    if (window.getSelection) {
        ele.focus();
        var range = window.getSelection();
        range.selectAllChildren(ele);
        range.collapseToEnd();
    }
    else if (document.selection) {
        var range = document.selection.createRange();
        range.moveToElementText(ele);
        range.collapse(false);
        range.select();
    }
}
function setRowHeight($row, maxHeight, width, callback){
    maxHeight = (maxHeight == undefined || maxHeight < 20)? 20 : maxHeight;
    $row.children().removeAttr("style");
    if(width != undefined){
        $row.children().css("width", width);
    }
    $row.children().each(function(){
        if($(this).height() > maxHeight){
            maxHeight = $(this).height();
        }
    });
    maxHeight+= 14;
    $row.children().each(function(){
        var sHeight = $(this).height();
        sHeight = sHeight == 0? 20 : sHeight;
        if($(this).is("input")){
            $(this).css("padding-top", "0px").height(maxHeight);
        }else{
            var padding = (maxHeight - sHeight) / 2;
            $(this).css("padding-top", padding).height(maxHeight - padding);
        }
    });
    if(callback != undefined){
        callback($row);
    }
    var left = $(".main-box-right").width() + $(".main-box-left").width() - 14;
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight){
        $(".consult").css("left",left +4+"px");
    }
}

/**
 * 检查文件类型
 * @param file
 * @param suff
 */
function validateFileType(file, types){
    var suf = file.name.substring(file.name.lastIndexOf("."));
    for(var i = 0; i < types.length; i++){
        if(suf == types[i]){
            return true;
        }
    }
    return false;
}

/**
 * 检查文件大小
 *  @param file
 * @param maxSize
 */
function validateFileSize(target, maxSize){
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileSize = 0;
    if (isIE && !target.files){
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile (filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    //以M为单位
    var mSize = fileSize / (1024 * 1024);
    return mSize < maxSize;
}
function showDialog(message,notDelTitle){
	if(notDelTitle==undefined||!notDelTitle){
		$("#alarm #info").removeAttr("title");
	}
    var $msg = $("#alarm #info");
    var line = Math.ceil(message.length / 18);
    $msg.html(message);
    $msg.parent().css("padding", 0);
    $msg.css("padding-top", (108 - line * 20) / 2);
    $("#alarm").modal("show");
}
function showMessageDialog(message){
    showDialog(message);
}
function showConfirmDialog(message, title, fun, cfun){
    var $confirm = $("#confirmDialog #confirmMsg");
    var $body = $confirm.parent();
    var line = Math.ceil(message.length / 18);
    $body.css("padding", 0);
    $confirm.html(message);
    $confirm.css("padding-top", (108 - line * 20) / 2);
    $("#confirmDialog #ctitle").html(title);
    var $yes = $("#confirmDialog .yes");
    $yes.unbind("click").click(function(){
        fun();
        $("#confirmDialog").modal("hide");
    });
    var $cancel = $("#confirmDialog .cancel");
    $cancel.unbind("click").click(function(){
        if(cfun != undefined){
            cfun();
        }
        $('#confirmDialog').modal('hide');
    });
    $("#confirmDialog").modal("show");
}
function isEmpty(value){
    return (value == undefined || (typeof value == "string" && value == "") || value == null || (typeof value == "number" && value == 0));
}
function toDate(str){
    var sd=str.split("-");
    return new Date(sd[0],sd[1]-1,sd[2]);
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//返回建
function loadView(url,keep, fun, param){
    var $iframe = $("#viewIFRAME", parent.document);
    var $body = $("body", parent.document);
    if($iframe.length == 0 || keep){
        $iframe = $("<iframe></iframe>");
        $iframe.attr("id", "viewIFRAME").attr("src", url).css("width","100%").height($(window).height());
        $body = $("body");
    }else{
        var allUrl = window.location.href;
        allUrl = allUrl.substr(0, allUrl.lastIndexOf("\/") + 1);
        if(/^\.\.\//g.test(url)){
            url = allUrl + url;
        }
        $iframe.attr("id", "viewIFRAME").attr("src", url).css("width","100%").height($(window).height());
        $iframe.reload();
    }
    $body.children().each(function(){
        if($(this).hasClass("modal") || this.id == 'viewIFRAME'){
            return;
        }
        if($(this).is("input")){
            if($(this).attr("type") == "hidden") return;
        }
        $(this).hide();
    });
    $iframe.appendTo($body);
    $iframe.load(function(){
        $("#viewIFRAME").contents().find(".backBtn").click(function(){
            if(!$("#viewIFRAME")[0].contentWindow.saved){
                showConfirmDialog("当前页面还有数据未保存，离开将使当前编辑的数据丢失。确定离开吗？", "提醒", function(){
                    backView();
                });
                return;
            }
            backView(fun, param);
        });
    });
}
function backView(fun, param){
    $("body").children().each(function(){
        if($(this).is("input")){
            if($(this).attr("type") == "hidden") return;
        }
        if(!$(this).hasClass("modal")){
            $(this).show();
        }
    });
    if(!isEmpty(fun)){
        fun(param);
    }
    $("#viewIFRAME").remove();
    $(".emoji_container").hide();
}

function getRootPath(){
    var curWwwPath=window.location.href;
    var pathName=window.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    if(projectName != "/ehr"){
        return localhostPaht;
    }
    return localhostPaht+projectName;
}
//获取cookie值
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=decodeURI(document.cookie).match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function setCookie (name, value, day, hour, min)
{
    if(day == undefined) day = 1;
    if(hour == undefined) hour = 1;
    if(min == undefined) min = 1;
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + day * hour * min * 60 * 1000);
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
}
function windowH(){
    $("#right").removeAttr("style");
    $(".content").removeAttr("style");
    var docH=  $(document).height();
    var windowH =  $(window).height();
    if(docH>windowH){
        $("#right").css("height",docH - 64+"px");
    }else{
        $("#right").css("height",windowH - 64+"px");
    }
}
function loadCss(css, callback){
    $.each(css, function(dex, cs){
        $.ajax({
            url: "static/css/"+cs,
            success: function(data) {
                $('<style type="text/css">' + data.replace(/url\(images/g, 'url(/css/images') + '</style>').prependTo($(".content"));
                if(!isEmpty(callback)){
                    callback();
                }
            }
        });
    });
}