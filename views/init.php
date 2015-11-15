<?php

/**
 * Views class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Views_Init {

	public $comic_name;

	/**
	 * Fire the constructor up :)
	 */
	public function __construct( $template, $args = array() ) {
		$this->_check_template( $template );
		$this->access_data = new ComicJet_Model_Access_Data();

		foreach ( $args as $key => $arg ) {
			$this->$key = $arg;
		}

		// Loading translations (use defaults if languages not available)
		$lang1 = 'en';
		if ( isset( $this->lang1 ) ) {
			$lang1 = $this->lang1;
		}
		$lang2 = 'de';
		if ( isset( $this->lang2 ) ) {
			$lang2 = $this->lang2;
		}
		$this->translate = $translate = new ComicJet_Model_Translate( $lang1, $lang2 );

		// Generate image URLs
		if ( isset( $this->comic_dir ) && isset( $this->page_number )  && isset( $this->lang1 )  && isset( $this->lang2 ) ) {

			$image_url_lang1 = COMICJET_ASSETS_URL . '/' . $this->comic_dir . '/' . $this->page_number . '-' . $this->lang1 . '.jpg';
			$image_url_lang1 = comicjet_convert_file_extension( $image_url_lang1 );

			$image_url_lang2 = COMICJET_ASSETS_URL . '/' . $this->comic_dir . '/' . $this->page_number . '-' . $this->lang2 . '.jpg';
			$image_url_lang2 = comicjet_convert_file_extension( $image_url_lang2 );
		}

		ob_start();
		$script_vars = $scripts = array();
		$scripts[] = 'cookie-functions.js';
		$scripts[] = 'hide-tutorial.js';
		require( 'header.php' );
		define( 'COMICJET_HEADER_TIMER', ( 1000 * ( microtime( true ) - COMICJET_TIMER ) ) );
		require( $template . '.php' );

		define( 'COMICJET_FOOTER_TIMER', ( 1000 * ( microtime( true ) - COMICJET_TIMER ) ) );
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
		$translate = $this->translate;

		if ( $this->_get_previous_url() ) {
			$link = '<a href="' . esc_url( $this->_get_previous_url() ) . '">' . esc_html( $translate->convert( 'Previous' ) ) . '</a>';
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

		$file_path = COMICJET_ASSETS_DIR . '/' . $this->comic_dir . '/' . ( $this->page_number + 1 ) . '-' . $this->lang1 . '.jpg';

		$file_path = COMICJET_ASSETS_DIR . '/' . $this->comic_dir . '/' . ( $this->page_number + 1 ) . '-' . $this->lang1 . '.';
		if ( file_exists( $file_path . 'jpg' ) || file_exists( $file_path . 'png' ) ) {
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
		$translate = $this->translate;

		if ( $this->_get_next_url() ) {
			$link = '<a href="' . esc_url( $this->_get_next_url() ) . '">' . esc_html( $translate->convert( 'Next' ) ) . '</a>';
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
			$title = $this->access_data->_get_comic_title( $this->lang1, $this->comic_dir ) . ' - ' . $title;
		}

		return $title;
	}

	/**
	 * Outputting the footer JavaScript.
	 *
	 * @param  array  $script_vars  Script variables
	 * @param  array  $scripts      Script SRC's
	 * @param  string $script       The HTML output
	 * @access private
	 */
	private function scripts( $script_vars, $scripts ) {
		$script = '';

		/**_
		 * Add script vars.
		 */
		if ( isset( $script_vars ) && is_array( $script_vars ) ) {
			$script .= "<script>\n";
			foreach( $script_vars as $var => $value ) {
				$script .= '	var ' . $var . ' = "' . $value . "\";\n";
			}
			$script .= '</script>';
		}

		/**
		 * Add scripts.
		 */
		if ( isset( $scripts ) && is_array( $scripts ) && ! defined( 'COMICJET_COMPRESS_HTML' ) ) {
			foreach( $scripts as $var => $file ) {
				$script .= "\n";
				$script .= '<script src="' . esc_url( COMICJET_ASSETS_URL . '/scripts/' . $file ) . '"></script>';
			}
		} elseif ( isset( $scripts ) && is_array( $scripts ) && defined( 'COMICJET_COMPRESS_HTML' ) ) {

			// Generate a hash representing the scripts
			$script_blob = '';
			foreach( $scripts as $var => $file ) {
				$file_path = COMICJET_ASSETS_DIR . '/scripts/' . $file;
				$time = filemtime( $file_path );
				$script_blob .= $time . $file;
			}
			$hash = md5( json_encode( $script_blob ) );

			// If filename matching hash doesn't exist, then make it.
			$hash_file = COMICJET_ASSETS_DIR . '/cache/' . $hash . '.js';
			if ( ! file_exists( $hash_file ) ) {

				// Combine all of the files together
				$concatenated_file_contents = '';
				foreach( $scripts as $var => $file ) {
					$concatenated_file_contents .= file_get_contents( COMICJET_ASSETS_DIR . '/scripts/' . $file );
				}
				$hash = md5( json_encode( $scripts ) );
				$concatenated_file_contents = str_replace( "\t", '', $concatenated_file_contents );
				$concatenated_file_contents = str_replace( "\n", '', $concatenated_file_contents );
				file_put_contents( $hash_file, $concatenated_file_contents );

			}

			$script .= '<script src="' . esc_url( COMICJET_ASSETS_URL . '/cache/' . $hash . '.js' ) . '"></script>';			
		}

		return $script;
	}

}
