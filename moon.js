class Moon {
    constructor(canvas, radius, attractionForceMag, color, position) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.color = color;
        this.diameter = radius * 2;
        this.sqDiameter = this.diameter * this.diameter;
        this.attractionForceMag = attractionForceMag;
        this.position = position || new Vector(this.canvas.width / 2, this.canvas.height / 2);
    }

    attract(spaceship) {
        let f = this.position.copy();
        f.sub(spaceship.position);
        let d = f.mag();
        f.normalize();
        f.mult(this.attractionForceMag);
        f.div(d * d);

        spaceship.applyForce(f);
    }

    show() {
        context.save();
        context.translate(this.position.x, this.position.y);

        context.beginPath();
        context.arc(0, 0, this.diameter, 0, -2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
    }

}