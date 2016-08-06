function home_page() {

	document.getElementById('site-title').innerHTML = 'Learn languages from comics';

	var content_area = `

		<div class="buttons">
			<a id="learn-german" class="button" href="`+home_url+`en/de/`+`">Learn German</a>
			<a id="learn-english" class="button" href="`+home_url+``+`de/en/">Learnen Englisch</a>
		</div>

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

	document.getElementById('page-content').innerHTML = content_area;

	translate_page();

}
