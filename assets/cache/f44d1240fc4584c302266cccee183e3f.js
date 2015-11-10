function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==" ") c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function eraseCookie(name) {
	setCookie(name,"",-1);
}/**
 * Toggles between images.
 */
function toggle_image() {
	var img = document.getElementById("bubble").src;
	if (img.indexOf(bubble_image_1)!=-1) {
		document.getElementById("bubble").src  = bubble_image_0;
		document.getElementsByClassName("current-language")[0].innerHTML = current_language2;
		document.getElementsByClassName("current-language")[1].innerHTML = current_language2;
	} else {
		document.getElementById("bubble").src = bubble_image_1;
		document.getElementsByClassName("current-language")[0].innerHTML = current_language1;
		document.getElementsByClassName("current-language")[1].innerHTML = current_language1;
	}

}


/**
 * Setting cookies.
 */
var comics_read_json = getCookie("comics_read");
if ("" == comics_read_json) {
	var comics_read = {};
} else {
	var comics_read = JSON.parse(comics_read_json);
}
if ( "end" != comics_read[page_slug] ) {
	comics_read[comicjet_slug] = page_number;
	var comics_read_newjson = JSON.stringify(comics_read);
	setCookie("comics_read", comics_read_newjson, 1);
}
document.onkeydown = comicjet_keypress;

function comicjet_keypress(e) {

	e = e || window.event;

	if (typeof comicjet_prev_url != "undefined") {
		if (e.keyCode == "37") {
			window.location.assign(comicjet_prev_url);
		}
	}

	if (typeof comicjet_next_url != "undefined") {
		if (e.keyCode == "39") {
			window.location.assign(comicjet_next_url);
		}
	}

}