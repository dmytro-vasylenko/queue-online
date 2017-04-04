<!DOCTYPE html>
<html>
<head>
	<title>Запись очередей</title>
	<meta charset="UTF-8">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="include/style/style.css">
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="bower_components/jquery.cookie/jquery.cookie.js"></script>
	<script type="text/javascript" src="include/script/custom.js"></script>
	<script type="text/javascript" src="//vk.com/js/api/openapi.js?143"></script>
	<script type="text/javascript">
		VK.init({apiId: 5966479});
	</script>
</head>
<body>
	<div id="wrapper">
		<main>
			<?php
				$mysqli = mysqli_connect("localhost", "ewbmfiul_queue", "rootcheat", "ewbmfiul_queue");
				mysqli_set_charset($mysqli, "utf8");

				$queues = mysqli_query($mysqli, "SELECT * FROM queues");
				while($queue = mysqli_fetch_array($queues)):
			?>
			<div class="queue" id="<?=$queue["id"]?>">
				<h2><?=$queue["title"]?></h2>
				<div class="info">
					<div class="people">
						<?php for($i = 1; $i <= $queue["places"]; $i++): ?>
							<?php
								$place_sql = mysqli_query($mysqli, "SELECT * FROM places
									WHERE queue_id='".$queue["id"]."' AND place='".$i."'");
								if(mysqli_num_rows($place_sql))
								{
									echo "<div class=\"place\">";
									$place = mysqli_fetch_array($place_sql);
									$currentUser = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM users WHERE user_id='".$place["user"]."'"));
									echo "<img src=\"".$currentUser["photo_rec"]."\" title=\"".$currentUser["first_name"]." ".$currentUser["last_name"]."\">";
								}
								else
								{
									echo "<div class=\"place free\">";
								}
							?>
								<span><?=$i?></span>
							</div>
						<?php endfor; ?>
					</div>
				</div>
				<button class="open-info">Подробней</button>
			</div>
			<?php endwhile; ?>
		</main>
		<sidebar>
			<div id="vk_auth"></div>
			<script type="text/javascript">
				VK.Widgets.Auth("vk_auth", {width: 260, authUrl: '/include/php/vk_auth.php'});
			</script>
		</sidebar>
	</div>
</body>
</html>