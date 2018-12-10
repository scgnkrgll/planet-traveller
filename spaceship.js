// TODO change name of the Spaceship class and all of the instance of it to rocket

class Spaceship {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.thrustForce = -0.05;
        this.color = "#cccccc";
        this.width = 16;
        this.height = 30;
        this.position = new Vector(50, 50);
        this.velocity = new Vector(1, 0);
        this.acceleration = new Vector(0, 0);
        this.angle = Math.PI / 2;
        this.engineState = false;

    }
    update() {
        if (gameState) {
            this.thrust();

            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);

            if (Key.isDown(Key.LEFT)) this.rotate("LEFT");
            if (Key.isDown(Key.RIGHT)) this.rotate("RIGHT");
            if (Key.isDown(65)) this.rotate("LEFT");
            if (Key.isDown(68)) this.rotate("RIGHT");
        } else {
            if (Key.isDown(32)) {
                this.reset();
            }
        }

        this.acceleration.mult(0);

    }

    reset() {
        gameState = true;
        this.position = new Vector(50, 50);
        this.velocity = new Vector(1, 0);
        this.acceleration = new Vector(0, 0);
        this.angle = Math.PI / 2;
    }

    checkEdges() {
        if (this.position.x < 0)
            this.position.x = this.canvas.width;
        else if (this.position.x > this.canvas.width)
            this.position.x = 0;

        if (this.position.y < 0)
            this.position.y = this.canvas.height;
        else if (this.position.y > this.canvas.height)
            this.position.y = 0;
    }

    checkCollision(planet) {
        this.distSq = planet.position.distSq(this.position);

        if (this.distSq < (planet.diameter + this.height / 2) * (planet.diameter + this.height / 2)) {
            if (gameState) {
                // Spaceship direction according its origin
                let spaceshipDir = Vector.vectorFromAngle(this.angle - Math.PI / 2, 1);
    
                // Spaceship direction relative to origin of the moon
                let spaceshipRelDir = this.position.copy();
                spaceshipRelDir.sub(planet.position);
                spaceshipRelDir.normalize();
                //spaceshipRelDir.mult(-1);
    
                if (spaceshipDir.distSq(spaceshipRelDir) < 0.1 && this.velocity.magSq() < 0.5)
                    console.log("Successful landing.");
                // TODO create a  menu and call it in the if statement above
                else 
                    console.log("Spaceship crashed!");
                // TODO create a explode method and call it in the else statement above
            }
            
            gameState = false;
        }
    }
    
    show() {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);

        context.beginPath();
        context.arc(0, this.height * -0.5, this.width / 2 + this.width / 6, 0, -2 * Math.PI);
        context.fillStyle = "#cc9999";
        context.fill();
        context.closePath();

        context.beginPath();
        context.rect(this.width * -0.5 - this.width / 6, this.height * -0.5, this.width + this.width / 3, this.height - this.width / 3);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        //nozzle
        context.beginPath();
        context.arc(0, this.height * 0.5, this.width / 2, Math.PI, 0);
        context.fillStyle = "#555";
        context.fill();
        context.closePath();

        // Draw the flame if engine is on
        if (this.engineState) {
            context.beginPath();
            context.moveTo(this.width * -0.5, this.height * 0.5);
            context.lineTo(this.width * 0.5, this.height * 0.5);
            context.lineTo(0, this.height + Math.random() * 5);
            context.lineTo(this.width * -0.5, this.height * 0.5);
            context.fillStyle = "orange";
            context.fill();
            context.closePath();

            context.beginPath();
            context.moveTo(this.width * -0.5, this.height * 0.5);
            context.lineTo(this.width * 0.2, this.height * 0.5);
            context.lineTo(0, this.height * 0.6 + Math.random() * 5);
            context.lineTo(this.width * -0.2, this.height * 0.5);
            context.closePath();
            context.fillStyle = "#3399ff";
            context.fill();
        }
        context.restore();
    }

    rotate(dir) {

        if (dir === "LEFT") {
            /*if (this.angle > Math.PI / 2)
                return*/
            this.angle += Math.PI / 180;
        }
        else if (dir === "RIGHT") {
            /*if (this.angle < -Math.PI / 2)
                return*/
            this.angle -= Math.PI / 180;
        }
    }
    thrust() {
        if (Key.isDown(Key.UP) || Key.isDown(87)) {
            this.engineState = true;
            this.applyForce(new Vector(
                this.thrustForce * Math.sin(-this.angle),
                this.thrustForce * Math.cos(this.angle)
            ));
        }
    }
    applyForce(f) {
        this.acceleration.add(f);
    }
}