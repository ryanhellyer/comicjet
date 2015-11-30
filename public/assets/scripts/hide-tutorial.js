/*
 * Find the tutorial comic in the cookie, and hide the tutorial if it's already been completed.
 */
comics_read_json = getCookie("comics_read");
if ("" != comics_read_json) {
	var comics_read = JSON.parse(comics_read_json);
	if('end'==comics_read['tutorial']){
		// Add class to body, and use that to hide stuff
		document.getElementsByTagName('body')[0].className+=' hide-tutorial'
	}
}
