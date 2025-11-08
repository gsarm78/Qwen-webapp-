# Qwen Chat - Progressive Web App Launcher

A Progressive Web App (PWA) launcher for Qwen AI Chat that provides quick access with a branded app icon on your iPhone.

## Features

- Custom app icon on your home screen
- Quick launcher with branded loading screen
- No app store required
- Works as a shortcut to chat.qwen.ai
- iOS-optimized

## Important Note

Due to security restrictions (X-Frame-Options), the Qwen Chat website cannot be embedded in an iframe. This app serves as a launcher that:
1. Shows a branded loading screen
2. Redirects you to chat.qwen.ai

For a true full-screen experience, you can also add chat.qwen.ai directly to your home screen from Safari.

## Installation Options

### Option A: Use This PWA Launcher (Recommended for Custom Icon)

#### Step 1: Open in Safari
1. Open Safari on your iPhone (this won't work in Chrome or other browsers)
2. Navigate to your deployed app URL

#### Step 2: Add to Home Screen
1. Tap the **Share** button (square with arrow pointing up) at the bottom of Safari
2. Scroll down and tap **"Add to Home Screen"**
3. You'll see the custom Qwen Chat icon with gradient "Q" logo
4. Tap **"Add"** in the top right corner

#### Step 3: Launch the App
1. Find the Qwen Chat icon on your home screen
2. Tap it to see the branded loading screen
3. You'll be redirected to chat.qwen.ai in Safari

### Option B: Add chat.qwen.ai Directly (For Full Standalone Mode)

If chat.qwen.ai supports PWA features:

1. Open Safari and go to https://chat.qwen.ai
2. Tap the Share button
3. Tap "Add to Home Screen"
4. This will use Qwen's own icon and may provide better full-screen integration

**Note:** Option A gives you a prettier custom icon, while Option B (if supported) provides better standalone functionality.

## Deployment

### Option 1: GitHub Pages

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select the branch to deploy (usually `main` or `master`)
4. Your app will be available at `https://yourusername.github.io/qwen-webapp/`

### Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop this folder to deploy
3. Your app will be live instantly with a custom URL

### Option 3: Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Import this repository
3. Deploy with one click

### Option 4: Any Static Host

This is a static web app - just upload all files to any web hosting service:
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages
- Any web server with HTTPS support

**Important:** HTTPS is required for PWA features to work on iOS.

## Project Structure

```
qwen-webapp/
├── index.html          # Main HTML file with PWA setup
├── manifest.json       # PWA manifest for installation
├── sw.js              # Service worker for offline support
├── icons/             # App icons for various sizes
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-120.png
│   ├── icon-180.png
│   └── ...
├── generate_icons.py   # Script to generate SVG icons
├── create_png_icons.py # Script to generate PNG icons
└── README.md          # This file
```

## Technical Details

### PWA Features
- **Manifest**: Defines app name, icons, and display mode
- **Service Worker**: Enables offline functionality and caching
- **iOS Meta Tags**: Optimizes for iOS installation and full-screen mode

### Browser Support
- iOS Safari 11.3+
- Android Chrome 76+
- Desktop browsers (limited PWA features)

### Privacy
This app is a wrapper around chat.qwen.ai. All data and privacy policies are governed by Qwen AI.

## Customization

### Change App Name
Edit `manifest.json`:
```json
"name": "Your App Name",
"short_name": "Short Name"
```

### Change Colors
Edit `manifest.json`:
```json
"theme_color": "#your-color",
"background_color": "#your-color"
```

Edit `index.html` for gradient colors in the loading screen.

### Change Icons
Run the icon generation scripts:
```bash
python3 create_png_icons.py
```

Or replace the icons in the `icons/` directory with your own.

## Troubleshooting

### App doesn't install
- Make sure you're using Safari (not Chrome)
- Verify the site is served over HTTPS
- Check that manifest.json is valid

### Full-screen mode not working
- Verify the meta tags in index.html
- Make sure you installed via "Add to Home Screen"
- Check iOS version (needs 11.3+)

### Icons not showing
- Clear Safari cache
- Regenerate icons with correct sizes
- Verify icon paths in manifest.json

## Development

To modify and test locally:

1. Clone the repository
2. Make your changes
3. Serve locally with HTTPS (required for PWA):
   ```bash
   # Using Python
   python3 -m http.server 8000

   # Or use any local server
   npx serve
   ```
4. Test on your device (may need ngrok or similar for HTTPS)

## License

This is a wrapper app for educational purposes. Qwen AI and its services are subject to their own terms of service.

## Credits

- Qwen AI: https://chat.qwen.ai
- PWA implementation: Custom wrapper for iOS optimization
