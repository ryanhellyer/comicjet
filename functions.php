<?php

/**
 * ComicJet - Bootstrap
 *
 * @package  ComicJet
 * @author   Ryan Hellyer <ryanhellyer@gmail.com>
 */


function esc_url( $url ) {
	return $url;
}

function esc_html( $html ) {
	return $html;
}

function esc_attr( $attribute ) {
	return $attribute;
}

/**
 * Set correct URL file extensions.
 *
 * @param  string  $url  The URL
 * @return string  $url  The fixed URL
 */
function comicjet_convert_file_extension( $url ) {
	$file = str_replace( COMICJET_ASSETS_URL, COMICJET_DIR . 'assets', $url );

	$file = substr_replace( $file, '.jpg', -4 );
	if ( file_exists( $file ) ) {
		$url = substr_replace( $url, '.jpg', -4 );
	}

	$file = substr_replace( $file, '.png', -4 );
	if ( file_exists( $file ) ) {
		$url = substr_replace( $url, '.png', -4 );
	}

	return $url;
}
