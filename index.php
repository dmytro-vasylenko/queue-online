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
	<a href="https://github.com/dmytro-vasylenko/queue-online"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>
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