
		<h1 id="site-title">Learn languages from comics</h1>

		<form id="comic-type" name="comic-type" method="post" action="">

			<label>I speak</label>
			<select id="language1" name="language1"><?php
			$lang1 = 'en';
			foreach ( $this->languages as $lang => $language_name ) {

				if ( isset( $this->lang1 ) && $lang == $this->lang1 ) {
					$selected = 'selected="selected" ';
					$lang1 = $lang;
				} else {
					$selected = '';
				}

				echo '
				<option ' . $selected . 'value="' . esc_attr( $lang ) . '">' . esc_html( $language_name ) . '</option>';
			}
			?>

			</select>

			<span></span>

			<label>I want to learn</label>
			<select id="language2" name="language2"><?php

			$selected = '';
			foreach ( $this->languages as $lang => $language_name ) {

				if ( isset( $this->lang2 ) && $lang == $this->lang2 ) {
					$selected = 'selected="selected" ';;
				} else {
					$selected = '';
				}

				echo '
				<option ' . $selected . 'value="' . esc_attr( $lang ) . '">' . esc_html( $language_name ) . '</option>';

				$done = true;
			}
			?>

			</select>

			<span></span>

			<input type="submit" id="select-language" name="select-language" value="Start learning&nbsp; &gt;" />
		</form>

		<div id="comic-selection"><?php

		// Get all comic data
		$this->access_data = new ComicJet_Model_Access_Data();
		$comic_data = $this->access_data->_get_comic_data( $this->lang1, $this->lang2 );
		foreach ( $comic_data as $key => $comic ) {
			$link_url = COMICJET_URL . '/' . $this->lang1 . '/' . $this->lang2 . '/' . $comic['slug'][$this->lang1] . '/';
			$image_url = COMICJET_ASSETS_URL . '/' . $comic['slug']['en'] . '/thumbnail-' . $this->lang1 . '.jpg';
			$image_url = comicjet_convert_file_extension( $image_url );

			echo '
			<div class="block" id="comic-' . esc_attr( $comic['slug'][$this->lang1] ) . '">
				<a href="' . esc_url( $link_url ) . '" class="block-inner">
					<img src="' . esc_url( $image_url) . '" />
					<p>' . esc_html( $comic['title'][$this->lang1] ) . '</p>
				</a>
			</div>';

		}
		?>

		</div>

<?php

/**
 * Add scripts.
 */

$script_vars['text_comic_slug'] = 'comic';
$script_vars['text_already_read'] = 'Already read';
$script_vars['text_reading'] = 'Reading';
$script_vars['comicjet_language1'] = 'en';
$script_vars['comicjet_language2'] = 'de';
$script_vars['comicjet_root_url'] = COMICJET_URL;

$scripts[] = 'cookie-functions.js';
$scripts[] = 'language-selector.js';
$scripts[] = 'read-reading.js';
$scripts[] = 'arrow-key-support.js';
