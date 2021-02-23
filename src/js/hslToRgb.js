const clamp = x => x < 0 ? 0 : x > 1 ? 1 : x;

const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 0.5) return q;
    return t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p;
};

export const hslToRgb = (h, s, l) => {
    if (s === 0) return [ clamp(l), clamp(l), clamp(l) ];
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);
    return [ clamp(r), clamp(g), clamp(b) ];
};
