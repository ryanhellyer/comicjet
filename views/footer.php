	</div>
</div>

</div>

<footer>
	<p>
		Copyright &copy; <?php echo esc_html( date( 'Y' ) ); ?> Comic Jet.
		Generated in <?php echo round( ( 1000 * ( microtime( true ) - COMICJET_TIMER ) ), 2 ); ?> ms.
		<!--
		HTML output start at: <?php echo COMICJET_HEADER_TIMER; ?> ms.
		Start of footer at: <?php echo COMICJET_FOOTER_TIMER; ?> ms.
		-->
	</p>
</footer>

<?php echo $this->scripts( $script_vars, $scripts ); ?>

</body>
</html>