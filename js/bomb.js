$(document).bind("keydown",keydown);

function keydown(event){
    if (event.keyCode == 37) {
        go(0,-1,'npc');return false;
    } else if (event.keyCode == 38) {
        go(-1,0,'npc');return false;
    } else if (event.keyCode == 39) {
		go(0,1,'npc');return false;
    } else if (event.keyCode == 40) {
        go(1,0,'npc');return false; 
    } else if (event.keyCode == 32) {
        $(".npc").creatBomb();return false;
    } else if (event.keyCode == 27) {
        $(document).unbind("keydown");
        $(document).bind("keydown",function(event){
        	if (event.keyCode == 13) {
				$(document).bind("keydown",keydown);
		    }
        });
    } else {
    	//alert(event.keyCode);
    }

}

function keydownNone(){
	return false;
}

function go(row,col,clazz){
	var tar = $('.'+clazz);
	var next = $("li.street[data-row="+(tar.data("row")+row)+"][data-col="+(tar.data("col")+col)+"]:eq(0)");
	if(next.length>0){
		next.addClass(clazz);
		tar.removeClass(clazz);
	}
}


var autoDevil1,autoDevil2,autoDevil3,_checkDevil,_checkNpc;
$(document).ready(function(){
	$(".row").each(function(index){
		var row = index;
		$(this).find("li").each(function(index){
			$(this).attr("data-row",row).attr("data-col",index);
		});
	});


	autoDevil1 = setInterval("autoDevil('devil1')",500);
	autoDevil2 = setInterval("autoDevil('devil2')",500);
	autoDevil3 = setInterval("autoDevil('devil3')",500);

	_checkDevil = setInterval("checkDevil()",100);
	_checkNpc = setInterval("checkNpc()",100);
});

$.fn.extend({
	creatBomb:function(){
		$(this).addClass("bomb").attr("id","bomb"+$(".bomb").length);
		setTimeout("bomb('"+"bomb"+$(".bomb").length+"')",3000);
	}
});

function bomb(id){
	console.log($("#"+"bomb"+$(".bomb").length).attr("id") + " blow up");
	var row = $("#"+id).data("row");
	var col = $("#"+id).data("col");

	$([0,1,2,3]).each(function(){
		//TODO 爆炸
		setTimeout("$('.street[data-row="+(row+this)+"][data-col="+(col)+"],"+
			".street[data-row="+(row-this)+"][data-col="+(col)+"],"+
			".street[data-row="+(row)+"][data-col="+(col+this)+"],"+
			".street[data-row="+(row)+"][data-col="+(col-this)+"]').append('<img class=\"mushroom bombMushroom"+$(".bomb").length+"\"/>').find('img').fadeIn(500).fadeOut(500)",this*200);
		setTimeout("$('.bombMushroom"+$(".bomb").length+"').remove()",1500);
	});

	$("#"+id).removeClass("bomb").removeAttr("id");
}

var _last_devil1,_last_devil2,_last_devil3;
function autoDevil(clazz){
	var row = $("."+clazz).data("row");
	var col = $("."+clazz).data("col");
	var able = $("li.street[data-row="+(row+1)+"][data-col="+col+"],"+
		"li.street[data-row="+(row-1)+"][data-col="+col+"],"+
		"li.street[data-row="+row+"][data-col="+(col+1)+"],"+
		"li.street[data-row="+row+"][data-col="+(col-1)+"]").not(eval("_last_"+clazz));
	var next = able.eq(Math.floor(Math.random()*able.length));
	go(next.data("row")-row,next.data("col")-col,""+clazz);
	eval("_last_"+clazz+" = 'li[data-row="+row+"][data-col="+col+"]'");
}

function checkDevil(){
	if($(".devil1 img").length>0){
		clearInterval(autoDevil1);
		$(".devil1").removeClass("devil1");
	}
	if($(".devil2 img").length>0){
		clearInterval(autoDevil2);
		$(".devil2").removeClass("devil2");
	}
	if($(".devil3 img").length>0){
		clearInterval(autoDevil3);
		$(".devil3").removeClass("devil3");
	}

	if($(".devil1,.devil2,.devil3").length == 0){
		alert("恭喜你，胜利了！");
		end();
	}
}

function checkNpc(){
	if($(".npc.devil1,.npc.devil2,.npc.devil3,.npc img").length>0){
		alert("噢噢，失败咯！");
		end();
	}
}

function end(){
	$(document).unbind("keydown");	
	clearInterval(_checkDevil);
	clearInterval(_checkNpc);
	clearInterval(autoDevil1);
	clearInterval(autoDevil2);
	clearInterval(autoDevil3);
	//$(document).bind("keydown",keydownNone);
}