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
            "id":"home",
            "en":"Home",
            "de":"Start",
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
        },
        {
            "class":"tutorial-click-to-change",
            "en":"Click the comic to change it's language",
            "de":"Klick auf den Comic für Deutsch",
        },
        {
            "class":"tutorial-click-to-revert",
            "en":"Click the comic to revert back to the original language",
            "de":"Klick den comic für die Ausgangssprache",
        }
    ];

    for (translation_counter = 0; translation_counter < translation_strings.length; translation_counter+= 1) {

        var when = translation_strings[translation_counter]["when"];

        if ( typeof when == "undefined" || get_page_type() == when ) {
            var id = translation_strings[translation_counter]["id"];
            var class_name = translation_strings[translation_counter]["class"];

            if ( undefined != class_name ) {
                var elements = document.getElementsByClassName(class_name);
            } else {
                var element = document.getElementById(id);
                var elements = [element];
            }

            // Loop through all elements
            for (trans_el_counter = 0; trans_el_counter < elements.length; trans_el_counter++) { 
                
                element = elements[trans_el_counter];
                if ( element && typeof element.innerHTML != "undefined" && element.innerHTML != "") {
                    element.innerHTML = translation_strings[translation_counter][get_primary_language()];
                } else if ( element && typeof element.value != "undefined" && element.value != "") {
                    element.value = translation_strings[translation_counter][get_primary_language()];
                }

            }

        }

    }

}
document.addEventListener("DOMContentLoaded", translate_page );
