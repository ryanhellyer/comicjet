	</div>
</div>

</div>

<footer>
	<p>
		Copyright &copy; <?php echo esc_html( date( 'Y' ) ); ?> Comic Jet.
		Generated in <?php echo ( 1000 * ( microtime( true ) - COMICJET_TIMER ) ); ?> ms.
	</p>
</footer>

<?php echo $this->scripts( $script_vars, $scripts ); ?>

</body>
</html>