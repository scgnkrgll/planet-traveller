const canvas = document.getElementById("game");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

// TODO create a HUD class. it is a good idea to create new canvas for hud

const spaceship = new Spaceship(canvas);
const moon = new Moon(canvas, 50, 100, "#9999cc");

let gameState = true;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spaceship.checkEdges();
    //spaceship.applyForce(gravity);
    spaceship.update();
    spaceship.show();
    spaceship.engineState = false;


    moon.show();
    //moon.checkCollision(spaceship);
    spaceship.checkCollision(moon);
    moon.attract(spaceship);

    //console.log("horizontal speed", spaceship.velocity.x);
    //console.log("vertical speed", spaceship.velocity.y);

    requestAnimationFrame(draw);
}

draw();
