<?php

$base_url = 'https://dev.comicjet.com/';

?><!DOCTYPE html>
<html lang="en_US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<title>The Red Hall - Comic Jet</title>
	<link rel="stylesheet" href="<?php echo $base_url; ?>style.css" type="text/css" media="all" />
</head>
<body class="comic">

<header id="site-header">
	<h1>
		<a href="<?php echo $base_url; ?>en/de/">Comic Jet! 
					<small style="
						display: inline-block;
						text-shadow: none;
						-webkit-text-stroke-width: 0.3px;
						-webkit-text-stroke-color: #aa5500;
						text-stroke-width: 0;
						border:none;
						position: relative;
						font-weight: bold;
						letter-spacing:0;
						font-size:24px;
						color: #ffcc00;
						font-family:sans-serif;
						position: relative;
						top: -10px;
						text-transform: lowercase;
					">
							beta
					</small>
		</a>
	</h1>

	<nav id="primary-menu">
		<ul>
			<li primary-language="en" secondary-language="de"><a href="">English</a></li>
			<li primary-language="de" secondary-language="en"><a href="">Deutsch</a></li>
		</ul>
	</nav>

</header>

<div id="wrap">
	<div class="inner">
		<div class="content">
			<h1 id="site-title"></h1>
			<ol id="comic"></ol>
		</div>
	</div>
</div>

<footer>
	<p>
		Copyright &copy; 2016 Comic Jet.
	</p>
</footer>

<script src="<?php echo $base_url; ?>scripts/functions.js"></script>
<script src="<?php echo $base_url; ?>scripts/infinite-scroll.js"></script>
<script src="<?php echo $base_url; ?>scripts/clicks.js"></script>
<script src="<?php echo $base_url; ?>scripts/home-page.js"></script>

<script>

/**
 * Set available languages and comics.
 */
var available_languages = ["en","de"];
var comics = [
	{
		name:{'en':'The Red Hall','de':'Der Rote Saal'},
		slug:{'en':'the-red-hall','de':'der-rote-saal'},
		pages:4
	},
	{
		name:{'en':'Shadow dancers','de':'Dhadow danzers de'},
		slug:{'en':'shadowdancers','de':'dhadow-danzers-de'},
		pages:4
	},
];


var home_url = '<?php echo $base_url; ?>';
var comics_folder_url = window.location.origin + '/comics/';


/**
 * Work out which languages we're on.
 */
var current_url = window.location.pathname.split( '/' );
if ( '-1' != available_languages.indexOf(current_url[1]) ) {
	var primary_language = current_url[1];
}
if ( '-1' != available_languages.indexOf(current_url[2]) ) {
	var secondary_language = current_url[2];
}


/**
 * Work out which comic we're on.
 */
var current_slug = current_url[3];
for (i = 0; i < comics.length; i++) { 
	slugs = comics[i].slug;
	slug = slugs[primary_language];
	if ( current_slug == slug ) {
		var comic_slug = slug;
		var comic = comics[i];
	}
}


if ( '/' == window.location.pathname ) {
	home_page();
	console.log( 'HOME PAGE!' );
} else if ( '/'+primary_language+'/'+secondary_language+'/' == window.location.pathname ) { /********* Should be comparing to "available_languages" *********/
	home_page();
	console.log( 'en/de')
} else if (undefined == comic) {
	alert('404');
} else {
	document.addEventListener("DOMContentLoaded", Class_Scroll );
	refresh_content();
}
</script>

</body>
</html>