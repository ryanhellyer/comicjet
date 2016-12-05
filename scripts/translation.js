/**
 * Set translation strings.
 */
function translate_page() {

    // Set every translation string
    var translation_strings = [
        {
            "id":"copyright",
            "en":"Copyright",
            "de":"Copyright",
        },
        {
            "id":"legal-notice",
            "en":"Legal Notice",
            "de":"Impressum (auf Englisch)",
        },
        {
            "id":"site-title",
            "en":"Learn German from comics",
            "de":"Englisch lernen von Comics",
            "when":"home",
        },
        {
            "id":"creation",
            "en":"A creation of",
            "de":"Eine kreation von",
        },
        {
            "id":"scroll-to-top",
            "en":"To top",
            "de":"Nach oben",
            "when":"comic",
        },
        {
            "id":"language-selector-text",
            "en":"Select a language to learn",
            "de":"Wählen Sie eine Sprache zum Lernen",
            "when":"home",
        }
/*          NEEDS TO USE CLASS SO THAT CAN BE SHOWN ON ALL COMIC PAGES AT ONCE 
        {
            "id":"tutorial-click-to-change",
            "en":"Click the comic to change it's language",
            "de":"Klick auf den Comic für Deutsch",
        },
        {
            "id":"tutorial-click-to-revert",
            "en":"Click the comic to revert back to the original language",
            "de":"Klick den comic für die Ausgangssprache",
        }
        */
    ];

    for (i = 0; i < translation_strings.length; i+= 1) {

        var id = translation_strings[i]["id"];
        var when = translation_strings[i]["when"];

        if ( typeof when == "undefined" || get_page_type() == when ) {

            var element = document.getElementById(id);
            if ( element && typeof element.innerHTML != "undefined" && element.innerHTML != "") {
                element.innerHTML = translation_strings[i][get_primary_language()];
            } else if ( element && typeof element.value != "undefined" && element.value != "") {
                element.value = translation_strings[i][get_primary_language()];
            }
        }

    }

}
document.addEventListener("DOMContentLoaded", translate_page );
