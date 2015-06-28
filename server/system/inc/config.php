<?php


	class config {

		public $ready 			= false;
		public $autoWrite 		= true;

		protected $path 		= false;
		protected $data			= [];

		public function __construct($filePath) {
			$this->path 					= realpath($filePath);
			if (!$this->path) $this->path 	= $this->initFile($filePath);
			$this->ready 					= ($this->path !== false);
		}

		protected function initFile($filePath) {
			try {
				if (!touch($filePath)) return false;
				return realpath($filePath);
			} catch (Exception $e) {
				return false;
			}
		}

		protected function readFile() {
			if (!$this->ready) return false;

			$content 		= file_get_contents($this->path);
			$this->data 	= json_decode($content, true);
		}

		protected function writeFile() {
			if (!$this->ready) return false;

			$json 			= json_encode($this->data);
			$bytes 			= file_put_contents($this->path, $json);
			return $bytes;
		}

		public function __get($key) {
			return (isset($this->data[$key]))
				? $this->data[$key]
				: null
			;
		}

		public function __set($key, $value) {
			$this->data[$key] 	= $value;
			if ($this->autoWrite) $this>writeFile();
		}

		public function __invoke($key = null, $value = null) {

			if ($key and $value) {
				$this->$key = $value;
				return $this->$key;
			} elseif ($key and !$value) {
				return $this->$key;
			} else {
				return $this->data;
			} 

		}

		public function save() {
			return $this->writeFile();
		}


	}

?>