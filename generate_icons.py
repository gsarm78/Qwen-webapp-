#!/usr/bin/env python3
"""Generate PWA icons for Qwen Chat app"""

import os
from pathlib import Path

# SVG template for the icon
def create_svg_icon(size):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background with rounded corners -->
  <rect width="{size}" height="{size}" rx="{size * 0.2}" fill="url(#grad)"/>

  <!-- Q letter -->
  <text x="50%" y="50%"
        font-family="Arial, Helvetica, sans-serif"
        font-size="{size * 0.6}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="central">Q</text>
</svg>'''

def main():
    # Icon sizes needed for PWA and iOS
    sizes = [16, 32, 72, 96, 120, 128, 144, 152, 167, 180, 192, 256, 512]

    icons_dir = Path('icons')
    icons_dir.mkdir(exist_ok=True)

    for size in sizes:
        svg_content = create_svg_icon(size)
        svg_path = icons_dir / f'icon-{size}.svg'

        with open(svg_path, 'w') as f:
            f.write(svg_content)

        print(f'Created {svg_path}')

        # Convert SVG to PNG using ImageMagick or similar
        # For now, we'll try to use rsvg-convert if available
        png_path = icons_dir / f'icon-{size}.png'

        # Try multiple conversion tools
        conversion_commands = [
            f'rsvg-convert -w {size} -h {size} {svg_path} -o {png_path}',
            f'convert -background none -size {size}x{size} {svg_path} {png_path}',
            f'inkscape --export-type=png --export-width={size} --export-height={size} --export-filename={png_path} {svg_path}'
        ]

        converted = False
        for cmd in conversion_commands:
            result = os.system(f'{cmd} 2>/dev/null')
            if result == 0 and png_path.exists():
                print(f'Converted to {png_path}')
                converted = True
                break

        if not converted:
            print(f'Warning: Could not convert {svg_path} to PNG. SVG will be used as fallback.')

if __name__ == '__main__':
    main()
