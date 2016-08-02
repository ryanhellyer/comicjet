function home_page() {

	document.getElementById('site-title').innerHTML = 'Comic Jet';

	var content_area = `
		<form id="comic-type" name="comic-type" method="post" action="">

			<label id="i-speak">I speak</label>
			<select id="language1" name="language1">
				<option selected="selected" value="en">English</option>
				<option value="de">Deutsch</option>
			</select>

			<span></span>

			<label id="i-want-to-learn">I want to learn</label>
			<select id="language2" name="language2">
				<option value="en">English</option>
				<option selected="selected" value="de">Deutsch</option>
			</select>

			<span></span>

			<input type="submit" id="select-language" name="select-language" value="Start learning&nbsp; &gt;" />
		</form>


		<div id="comic-selection">
`;

	if(typeof get_primary_language()!='undefined') {
		for (i = 0; i < comics.length; i++) { 
			slugs = comics[i].slug;
			names = comics[i].name;
			name = names[get_primary_language()];
			var slug = slugs[get_primary_language()];
			content_area = content_area + `
			<div class="block block-1" id="`+slug+`">
				<a id="comic-link-10" href="`+home_url+get_primary_language()+`/`+get_secondary_language()+`/`+slug+`/" class="block-inner">
					<img id="`+slug+`" src="`+home_url+`comics/`+slugs['en']+`/thumbnail-en.jpg" />
					<p>`+name+`</p>
				</a>
			</div>`;
		}
	} else {



alert('home without selection');
console.log('home without language selection yet');
	}




	content_area = content_area + `

		</div>
`;

	document.getElementById('comic').innerHTML = content_area;

translate_page();
//	document.getElementById('i-speak').innerHTML = 'xxxx';
//		document.getElementById(id+'-text').innerHTML = translation_strings[i][get_primary_language()];

}
