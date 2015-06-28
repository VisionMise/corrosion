<?php

	global $stdInput;

	define('ROOT', realpath(getcwd()));

	// Include Configuration Class
	include(ROOT . '/system/inc/config.php');

	// Token Handler
	include(ROOT . '/system/inc/tokens.php');

	print_r($stdInput);

?>