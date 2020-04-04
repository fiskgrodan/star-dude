export const update = (game, state) => {
	if (state.gameOver) {
		return;
	}

	if (
		(state.cursors.left.isDown && state.cursors.right.isDown) ||
		(!state.cursors.left.isDown && !state.cursors.right.isDown)
	) {
		state.player.setVelocityX(0);
		state.player.anims.play('turn');
	} else if (state.cursors.left.isDown) {
		state.player.setVelocityX(-160);
		state.player.anims.play('left', true);
	} else if (state.cursors.right.isDown) {
		state.player.setVelocityX(160);
		state.player.anims.play('right', true);
	}

	if (state.cursors.up.isDown && state.player.body.touching.down) {
		state.player.setVelocityY(-330);
	}
}
