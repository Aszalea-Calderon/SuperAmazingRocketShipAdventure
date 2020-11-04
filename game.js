var config = {
  type: Phaser.AUTO,
  width: 1800,
  height: 700,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player;
var cursors;

var game = new Phaser.Game(config);

function preload() {
  //This is the images being imported in
  this.load.image("start", "/images/rocketlaunch.png");
  this.load.image("player", "/images/player.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  //This is the render
  this.add.image(1000, 10, "start");

  //This is basic animation for walking. We will need to make a different one for flying.. Maybe?
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "player", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  //Player movement Basics for walking back and forth//
  /*This will need to be tinkered with for sure as we are just flying up */
  /*there is an error that I haven't solved yet*/
  // if (cursors.left.isDown) {
  //   player.setVelocityX(-160);
  //   player.anims.play("left", true);
  // } else if (cursors.right.isDown) {
  //   player.setVelocityX(160);
  //   player.anims.play("right", true);
  // } else {
  //   player.setVelocityX(0);
  //   player.anims.play("turn");
  // }
  // if (cursors.up.isDown && player.body.touching.down) {
  //   player.setVelocityY(-330);
  // }
}
