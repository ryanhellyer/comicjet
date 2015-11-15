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

		$xkcd_credits = array(
			'en' => 'Thanks to <a href="http://xkcd.com/">XKCD</a> for this comic. This work is licensed under a <a href="http://creativecommons.org/licenses/by-nc/2.5/">Creative Commons Attribution-NonCommercial 2.5 License</a>.',
			'de' => 'Thanks to <a href="http://xkcd.com/">XKCD</a> for this comic and <a href="http://xkcde.dapete.net/">xkcde.dapete.net</a> for the German translation. This work is licensed under a <a href="http://creativecommons.org/licenses/by-nc/2.5/">Creative Commons Attribution-NonCommercial 2.5 License</a>.',
		);

		$data = array(
			0 => array(
				'slug' => array(
					'en' => 'tutorial',
					'de' => 'lernprogramm',
				),
				'title' => array(
					'en' => 'Tutorial',
					'de' => 'Lernprogramm',
				),
				'credits' => array(
					'en' => 'This is comic is based on work by <a href="http://xkcd.com/">XKCD</a>. This work is licensed under a <a href="http://creativecommons.org/licenses/by-nc/2.5/">Creative Commons Attribution-NonCommercial 2.5 License</a>.',
					'de' => '(String needs translated) This is comic is based on work by <a href="http://xkcd.com/">XKCD</a>. This work is licensed under a <a href="http://creativecommons.org/licenses/by-nc/2.5/">Creative Commons Attribution-NonCommercial 2.5 License</a>.',
				),
			),
			5 => array(
				'slug' => array(
					'en' => 'the-red-hall',
					'de' => 'der-rote-saal ',
				),
				'title' => array(
					'en' => 'The Red Hall',
					'de' => 'Der Rote Saal',
				),
			),
			10 => array(
				'slug' => array(
					'en' => 'xkcd1',
					'de' => 'xkcd1',
				),
				'title' => array(
					'en' => 'XKCD #1',
					'de' => 'XKCD #1',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
			),
			15 => array(
				'slug' => array(
					'en' => 'shadowdancers',
					'de' => 'schattentänzer',
				),
				'title' => array(
					'en' => 'Shadowdancers',
					'de' => 'Schattentänzer',
				),
			),
			20 => array(
				'slug' => array(
					'en' => 'xkcd2',
					'de' => 'xkcd2',
				),
				'title' => array(
					'en' => 'XKCD #2',
					'de' => 'XKCD #2',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
			),
			25 => array(
				'slug' => array(
					'en' => 'the-tower-in-the-sky',
					'de' => 'der-turm-im-himmel',
				),
				'title' => array(
					'en' => 'The tower in the sky',
					'de' => 'Der Turm im Himmel',
				),
			),
			30 => array(
				'slug' => array(
					'en' => 'xkcd3',
					'de' => 'xkcd3',
				),
				'title' => array(
					'en' => 'XKCD #3',
					'de' => 'XKCD #3',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
			),
			35 => array(
				'slug' => array(
					'en' => 'the-letter-of-jael-bara',
					'de' => 'der-brief-der-jael-bara ',
				),
				'title' => array(
					'en' => 'The letter of Jael Bara',
					'de' => 'Der brief der Jael Bara',
				),
			),
			40 => array(
				'slug' => array(
					'en' => 'xkcd4',
					'de' => 'xkcd4',
				),
				'title' => array(
					'en' => 'XKCD #4',
					'de' => 'XKCD #4',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
			),
			45 => array(
				'slug' => array(
					'en' => 'breaking-all-barriers',
					'de' => 'alle-schranken-fallen',
				),
				'title' => array(
					'en' => 'Breaking all barriers',
					'de' => 'Alle Schranken fallen',
				),
			),
			50 => array(
				'slug' => array(
					'en' => 'xkcd5',
					'de' => 'xkcd5',
				),
				'title' => array(
					'en' => 'XKCD #5',
					'de' => 'XKCD #5',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
			),
		);

		/* Pulls data directly from disk 
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
		*/

		return $data;
	}

	/**
	 * Get comic data for a single comic.
	 *
	 * @param   string $comic  The comic slug
	 * @return  array  $data   All comic data
	 */
	public function _get_single_comic_data( $comic ) {

		$data = array();
		$all_data = $this->_get_comic_all_data();
		foreach ( $all_data as $key => $comic_data ) {
			foreach ( $comic_data['slug'] as $lang => $string ) {
				if ( $comic == $string ) {
					$data = $comic_data;
					break;
				}
			}
		}

		/* Access data directly from disk
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
		*/

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

	/**
	 * Get the comic credit text.
	 *
	 * @param  string  $lang       The language
	 * @param  string  $comic_dir  The comic directory
	 * @return string  $title      The comic title
	 */
	public function _get_credits( $lang, $comic_dir ) {
		$data = $this->_get_single_comic_data( $comic_dir );

		if ( isset( $data['credits'][$lang] ) ) {
			$title = $data['credits'][$lang];
		} else {
			$title = '';
		}

		return $title;
	}

}
