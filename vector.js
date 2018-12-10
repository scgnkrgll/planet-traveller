// Simple javascript 3d vector class
// Designed as part of of rocket lander game
// TODO may transforming all the methods to non-desructive would be a good idea

class Vector {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    add(v) {
        if (v instanceof Vector) {
            this.x = this.x + v.x;
            this.y = this.y + v.y;
            this.z = this.z + v.z;
        }
        else {
            this.x += v;
            this.y += v;
            this.z += v;
        }
    }
    sub(v) {
        if (v instanceof Vector) {
            this.x = this.x - v.x;
            this.y = this.y - v.y;
            this.z = this.z - v.z;
        }
        else {
            this.x += v;
            this.y += v;
            this.z += v;
        }
    }
    mult(v) {
        if (v instanceof Vector) {
            this.x = this.x * v.x;
            this.y = this.y * v.y;
            this.z = this.z * v.z;
        }
        else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
    }
    div(v) {
        if (v instanceof Vector) {
            this.x = this.x / v.x;
            this.y = this.y / v.y;
            this.z = this.z / v.z;
        }
        else {
            this.x /= v;
            this.y /= v;
            this.z /= v;
        }
    }
    equals(v) {
        return this.x == v.x && this.y == v.y && this.z == v.z;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        return new Vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }
    mag() {
        return Math.sqrt(this.dot(this));
    }
    magSq() {
        return this.dot(this);
    }
    setMag(a) {
        let n = this.normalize();
        return new Vector(n.x * a, n.y * a, n.z * a);
    }
    normalize() {
        this.div(this.mag());
    }
    copy() {
        return new Vector(this.x, this.y, this.z);
    }
    distSq(v) {
        return (this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y);
    }

    angleBetween(v) {
        // 
        return Math.atan2(this.x - v.x, this.y - v.y);
    }
    static vectorFromAngle(angle, mag) {
        return new Vector(Math.cos(angle) * mag, Math.sin(angle) * mag);
    }

    /*
        static add(v) {
            if (v instanceof Vector) {
                return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
            }
            else {
                return new Vector(this.x + v, this.y + v, this.z + v);
            }
        }
        static sub(v) {
            if (v instanceof Vector) {
                return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
            }
            else {
                return new Vector(this.x + v, this.y + v, this.z + v);
            }
        }
        static mult(v) {
            if (v instanceof Vector) {
                return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
            }
            else {
                return new Vector(this.x * v, this.y * v, this.z * v);
            }
        }
        div(v) {
            if (v instanceof Vector)
                return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
            else
                return new Vector(this.x / v, this.y / v, this.z / v);
        }
    
        static mag(v) {
            return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        }
        static normalize(v) {
            const mag = v.mag();
            return new Vector(v.x / mag, v.y / mag, v.z / mag);
        }*/
}