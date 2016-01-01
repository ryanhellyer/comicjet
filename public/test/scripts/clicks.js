document.getElementById('comic').addEventListener("click", function (e) {

	// Change the comic language
	if(e.target && e.target.nodeName == "IMG") {

		var img = e.target;
		var id = e.target.id;
		var src = e.target.src;

		var end_of_file = src.substr(src.length - 7);
		if ( '-'+secondary_language+'.jpg' == end_of_file ) {
			var new_language = primary_language;
		} else if ( '-'+primary_language+'.jpg' == end_of_file ) {
			var new_language = secondary_language;
		}
		img.src = comics_folder_url+comic.slug+'/'+id+'-'+new_language+'.jpg';

	}

});
