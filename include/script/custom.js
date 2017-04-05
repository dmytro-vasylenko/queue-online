$(document).ready(function() {
	$(document).on("click", "button.open-info", function() {
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
});