<?php

/**
 * Translation class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Model_Translate {

	/**
	 * Available languages.
	 */
	public $languages = array(
		'en' => 'English',
		'de' => 'Deutsch',
	);

	/**
	 * Massive list of translated strings.
	 *
	 * @access private
	 */
	private $translations = array(
		0 => array(
			'en' => 'About',
			'de' => 'Etwa',
		),
		1 => array(
			'en' => 'I speak',
			'de' => 'Ich spreche',
		),
	);

	/**
	 * Fire the constructor up :)
	 */
	public function __construct( $lang1 = NULL, $lang2 = NULL ) {
		$this->lang1 = $lang1;
		$this->lang2 = $lang2;
	}

	/**
	 * Translate strings.
	 *
	 * @param  string  $string  The string to be translated
	 * @return string  The language was translated, so giving up and spitting out original string
	 */
	public function convert( $string ) {

		// Loop through every string
		foreach ( $this->translations as $key => $translation ) {

			// Loop through every translation of that string
			foreach ( $translation as $lang => $translated_string ) {			

				// If string matches current translated string
				if ( $string == $translated_string && $lang == $this->lang2 ) {

					// If translation exists, spit it out
					if ( isset( $translation[$this->lang1] ) ) {
						return $translation[$this->lang1];
					}
				}
			}
		}

		return $string;
	}

}
