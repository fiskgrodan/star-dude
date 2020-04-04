import { state } from "../state/state.js";

export function hitBomb(player, bomb) {
	const game = this;

	game.physics.pause();

	player.setTint(0xff0000);

	player.anims.play('turn');

	state.gameOver = true;
}