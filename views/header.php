<!DOCTYPE html>
<html lang="en_US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<title><?php echo esc_html( $this->_get_page_title() ); ?></title>
	<link rel="stylesheet" href="<?php echo COMICJET_ASSETS_URL; ?>/style.css" type="text/css" media="all" /><?php
	if ( defined( 'COMICJET_ANALYTICS' ) ) {
		echo "
	<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', '" . COMICJET_ANALYTICS . "', 'auto');
	ga('send', 'pageview');
	</script>";
	}
	?>

</head>
<body class="<?php echo esc_attr( $template ); ?>">

<header id="site-header">
	<h1>
		<a href="<?php echo $this->_get_home_url(); ?>">Comic Jet! 
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

	<nav id="primary">
		<ul>
			<li id="tutorial"><a href="<?php echo COMICJET_URL; ?>/en/de/tutorial/">Learn how it works</a></li>
		</ul>
	</nav>
</header>

<div id="wrap">
	<div class="inner">
		<div class="content">
