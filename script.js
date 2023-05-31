function reset() {
  this.scene.restart();
}

function preload() {
  this.load.image('block', 'assets/tile000.png');
  this.load.image('0', 'assets/tile001.png');
  this.load.image('1', 'assets/tile002.png');
  this.load.image('2', 'assets/tile003.png');
  this.load.image('3', 'assets/tile004.png');
  this.load.image('4', 'assets/tile005.png');
  this.load.image('5', 'assets/tile006.png');
  this.load.image('bomb', 'assets/tile007.png');
}

function create() {
  // 0-5 = number of bombs nearby
  // 6 = bomb

  let board = {
    0: [0, 0, 0, 0, 0],
    1: [0, 0, 0, 0, 0],
    2: [0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0]
  }

  let play = {
    0: [0, 0, 0, 0, 0],
    1: [0, 0, 0, 0, 0],
    2: [0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0]
  }

  x = 0
  do {
    for (row in board) {
      for (i in board) {
        random = Math.round(Math.random() * 10)
        if (random == 1) {
          board[row][i] = 6
          x += 1
        }
      }
    }
  } while (x < 5)

  for (let row in board) {
    for (let i in board[row]) {
      if (board[row][i] != 6) {
        try {
          if (board[row][parseInt(i) - 1] == 6) {
            board[row][i] += 1;
          }
        } catch { }
        try {
          if (board[row][parseInt(i) + 1] == 6) {
            board[row][i] += 1;
          }
        } catch { }
        try {
          if (board[parseInt(row) + 1][i] == 6) {
            board[row][i] += 1;
          }
        } catch { }
        try {
          if (board[parseInt(row) - 1][i] == 6) {
            board[row][i] += 1;
          }
        } catch { }
        try {
          if (board[parseInt(row) - 1][parseInt(i) - 1] == 6) {
            board[row][i] += 1;
          }
        } catch { }
        try {
          if (board[parseInt(row) - 1][parseInt(i) + 1] == 6) {
            board[row][i] += 1;
          }
        } catch { }
        try {
          if (board[parseInt(row) + 1][parseInt(i) - 1] == 6) {
            board[row][i] += 1;
          }
        } catch { }
        try {
          if (board[parseInt(row) + 1][parseInt(i) + 1] == 6) {
            board[row][i] += 1;
          }
        } catch { }
      }
    }
  }

  console.log("0: ", board[0]);
  console.log("1: ", board[1]);
  console.log("2: ", board[2]);
  console.log("3: ", board[3]);
  console.log("4: ", board[4]);
  x = 50
  y = 50
  for (let row in board) {
    for (let i in board[row]) {
      if (board[row][i] == 0) {
        this.zero = this.add.image(x, y, '0')
      } else if (board[row][i] == 1) {
        this.one = this.add.image(x, y, '1')
      } else if (board[row][i] == 2) {
        this.two = this.add.image(x, y, '2')
      } else if (board[row][i] == 3) {
        this.three = this.add.image(x, y, '3')
      } else if (board[row][i] == 4) {
        this.four = this.add.image(x, y, '4')
      } else if (board[row][i] == 5) {
        this.five = this.add.image(x, y, '5')
      } else if (board[row][i] == 6) {
        this.bomb = this.add.image(x, y, 'bomb')
      }
      x += 100
      if (x > 450) {
        x = 50
      }
    }
    y += 100
  }
  x = 50
  y = 50
  for (row in play) {
    for (i in play[row]) {
      this.blocks = this.add.image(x, y, 'block')
      this.blocks.setInteractive()
      this.blocks.on('pointerup', function() {
        this.destroy();
      }, this.blocks)
      x += 100
      if (x > 450) {
        x = 50
      }
    }
    y += 100
  }
  this.reset = function() {
    this.scene.restart();
  }
  document.getElementById('button').onclick = this.reset.bind(this);
}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  backgroundColor: '#000000',
  scene: {
    preload: preload,
    create: create,
    reset: reset,
  }
};

const game = new Phaser.Game(config);
