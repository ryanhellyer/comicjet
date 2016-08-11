<?php

$base_url = 'http://dev.comicjet.com/';
$base_path = '/srv/www/dev.comicjet.com/';

require( 'minify.php' );

/**
 * Minifying and concatenating JS.
 */
$scripts = array(
	'functions.js',
	'load-comic.js',
	'clicks.js',
	'templates/home-page.js',
	'templates/error-404-page.js',
	'templates/legal-notice-page.js',
	'templates/root-page.js',
	'translation.js',
	'init.js',
);
$script_path = $base_path . 'scripts/';

$combined_scripts = '
var home_url = "' . $base_url . '";
';
foreach ( $scripts as $script ) {
	$combined_scripts .= file_get_contents( $script_path . $script );
}
$minified_script = minify_js( $combined_scripts );
file_put_contents( $base_path . 'public/minified.js', $minified_script );

/**
 * Minifying CSS.
 */
$css = file_get_contents( 'style.css' );
$minified_css = minify_css( $css );
file_put_contents( $base_path . 'public/minified.css', $minified_css );


/**
 * Minify HTML.
 */
ob_start();
?><!DOCTYPE html>
<html lang="en_US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<title>Comic Jet</title>
	<link rel="stylesheet" href="<?php echo $base_url; ?>minified.css" type="text/css" media="all" />
</head>
<body class="comic">

<header id="site-header">
	<h1>
		<a id="header-link" href="<?php echo $base_url; ?>">Comic Jet! 
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
	<div id="primary-menu"></div>
<?php
/*
	<nav id="primary-menu">
		<ul>
			<li primary-language="en" secondary-language="de"><a href="">English</a></li>
			<li primary-language="de" secondary-language="en"><a href="">Deutsch</a></li>
		</ul>
	</nav>
*/
?>

</header>

<div id="wrap">
	<div class="inner">
		<div class="content">
			<h1 id="site-title"><noscript>Comic Jet requires JavaScript.</noscript></h1>
			<div id="page-content">
				<noscript>
					<div id="static-page">
						<p>
							Please enable JavaScript in your browser and reload this page to continue.
						</p>
					</div>
				</noscript>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		<span id="copyright">Copyright</span> &copy; 2016 <a id="footer-link" href="<?php echo $base_url; ?>">Comic Jet</a>. <span id="creation">A creation of</span> <a href="https://geek.hellyer.kiwi/">Ryan Hellyer</a>
		<a id="legal-notice" href="<?php echo $base_url; ?>legal-notice/" class="alignright">Legal Notice</a>
	</p>
</footer>

<script src="<?php echo $base_url; ?>minified.js"></script>

</body>
</html><?php

$html = ob_get_contents();
$minified_html = minify_html( $html );
file_put_contents( $base_path . 'public/index.html', $minified_html );
					file_put_contents( $base_path . 'public/index.html', $html );
ob_end_clean();
