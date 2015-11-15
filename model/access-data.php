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
	public function _get_comic_all_data() {
		$assets_dir = COMICJET_DIR . 'assets/';
		$items = scandir( $assets_dir );

		$all_data = array();
		foreach ( $items as $key => $comic ) {

			$file = $assets_dir . $comic . '/'. $comic . '.data';
			if ( file_exists( $file ) ) {
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
		$file = COMICJET_DIR . 'assets/' . $comic . '/' . $comic . '.data';
		$data = array();
		if ( file_exists( $file ) ) {
			$data_json = file_get_contents( $file );
			$data = json_decode( $data_json, true );
		} else {


			$all_comic_data = $this->_get_comic_all_data();
			foreach ( $all_comic_data as $key => $comic_data ) {
				foreach ( $comic_data['slug'] as $lang => $slug ) {
					if ( $slug == $comic ) {
						$comic = $comic_data['slug']['en']; // Grab English slug
						$file = COMICJET_DIR . 'assets/' . $comic . '/' . $comic . '.data';
						$data_json = file_get_contents( $file );
						$data = json_decode( $data_json, true );
					}
				}
			}

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
