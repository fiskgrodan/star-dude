import { state } from "../state/state.js";

export function collectStar(player, star) {
	star.disableBody(true, true);

	//  Add and update the score
	state.score += 10;
	state.scoreText.setText('score: ' + state.score);

	if (state.stars.countActive(true) === 0) {
		//  A new batch of stars to collect
		state.stars.children.iterate(child => {
			child.enableBody(true, child.x, 0, true, true);
		});

		const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

		const bomb = state.bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		bomb.allowGravity = false;
	}
}