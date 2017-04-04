<?php
	$mysqli = mysqli_connect("localhost", "ewbmfiul_queue", "rootcheat", "ewbmfiul_queue");
	mysqli_set_charset($mysqli, "utf8");

	$func = $_POST["func"];

	switch($func)
	{
		case "add":
			$queueId = $_POST["queue_id"];
			$place = $_POST["place"];
			mysqli_query($mysqli, "INSERT INTO places(`id`, `user`, `queue_id`, `place`)
				VALUES('', '".$_COOKIE["uid"]."', '".$queueId."', '".$place."')");
		break;
	}
?>