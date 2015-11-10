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
 * This script is used for redirecting users to the correct page immediately,
 * rather than relying on them submitting the form first.
 */


/**
 * Switching off form submission.
 */
document.getElementById("select-language").type = "button";

/**
 * Redirecting after language selector clicked.
 */
document.getElementById("select-language").onclick = function(){
	var language1 = document.getElementById("language1").value;
	var language2 = document.getElementById("language2").value;
	var new_url = comicjet_root_url+"/"+language1+"/"+language2+"/";
	window.location.assign(new_url);
};

/*
 * Loop through all comics read and set CSS of their box.
 */
comics_read_json = getCookie("comics_read");
if ("" != comics_read_json) {
	var comics_read = JSON.parse(comics_read_json);

	for(var comic_slug in comics_read) {
		var page_number = comics_read[comic_slug];

		if ( "end" == page_number ) {

			// Style already read comics
			var comic_block = document.getElementById("comic-"+comic_slug).innerHTML;
			document.getElementById("comic-"+comic_slug).innerHTML = comic_block + "<div class=\'read\'>" + text_already_read + "</div>";
			document.getElementById("comic-"+comic_slug).style.opacity = "0.8";

		} else {
			if (document.getElementById("comic-"+comic_slug)) {

				// Style comics which are bein read
				var comic_block = document.getElementById("comic-"+comic_slug).innerHTML;
				document.getElementById("comic-"+comic_slug).innerHTML = comic_block + "<div class=\'read\'>" + text_reading + "</div>";

				// Change URL
				var parent = document.getElementById("comic-"+comic_slug);
				var child = parent.childNodes[1];

				if (0 == page_number) {
					var extra = "";
				} else {
					var extra = page_number + "/";
				}

				var new_url = (
					comicjet_root_url +
					"/" +
					comicjet_language1 +
					"/" +
					comicjet_language2 +
					"/" +
					comic_slug +
					"/" +
					extra
				);
				child.setAttribute("href", new_url);

			}
		}

	}

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