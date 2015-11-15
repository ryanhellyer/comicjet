/**
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
if ( "" != comics_read[page_slug] ) {
	comics_read[comicjet_slug] = page_number;
	var comics_read_newjson = JSON.stringify(comics_read);
	setCookie("comics_read", comics_read_newjson, 1);
}

//{"breaking-all-barriers":"end","the-tower-in-the-sky":"1","xkcd":"129","shadowdancers":"end","xkcd2":"end","xkcd3":"7","xkcd4":"end","xkcd1":"end","xkcd5":"end","alle-schranken-fallen ":"8","der-rote-saal ":"3","lernprogramm ":"end","lernprogramm":"end","tutorial":"end","the-letter-of-jael-bara":"end"}	