// One-off asset generator: OG PNG (from the existing SVG banner) + square app icons.
// Run: node scripts/gen-assets.mjs
import sharp from "sharp"
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

// 1. OG image: SVG banner -> PNG (most social scrapers reject SVG OG images).
const ogSvg = await readFile(join(root, "public", "og-image.svg"))
await sharp(ogSvg).png().toFile(join(root, "public", "og-image.png"))

// 2. Square app icon — carbon tile + cyan brand mark (geometric, font-independent).
const iconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#040a15"/>
      <stop offset="100%" stop-color="#010409"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="#7dd3fc" stroke-opacity="0.22" stroke-width="6"/>
  <path d="M128 360 L128 160 L256 296 L384 160 L384 360"
        fill="none" stroke="#7dd3fc" stroke-width="40"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toFile(join(root, "app", "icon.png"))
await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(join(root, "app", "apple-icon.png"))

console.log("Generated public/og-image.png, app/icon.png, app/apple-icon.png")
