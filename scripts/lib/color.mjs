// Color utilities: hex parsing, mixing, alpha, lighten/darken.
// Zero-dependency, used by the theme generator scripts.

/** Parse "#rrggbb" / "#rrggbbaa" (case-insensitive) into [r, g, b, a] (0-255). */
export function hexToRgba(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length === 6) h += "ff";
  if (!/^[0-9a-fA-F]{8}$/.test(h)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = parseInt(h.slice(6, 8), 16);
  return [r, g, b, a];
}

/** Serialize [r, g, b, a] (0-255) to "#rrggbb" or "#rrggbbaa". */
export function rgbaToHex(rgba, includeAlpha = true) {
  const [r, g, b, a] = rgba.map((v) => Math.round(Math.min(255, Math.max(0, v))));
  const base = `#${[r, g, b]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
  if (!includeAlpha) return base;
  return a >= 255 ? base : `${base}${a.toString(16).padStart(2, "0")}`;
}

/**
 * Mix two colors. ratio = weight of color2 (0 → c1, 1 → c2).
 * Alpha channel is mixed in the same way.
 */
export function mix(c1, c2, ratio) {
  const a = hexToRgba(c1);
  const b = hexToRgba(c2);
  const t = Math.min(1, Math.max(0, ratio));
  return rgbaToHex(a.map((v, i) => v + (b[i] - v) * t));
}

/** Overlay: place color2 with alpha `a` over color1 (compositing). */
export function overlay(c1, c2, a) {
  const base = hexToRgba(c1);
  const top = hexToRgba(c2);
  const t = Math.min(1, Math.max(0, a));
  const out = base.map((v, i) => v * (1 - t) + top[i] * t);
  out[3] = 255;
  return rgbaToHex(out);
}

/** Append an alpha channel (0-1) to a hex color → "#rrggbbaa". */
export function alpha(hex, a) {
  const [r, g, b] = hexToRgba(hex);
  const aa = Math.round(Math.min(1, Math.max(0, a)) * 255);
  return rgbaToHex([r, g, b, aa]);
}

/** Lighten toward white (amount 0-1) or darken toward black (negative). */
export function shade(hex, amount) {
  const [r, g, b] = hexToRgba(hex);
  const t = Math.min(1, Math.max(-1, amount));
  if (t >= 0) {
    return rgbaToHex([r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t]);
  }
  return rgbaToHex([r * (1 + t), g * (1 + t), b * (1 + t)]);
}

/** Relative luminance (0-1) per WCAG. */
export function luminance(hex) {
  const [r, g, b] = hexToRgba(hex);
  const [rr, gg, bb] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

/** WCAG contrast ratio between two colors (1-21). */
export function contrast(c1, c2) {
  const l1 = luminance(c1);
  const l2 = luminance(c2);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}
