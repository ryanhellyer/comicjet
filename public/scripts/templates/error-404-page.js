
function error_404_page() {
	page_type = '404';

	document.getElementById('site-title').innerHTML = '404 Error';

	var content_area = '<img src="' + home_url + '/images/404.png" />';

	document.getElementById('page-content').innerHTML = content_area;

}
