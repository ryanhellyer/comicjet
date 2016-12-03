function home_page() {

    document.getElementById("site-title").innerHTML = "Learn languages from comics";

    var content_area = '<div id="language-selector"><span id="language-selector-text">Select a language to learn</span> &nbsp; &#x25bc;<div id="language-selector-pulldown"><span class="select-language" id="learn-de">Learn German</span><span class="select-language" id="learn-en">Learn English</span></div></div><div id="comic-selection">';


    if(typeof get_primary_language()!="undefined") {
        for (i = 0; i < comics.length; i+= 1) {
            slugs = comics[i].slug;
            names = comics[i].name;
            name = names[get_primary_language()];
            var slug = slugs[get_primary_language()];

            var storageslug = slugs[get_primary_language()];
            var page_number = localStorage.getItem( storageslug );
            if ( null != page_number ) {
                page_number = "#" + page_number;
            } else {
                page_number = "";   
            }

            content_area = content_area + '<div class="block block-1" id="'+slug+'"><a id="comic-link-'+i+'" href="'+home_url+get_primary_language()+'/'+get_secondary_language()+'/'+slug+'/'+page_number+'" class="block-inner"><img id="'+slug+'" src="'+home_url+'comics/'+slugs["en"]+'/thumbnail-en.jpg" /><p>'+name+'</p></a></div>';
        }
    }

    content_area = content_area + '</div>';

    document.getElementById("page-content").innerHTML = content_area;

    replace_body_class( "home" );

    clean_non_comic_pages();
}
