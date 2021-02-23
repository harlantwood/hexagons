import { Color, Face3, Geometry, Vector2, Vector3, Vertex } from "./three";

const clamp = x => x < 0.0 ? 0.0 : x > 1.0 ? 1.0 : x;

export class Hexagon {
    constructor(position) {
        this.position = position;
        this.color = new Color(0x118844);
        this.A = null;
        this.B = null;
        this.C = null;
        this.D = null;
        this.E = null;
        this.F = null;
        this.dr = 0;
        this.dg = 0;
        this.db = 0;
        this.epoch = 0;
        this.mesh = null;
        this.stepsDone = 0;
    }

    spread(cb, next, red, grn, blu) {
        if (this.epoch < next) {
            this.epoch = next;
            this.nextColor(red, grn, blu, 32.0);
            this.A && setTimeout(() => this.A.spread(cb, next, red, grn, blu), (15.0 + Math.random() * 500.0) | 0);
            this.B && setTimeout(() => this.B.spread(cb, next, red, grn, blu), (15.0 + Math.random() * 500.0) | 0);
            this.C && setTimeout(() => this.C.spread(cb, next, red, grn, blu), (15.0 + Math.random() * 500.0) | 0);
            this.D && setTimeout(() => this.D.spread(cb, next, red, grn, blu), (15.0 + Math.random() * 500.0) | 0);
            this.E && setTimeout(() => this.E.spread(cb, next, red, grn, blu), (15.0 + Math.random() * 500.0) | 0);
            this.F && setTimeout(() => this.F.spread(cb, next, red, grn, blu), (15.0 + Math.random() * 500.0) | 0);
            cb();
        }
    }

    nextColor(red, grn, blu, steps) {
        this.dr = (red - this.color.r) / steps;
        this.dg = (grn - this.color.g) / steps;
        this.db = (blu - this.color.b) / steps;
        this.stepsDone = 0;
    }

    step() {
        if (++this.stepsDone >= 32) return;
        const nr = clamp(this.color.r + this.dr);
        const ng = clamp(this.color.g + this.dg);
        const nb = clamp(this.color.b + this.db);
        this.color.setRGB(nr, ng, nb);
        if (this.mesh) {
            this.mesh.materials[0].color.setRGB(nr, ng, nb);
            this.mesh.position.y = Math.sqrt(0.299 * nr + 0.587 * ng + 0.114 * nb) * 300.0;
        }
    }

    connect() {
        if (this.A) {
            this.A.D = this;
            this.A.C = this.B;
            this.A.E = this.F;
        }
        if (this.B) {
            this.B.E = this;
            this.B.F = this.A;
            this.B.D = this.C;
        }
        if (this.C) {
            this.C.F = this;
            this.C.A = this.B;
            this.C.E = this.D;
        }
        if (this.D) {
            this.D.A = this;
            this.D.B = this.C;
            this.D.F = this.E;
        }
        if (this.E) {
            this.E.B = this;
            this.E.C = this.D;
            this.E.A = this.F;
        }
        if (this.F) {
            this.F.C = this;
            this.F.D = this.E;
            this.F.B = this.A;
        }
    }
}

export function generateHexagons(level, cb) {
    const hexagons = [];
    const rootHexagon = new Hexagon(new Vector2(0, 0));
    hexagons.push(rootHexagon);
    let newHexagons = [];
    newHexagons.push(rootHexagon);
    while (level-- > 0) {
        const pending = newHexagons;
        newHexagons = [];
        pending.forEach(hexagon => {
            if (!hexagon.A) {
                hexagon.A = new Hexagon(new Vector2(hexagon.position.x, hexagon.position.y - 0.9));
                hexagons.push(hexagon.A);
                newHexagons.push(hexagon.A);
            }
            if (!hexagon.B) {
                hexagon.B = new Hexagon(new Vector2(hexagon.position.x + 0.775, hexagon.position.y - 0.45));
                hexagons.push(hexagon.B);
                newHexagons.push(hexagon.B);
            }
            if (!hexagon.C) {
                hexagon.C = new Hexagon(new Vector2(hexagon.position.x + 0.775, hexagon.position.y + 0.45));
                hexagons.push(hexagon.C);
                newHexagons.push(hexagon.C);
            }
            if (!hexagon.D) {
                hexagon.D = new Hexagon(new Vector2(hexagon.position.x, hexagon.position.y + 0.9));
                hexagons.push(hexagon.D);
                newHexagons.push(hexagon.D);
            }
            if (!hexagon.E) {
                hexagon.E = new Hexagon(new Vector2(hexagon.position.x - 0.775, hexagon.position.y + 0.45));
                hexagons.push(hexagon.E);
                newHexagons.push(hexagon.E);
            }
            if (!hexagon.F) {
                hexagon.F = new Hexagon(new Vector2(hexagon.position.x - 0.775, hexagon.position.y - 0.45));
                hexagons.push(hexagon.F);
                newHexagons.push(hexagon.F);
            }
            hexagon.connect();
            cb(hexagon);
        });
    }
    return hexagons;
}

export function generateHexagonGeometry(offset, height) {
    const geometry = new Geometry();
    geometry.vertices.push(new Vertex(new Vector3(0.0, offset - height - 9.0, -96.734)));
    geometry.vertices.push(new Vertex(new Vector3(-2.0, offset - height - 6.1716, -98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(2.0, offset - height - 6.1716, -98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(0.0, offset + height + 9.0, -96.734)));
    geometry.vertices.push(new Vertex(new Vector3(2.0, offset + height + 6.1716, -98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(-2.0, offset + height + 6.1716, -98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(83.7741, offset - height - 9.0, -48.367)));
    geometry.vertices.push(new Vertex(new Vector3(84.6025, offset - height - 6.1716, -51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(86.6025, offset - height - 6.1716, -47.691)));
    geometry.vertices.push(new Vertex(new Vector3(83.7741, offset + height + 9.0, -48.367)));
    geometry.vertices.push(new Vertex(new Vector3(86.6025, offset + height + 6.1716, -47.691)));
    geometry.vertices.push(new Vertex(new Vector3(84.6025, offset + height + 6.1716, -51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(83.7741, offset - height - 9.0, 48.367)));
    geometry.vertices.push(new Vertex(new Vector3(86.6025, offset - height - 6.1716, 47.691)));
    geometry.vertices.push(new Vertex(new Vector3(84.6025, offset - height - 6.1716, 51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(83.7741, offset + height + 9.0, 48.367)));
    geometry.vertices.push(new Vertex(new Vector3(84.6025, offset + height + 6.1716, 51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(86.6025, offset + height + 6.1716, 47.691)));
    geometry.vertices.push(new Vertex(new Vector3(-0.0, offset - height - 9.0, 96.734)));
    geometry.vertices.push(new Vertex(new Vector3(2.0, offset - height - 6.1716, 98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(-2.0, offset - height - 6.1716, 98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(-0.0, offset + height + 9.0, 96.734)));
    geometry.vertices.push(new Vertex(new Vector3(-2.0, offset + height + 6.1716, 98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(2.0, offset + height + 6.1716, 98.8453)));
    geometry.vertices.push(new Vertex(new Vector3(-83.7741, offset - height - 9.0, 48.367)));
    geometry.vertices.push(new Vertex(new Vector3(-84.6025, offset - height - 6.1716, 51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(-86.6025, offset - height - 6.1716, 47.691)));
    geometry.vertices.push(new Vertex(new Vector3(-83.7741, offset + height + 9.0, 48.367)));
    geometry.vertices.push(new Vertex(new Vector3(-86.6025, offset + height + 6.1716, 47.691)));
    geometry.vertices.push(new Vertex(new Vector3(-84.6025, offset + height + 6.1716, 51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(-83.7741, offset - height - 9.0, -48.367)));
    geometry.vertices.push(new Vertex(new Vector3(-86.6025, offset - height - 6.1716, -47.691)));
    geometry.vertices.push(new Vertex(new Vector3(-84.6025, offset - height - 6.1716, -51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(-83.7741, offset + height + 9.0, -48.367)));
    geometry.vertices.push(new Vertex(new Vector3(-84.6025, offset + height + 6.1716, -51.1547)));
    geometry.vertices.push(new Vertex(new Vector3(-86.6025, offset + height + 6.1716, -47.691)));
    geometry.faces.push(new Face3(27, 21, 15));
    geometry.faces.push(new Face3(0, 1, 2));
    geometry.faces.push(new Face3(3, 4, 5));
    geometry.faces.push(new Face3(6, 7, 8));
    geometry.faces.push(new Face3(9, 10, 11));
    geometry.faces.push(new Face3(12, 13, 14));
    geometry.faces.push(new Face3(15, 16, 17));
    geometry.faces.push(new Face3(18, 19, 20));
    geometry.faces.push(new Face3(21, 22, 23));
    geometry.faces.push(new Face3(24, 25, 26));
    geometry.faces.push(new Face3(27, 28, 29));
    geometry.faces.push(new Face3(30, 31, 32));
    geometry.faces.push(new Face3(33, 34, 35));
    geometry.faces.push(new Face3(18, 24, 30));
    geometry.faces.push(new Face3(3, 33, 27));
    geometry.faces.push(new Face3(30, 0, 6));
    geometry.faces.push(new Face3(31, 26, 28));
    geometry.faces.push(new Face3(31, 28, 35));
    geometry.faces.push(new Face3(25, 20, 22));
    geometry.faces.push(new Face3(25, 22, 29));
    geometry.faces.push(new Face3(23, 22, 20));
    geometry.faces.push(new Face3(23, 20, 19));
    geometry.faces.push(new Face3(13, 8, 10));
    geometry.faces.push(new Face3(13, 10, 17));
    geometry.faces.push(new Face3(7, 2, 4));
    geometry.faces.push(new Face3(7, 4, 11));
    geometry.faces.push(new Face3(12, 18, 30));
    geometry.faces.push(new Face3(12, 30, 6));
    geometry.faces.push(new Face3(11, 10, 8));
    geometry.faces.push(new Face3(11, 8, 7));
    geometry.faces.push(new Face3(15, 21, 23));
    geometry.faces.push(new Face3(15, 23, 16));
    geometry.faces.push(new Face3(9, 3, 27));
    geometry.faces.push(new Face3(9, 27, 15));
    geometry.faces.push(new Face3(33, 35, 28));
    geometry.faces.push(new Face3(33, 28, 27));
    geometry.faces.push(new Face3(17, 16, 14));
    geometry.faces.push(new Face3(17, 14, 13));
    geometry.faces.push(new Face3(15, 17, 10));
    geometry.faces.push(new Face3(15, 10, 9));
    geometry.faces.push(new Face3(3, 5, 34));
    geometry.faces.push(new Face3(3, 34, 33));
    geometry.faces.push(new Face3(29, 28, 26));
    geometry.faces.push(new Face3(29, 26, 25));
    geometry.faces.push(new Face3(9, 11, 4));
    geometry.faces.push(new Face3(9, 4, 3));
    geometry.faces.push(new Face3(18, 12, 14));
    geometry.faces.push(new Face3(18, 14, 19));
    geometry.faces.push(new Face3(4, 2, 1));
    geometry.faces.push(new Face3(4, 1, 5));
    geometry.faces.push(new Face3(21, 27, 29));
    geometry.faces.push(new Face3(21, 29, 22));
    geometry.faces.push(new Face3(0, 2, 7));
    geometry.faces.push(new Face3(0, 7, 6));
    geometry.faces.push(new Face3(35, 34, 32));
    geometry.faces.push(new Face3(35, 32, 31));
    geometry.faces.push(new Face3(6, 8, 13));
    geometry.faces.push(new Face3(6, 13, 12));
    geometry.faces.push(new Face3(24, 26, 31));
    geometry.faces.push(new Face3(24, 31, 30));
    geometry.faces.push(new Face3(19, 14, 16));
    geometry.faces.push(new Face3(19, 16, 23));
    geometry.faces.push(new Face3(18, 20, 25));
    geometry.faces.push(new Face3(18, 25, 24));
    geometry.faces.push(new Face3(30, 32, 1));
    geometry.faces.push(new Face3(30, 1, 0));
    geometry.faces.push(new Face3(1, 32, 34));
    geometry.faces.push(new Face3(1, 34, 5));
    geometry.computeFaceNormals();
    return geometry;
}
