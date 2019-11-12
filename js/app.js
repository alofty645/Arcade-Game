// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
  }
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;
    //when enemies reach the end, they go back to the start with a different speed
    if (this.x > 510) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 222);
    }
    // Checks for collisions between the player and the enemies
    if (
      player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y
    ) {
      player.x = 202;
      player.y = 405;
    }
  }
  // Renders the enemy into the game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
  }
  update(dt) {}
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(kpress) {
    if (kpress == "left" && this.x > 0) {
      this.x -= 102;
    }
    if (kpress == "right" && this.x < 405) {
      this.x += 102;
    }
    if (kpress == "up" && this.y > 0) {
      this.y -= 83;
    }
    if (kpress == "down" && this.y < 405) {
      this.y += 83;
    }
    if (this.y < 0) {
      setTimeout(() => {
        this.x = 202;
        this.y = 405;
      }, 800);
    }
  }
}

// All enemies are placed in an array
var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [60, 150, 230];

enemyLocation.forEach(function(Y) {
  enemy = new Enemy(0, Y, 200);
  allEnemies.push(enemy);
});

// The starting location of the player
var player = new Player(200, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
