function legal_notice_page() {
    document.getElementById("site-title").innerHTML = "Legal Notice";

   var content_area = '<div id="static-page"><h3>Personal Information</h3><p>Like most websites, we collect non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, Internet Protocol (IP) address, referring site, and the date and time of each visitor request. Our purpose in collecting non-personally identifying information is to better understand how our visitors use our website. From time to time, we may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of the website.</p><h3>Browser storage</h3><p>Browser storage allows a website to store information on a visitor’s computer. We use this to store information such as the last visited comic, last page read and whether the end of the comic has been reached previously.</p><h3>Contact information</h3><p><a href="https://ryan.hellyer.kiwi/contact/">Ryan Hellyer</a><br />Friedrichstraße 123<br />Berlin 10117<br />Germany<br /></p></div>';

    // Remove home button if it exists (only needed on comic pages)
    var home_button = document.getElementById( "home" );
    if ( null !== home_button ) {
        home_button.parentNode.removeChild(home_button);
    }

    document.getElementById("page-content").innerHTML = content_area;

    replace_body_class( "legal-notice" );

    clean_non_comic_pages();
}
