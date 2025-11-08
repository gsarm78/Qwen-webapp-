#!/usr/bin/env python3
"""Generate PNG icons for Qwen Chat app using PIL"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("PIL not available. Installing pillow...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'pillow'])
    from PIL import Image, ImageDraw, ImageFont

from pathlib import Path

def create_gradient(width, height):
    """Create a gradient background"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    # Create gradient from #667eea to #764ba2
    r1, g1, b1 = 0x66, 0x7e, 0xea  # Start color
    r2, g2, b2 = 0x76, 0x4b, 0xa2  # End color

    for y in range(height):
        # Calculate color for this row
        ratio = y / height
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)

        draw.line([(0, y), (width, y)], fill=(r, g, b))

    return img

def create_icon(size):
    """Create an icon with gradient background and 'Q' text"""
    # Create gradient background
    img = create_gradient(size, size)

    # Create a rounded rectangle mask
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    radius = int(size * 0.2)
    mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=255)

    # Apply mask
    rounded_img = Image.new('RGB', (size, size), (255, 255, 255))
    rounded_img.paste(img, (0, 0), mask)

    # Draw text
    draw = ImageDraw.Draw(rounded_img)

    # Try to use a nice font, fall back to default if not available
    font_size = int(size * 0.6)
    try:
        # Try common font paths
        font_paths = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
            '/System/Library/Fonts/Helvetica.ttc',
            'C:\\Windows\\Fonts\\arial.ttf',
        ]
        font = None
        for font_path in font_paths:
            try:
                font = ImageFont.truetype(font_path, font_size)
                break
            except:
                continue

        if font is None:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    # Draw 'Q' in the center
    text = "Q"
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1]

    draw.text((x, y), text, fill=(255, 255, 255), font=font)

    return rounded_img

def main():
    sizes = [16, 32, 72, 96, 120, 128, 144, 152, 167, 180, 192, 256, 512]

    icons_dir = Path('icons')
    icons_dir.mkdir(exist_ok=True)

    for size in sizes:
        icon = create_icon(size)
        png_path = icons_dir / f'icon-{size}.png'
        icon.save(png_path, 'PNG')
        print(f'Created {png_path}')

if __name__ == '__main__':
    main()
