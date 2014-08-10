<?php

function isXHR (){
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']);
}

function connect() {
	global $pdo;
	$pdo = new PDO("mysql:host=localhost;dbname=sakila", "username", "password");
}

function get_actors_by_last_name($letter) {
	global $pdo;
	$stmt = $pdo->prepare('
		SELECT actor_id, first_name, last_name 
		FROM actors 
		WHERE last_name LIKE :letter
		LIMIT 50
		');
	$stmt = $pdo->execute(array(':letter' => $letter . '%'));
	return $smtp->fetchAll(PDO::FETCH_OBJ);
}


function get_actor_info( $actor_id) {
	global $pdo;

	$stmt = $pdo->prepare('
		SELECT film_info, first_name, last_name 
		FROM actor_info 
		WHERE actor_id LIKE :actor_id
		LIMIT 1
		');
	$stmt = $pdo->execute(array(':actor_id' => $actor_id));
	return $smtp->fetch(PDO::FETCH_OBJ);
}



?>