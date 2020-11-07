// import GameWin from "./gameWin";

var config = {
  type: Phaser.AUTO,
  width: 1900,
  height: 800,
  parent: "phaser-example",

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player; //Added player
var map;
var text;
var sx = 0;
var mapWidth = 51;
var mapHeight = 37;
var distance = 0;
var tiles = [7, 7, 7, 6, 6, 6, 0, 0, 0, 1, 1, 2, 3, 4, 5];

// let gameWin = false

var game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "images/firstlevel.png");
  this.load.image("ground", "./images/smallBlock.png");
}

function create() {
  //Audio// THis is the traditional audio setup

  window.addEventListener("keydown", event => {
    const audio = document.querySelector("audio");
    audio.volume = .02;
    audio.loop = true
    audio.play();
    });
  

  var mapData = [];

  for (var y = 0; y < mapHeight; y++) {
    var row = [];

    for (var x = 0; x < mapWidth; x++) {
      //  Scatter the tiles so we get more stars
      var tileIndex = Phaser.Math.RND.weightedPick(tiles);

      row.push(tileIndex);
    }

    mapData.push(row);
  }

  map = this.make.tilemap({ data: mapData, tileWidth: 950, tileHeight: 550 });

  var tileset = map.addTilesetImage("tiles");
  var layer = map.createDynamicLayer(0, tileset, 0, 0);

}

function update(time, delta) {
  //  Any speed as long as 16 evenly divides by it
  sx += 4;

  distance += sx;

  if (sx === 16) {
    //  Reset and create new strip

    var tile;
    var prev;

    for (var y = 0; y < mapHeight; y++) {
      for (var x = 1; x < mapWidth; x++) {
        tile = map.getTileAt(x, y);
        prev = map.getTileAt(x - 1, y);

        prev.index = tile.index;

        if (x === mapWidth - 1) {
          tile.index = Phaser.Math.RND.weightedPick(tiles);
        }
      }
    }

    sx = 1;
  }

  this.cameras.main.scrollY = sx;
  // introMuse.play(config);
}

// var config = {
//   type: Phaser.AUTO,
//   width: 1800,
//   height: 700,
//   scene: {
//     preload: preload,
//     create: create,
//     update: update,
//   },
// };

// var player;
// var cursors;

// var game = new Phaser.Game(config);

// function preload() {
//   //This is the images being imported in
//   this.load.image("start", "/images/rocketlaunch.png");
//   this.load.image("player", "/images/player.png", {
//     frameWidth: 32,
//     frameHeight: 48,
//   });
// }

// function create() {
//   //This is the render
//   this.add.image(1000, 10, "start");

//   //This is basic animation for walking. We will need to make a different one for flying.. Maybe?
//   this.anims.create({
//     key: "left",
//     frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
//     frameRate: 10,
//     repeat: -1,
//   });

//   this.anims.create({
//     key: "turn",
//     frames: [{ key: "player", frame: 4 }],
//     frameRate: 20,
//   });

//   this.anims.create({
//     key: "right",
//     frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
//     frameRate: 10,
//     repeat: -1,
//   });

//   cursors = this.input.keyboard.createCursorKeys();
// }

// function update() {

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
// }
