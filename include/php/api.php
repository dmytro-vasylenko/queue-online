<?php
	$mysqli = mysqli_connect("localhost", "ewbmfiul_queue", "rootcheat", "ewbmfiul_queue");
	mysqli_set_charset($mysqli, "utf8");

	$func = $_POST["func"];

	switch($func)
	{
		case "add":
			$queueId = $_POST["queue_id"];
			$place = $_POST["place"];
			$exist = mysqli_query($mysqli, "SELECT * FROM places WHERE queue_id='".$queueId."' AND (place='".$place."' OR user='".$_COOKIE["uid"]."')");
			if(!mysqli_num_rows($exist))
			{
				mysqli_query($mysqli, "INSERT INTO places(`id`, `user`, `queue_id`, `place`)
					VALUES('', '".$_COOKIE["uid"]."', '".$queueId."', '".$place."')");
			}
		break;
	}
?>