<?php

	$uid = $_GET["uid"];
	$first_name = $_GET["first_name"];
	$last_name = $_GET["last_name"];
	$photo_rec = $_GET["photo_rec"];

	setcookie("uid", $uid, time() + 60*60*24*30, "/");
	setcookie("first_name", $first_name, time() + 60*60*24*30, "/");
	setcookie("last_name", $last_name, time() + 60*60*24*30, "/");
	setcookie("photo_rec", $photo_rec, time() + 60*60*24*30, "/");

	$mysqli = mysqli_connect("localhost", "ewbmfiul_queue", "rootcheat", "ewbmfiul_queue");
	mysqli_set_charset($mysqli, "utf8");

	$exist = mysqli_query($mysqli, "SELECT * FROM users WHERE user_id='".$uid."'");

	if(!mysqli_num_rows($exist))
	{
		mysqli_query($mysqli, "INSERT INTO users(`id`, `user_id`, `first_name`, `last_name`, `photo_rec`)
			VALUES('', '".$uid."', '".$first_name."', '".$last_name."' ,'".$photo_rec."')");
	}

	header("Location: /index.php");
?>