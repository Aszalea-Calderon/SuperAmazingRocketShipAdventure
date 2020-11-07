// import GameWin from "./gameWin";

var config = {
  type: Phaser.AUTO,
  width: 1900,
  height: 600,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 20 }, //The gravity is set so the gas will fall
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var player; //Added player
var cursors; //Movement
var gas; // Added gas cans
var map;
var sx = 0;
var mapWidth = 51;
var mapHeight = 37;
var distance = 0;
var tiles = [7, 7, 7, 6, 6, 6, 0, 0, 0, 1, 1, 2, 3, 4, 5];

// let gameWin = false

function preload() {
  this.load.image("tiles", "./images/rocketlaunch.png");
  this.load.image("gas", "./images/smallgem.png");
  this.load.spritesheet("dude", "./images/player.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  //Map//
  this.add.image(400, 300, "tiles");

  platforms = this.physics.add.staticGroup();

  //Player//
  player = this.physics.add.sprite(700, 550, "dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //Gas Cans//
  //This makes copies
  gas = this.physics.add.group({
    key: "gas",
    repeat: 10,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  this.physics.add.collider(gas, player); // This adds a collider for us and the gas. (this could be modified to hit astroids)

  //this.physics.add.overlap(player, gas, collectGas, null, this); // or this

  //Audio// THis is the traditional audio setup

  window.addEventListener("keydown", (event) => {
    const audio = document.querySelector("audio");
    audio.volume = 0.02;
    audio.loop = true;
    audio.play();
  });

  //Animation//
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //Movement//
  cursors = this.input.keyboard.createCursorKeys();

  // var mapData = [];

  // for (var y = 0; y < mapHeight; y++) {
  //   var row = [];

  //   for (var x = 0; x < mapWidth; x++) {
  //     //  Scatter the tiles so we get more stars
  //     var tileIndex = Phaser.Math.RND.weightedPick(tiles);

  //     row.push(tileIndex);
  //   }

  //   mapData.push(row);
  // }

  // map = this.make.tilemap({ data: mapData, tileWidth: 950, tileHeight: 550 });

  // var tileset = map.addTilesetImage("tiles");
  //var layer = map.createDynamicLayer(0, tileset, 0, 0);
  //this.physics.add.collider(player, platforms);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

//Gas Cans Collection//
// function collectGas(player, gas) {
//gas.disableBody(true, true);

//Any speed as long as 16 evenly divides by it
// sx += 4;
// distance += sx;
// if (sx === 16) {
//   //  Reset and create new strip
//   var tile;
//   var prev;
//   for (var y = 0; y < mapHeight; y++) {
//     for (var x = 1; x < mapWidth; x++) {
//       tile = map.getTileAt(x, y);
//       prev = map.getTileAt(x - 1, y);
//       prev.index = tile.index;
//       if (x === mapWidth - 1) {
//         tile.index = Phaser.Math.RND.weightedPick(tiles);
//       }
//     }
//   }
//   sx = 1;
// }
// this.cameras.main.scrollY = sx;
// }

//To do next,
//-- Collect gas
// -- make meter that can fill
//--This makes score go up
//-- Collide with trash
//--
