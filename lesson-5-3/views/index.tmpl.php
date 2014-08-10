<?php include '_partials/header.php'; ?>

<h1>Search actors by last name</h1>

<form action="index.php" method="POST">
	<select name="q" id="q">
		<?php
			$alphabet = str_split('ABCDEFGHIKLMNOPQRSTVXYZ');
			foreach ($alphabet as $letter) {
				echo "<option value='$letter'>$letter</option>";
			}
		?>
	</select>
	<button type="submit">Go!</button>
</form>

<?php if (isset($actors)) : ?>
<ul class="actors_list">
	<?php
	foreach ($actors as $a) {
		echo "<li data-actor_id='{a->actor_id}'><a href='actor.php?actor_id={a->actor_id}'>{a->first_name} {a->last_name}</a></li>";
	}
	?>
</ul>

<?php endif; ?>

<?php include '_partials/footer.php'; ?>
