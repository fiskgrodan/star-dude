import { collectStar } from "../events/collectStar";
import { hitBomb } from "../events/hitBomb";

export const create = (game, state) => {
	//  A simple background for our game
	game.add.image(400, 300, 'sky');

	//  The platforms group contains the ground and the 2 ledges we can jump on
	state.platforms = game.physics.add.staticGroup();

	//  Here we create the ground.
	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	state.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

	//  Now let's create some ledges
	state.platforms.create(600, 400, 'ground');
	state.platforms.create(50, 250, 'ground');
	state.platforms.create(750, 220, 'ground');

	// The player and its settings
	state.player = game.physics.add.sprite(100, 450, 'dude');

	//  Player physics properties. Give the little guy a slight bounce.
	state.player.setBounce(0.2);
	state.player.setCollideWorldBounds(true);

	//  Our player animations, turning, walking left and walking right.
	game.anims.create({
		key: 'left',
		frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
		frameRate: 10,
		repeat: -1
	});

	game.anims.create({
		key: 'turn',
		frames: [{ key: 'dude', frame: 4 }],
		frameRate: 20
	});

	game.anims.create({
		key: 'right',
		frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
		frameRate: 10,
		repeat: -1
	});

	//  Input Events
	state.cursors = game.input.keyboard.createCursorKeys();

	//  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
	state.stars = game.physics.add.group({
		key: 'star',
		repeat: 11,
		setXY: { x: 12, y: 0, stepX: 70 }
	});

	state.stars.children.iterate(child => {
		//  Give each star a slightly different bounce
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
	});

	state.bombs = game.physics.add.group();

	//  The score
	state.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

	//  Collide the player and the stars with the platforms
	game.physics.add.collider(state.player, state.platforms);
	game.physics.add.collider(state.stars, state.platforms);
	game.physics.add.collider(state.bombs, state.platforms);

	//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	game.physics.add.overlap(state.player, state.stars, collectStar, null, game);

	game.physics.add.collider(state.player, state.bombs, hitBomb, null, game);
}
