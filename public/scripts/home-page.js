function home_page() {

	document.getElementById('site-title').innerHTML = 'Home page (needs translated)';

	var content_area = `
		<form id="comic-type" name="comic-type" method="post" action="">

			<label>I speak</label>
			<select id="language1" name="language1">
				<option selected="selected" value="en">English</option>
				<option value="de">Deutsch</option>
			</select>

			<span></span>

			<label>I want to learn</label>
			<select id="language2" name="language2">
				<option value="en">English</option>
				<option selected="selected" value="de">Deutsch</option>
			</select>

			<span></span>

			<input type="submit" id="select-language" name="select-language" value="Start learning&nbsp; &gt;" />
		</form>


		<div id="comic-selection">
`;

	if(typeof primary_language!='undefined') {

		for (i = 0; i < comics.length; i++) { 
			slugs = comics[i].slug;
			names = comics[i].name;
			name = names[primary_language];
			var slug = slugs[primary_language];
			content_area = content_area + `
			<div class="block block-1" id="`+slug+`">
				<a id="comic-link-10" href="`+home_url+`en/de/`+slug+`/" class="block-inner">
					<img id="`+slug+`" src="`+home_url+`comics/`+slugs['en']+`/thumbnail-en.jpg" />
					<p>`+name+`</p>
				</a>
			</div>`;
		}
	}




	content_area = content_area + `

		</div>
`;

	document.getElementById('comic').innerHTML = content_area;

}
