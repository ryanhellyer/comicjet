	</div>
</div>

</div>

<footer>
	<p>
		Copyright &copy; 2015 Comic Jet.
		Generated in <?php echo ( 1000 * ( microtime( true ) - COMICJET_TIMER ) ); ?> ms.
	</p>
	<p class="align-right">
		<a href="http://comicjet.com/contact/?report=/">Report bug</a>
	</p>
</footer>

<?php
if ( 'comic' == $template ) {

	?>
<script>
	var bubble_image_0 = "<?php echo esc_url( $image_url_lang1 ); ?>";
	var bubble_image_1 = "<?php echo esc_url( $image_url_lang2 ); ?>";
	var current_language1 = "<div onclick='toggle_image()'>Switch to <span>English</span></div>";
	var current_language2 = "<div onclick='toggle_image()'>Switch to <span>Deutsch</span></div>";


	var page_slug = "<?php echo esc_attr( $this->comic_slug ); ?>";
<?php

$count = 1;
while ( $count < 1000 ) {
	$file = COMICJET_DIR . 'assets/' . $this->comic_dir . '/' . $count . '-' . $this->lang1 . '.jpg';
	if ( file_exists( $file ) ) {
		$last_page_number = $count;;
	}
	$count++;
}

if ( $last_page_number == $this->page_number ) {
	echo 'var page_number = "end";';
} else {
	echo 'var page_number = "' . esc_attr( $this->page_number ) . '";';

}
?>

	var comicjet_root_url = "<?php echo COMICJET_URL; ?>";
	var comicjet_slug = "<?php echo esc_attr( $this->comic_slug ); ?>";
<?php

if ( 1 != $this->page_number ) {
	?>
	var comicjet_prev_url = "<?php echo esc_url( $this->_get_previous_url() ); ?>";<?php
}


$dir = COMICJET_DIR . 'assets/' . $this->comic_dir . '/';
$file = $dir . ( $this->page_number + 1 ) . '-' . $this->lang1 . '.jpg';
if ( file_exists( $file ) ) {
	?>

	var comicjet_next_url = "<?php echo esc_url( $this->_get_next_url() ); ?>";<?php
}
?>

</script>
<script src="<?php echo COMICJET_ASSETS_URL; ?>/cookie-functions.js"></script>
<script src="<?php echo COMICJET_ASSETS_URL; ?>/toggle-image.js"></script>
<script src="<?php echo COMICJET_ASSETS_URL; ?>/arrow-key-support.js"></script>
<?php
}



if ( 'home' == $template ) {
	?>
<script>
	var text_comic_slug = "comic";
	var text_already_read = "Already read";
	var text_reading = "Reading";
	var comicjet_language1 = "en";
	var comicjet_language2 = "nb";
	var comicjet_root_url = "<?php echo COMICJET_URL; ?>";
</script>
<script src="<?php echo COMICJET_ASSETS_URL; ?>/cookie-functions.js"></script>
<script src="<?php echo COMICJET_ASSETS_URL; ?>/language-selector.js"></script>
<script src="<?php echo COMICJET_ASSETS_URL; ?>/read-reading.js"></script>
<script src="<?php echo COMICJET_ASSETS_URL; ?>/arrow-key-support.js"></script>
<?php
}
?>

</body>
</html>