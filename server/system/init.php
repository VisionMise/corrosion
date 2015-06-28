<?php

	global $stdInput;

	define('ROOT', realpath(getcwd()));

	// Include Configuration Class
	include(ROOT . '/system/inc/config.php');


	print_r($stdInput);

?>