<?php

/**
 * URL routing class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Controller_Router {

	/**
	 * All comic data.
	 */
	private $comic_data;
	private $comic_dir;

	/**
	 * Fire the constructor up :)
	 */
	public function __construct() {

		// Get all comic data
		$this->access_data = new ComicJet_Model_Access_Data();
		$this->comic_data = $this->access_data->_get_comic_data();

		// Get the URI
		$uri = urldecode(
			parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH )
		);
		$uri_chunks = explode( '/', $uri );
		$chunk_count = count( $uri_chunks );

		/**
		 * Redirecting to https.
		 */
		if ( ! $this->_is_https() ) {
			$url = COMICJET_URL . $uri;
			header( 'Location: ' . $url, true, 302 );
			exit;
		}

		/**
		 * Add / to end of all URLs.
		 */
		if ( '' != $uri_chunks[$chunk_count - 1] ) {
			$url = COMICJET_URL . $uri . '/';
			header( 'Location: ' . $url, true, 302 );
			exit;
		}

		/*
		 * Home page.
		 * eg: domain/
		 */
		if ( 2 == $chunk_count ) {
			$url = COMICJET_URL . $uri . 'en/nb/';
			header( 'Location: ' . $url, true, 302 );
			exit;
		}

		/*
		 * Invalid URL.
		 * eg: domain/page/ || domain/lang1/lang2/comic/5/bla/
		 */
		if ( 3 == $chunk_count || 6 < $chunk_count ) {
			new ComicJet_Views_Init( '404' );
		}

		/*
		 * Home or static page.
		 * eg: domain/en/nb/ or domain/about/en/
		 */
		if ( 4 == $chunk_count ) {
			$translate = new ComicJet_Model_Translate;

			if ( array_key_exists( $uri_chunks[1], $translate->languages ) && array_key_exists( $uri_chunks[2], $translate->languages ) ) {
				$lang1 = $uri_chunks[1];
				$lang2 = $uri_chunks[2];
				new ComicJet_Views_Init( 'home', array( 'lang1' => $lang1, 'lang2' => $lang2 ) );
			} elseif ( array_key_exists( $uri_chunks[1], $translate->languages ) && ! array_key_exists( $uri_chunks[2], $translate->languages ) ) {
				new ComicJet_Views_Init( 'static' );
			} else {
				new ComicJet_Views_Init( '404' );
			}
		}

		/*
		 * Load a comic.
		 * eg: domain/lang1/lang2/name/ || domain.com/lang1/lang2/name/number
		 */
		if ( 4 < $chunk_count ) {
			$lang1 = $uri_chunks[1];
			$lang2 = $uri_chunks[2];
			$comic_slug = $uri_chunks[3];

			// Get the current comic directory (required because folder structure is in English, but page URLs are not)
			foreach ( $this->comic_data as $key => $comic ) {
				if ( $comic_slug == $comic['slug'][$lang1] ) {
					$comic_dir = $comic['slug']['en'];
				}
			}

			// Grab the current page number
			if ( 6 == $chunk_count ) {
				if ( ctype_digit( (string) $uri_chunks[4] ) ) {
					$page_number = (string) $uri_chunks[4];
				} else {
					new ComicJet_Views_Init( '404' );
				}
			} else {
				$page_number = '1'; // When no number specified, then we default to 1
			}

			// Output comic if it exists, otherwise 404
			$file1 = COMICJET_DIR . 'assets/' . $comic_dir . '/' . $page_number . '-' . $lang1;
			$file2 = COMICJET_DIR . 'assets/' . $comic_dir . '/' . $page_number . '-' . $lang2;
			if (
				( file_exists( $file1 . '.jpg' ) && file_exists( $file2 . '.jpg' ) )
				||
				( file_exists( $file1 . '.png' ) && file_exists( $file2 . '.png' ) )
			) {

				// If page number 1 is specified, then redirect to that comics' root URL
				if ( '1' == $page_number && 6 == $chunk_count ) {
					$url = COMICJET_URL . '/' . $lang1 . '/' . $lang2 . '/' . $comic_slug . '/';
					header( 'Location: ' . $url, true, 302 );
				}

				// Finally, output the comic :)
				new ComicJet_Views_Init( 'comic', array( 'comic_dir' => $comic_dir, 'comic_slug' => $comic_slug, 'lang1' => $lang1, 'lang2' => $lang2, 'page_number' => $page_number ) );

			} else {
				new ComicJet_Views_Init( '404' );
			}

		}

	}

	/**
	 * Check if is https URL.
	 *
	 * @return  bool  True if is https
	 */
	private function _is_https(){
		if ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) || $_SERVER['SERVER_PORT'] == 443 ) {
		    return true;
		} 
		else {
		    return false;
		}
	}

}
