$(document).ready(function() {
	$(document).on("click", "button.open-info", function() {
		if(!$(this).parent().hasClass("close"))
			$(this).parent().find(".info").stop().slideToggle();
	});
	$(document).on("click", ".place", function() {
		if($.cookie("uid") && $(this).hasClass("free")) {
			for(var i = 0; i < $(this).parent().find(".place").length; i++) {
				if($(this).parent().find(".place").eq(i).find("img").attr("src") == $.cookie("photo_rec"))
					return;
			}
			$(this).removeClass("free");

			var queueId = $(this).parent().parent().parent().attr("id");
			var place = $(this).index() + 1;

			$(this).append("<img src=\"" + $.cookie("photo_rec") + "\" title=\"" + ($.cookie("first_name") + " " + $.cookie("last_name")) + "\">");
			$.ajax({
				url: "/include/php/api.php",
				type: "POST",
				data: "func=add&queue_id=" + queueId + "&place=" + place,
				success: function(data) {
					console.log(data);
				}
			})
		}
	});
	$(document).on("click", "button.save-mail", function() {
		$.ajax({
			url: "/include/php/api.php",
			type: "POST",
			data: "func=set_mail&mail=" + $("input.mail").val(),
			success: function() {
				$("input.mail").css({"background": "white url(/include/img/ok-mark.png) 233px center no-repeat"});
			}
		});
	});
});