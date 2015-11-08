
		<h1 id="site-title">Learn languages from comics</h1>

		<form id="comic-type" name="comic-type" method="post">

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
			<select id="language2" name="language1"><?php

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
		$comic_data = $this->access_data->_get_comic_data();
		foreach ( $comic_data as $key => $comic ) {
			$link_url = COMICJET_URL . '/' . $this->lang1 . '/' . $this->lang2 . '/' . $comic['slug'][$this->lang1] . '/';
			$image_url = COMICJET_ASSETS_URL . '/' . $comic['slug']['en'] . '/1-' . $this->lang1 . '.jpg';

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
