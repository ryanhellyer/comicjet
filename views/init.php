<?php

/**
 * Views class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Views_Init extends ComicJet_Model_Translate {

	public $comic_name;

	/**
	 * Fire the constructor up :)
	 */
	public function __construct( $template, $args = array() ) {
		$this->_check_template( $template );

		foreach ( $args as $key => $arg ) {
			$this->$key = $arg;
		}

		// Generate image URLs
		if ( isset( $this->comic_dir ) && isset( $this->page_number )  && isset( $this->lang1 )  && isset( $this->lang2 ) ) {
			$image_url_lang1 = COMICJET_ASSETS_URL . '/' . $this->comic_dir . '/' . $this->page_number . '-' . $this->lang1 . '.jpg';
			$image_url_lang2 = COMICJET_ASSETS_URL . '/' . $this->comic_dir . '/' . $this->page_number . '-' . $this->lang2 . '.jpg';			
		}

		ob_start();
		require( 'header.php' );
		require( $template . '.php' );
		require( 'footer.php' );
		$page_html = ob_get_contents();
		$page_html = $this->_compress_html( $page_html );
		ob_end_clean();
		echo $page_html;

		exit;
	}

	/**
	 * Compressing the HTML.
	 *
	 * @param  string  $template  The template name
	 * @return string  The template name
	 * @access private
	 */
	private function _compress_html( $html ) {

		// Bail out if HTML compression not turned on
		if ( ! defined( 'COMICJET_COMPRESS_HTML' ) ) {
			return $html;
		}

		$html = str_replace( "\n", '', $html );
		$html = str_replace( "\t", '', $html );
		return $html;
	}

	/**
	 * Checking the template name.
	 * If the template does not exist, then defaults to 404.
	 * This should always return it's input, unless something went horridly wrong.
	 *
	 * @param  string  $template  The template name
	 * @return string  The template name
	 * @access private
	 */
	private function _check_template( $template ) {

		if ( ! file_exists( COMICJET_DIR . '/views/' . $template . '.php' ) ) {
			$template = '404';
		}

		return $template;
	}

	/**
	 * Get data about the comic.
	 *
	 * @param  string  $comic_dir  The comic directory
	 * @return array   $data       The comic data
	 * @access private
	 */
	private function _get_comic_data( $comic_dir ) {
		$assets_dir = COMICJET_DIR . 'assets/';
		$file_path = $assets_dir . $comic_dir . '/' . $comic_dir . '.data';

		$data = array();
		if ( file_exists( $file_path ) ) {
			$data_json = file_get_contents( $file_path );
			$data = json_decode( $data_json, true );
		}

		return $data;
	}

	/**
	 * Get the comic title.
	 *
	 * @param  string  $comic_dir  The comic directory
	 * @return string  $title      The comic title
	 * @access private
	 */
	private function _get_comic_title( $comic_dir ) {
		$data = $this->_get_comic_data( $comic_dir );

		if ( isset( $data['title'][$this->lang1] ) ) {
			$title = $data['title'][$this->lang1];
		} else {
			$title = '';
		}

		return $title;
	}

	/**
	 * Get the previous URL.
	 *
	 * @return  string  $url  The previous URL
	 * @access private
	 */
	private function _get_previous_url() {
		$url = '';

		if ( 1 != $this->page_number ) {
			$start_of_url = COMICJET_URL . '/' . $this->lang1 . '/' . $this->lang2 . '/' . $this->comic_slug . '/';
			if ( 2 == $this->page_number ) {
				$url = $start_of_url;
			} else {
				$url = $start_of_url . ( $this->page_number - 1 );
			}

		}

		return $url;
	}

	/**
	 * Get the previous link.
	 *
	 * @return  string  $link  The previous link
	 * @access private
	 */
	private function _get_previous_link() {
		$link = '';

		if ( $this->_get_previous_url() ) {
			$link = '<a href="' . esc_url( $this->_get_previous_url() ) . '">' . esc_html( 'Previous'  /*$this->translate( 'Previous' )*/ ) . '</a>';
		}

		return $link;
	}

	/**
	 * Get the next URL.
	 *
	 * @return  string  $url  The next URL
	 * @access private
	 */
	private function _get_next_url() {
		$url = '';

		$file_path = COMICJET_DIR . 'assets/' . $this->comic_dir . '/' . ( $this->page_number + 1 ) . '-' . $this->lang1 . '.jpg';
		if ( file_exists( $file_path ) ) {
			$url = COMICJET_URL . '/' . $this->lang1 . '/' . $this->lang2 . '/' . $this->comic_slug . '/' . ( $this->page_number + 1 ) . '/';
			$link = '<a href="' . esc_url( $url ) . '">' . esc_html( 'Next'  /*$this->translate( 'Previous' )*/ ) . '</a>';
		}

		return $url;
	}

	/**
	 * Get the next link.
	 *
	 * @return  string  $link  The next link
	 * @access private
	 */
	private function _get_next_link() {
		$link = '';

		if ( $this->_get_next_url() ) {
			$link = '<a href="' . esc_url( $this->_get_next_url() ) . '">' . esc_html( 'Next'  /*$this->translate( 'Previous' )*/ ) . '</a>';
		}

		return $link;
	}

	/**
	 * Get home URL.
	 * Provides correct home URL based on current language selections.
	 *
	 * @return  string  $url  The home URL
	 * @access private
	 */
	private function _get_home_url() {
		if ( isset( $this->lang1 ) && isset( $this->lang2 ) ) {
			$url = COMICJET_URL . '/' . $this->lang1 . '/' . $this->lang2 . '/';
		} else {
			$url = COMICJET_URL . '/';
		}

		return $url;
	}

	/**
	 * Get the current page title.
	 *
	 * @return  string  $title  The page title
	 * @access private
	 */
	private function _get_page_title() {
		$title = 'Comic Jet';

		// Add comic title to page title
		if ( isset( $this->comic_dir ) ) {
			$title = $this->_get_comic_title( $this->comic_dir ) . ' - ' . $title;
		}

		return $title;
	}

}
