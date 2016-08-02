/**
 * Set translation strings.
 */
function translate_page( element_id ) {

	// Set every translation string
	var translation_strings = [
		{
			'id':'copyright',
			'en':'Copyright',
			'de':'Copyright',
		},
		{
			'id':'legal-notice',
			'en':'Legal Notice',
			'de':'Impressum',
		},
		{
			'id':'i-speak',
			'en':'I speak',
			'de':'Ich spreche',
		},
		{
			'id':'i-want-to-learn',
			'en':'I want to learn',
			'de':'Ich will lernen',
		},
/*
		{
			'id':'select-language',
			'en':'Start learning',
			'de':'Beginne zu lernen',
		}
*/
	];

//console.log(translation_strings);

	for (i = 0; i < translation_strings.length; i++) { 
		var id = translation_strings[i]['id'];

		var element = document.getElementById(id);
		if ( element && typeof element.innerHTML != 'undefined') {
			element.innerHTML = translation_strings[i][get_primary_language()];
		}

	}



	// Extract required string
//	var translated_string = translation_strings[0][element_id][get_primary_language()];

//	return translated_string;
}
document.addEventListener("DOMContentLoaded", translate_page );
