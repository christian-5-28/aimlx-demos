function isNewUser(key) {
	var user_id =  getCookie(key);
	if (user_id == "") return true;
	else return false;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function(){

	if (isNewUser('user_id')) {
		console.log("New user. Needs to complete tutorial.")
		$('#demo_simple').addClass("disabled");
		$('#demo_steps').addClass("disabled");
		$("#demo_simple_desc").html($("#demo_simple_desc").html() + "<b> You must complete the tutorial first to activate this demo.</b>");
		$("#demo_steps_desc").html($("#demo_steps_desc").html() + "<b> You must complete the tutorial first to activate this demo.</b>")

	} else {
		console.log("Already completed tutorial")
	}

	$('.thumbnail').matchHeight();
	$('.button-go').addClass("corner");
});