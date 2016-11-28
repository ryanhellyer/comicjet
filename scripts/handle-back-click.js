/**
 * If back button is hit, we still need the page to refresh.
 * To solve this, we simply check if the window location has changed recently, and if so, we refresh the page content again.
 */
var location_on_page_load = window.location.href;
setInterval(
    function(){
        if ( window.location.href != location_on_page_load ) {
            location_on_page_load = window.location.href;
            if ( window.location.hash == "" ) { // We don't want to refesh the page everytime someone goes back from a #
            	console.log('bang');
            	refresh_page_content();
        	}
        }
    },
    500
);
