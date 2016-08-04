/**
 * Set translation strings.
 */
function translate_page() {

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
			'de':'Impressum (auf Englisch)',
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
		{
			'id':'select-language',
			'en':'Start learning >',
			'de':'Beginne zu lernen >',
		},
		{
			'id':'site-title',
			'en':'Learn languages from comics',
			'de':'Sprachen lernen von Comics',
			'when':'home',
		},
		{
			'id':'creation',
			'en':'A creation of',
			'de':'Eine Kreation von',
		}
	];

	for (i = 0; i < translation_strings.length; i++) { 
		var id = translation_strings[i]['id'];
		var when = translation_strings[i]['when'];
		if ( typeof string_when != 'undefined' || page_type == when ) {
			var element = document.getElementById(id);
			if ( element && typeof element.innerHTML != 'undefined' && element.innerHTML != '') {
				element.innerHTML = translation_strings[i][get_primary_language()];
			} else if ( element && typeof element.value != 'undefined' && element.value != '') {
				element.value = translation_strings[i][get_primary_language()];
			}
		}

	}
}
document.addEventListener("DOMContentLoaded", translate_page );
