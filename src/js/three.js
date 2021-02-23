
export class Color {
    constructor(hex) {
        this.setHex(hex);
    };

    copy(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.hex = color.hex;
    };

    setHex(hex) {
        this.hex = ~~hex & 0xffffff;
        this.updateRGB();
    };

    setRGB(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.updateHex();
    };

    updateHex() {
        this.hex = ~~(this.r * 255) << 16 ^ ~~(this.g * 255) << 8 ^ ~~(this.b * 255);
    };

    updateRGB() {
        this.r = (this.hex >> 16 & 255) / 255;
        this.g = (this.hex >> 8 & 255) / 255;
        this.b = (this.hex & 255) / 255;
    };

    clone() {
        return new Color(this.hex);
    };
}

export class Vector2 {
    constructor(x, y) {
        this.set(x || 0, y || 0);
    };

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    };

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };

    clone() {
        return new Vector2(this.x, this.y);
    };

    add(v1, v2) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        return this;
    };

    addSelf(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };

    sub(v1, v2) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        return this;
    };

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    };

    divideScalar(s) {
        if (s) {
            this.x /= s;
            this.y /= s;
        } else {
            this.set(0, 0);
        }
        return this;
    };

    negate() {
        return this.multiplyScalar(-1);
    };

    dot(v) {
        return this.x * v.x + this.y * v.y;
    };

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    };

    length() {
        return Math.sqrt(this.lengthSq());
    };

    normalize() {
        return this.divideScalar(this.length());
    };

    setLength(l) {
        return this.normalize().multiplyScalar(l);
    };

    unit() {
        return this.normalize();
    };
}

export class Vector3 {
    constructor(x, y, z) {
        this.set(x || 0, y || 0, z || 0);
    };

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    };

    clone() {
        return new Vector3(this.x, this.y, this.z);
    };

    add(v1, v2) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        this.z = v1.z + v2.z;
        return this;
    };

    addSelf(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    };

    sub(v1, v2) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        this.z = v1.z - v2.z;
        return this;
    };

    subSelf(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };

    multiply(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    };

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    };

    divideScalar(s) {
        if (s) {
            this.x /= s;
            this.y /= s;
            this.z /= s;
        } else {
            this.set(0, 0, 0);
        }
        return this;
    };

    negate() {
        return this.multiplyScalar(-1);
    };

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    };

    length() {
        return Math.sqrt(this.lengthSq());
    };

    normalize() {
        return this.divideScalar(this.length());
    };

    setLength(l) {
        return this.normalize().multiplyScalar(l);
    };

    cross(a, b) {
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this;
    };

    crossSelf(v) {
        return this.set(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    };

    isZero() {
        return this.lengthSq() < 0.0001;
    };
}

export class Vector4 {
    constructor(x, y, z, w) {
        this.set(x || 0, y || 0, z || 0, w || 1);
    };

    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    };

    copy(v) {
        return this.set(v.x, v.y, v.z, v.w || 1);
    };

    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    };

    add(v1, v2) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        this.z = v1.z + v2.z;
        this.w = v1.w + v2.w;
        return this;
    };

    addSelf(v) {
        return this.add(this, v);
    };

    sub(v1, v2) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        this.z = v1.z - v2.z;
        this.w = v1.w - v2.w;
        return this;
    };

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;
    };

    divideScalar(s) {
        return this.set(this.x / s, this.y / s, this.z / s, this.w / s);
    };

    negate() {
        return this.multiplyScalar(-1);
    };

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    };

    lengthSq() {
        return this.dot(this);
    };

    length() {
        return Math.sqrt(this.lengthSq());
    };

    normalize() {
        return this.divideScalar(this.length());
    };

    setLength(l) {
        return this.normalize().multiplyScalar(l);
    };
}

export class Quaternion {
    constructor(x, y, z, w) {
        this.set(x || 0, y || 0, z || 0, w || 1);
    };

    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    };

    copy(q) {
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;
        return this;
    };

    setFromAxisAngle(axis, angle) {
        const halfAngle = angle / 2, s = Math.sin(halfAngle);
        this.x = axis.x * s;
        this.y = axis.y * s;
        this.z = axis.z * s;
        this.w = Math.cos(halfAngle);
        return this;
    };

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    };

    normalize() {
        let l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        if (l === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
        } else {
            l = 1 / l;
            this.x = this.x * l;
            this.y = this.y * l;
            this.z = this.z * l;
            this.w = this.w * l;
        }
        return this;
    };

    multiply(q1, q2) {
        this.x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
        this.y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
        this.z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
        this.w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;
        return this;
    };

    multiplyVector3(vec, dest) {
        if (!dest) {
            dest = vec;
        }
        const x = vec.x;
        const y = vec.y;
        const z = vec.z;
        const qx = this.x;
        const qy = this.y;
        const qz = this.z;
        const qw = this.w;
        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;
        dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return dest;
    };
}

export class Matrix4 {
    constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        this.set(n11 || 1, n12 || 0, n13 || 0, n14 || 0, n21 || 0, n22 || 1, n23 || 0, n24 || 0, n31 || 0, n32 || 0, n33 || 1, n34 || 0, n41 || 0, n42 || 0, n43 || 0, n44 || 1);
    };

    set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        this.n11 = n11;
        this.n12 = n12;
        this.n13 = n13;
        this.n14 = n14;
        this.n21 = n21;
        this.n22 = n22;
        this.n23 = n23;
        this.n24 = n24;
        this.n31 = n31;
        this.n32 = n32;
        this.n33 = n33;
        this.n34 = n34;
        this.n41 = n41;
        this.n42 = n42;
        this.n43 = n43;
        this.n44 = n44;
        return this;
    };

    copy(m) {
        this.set(m.n11, m.n12, m.n13, m.n14, m.n21, m.n22, m.n23, m.n24, m.n31, m.n32, m.n33, m.n34, m.n41, m.n42, m.n43, m.n44);
        return this;
    };

    lookAt(eye, center, up) {
        const x = new Vector3();
        const y = new Vector3();
        const z = new Vector3();
        z.sub(eye, center).normalize();
        if (z.length() === 0) {
            z.z = 1;
        }
        x.cross(up, z).normalize();
        if (x.length() === 0) {
            z.x += 0.0001;
            x.cross(up, z).normalize();
        }
        y.cross(z, x).normalize();
        this.n11 = x.x;
        this.n12 = y.x;
        this.n13 = z.x;
        this.n21 = x.y;
        this.n22 = y.y;
        this.n23 = z.y;
        this.n31 = x.z;
        this.n32 = y.z;
        this.n33 = z.z;
        return this;
    };

    multiply(a, b) {
        const a11 = a.n11;
        const a12 = a.n12;
        const a13 = a.n13;
        const a14 = a.n14;
        const a21 = a.n21;
        const a22 = a.n22;
        const a23 = a.n23;
        const a24 = a.n24;
        const a31 = a.n31;
        const a32 = a.n32;
        const a33 = a.n33;
        const a34 = a.n34;
        const a41 = a.n41;
        const a42 = a.n42;
        const a43 = a.n43;
        const a44 = a.n44;
        const b11 = b.n11;
        const b12 = b.n12;
        const b13 = b.n13;
        const b14 = b.n14;
        const b21 = b.n21;
        const b22 = b.n22;
        const b23 = b.n23;
        const b24 = b.n24;
        const b31 = b.n31;
        const b32 = b.n32;
        const b33 = b.n33;
        const b34 = b.n34;
        this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
        this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
        this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
        this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;
        this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
        this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
        this.n23 = a21 * b13 + a22 * b23 + a23 * b33;
        this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;
        this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
        this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
        this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
        this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
        this.n41 = a41 * b11 + a42 * b21 + a43 * b31;
        this.n42 = a41 * b12 + a42 * b22 + a43 * b32;
        this.n43 = a41 * b13 + a42 * b23 + a43 * b33;
        this.n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44;
        return this;
    };

    multiplyToArray(a, b, r) {
        this.multiply(a, b);
        r[0] = this.n11;
        r[1] = this.n21;
        r[2] = this.n31;
        r[3] = this.n41;
        r[4] = this.n12;
        r[5] = this.n22;
        r[6] = this.n32;
        r[7] = this.n42;
        r[8] = this.n13;
        r[9] = this.n23;
        r[10] = this.n33;
        r[11] = this.n43;
        r[12] = this.n14;
        r[13] = this.n24;
        r[14] = this.n34;
        r[15] = this.n44;
        return this;
    };

    multiplyScalar(s) {
        this.n11 *= s;
        this.n12 *= s;
        this.n13 *= s;
        this.n14 *= s;
        this.n21 *= s;
        this.n22 *= s;
        this.n23 *= s;
        this.n24 *= s;
        this.n31 *= s;
        this.n32 *= s;
        this.n33 *= s;
        this.n34 *= s;
        this.n41 *= s;
        this.n42 *= s;
        this.n43 *= s;
        this.n44 *= s;
        return this;
    };

    determinant() {
        const n11 = this.n11, n12 = this.n12, n13 = this.n13, n14 = this.n14, n21 = this.n21, n22 = this.n22, n23 = this.n23, n24 = this.n24,
            n31 = this.n31, n32 = this.n32, n33 = this.n33, n34 = this.n34, n41 = this.n41, n42 = this.n42, n43 = this.n43, n44 = this.n44;
        return n14 * n23 * n32 * n41 - n13 * n24 * n32 * n41 - n14 * n22 * n33 * n41 + n12 * n24 * n33 * n41 + n13 * n22 * n34 * n41 - n12 * n23 * n34 * n41 - n14 * n23 * n31 * n42 + n13 * n24 * n31 * n42 + n14 * n21 * n33 * n42 - n11 * n24 * n33 * n42 - n13 * n21 * n34 * n42 + n11 * n23 * n34 * n42 + n14 * n22 * n31 * n43 - n12 * n24 * n31 * n43 - n14 * n21 * n32 * n43 + n11 * n24 * n32 * n43 + n12 * n21 * n34 * n43 - n11 * n22 * n34 * n43 - n13 * n22 * n31 * n44 + n12 * n23 * n31 * n44 + n13 * n21 * n32 * n44 - n11 * n23 * n32 * n44 - n12 * n21 * n33 * n44 + n11 * n22 * n33 * n44;
    };

    transpose() {
        let tmp = this.n21;
        this.n21 = this.n12;
        this.n12 = tmp;
        tmp = this.n31;
        this.n31 = this.n13;
        this.n13 = tmp;
        tmp = this.n32;
        this.n32 = this.n23;
        this.n23 = tmp;
        tmp = this.n41;
        this.n41 = this.n14;
        this.n14 = tmp;
        tmp = this.n42;
        this.n42 = this.n24;
        this.n24 = tmp;
        tmp = this.n43;
        this.n43 = this.n34;
        this.n43 = tmp;
        return this;
    };

    clone() {
        const m = new Matrix4();
        m.n11 = this.n11;
        m.n12 = this.n12;
        m.n13 = this.n13;
        m.n14 = this.n14;
        m.n21 = this.n21;
        m.n22 = this.n22;
        m.n23 = this.n23;
        m.n24 = this.n24;
        m.n31 = this.n31;
        m.n32 = this.n32;
        m.n33 = this.n33;
        m.n34 = this.n34;
        m.n41 = this.n41;
        m.n42 = this.n42;
        m.n43 = this.n43;
        m.n44 = this.n44;
        return m;
    };

    flattenToArray(flat) {
        flat[0] = this.n11;
        flat[1] = this.n21;
        flat[2] = this.n31;
        flat[3] = this.n41;
        flat[4] = this.n12;
        flat[5] = this.n22;
        flat[6] = this.n32;
        flat[7] = this.n42;
        flat[8] = this.n13;
        flat[9] = this.n23;
        flat[10] = this.n33;
        flat[11] = this.n43;
        flat[12] = this.n14;
        flat[13] = this.n24;
        flat[14] = this.n34;
        flat[15] = this.n44;
        return flat;
    };

    setPosition(v) {
        this.n14 = v.x;
        this.n24 = v.y;
        this.n34 = v.z;
        return this;
    };

    getPosition() {
        if (!this.position) {
            this.position = new Vector3();
        }
        this.position.set(this.n14, this.n24, this.n34);
        return this.position;
    };

    setRotationFromEuler(v) {
        const a = Math.cos(v.x);
        const b = Math.sin(v.x);
        const c = Math.cos(v.y);
        const d = Math.sin(v.y);
        const e = Math.cos(v.z);
        const f = Math.sin(v.z);
        const ad = a * d;
        const bd = b * d;
        this.n11 = c * e;
        this.n12 = -c * f;
        this.n13 = d;
        this.n21 = bd * e + a * f;
        this.n22 = -bd * f + a * e;
        this.n23 = -b * c;
        this.n31 = -ad * e + b * f;
        this.n32 = ad * f + b * e;
        this.n33 = a * c;
        return this;
    };

    scale(v) {
        this.n11 *= v.x;
        this.n12 *= v.y;
        this.n13 *= v.z;
        this.n21 *= v.x;
        this.n22 *= v.y;
        this.n23 *= v.z;
        this.n31 *= v.x;
        this.n32 *= v.y;
        this.n33 *= v.z;
        this.n41 *= v.x;
        this.n42 *= v.y;
        this.n43 *= v.z;
        return this;
    };

    extractRotation(m, s) {
        const invScaleX = 1 / s.x, invScaleY = 1 / s.y, invScaleZ = 1 / s.z;
        this.n11 = m.n11 * invScaleX;
        this.n21 = m.n21 * invScaleX;
        this.n31 = m.n31 * invScaleX;
        this.n12 = m.n12 * invScaleY;
        this.n22 = m.n22 * invScaleY;
        this.n32 = m.n32 * invScaleY;
        this.n13 = m.n13 * invScaleZ;
        this.n23 = m.n23 * invScaleZ;
        this.n33 = m.n33 * invScaleZ;
    };

    static makeInvert(m1, m2) {
        if (m2 === undefined) m2 = new Matrix4();
        m2.n11 = m1.n23 * m1.n34 * m1.n42 - m1.n24 * m1.n33 * m1.n42 + m1.n24 * m1.n32 * m1.n43 - m1.n22 * m1.n34 * m1.n43 - m1.n23 * m1.n32 * m1.n44 + m1.n22 * m1.n33 * m1.n44;
        m2.n12 = m1.n14 * m1.n33 * m1.n42 - m1.n13 * m1.n34 * m1.n42 - m1.n14 * m1.n32 * m1.n43 + m1.n12 * m1.n34 * m1.n43 + m1.n13 * m1.n32 * m1.n44 - m1.n12 * m1.n33 * m1.n44;
        m2.n13 = m1.n13 * m1.n24 * m1.n42 - m1.n14 * m1.n23 * m1.n42 + m1.n14 * m1.n22 * m1.n43 - m1.n12 * m1.n24 * m1.n43 - m1.n13 * m1.n22 * m1.n44 + m1.n12 * m1.n23 * m1.n44;
        m2.n14 = m1.n14 * m1.n23 * m1.n32 - m1.n13 * m1.n24 * m1.n32 - m1.n14 * m1.n22 * m1.n33 + m1.n12 * m1.n24 * m1.n33 + m1.n13 * m1.n22 * m1.n34 - m1.n12 * m1.n23 * m1.n34;
        m2.n21 = m1.n24 * m1.n33 * m1.n41 - m1.n23 * m1.n34 * m1.n41 - m1.n24 * m1.n31 * m1.n43 + m1.n21 * m1.n34 * m1.n43 + m1.n23 * m1.n31 * m1.n44 - m1.n21 * m1.n33 * m1.n44;
        m2.n22 = m1.n13 * m1.n34 * m1.n41 - m1.n14 * m1.n33 * m1.n41 + m1.n14 * m1.n31 * m1.n43 - m1.n11 * m1.n34 * m1.n43 - m1.n13 * m1.n31 * m1.n44 + m1.n11 * m1.n33 * m1.n44;
        m2.n23 = m1.n14 * m1.n23 * m1.n41 - m1.n13 * m1.n24 * m1.n41 - m1.n14 * m1.n21 * m1.n43 + m1.n11 * m1.n24 * m1.n43 + m1.n13 * m1.n21 * m1.n44 - m1.n11 * m1.n23 * m1.n44;
        m2.n24 = m1.n13 * m1.n24 * m1.n31 - m1.n14 * m1.n23 * m1.n31 + m1.n14 * m1.n21 * m1.n33 - m1.n11 * m1.n24 * m1.n33 - m1.n13 * m1.n21 * m1.n34 + m1.n11 * m1.n23 * m1.n34;
        m2.n31 = m1.n22 * m1.n34 * m1.n41 - m1.n24 * m1.n32 * m1.n41 + m1.n24 * m1.n31 * m1.n42 - m1.n21 * m1.n34 * m1.n42 - m1.n22 * m1.n31 * m1.n44 + m1.n21 * m1.n32 * m1.n44;
        m2.n32 = m1.n14 * m1.n32 * m1.n41 - m1.n12 * m1.n34 * m1.n41 - m1.n14 * m1.n31 * m1.n42 + m1.n11 * m1.n34 * m1.n42 + m1.n12 * m1.n31 * m1.n44 - m1.n11 * m1.n32 * m1.n44;
        m2.n33 = m1.n13 * m1.n24 * m1.n41 - m1.n14 * m1.n22 * m1.n41 + m1.n14 * m1.n21 * m1.n42 - m1.n11 * m1.n24 * m1.n42 - m1.n12 * m1.n21 * m1.n44 + m1.n11 * m1.n22 * m1.n44;
        m2.n34 = m1.n14 * m1.n22 * m1.n31 - m1.n12 * m1.n24 * m1.n31 - m1.n14 * m1.n21 * m1.n32 + m1.n11 * m1.n24 * m1.n32 + m1.n12 * m1.n21 * m1.n34 - m1.n11 * m1.n22 * m1.n34;
        m2.n41 = m1.n23 * m1.n32 * m1.n41 - m1.n22 * m1.n33 * m1.n41 - m1.n23 * m1.n31 * m1.n42 + m1.n21 * m1.n33 * m1.n42 + m1.n22 * m1.n31 * m1.n43 - m1.n21 * m1.n32 * m1.n43;
        m2.n42 = m1.n12 * m1.n33 * m1.n41 - m1.n13 * m1.n32 * m1.n41 + m1.n13 * m1.n31 * m1.n42 - m1.n11 * m1.n33 * m1.n42 - m1.n12 * m1.n31 * m1.n43 + m1.n11 * m1.n32 * m1.n43;
        m2.n43 = m1.n13 * m1.n22 * m1.n41 - m1.n12 * m1.n23 * m1.n41 - m1.n13 * m1.n21 * m1.n42 + m1.n11 * m1.n23 * m1.n42 + m1.n12 * m1.n21 * m1.n43 - m1.n11 * m1.n22 * m1.n43;
        m2.n44 = m1.n12 * m1.n23 * m1.n31 - m1.n13 * m1.n22 * m1.n31 + m1.n13 * m1.n21 * m1.n32 - m1.n11 * m1.n23 * m1.n32 - m1.n12 * m1.n21 * m1.n33 + m1.n11 * m1.n22 * m1.n33;
        m2.multiplyScalar(1 / m1.determinant());
        return m2;
    };

    static makeInvert3x3(m1) {
        const a11 = m1.n33 * m1.n22 - m1.n32 * m1.n23;
        const a21 = -m1.n33 * m1.n21 + m1.n31 * m1.n23;
        const a31 = m1.n32 * m1.n21 - m1.n31 * m1.n22;
        const a12 = -m1.n33 * m1.n12 + m1.n32 * m1.n13;
        const a22 = m1.n33 * m1.n11 - m1.n31 * m1.n13;
        const a32 = -m1.n32 * m1.n11 + m1.n31 * m1.n12;
        const a13 = m1.n23 * m1.n12 - m1.n22 * m1.n13;
        const a23 = -m1.n23 * m1.n11 + m1.n21 * m1.n13;
        const a33 = m1.n22 * m1.n11 - m1.n21 * m1.n12;
        const det = m1.n11 * a11 + m1.n21 * a12 + m1.n31 * a13;
        if (det === 0) {
            console.error('Matrix4.makeInvert3x3: Matrix not invertible.');
        }
        const idet = 1.0 / det;
        const m33m = [];
        m33m[0] = idet * a11;
        m33m[1] = idet * a21;
        m33m[2] = idet * a31;
        m33m[3] = idet * a12;
        m33m[4] = idet * a22;
        m33m[5] = idet * a32;
        m33m[6] = idet * a13;
        m33m[7] = idet * a23;
        m33m[8] = idet * a33;
        return m33m;
    };

    static makeFrustum(left, right, bottom, top, near, far) {
        const m = new Matrix4();
        m.n11 = 2 * near / (right - left);
        m.n13 = (right + left) / (right - left);
        m.n22 = 2 * near / (top - bottom);
        m.n23 = (top + bottom) / (top - bottom);
        m.n33 = -(far + near) / (far - near);
        m.n34 = -2 * far * near / (far - near);
        m.n43 = -1;
        return m;
    };

    static makePerspective(fov, aspect, near, far) {
        const ymax = near * Math.tan(fov * Math.PI / 360);
        const ymin = -ymax;
        const xmin = ymin * aspect;
        const xmax = ymax * aspect;
        return Matrix4.makeFrustum(xmin, xmax, ymin, ymax, near, far);
    };

    static makeOrtho(left, right, top, bottom, near, far) {
        const m = new Matrix4();
        const w = right - left;
        const h = top - bottom;
        const p = far - near;
        const x = (right + left) / w;
        const y = (top + bottom) / h;
        const z = (far + near) / p;
        m.n11 = 2 / w;
        m.n14 = -x;
        m.n22 = 2 / h;
        m.n24 = -y;
        m.n33 = -2 / p;
        m.n34 = -z;
        m.n44 = 1;
        return m;
    };
}

export class Vertex {
    constructor(position) {
        this.position = position || new Vector3();
    };
}

export class UV {
    constructor(u, v) {
        this.set(u || 0, v || 0);
    };

    set(u, v) {
        this.u = u;
        this.v = v;
        return this;
    };

    copy(uv) {
        return this.set(uv.u, uv.v);
    };
}

export class Face3 {
    constructor(a, b, c, normal, color, materials) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.normal = normal instanceof Vector3 ? normal : new Vector3();
        this.color = color instanceof Color ? color : new Color();
        this.materials = materials instanceof Array ? materials : [materials];
    };
}

export class Object3D {
    constructor() {
        this.parent = undefined;
        this.children = [];
        this.up = new Vector3(0, 1, 0);
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3(1, 1, 1);
        this.matrix = new Matrix4();
        this.matrixWorld = new Matrix4();
        this.matrixRotationWorld = new Matrix4();
        this.matrixAutoUpdate = true;
        this.matrixWorldNeedsUpdate = true;
    };

    addChild(child) {
        if (this.children.indexOf(child) === -1) {
            if (child.parent !== undefined) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.children.push(child);
        }
    };

    updateMatrix() {
        this.matrix.setPosition(this.position);
        this.matrix.setRotationFromEuler(this.rotation);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
            this.matrix.scale(this.scale);
        }
        this.matrixWorldNeedsUpdate = true;
    };

    update(parentMatrixWorld, forceUpdate) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || forceUpdate) {
            if (parentMatrixWorld) {
                this.matrixWorld.multiply(parentMatrixWorld, this.matrix);
            } else {
                this.matrixWorld.copy(this.matrix);
            }
            this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
            this.matrixWorldNeedsUpdate = false;
            forceUpdate = true;
        }
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update(this.matrixWorld, forceUpdate);
        }
    };
}

export class Geometry {
    constructor() {
        this.vertices = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
    };

    computeFaceNormals() {
        const cb = new Vector3();
        const ab = new Vector3();
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            let face = this.faces[f];
            let vA = this.vertices[face.a];
            let vB = this.vertices[face.b];
            let vC = this.vertices[face.c];
            cb.sub(vC.position, vB.position);
            ab.sub(vA.position, vB.position);
            cb.crossSelf(ab);
            if (!cb.isZero()) {
                cb.normalize();
            }
            face.normal.copy(cb);
        }
    };
}

export class Mesh extends Object3D {
    constructor(geometry, materials) {
        super();
        this.geometry = geometry;
        this.materials = [materials];
    };
}

export class Plane extends Geometry {
    constructor(width, height, segmentsWidth, segmentsHeight) {
        super();
        const width_half = width / 2;
        const height_half = height / 2;
        const gridX = segmentsWidth || 1;
        const gridY = segmentsHeight || 1;
        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;
        const segment_width = width / gridX;
        const segment_height = height / gridY;
        for (let iy = 0; iy < gridY1; iy++) {
            for (let ix = 0; ix < gridX1; ix++) {
                const x = ix * segment_width - width_half;
                const y = iy * segment_height - height_half;
                this.vertices.push(new Vertex(new Vector3(x, -y, 0)));
            }
        }
        for (let iy = 0; iy < gridY; iy++) {
            for (let ix = 0; ix < gridX; ix++) {
                const a = ix + gridX1 * iy;
                const b = ix + gridX1 * (iy + 1);
                const c = ix + 1 + gridX1 * (iy + 1);
                const d = ix + 1 + gridX1 * iy;
                this.faces.push(new Face3(a, b, c));
                this.faces.push(new Face3(a, c, d));
                this.faceVertexUvs[0].push([new UV(ix / gridX, iy / gridY), new UV(ix / gridX, (iy + 1) / gridY), new UV((ix + 1) / gridX, (iy + 1) / gridY)]);
                this.faceVertexUvs[0].push([new UV(ix / gridX, iy / gridY), new UV((ix + 1) / gridX, (iy + 1) / gridY), new UV((ix + 1) / gridX, iy / gridY)]);
            }
        }
    };
}

export class Light extends Object3D {
    constructor(hex) {
        super();
        this.color = new Color(hex);
        this.super = Object3D.prototype;
    };
}

export class PointLight extends Light {
    constructor(hex, intensity, distance) {
        super(hex);
        this.position = new Vector3();
        this.intensity = intensity || 1;
        this.distance = distance || 0;
    };
}

export class Material {
    constructor(parameters) {
        parameters = parameters || {};
        this.opacity = parameters.opacity !== undefined ? parameters.opacity : 1;
        this.transparent = parameters.transparent !== undefined ? parameters.transparent : false;
        this.blending = parameters.blending !== undefined ? parameters.blending : NormalBlending;
    };
}

export class Texture {
    constructor(image) {
        this.image = image;
        this.wrapS = ClampToEdge;
        this.wrapT = ClampToEdge;
        this.magFilter = Linear;
        this.minFilter = Linear;
        this.offset = new Vector2(0, 0);
    };
}

export class Camera extends Object3D {
    constructor(fov, aspect, near, far, target) {
        super();
        this.fov = fov || 50;
        this.aspect = aspect || 1;
        this.near = near || 0.1;
        this.far = far || 2000;
        this.target = target || new Object3D();
        this.matrixWorldInverse = new Matrix4();
        this.projectionMatrix = null;
        this.updateProjectionMatrix();
    };

    updateProjectionMatrix() {
        this.projectionMatrix = Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far);
    };

    update() {
        this.matrix.lookAt(this.position, this.target.position, this.up);
        this.matrix.setPosition(this.position);
        this.matrixWorld.copy(this.matrix);
        Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    };
}

export class TrackballCamera extends Camera {
    constructor() {
        super();
        this.radius = (window.innerWidth + window.innerHeight) / 4;
        this.dynamicDampingFactor = 0.2;
        this._dragging = false;
        this._eye = new Vector3();
        this._rotateStart = new Vector3();
        this._rotateEnd = new Vector3();
        document.addEventListener('mousemove', event => {
            if (this._dragging) this._rotateEnd = this.getMouseProjectionOnBall(event.clientX, event.clientY);
        }, false);
        document.addEventListener('mousedown', event => {
            event.preventDefault();
            event.stopPropagation();
            this._dragging = true;
            this._rotateStart = this._rotateEnd = this.getMouseProjectionOnBall(event.clientX, event.clientY);
        }, false);
        document.addEventListener('mouseup', event => {
            event.preventDefault();
            event.stopPropagation();
            this._dragging = false;
        }, false);
    };

    rotateCamera() {
        let angle = Math.acos(this._rotateStart.dot(this._rotateEnd) / this._rotateStart.length() / this._rotateEnd.length());
        if (angle) {
            const axis = new Vector3().cross(this._rotateStart, this._rotateEnd).normalize();
            const quaternion = new Quaternion();
            quaternion.setFromAxisAngle(axis, -angle);
            quaternion.multiplyVector3(this._eye);
            quaternion.multiplyVector3(this.up);
            quaternion.multiplyVector3(this._rotateEnd);
            quaternion.setFromAxisAngle(axis, angle * (this.dynamicDampingFactor - 1.0));
            quaternion.multiplyVector3(this._rotateStart);
        }
    };

    update(parentMatrixWorld, forceUpdate, camera) {
        this._eye = this.position.clone().subSelf(this.target.position);
        this.rotateCamera();
        this.position.add(this.target.position, this._eye);
        super.update(parentMatrixWorld, forceUpdate, camera);
    };

    getMouseProjectionOnBall(clientX, clientY) {
        const mouseOnBall = new Vector3((clientX - window.innerWidth * 0.5) / this.radius, (window.innerHeight * 0.5 - clientY) / this.radius, 0.0);
        const length = mouseOnBall.length();
        if (length > 1.0) {
            mouseOnBall.normalize();
        } else {
            mouseOnBall.z = Math.sqrt(1.0 - length * length);
        }
        this._eye = this.position.clone().subSelf(this.target.position);
        const projection = this.up.clone().setLength(mouseOnBall.y);
        projection.addSelf(this.up.clone().crossSelf(this._eye).setLength(mouseOnBall.x));
        projection.addSelf(this._eye.setLength(mouseOnBall.z));
        return projection;
    };
}

export class Scene extends Object3D {
    constructor() {
        super();
        this.objects = [];
        this.lights = [];
        this.__objectsAdded = [];
    };

    addLight(light) {
        if (this.lights.indexOf(light) === -1) {
            this.lights.push(light);
        }
    };

    addChild(child) {
        super.addChild(child);
        this.addChildRecurse(child);
    };

    addChildRecurse(child) {
        if (this.objects.indexOf(child) === -1) {
            this.objects.push(child);
            this.__objectsAdded.push(child);
        }
        for (let c = 0; c < child.children.length; c++) {
            this.addChildRecurse(child.children[c]);
        }
    };
}

export class MeshPhongMaterial extends Material {
    constructor(parameters) {
        super(parameters);
        parameters = parameters || {};
        this.color = parameters.color !== undefined ? new Color(parameters.color) : new Color(0xffffff);
        this.ambient = parameters.ambient !== undefined ? new Color(parameters.ambient) : new Color(0x050505);
        this.specular = parameters.specular !== undefined ? new Color(parameters.specular) : new Color(0x111111);
        this.shininess = parameters.shininess !== undefined ? parameters.shininess : 30;
    };
}

export class MeshShaderMaterial extends Material {
    constructor(parameters) {
        super(parameters);
        parameters = parameters || {};
        this.fragmentShader = parameters.fragmentShader !== undefined ? parameters.fragmentShader : "void main() {};";
        this.vertexShader = parameters.vertexShader !== undefined ? parameters.vertexShader : "void main() {};";
        this.uniforms = parameters.uniforms !== undefined ? parameters.uniforms : {};
    };
}

export class WebGLRenderTarget {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.wrapS = ClampToEdge;
        this.wrapT = ClampToEdge;
        this.magFilter = Linear;
        this.minFilter = Linear;
        this.offset = new Vector2(0, 0);
        this.format = Rgba;
        this.type = UnsignedByte;
    };
}

export const WebGLRenderer = function(canvas) {
    const _this = this;
    let _gl;
    const _programs = [];
    let _currentProgram = null;
    let _currentFramebuffer = null;
    let _oldBlending = null;
    let _viewportX = 0;
    let _viewportY = 0;
    let _viewportWidth = 0;
    let _viewportHeight = 0;
    const _projScreenMatrix = new Matrix4();
    const _projectionMatrixArray = new Float32Array(16);
    const _viewMatrixArray = new Float32Array(16);
    const _lights = { point: { length: 0, colors: [], positions: [], distances: [] } };
    const _canvas = canvas;
    const _clearColor = new Color(0x000000);
    const _clearAlpha = 0;
    this.data = { vertices: 0, faces: 0, drawCalls: 0 };
    _gl = _canvas.getContext('webgl');
    _gl.clearColor(0, 0, 0, 1);
    _gl.clearDepth(1);
    _gl.enable(_gl.DEPTH_TEST);
    _gl.depthFunc(_gl.LEQUAL);
    _gl.frontFace(_gl.CCW);
    _gl.cullFace(_gl.BACK);
    _gl.enable(_gl.CULL_FACE);
    _gl.enable(_gl.BLEND);
    _gl.blendEquation(_gl.FUNC_ADD);
    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
    _gl.clearColor(_clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha);
    this.context = _gl;
    this.setSize = function(width, height) {
        _canvas.width = width;
        _canvas.height = height;
        this.setViewport(0, 0, _canvas.width, _canvas.height);
    };
    this.setViewport = function(x, y, width, height) {
        _viewportX = x;
        _viewportY = y;
        _viewportWidth = width;
        _viewportHeight = height;
        _gl.viewport(_viewportX, _viewportY, _viewportWidth, _viewportHeight);
    };
    this.clear = () => _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT | _gl.STENCIL_BUFFER_BIT);
    this.getContext = () => _gl;
    this.render = (scene, camera, renderTarget, forceClear) => {
        let webglObject;
        let object;
        _this.data.vertices = 0;
        _this.data.faces = 0;
        _this.data.drawCalls = 0;
        camera.update();
        scene.update(undefined, false);
        camera.matrixWorldInverse.flattenToArray(_viewMatrixArray);
        camera.projectionMatrix.flattenToArray(_projectionMatrixArray);
        _projScreenMatrix.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
        scene.__webglObjects = scene.__webglObjects || [];
        while (scene.__objectsAdded.length) {
            addObject(scene.__objectsAdded[0], scene);
            scene.__objectsAdded.splice(0, 1);
        }
        for (let o1 = 0, ol1 = scene.__webglObjects.length; o1 < ol1; o1++) {
            updateObject(scene.__webglObjects[o1].object);
        }
        if (renderTarget && !renderTarget.__webglFramebuffer) {
            if (renderTarget.depthBuffer === undefined) renderTarget.depthBuffer = true;
            renderTarget.__webglFramebuffer = _gl.createFramebuffer();
            renderTarget.__webglRenderbuffer = _gl.createRenderbuffer();
            renderTarget.__webglTexture = _gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, renderTarget.__webglTexture);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, renderTarget.wrapS);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, renderTarget.wrapT);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, renderTarget.magFilter);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, renderTarget.minFilter);
            _gl.texImage2D(_gl.TEXTURE_2D, 0, renderTarget.format, renderTarget.width, renderTarget.height, 0, renderTarget.format, renderTarget.type, null);
            _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderTarget.__webglRenderbuffer);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, renderTarget.__webglFramebuffer);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, renderTarget.__webglTexture, 0);
            _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height);
            _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderTarget.__webglRenderbuffer);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
        }
        if (renderTarget) {
            if (renderTarget.__webglFramebuffer !== _currentFramebuffer) {
                _gl.bindFramebuffer(_gl.FRAMEBUFFER, renderTarget.__webglFramebuffer);
                _gl.viewport(_viewportX, _viewportY, renderTarget.width, renderTarget.height);
                _currentFramebuffer = renderTarget.__webglFramebuffer;
            }
        } else if (_currentFramebuffer) {
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            _gl.viewport(_viewportX, _viewportY, _viewportWidth, _viewportHeight);
            _currentFramebuffer = null;
        }
        if (forceClear) {
            this.clear();
        }
        for (let o = 0; o < scene.__webglObjects.length; o++) {
            webglObject = scene.__webglObjects[o];
            object = webglObject.object;
            object.matrixWorld.flattenToArray(object._objectMatrixArray);
            setupMatrices(object, camera);
            const object1 = webglObject.object;
            const opaque = webglObject.opaque;
            const transparent = webglObject.transparent;
            transparent.count = 0;
            opaque.count = 0;
            for (let m = 0; m < object1.materials.length; m++) {
                const material1 = object1.materials[m];
                material1.transparent ? addToFixedArray(transparent, material1) : addToFixedArray(opaque, material1);
            }
            webglObject.render = true;
        }
        setBlending(NormalBlending);
        for (let o = 0; o < scene.__webglObjects.length; o++) {
            webglObject = scene.__webglObjects[o];
            if (webglObject.render) {
                for (let i = 0; i < webglObject.opaque.count; i++) {
                    renderBuffer(camera, scene.lights, webglObject.opaque.list[i], webglObject.buffer, webglObject.object);
                }
            }
        }
        for (let o = 0; o < scene.__webglObjects.length; o++) {
            webglObject = scene.__webglObjects[o];
            if (webglObject.render) {
                for (let i = 0; i < webglObject.transparent.count; i++) {
                    let material = webglObject.transparent.list[i];
                    setBlending(material.blending);
                    renderBuffer(camera, scene.lights, material, webglObject.buffer, webglObject.object);
                }
            }
        }
    };

    function setProgram(camera, lights, material, object) {
        if (!material.program) {
            if (material instanceof MeshPhongMaterial) {
                material.uniforms = UniformsUtils.clone(ShaderLib['phong'].uniforms);
                material.vertexShader = ShaderLib['phong'].vertexShader;
                material.fragmentShader = ShaderLib['phong'].fragmentShader;
            }
            material.program = buildProgram(material.fragmentShader, material.vertexShader, material.uniforms, material.attributes, {
                maxDirLights: 0,
                maxPointLights: 2,
            });
            const attributes = material.program.attributes;
            if (attributes.position >= 0) _gl.enableVertexAttribArray(attributes.position);
            if (attributes.normal >= 0) _gl.enableVertexAttribArray(attributes.normal);
        }
        if (material.program !== _currentProgram) {
            _gl.useProgram(material.program);
            _currentProgram = material.program;
        }
        _gl.uniformMatrix4fv(material.program.uniforms.projectionMatrix, false, _projectionMatrixArray);
        if (material instanceof MeshPhongMaterial) {
            for (let l = 0; l < lights.length; l++) {
                let light = lights[l];
                const poffset = l * 3;
                _lights.point.colors[poffset] = light.color.r * light.intensity;
                _lights.point.colors[poffset + 1] = light.color.g * light.intensity;
                _lights.point.colors[poffset + 2] = light.color.b * light.intensity;
                _lights.point.positions[poffset] = light.position.x;
                _lights.point.positions[poffset + 1] = light.position.y;
                _lights.point.positions[poffset + 2] = light.position.z;
                _lights.point.distances[l] = light.distance;
            }
            _lights.point.length = lights.length;
            material.uniforms.enableLighting.value = _lights.point.length;
            material.uniforms.pointLightColor.value = _lights.point.colors;
            material.uniforms.pointLightPosition.value = _lights.point.positions;
            material.uniforms.pointLightDistance.value = _lights.point.distances;
            material.uniforms.diffuse.value = material.color;
            material.uniforms.opacity.value = material.opacity;
            material.uniforms.reflectivity.value = material.reflectivity;
            material.uniforms.refractionRatio.value = material.refractionRatio;
            material.uniforms.combine.value = material.combine;
            material.uniforms.useRefract.value = false;
            material.uniforms.ambient.value = material.ambient;
            material.uniforms.specular.value = material.specular;
            material.uniforms.shininess.value = material.shininess;
        }
        for (let u in material.uniforms) {
            let location = material.program.uniforms[u];
            if (location) {
                let uniform = (material.uniforms)[u];
                let type = uniform.type;
                let value = uniform.value;
                if (type === "i") {
                    _gl.uniform1i(location, value);
                } else if (type === "f") {
                    _gl.uniform1f(location, value);
                } else if (type === "fv1") {
                    _gl.uniform1fv(location, value);
                } else if (type === "fv") {
                    _gl.uniform3fv(location, value);
                } else if (type === "v2") {
                    _gl.uniform2f(location, value.x, value.y);
                } else if (type === "v3") {
                    _gl.uniform3f(location, value.x, value.y, value.z);
                } else if (type === "v4") {
                    _gl.uniform4f(location, value.x, value.y, value.z, value.w);
                } else if (type === "c") {
                    _gl.uniform3f(location, value.r, value.g, value.b);
                } else if (type === "t") {
                    _gl.uniform1i(location, value);
                    if (uniform.texture) {
                        _gl.activeTexture(_gl.TEXTURE0 + value);
                        _gl.bindTexture(_gl.TEXTURE_2D, uniform.texture.__webglTexture);
                    }
                }
            }
        }
        _gl.uniformMatrix4fv(material.program.uniforms.modelViewMatrix, false, object._modelViewMatrixArray);
        _gl.uniformMatrix3fv(material.program.uniforms.normalMatrix, false, object._normalMatrixArray);
        _gl.uniform3f(material.program.uniforms.cameraPosition, camera.position.x, camera.position.y, camera.position.z);
        _gl.uniformMatrix4fv(material.program.uniforms.viewMatrix, false, _viewMatrixArray);
        return material.program;
    }

    function renderBuffer(camera, lights, material, geometryGroup, object) {
        if (material.opacity === 0) return;
        let program = setProgram(camera, lights, material, object);
        let attributes = program.attributes;
        if (attributes.position >= 0) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer);
            _gl.vertexAttribPointer(attributes.position, 3, _gl.FLOAT, false, 0, 0);
        }
        if (attributes.normal >= 0) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer);
            _gl.vertexAttribPointer(attributes.normal, 3, _gl.FLOAT, false, 0, 0);
        }
        if (attributes.uv >= 0) {
            if (geometryGroup.__webglUVBuffer) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer);
                _gl.vertexAttribPointer(attributes.uv, 2, _gl.FLOAT, false, 0, 0);
                _gl.enableVertexAttribArray(attributes.uv);
            } else {
                _gl.disableVertexAttribArray(attributes.uv);
            }
        }
        if (object instanceof Mesh) {
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer);
            _gl.drawElements(_gl.TRIANGLES, geometryGroup.__webglFaceCount, _gl.UNSIGNED_SHORT, 0);
            _this.data.vertices += geometryGroup.__webglFaceCount;
            _this.data.faces += geometryGroup.__webglFaceCount / 3;
            _this.data.drawCalls++;
        }
    }

    function addToFixedArray(where, what) {
        where.list[where.count] = what;
        where.count += 1;
    }

    function setupMatrices(object, camera) {
        object._modelViewMatrix.multiplyToArray(camera.matrixWorldInverse, object.matrixWorld, object._modelViewMatrixArray);
        let result = Matrix4.makeInvert3x3(object._modelViewMatrix);
        object._normalMatrixArray[0] = result[0];
        object._normalMatrixArray[1] = result[3];
        object._normalMatrixArray[2] = result[6];
        object._normalMatrixArray[3] = result[1];
        object._normalMatrixArray[4] = result[4];
        object._normalMatrixArray[5] = result[7];
        object._normalMatrixArray[6] = result[2];
        object._normalMatrixArray[7] = result[5];
        object._normalMatrixArray[8] = result[8];
    }

    function addObject(object, scene) {
        let g, geometry, geometryGroup;
        if (!object._modelViewMatrix) {
            object._modelViewMatrix = new Matrix4();
            object._normalMatrixArray = new Float32Array(9);
            object._modelViewMatrixArray = new Float32Array(16);
            object._objectMatrixArray = new Float32Array(16);
            object.matrixWorld.flattenToArray(object._objectMatrixArray);
        }
        if (object instanceof Mesh) {
            geometry = object.geometry;
            if (!geometry.geometryGroups) {
                geometry.geometryGroups = [{ 'faces': [], 'vertices': 0 }];
                for (let f = 0; f < geometry.faces.length; f++) {
                    geometry.geometryGroups[0].faces.push(f);
                    geometry.geometryGroups[0].vertices += 3;
                }
            }
            for (g in geometry.geometryGroups) {
                geometryGroup = geometry.geometryGroups[g];
                if (!geometryGroup.__webglVertexBuffer) {
                    geometryGroup.__webglVertexBuffer = _gl.createBuffer();
                    geometryGroup.__webglNormalBuffer = _gl.createBuffer();
                    geometryGroup.__webglUVBuffer = _gl.createBuffer();
                    geometryGroup.__webglFaceBuffer = _gl.createBuffer();
                    let nvertices = geometryGroup.faces.length * 3;
                    let ntris = geometryGroup.faces.length;
                    let uvType = object.materials[0] instanceof MeshShaderMaterial;
                    if (uvType) {
                        geometryGroup.__uvArray = new Float32Array(nvertices * 2);
                    }
                    geometryGroup.__vertexArray = new Float32Array(nvertices * 3);
                    geometryGroup.__normalArray = new Float32Array(nvertices * 3);
                    geometryGroup.__faceArray = new Uint16Array(ntris * 3);
                    geometryGroup.__needsSmoothNormals = false;
                    geometryGroup.__uvType = uvType;
                    geometryGroup.__vertexColorType = false;
                    geometryGroup.__webglFaceCount = ntris * 3;
                    geometryGroup.__inittedArrays = true;
                    geometry.__dirtyVertices = true;
                    geometry.__dirtyElements = true;
                    geometry.__dirtyUvs = true;
                    geometry.__dirtyNormals = true;
                }
                addBuffer(scene.__webglObjects, geometryGroup, object);
            }
        }
    }

    function updateObject(object) {
        if (object instanceof Mesh) {
            for (let g in object.geometry.geometryGroups) {
                const geometryGroup = object.geometry.geometryGroups[g];
                if (object.geometry.__dirtyVertices || object.geometry.__dirtyElements || object.geometry.__dirtyUvs || object.geometry.__dirtyNormals) {
                    let uv;
                    let vertexIndex = 0;
                    let offset = 0;
                    let offset_uv = 0;
                    let offset_face = 0;
                    let offset_normal = 0;
                    for (let f = 0, fl = geometryGroup.faces.length; f < fl; f++) {
                        let face = object.geometry.faces[geometryGroup.faces[f]];
                        if (object.geometry.faceVertexUvs[0]) {
                            uv = object.geometry.faceVertexUvs[0][geometryGroup.faces[f]];
                        }
                        if (object.geometry.__dirtyVertices) {
                            let v1 = object.geometry.vertices[face.a].position;
                            let v2 = object.geometry.vertices[face.b].position;
                            let v3 = object.geometry.vertices[face.c].position;
                            geometryGroup.__vertexArray[offset] = v1.x;
                            geometryGroup.__vertexArray[offset + 1] = v1.y;
                            geometryGroup.__vertexArray[offset + 2] = v1.z;
                            geometryGroup.__vertexArray[offset + 3] = v2.x;
                            geometryGroup.__vertexArray[offset + 4] = v2.y;
                            geometryGroup.__vertexArray[offset + 5] = v2.z;
                            geometryGroup.__vertexArray[offset + 6] = v3.x;
                            geometryGroup.__vertexArray[offset + 7] = v3.y;
                            geometryGroup.__vertexArray[offset + 8] = v3.z;
                            offset += 9;
                        }
                        if (object.geometry.__dirtyNormals) {
                            for (let i = 0; i < 3; i++) {
                                geometryGroup.__normalArray[offset_normal++] = face.normal.x;
                                geometryGroup.__normalArray[offset_normal++] = face.normal.y;
                                geometryGroup.__normalArray[offset_normal++] = face.normal.z;
                            }
                        }
                        if (object.geometry.__dirtyUvs && uv !== undefined && geometryGroup.__uvType) {
                            for (let i = 0; i < 3; i++) {
                                geometryGroup.__uvArray[offset_uv++] = uv[i].u;
                                geometryGroup.__uvArray[offset_uv++] = uv[i].v;
                            }
                        }
                        if (object.geometry.__dirtyElements) {
                            geometryGroup.__faceArray[offset_face++] = vertexIndex;
                            geometryGroup.__faceArray[offset_face++] = vertexIndex + 1;
                            geometryGroup.__faceArray[offset_face++] = vertexIndex + 2;
                            vertexIndex += 3;
                        }
                    }
                    if (object.geometry.__dirtyVertices) {
                        _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer);
                        _gl.bufferData(_gl.ARRAY_BUFFER, geometryGroup.__vertexArray, _gl.STATIC_DRAW);
                    }
                    if (object.geometry.__dirtyNormals) {
                        _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer);
                        _gl.bufferData(_gl.ARRAY_BUFFER, geometryGroup.__normalArray, _gl.STATIC_DRAW);
                    }
                    if (object.geometry.__dirtyUvs && offset_uv > 0) {
                        _gl.bindBuffer(_gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer);
                        _gl.bufferData(_gl.ARRAY_BUFFER, geometryGroup.__uvArray, _gl.STATIC_DRAW);
                    }
                    if (object.geometry.__dirtyElements) {
                        _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer);
                        _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__faceArray, _gl.STATIC_DRAW);
                    }
                    delete geometryGroup.__inittedArrays;
                    delete geometryGroup.__faceArray;
                    delete geometryGroup.__uvArray;
                    delete geometryGroup.__normalArray;
                    delete geometryGroup.__vertexArray;
                }
            }
            object.geometry.__dirtyVertices = false;
            object.geometry.__dirtyElements = false;
            object.geometry.__dirtyUvs = false;
            object.geometry.__dirtyNormals = false;
        }
    }

    function addBuffer(objlist, buffer, object) {
        objlist.push({ buffer: buffer, object: object, opaque: { list: [], count: 0 }, transparent: { list: [], count: 0 } });
    }

    function buildProgram(fragmentShader, vertexShader, uniforms, attributes, parameters) {
        const chunks = [];
        chunks.push(fragmentShader);
        chunks.push(vertexShader);
        for (let p in parameters) {
            chunks.push(p);
            chunks.push(parameters[p]);
        }
        let code = chunks.join();
        for (let p = 0, pl = _programs.length; p < pl; p++) {
            if (_programs[p].code === code) {
                return _programs[p].program;
            }
        }
        let program = _gl.createProgram();
        let prefix_fragment = ["#ifdef GL_ES", "precision highp float;", "#endif", "#define MAX_POINT_LIGHTS " + parameters.maxPointLights, "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n");
        let prefix_vertex = ["#define MAX_POINT_LIGHTS " + parameters.maxPointLights, "uniform mat4 objectMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform mat4 cameraInverseMatrix;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", ""].join("\n");
        _gl.attachShader(program, getShader("fragment", prefix_fragment + fragmentShader));
        _gl.attachShader(program, getShader("vertex", prefix_vertex + vertexShader));
        _gl.linkProgram(program);
        program.uniforms = {};
        program.attributes = {};
        let identifiers = ['viewMatrix', 'modelViewMatrix', 'projectionMatrix', 'normalMatrix', 'objectMatrix', 'cameraPosition', 'cameraInverseMatrix'];
        for (let u in uniforms) {
            identifiers.push(u);
        }
        for (let i = 0, l = identifiers.length; i < l; i++) {
            program.uniforms[identifiers[i]] = _gl.getUniformLocation(program, identifiers[i]);
        }
        identifiers = ["position", "normal", "uv"];
        for (let i1 = 0; i1 < identifiers.length; i1++) {
            program.attributes[identifiers[i1]] = _gl.getAttribLocation(program, identifiers[i1]);
        }
        _programs.push({ program: program, code: code });
        return program;
    }

    function getShader(type, string) {
        const shader = _gl.createShader(type === "fragment" ? _gl.FRAGMENT_SHADER : _gl.VERTEX_SHADER);
        _gl.shaderSource(shader, string);
        _gl.compileShader(shader);
        return shader;
    }

    function setBlending(blending) {
        if (blending !== _oldBlending) {
            switch (blending) {
                case AdditiveBlending:
                    _gl.blendEquation(_gl.FUNC_ADD);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE);
                    break;
                case SubtractiveBlending:
                    _gl.blendEquation(_gl.FUNC_ADD);
                    _gl.blendFunc(_gl.ZERO, _gl.ONE_MINUS_SRC_COLOR);
                    break;
                case MultiplyBlending:
                    _gl.blendEquation(_gl.FUNC_ADD);
                    _gl.blendFunc(_gl.ZERO, _gl.SRC_COLOR);
                    break;
                default:
                    _gl.blendEquationSeparate(_gl.FUNC_ADD, _gl.FUNC_ADD);
                    _gl.blendFuncSeparate(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA);
                    break;
            }
            _oldBlending = blending;
        }
    }
};

export const UniformsUtils = {
    merge: function(uniforms) {
        let merged = {};
        for (let u = 0; u < uniforms.length; u++) {
            let tmp = this.clone(uniforms[u]);
            for (let p in tmp) {
                merged[p] = tmp[p];
            }
        }
        return merged;
    }, clone: function(uniforms_src) {
        let uniforms_dst = {};
        for (let u in uniforms_src) {
            uniforms_dst[u] = {};
            for (let p in uniforms_src[u]) {
                let parameter_src = uniforms_src[u][p];
                if (parameter_src instanceof Color || parameter_src instanceof Vector3 || parameter_src instanceof Texture) {
                    uniforms_dst[u][p] = parameter_src.clone();
                } else {
                    uniforms_dst[u][p] = parameter_src;
                }
            }
        }
        return uniforms_dst;
    }
};
export const UniformsLib = {
    common: {
        "diffuse": { type: "c", value: new Color(0xeeeeee) },
        "opacity": { type: "f", value: 1.0 },
        "map": { type: "t", value: 0, texture: null },
        "offsetRepeat": { type: "v4", value: new Vector4(0, 0, 1, 1) },
        "useRefract": { type: "i", value: 0 },
        "reflectivity": { type: "f", value: 1.0 },
        "refractionRatio": { type: "f", value: 0.98 },
        "combine": { type: "i", value: 0 },
    },
    lights: {
        "enableLighting": { type: "i", value: 1 },
        "pointLightColor": { type: "fv", value: [] },
        "pointLightPosition": { type: "fv", value: [] },
        "pointLightDistance": { type: "fv1", value: [] }
    },
};
export const ShaderLib = {
    'phong': {
        uniforms: UniformsUtils.merge([UniformsLib["common"], UniformsLib["lights"], {
            "ambient": { type: "c", value: new Color(0x050505) },
            "specular": { type: "c", value: new Color(0x111111) },
            "shininess": { type: "f", value: 30 }
        }]),
        fragmentShader: `uniform vec3 diffuse;uniform float opacity;uniform vec3 ambient;uniform vec3 specular;uniform float shininess;varying vec3 vLightWeighting;varying vec4 vPointLight[MAX_POINT_LIGHTS];varying vec3 vViewPosition;varying vec3 vNormal;void main() {gl_FragColor = vec4(vLightWeighting, 1.0);vec3 normal = normalize(vNormal);vec3 viewPosition = normalize(vViewPosition);vec4 mColor = vec4(diffuse, opacity);vec4 mSpecular = vec4(specular, opacity);vec4 pointDiffuse= vec4(0.0);vec4 pointSpecular = vec4(0.0);for (int i = 0; i < MAX_POINT_LIGHTS; i ++) {vec3 pointVector = normalize(vPointLight[i].xyz);vec3 pointHalfVector = normalize(vPointLight[i].xyz + vViewPosition);float pointDistance = vPointLight[i].w;float pointDotNormalHalf = dot(normal, pointHalfVector);float pointDiffuseWeight = max(dot(normal, pointVector), 0.0);float pointSpecularWeight = 0.0;if (pointDotNormalHalf >= 0.0)pointSpecularWeight = pow(pointDotNormalHalf, shininess);pointDiffuse+= mColor * pointDiffuseWeight * pointDistance;pointSpecular += mSpecular * pointSpecularWeight * pointDistance;}vec4 totalLight = vec4(ambient, opacity);totalLight += pointDiffuse + pointSpecular;gl_FragColor = gl_FragColor * totalLight;}`,
        vertexShader: `varying vec3 vLightWeighting;varying vec3 vViewPosition;varying vec3 vNormal;uniform bool enableLighting;uniform vec3 ambientLightColor;uniform vec3 pointLightColor[MAX_POINT_LIGHTS];uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];uniform float pointLightDistance[MAX_POINT_LIGHTS];varying vec4 vPointLight[MAX_POINT_LIGHTS];void main() {vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);vec4 mPosition = objectMatrix * vec4(position, 1.0);vViewPosition = cameraPosition - mPosition.xyz;vec3 transformedNormal = normalize(normalMatrix * normal);vNormal = transformedNormal;if (!enableLighting) {vLightWeighting = vec3(1.0);} else {vLightWeighting = ambientLightColor;for (int i = 0; i < MAX_POINT_LIGHTS; i++) {vec4 lPosition = viewMatrix * vec4(pointLightPosition[i], 1.0);vec3 lVector = lPosition.xyz - mvPosition.xyz;float lDistance = 1.0;if (pointLightDistance[i] > 0.0)lDistance = 1.0 - min((length(lVector) / pointLightDistance[i]), 1.0);lVector = normalize(lVector);float pointLightWeighting = max(dot(transformedNormal, lVector), 0.0);vLightWeighting += pointLightColor[i] * pointLightWeighting * lDistance;vPointLight[i] = vec4(lVector, lDistance);}}gl_Position = projectionMatrix * mvPosition;}`
    },
};
export const ShaderUtils = {
    lib: {
        'convolution': {
            uniforms: {
                "tDiffuse": { type: "t", value: 0, texture: null },
                "uImageIncrement": { type: "v2", value: new Vector2(0.0, 0.0) },
                "cKernel": { type: "fv1", value: [] }
            },
            vertexShader: `varying vec2 vUv;uniform vec2 uImageIncrement;void main(void) {vUv = uv - 12.0 * uImageIncrement;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}`,
            fragmentShader: `varying vec2 vUv;uniform sampler2D tDiffuse;uniform vec2 uImageIncrement;uniform float cKernel[25];void main(void) {vec2 imageCoord = vUv;vec4 sum = vec4(0.0);for (int i = 0; i < 25; i++) {sum += cKernel[i] * texture2D(tDiffuse, imageCoord);imageCoord += uImageIncrement;}gl_FragColor = sum;}`,
        },
        'screen': {
            uniforms: { tDiffuse: { type: "t", value: 0, texture: null }, opacity: { type: "f", value: 1.0 } },
            vertexShader: `varying vec2 vUv;void main() {vUv = vec2(uv.x, 1.0 - uv.y);gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}`,
            fragmentShader: `varying vec2 vUv;uniform sampler2D tDiffuse;uniform float opacity;void main() {vec4 texel = texture2D(tDiffuse, vUv);gl_FragColor = opacity * texel;}`
        },
    }, buildKernel: function(sigma) {
        const gauss = (x, sigma) => Math.exp(-(x * x) / (2.0 * sigma * sigma));
        let sum = 0.0;
        let values = [];
        for (let i = 0; i < 25; ++i) {
            values[i] = gauss(i - 12.0, sigma);
            sum += values[i];
        }
        for (let i = 0; i < 25; ++i) values[i] /= sum;
        return values;
    }
};
export const NormalBlending = 0;
export const AdditiveBlending = 1;
export const SubtractiveBlending = 2;
export const MultiplyBlending = 3;
export const ClampToEdge = 0x812F;
export const Linear = 0x2601;
export const UnsignedByte = 0x1401;
export const Rgba = 0x1908;
