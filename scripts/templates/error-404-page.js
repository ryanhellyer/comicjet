
function error_404_page() {
    document.getElementById("site-title").innerHTML = "404 Error";
    var content_area = "<img src='" + home_url + "/images/404.png' />";
    document.getElementById("page-content").innerHTML = content_area;

    // Remove home button if it exists (only needed on comic pages)
    var home_button = document.getElementById( "home" );
    if ( null !== home_button ) {
        home_button.parentNode.removeChild(home_button);
    }

    replace_body_class( "error-404" );

    clean_non_comic_pages();
}
