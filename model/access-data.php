<?php

/**
 * Access data class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Model_Access_Data {

	/**
	 * Get comic data for all comics.
	 *
	 * @param   string $lang1  language 1
	 * @param   string $lang2  language 2
	 * @return  array  $data   All comic data
	 */
	public function _get_comic_all_data( $lang1 = NULL, $lang2 = NULL ) {
		$assets_dir = COMICJET_DIR . 'assets/';
		$items = scandir( $assets_dir );

		$all_data = array();
		foreach ( $items as $key => $comic ) {

			$file1 = $assets_dir . $comic . '/thumbnail-' . $lang1 . '.';
			$file2 = $assets_dir . $comic . '/thumbnail-' . $lang2 . '.';
			if (
				( file_exists( $file1 . 'png' ) || file_exists( $file1 . 'jpg' ) )
				&&
				( file_exists( $file2 . 'png' ) || file_exists( $file2 . 'jpg' ) )
			) {
				$data = $this->_get_single_comic_data( $comic );
				if ( ! empty( $data ) ) {
					$all_data[] = $data;
				}
			}

		}

		return $all_data;
	}

	/**
	 * Get comic data for a single comic.
	 *
	 * @param   string $comic  The comic slug
	 * @return  array  $data   All comic data
	 */
	public function _get_single_comic_data( $comic ) {
		$dir = COMICJET_DIR . 'assets/' . $comic;
		$file = $dir . '/' . $comic . '.data';

		$data = array();
		if ( file_exists( $file ) ) {
			$data_json = file_get_contents( $file );
			$decoded_data = json_decode( $data_json, true );
			$data = $decoded_data;
		}

		return $data;
	}

	/**
	 * Get the comic title.
	 *
	 * @param  string  $lang       The language
	 * @param  string  $comic_dir  The comic directory
	 * @return string  $title      The comic title
	 */
	public function _get_comic_title( $lang, $comic_dir ) {
		$data = $this->_get_single_comic_data( $comic_dir );

		if ( isset( $data['title'][$lang] ) ) {
			$title = $data['title'][$lang];
		} else {
			$title = '';
		}

		return $title;
	}

}
