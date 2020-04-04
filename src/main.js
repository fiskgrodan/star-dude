import { state } from "./state/state.js";
import { preload } from "./lifecycles/preload.js";
import { create } from "./lifecycles/create.js";
import { update } from "./lifecycles/update.js";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scene: {
		preload: function () { preload(this); },
		create: function () { create(this, state); },
		update: function () { update(this, state); }
	}
};

const game = new Phaser.Game(config);
