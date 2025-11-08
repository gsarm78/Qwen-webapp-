# Qwen Chat - Full-Screen PWA

A Progressive Web App that embeds chat.qwen.ai in a full-screen iframe for native-like access on iPhone.

## What This Is

This PWA provides:
- ✅ **Full-screen standalone mode** on iPhone
- ✅ **Custom gradient "Q" icon** for your home screen
- ✅ **chat.qwen.ai embedded** in an iframe
- ✅ **No API key needed** - uses the real Qwen website
- ✅ **No Safari UI** when running as installed PWA

## Important Note

**chat.qwen.ai may block iframe embedding** due to their security headers (X-Frame-Options).

**If it works**: You'll get the full Qwen interface embedded in the app running in standalone mode - perfect!

**If it's blocked**: The app will show an error message with a button to open chat.qwen.ai directly.

This is worth trying - some sites allow iframe embedding on mobile even if they block it on desktop.

## Installation

### Step 1: Deploy the App

**GitHub Pages:**
1. Go to your repository Settings → Pages
2. Select source: Deploy from branch `claude/qwen-webapp-pwa-011CUvZ2aM7m5mXvyayg4bbu`
3. Wait for deployment
4. Your URL: `https://gsarm78.github.io/Qwen-webapp-/`

**Alternatives:**
- Netlify: Drag & drop
- Vercel: GitHub integration
- Any static hosting with HTTPS

### Step 2: Install on iPhone

1. **Open Safari** (must be Safari, not Chrome)
2. Go to your deployed URL
3. Tap the **Share button** (square with arrow up)
4. Scroll and tap **"Add to Home Screen"**
5. You'll see the custom purple "Q" icon
6. Tap **"Add"**

### Step 3: Launch & Test

1. Tap the **Qwen Chat** icon on your home screen
2. The app opens in **full-screen mode** (no Safari UI!)
3. You'll see a loading screen
4. **If successful**: chat.qwen.ai loads in the iframe - you can use it!
5. **If blocked**: You'll see an error with option to open in browser

## Features

### If Iframe Works:
- True full-screen PWA experience
- chat.qwen.ai interface embedded seamlessly
- iOS safe area support (works with notch)
- Custom icon and branding
- Standalone mode without Safari UI

### If Iframe is Blocked:
- Still provides custom icon for quick access
- One-tap launch to chat.qwen.ai
- Fallback to opening in browser

## How It Works

```
1. Install PWA → Custom icon on home screen
2. Tap icon → Opens in standalone mode (no Safari UI)
3. App loads → Shows loading screen
4. Attempts to embed chat.qwen.ai in iframe
5a. Success → Full embedded experience ✅
5b. Blocked → Error message with fallback button
```

## Troubleshooting

### Blank screen or won't load
- Wait 10 seconds - error message will appear if blocked
- Check your internet connection
- Try clearing Safari cache and reinstalling

### Opens in Safari instead of standalone
- Make sure you installed via "Add to Home Screen"
- Delete the app and reinstall
- Reboot your iPhone if needed

### Iframe shows error
- chat.qwen.ai is blocking iframe embedding
- This is a security restriction on their end
- Use the fallback button to open in browser
- Or add chat.qwen.ai directly to home screen

## Technical Details

### Architecture
- **Display Mode**: Standalone (no browser UI)
- **Embedding**: Full-screen iframe
- **Fallback**: Error handling with redirect option
- **PWA**: Complete with manifest and service worker
- **Icons**: Custom gradient design (13 sizes)

### Browser Support
- iOS Safari 11.3+ (full PWA support)
- Must use Safari for installation
- Standalone mode only works when installed

### Files
```
qwen-webapp/
├── index.html          # Main app with iframe
├── manifest.json       # PWA configuration
├── sw.js              # Service worker
├── icons/             # All icon sizes
└── README.md          # This file
```

## Alternatives

### If iframe is blocked and you want standalone mode:

**Option 1: Add chat.qwen.ai directly**
1. Open https://chat.qwen.ai in Safari
2. Add to Home Screen
3. Uses their icon (if they support PWA)

**Option 2: Build custom app with API** (requires API key)
- Build your own interface
- Use Qwen's API
- Full control but requires development

## Customization

### Change Icon Colors
Edit `create_png_icons.py`:
```python
r1, g1, b1 = 0x66, 0x7e, 0xea  # Gradient start
r2, g2, b2 = 0x76, 0x4b, 0xa2  # Gradient end
```
Then run: `python3 create_png_icons.py`

### Change App Name
Edit `manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "Short"
}
```

## Why This Approach?

This gives you the best of both worlds:
1. **Try iframe embedding** - might work on mobile even if blocked on desktop
2. **Custom icon** - branded app experience
3. **Standalone mode** - no Safari UI
4. **Graceful fallback** - error handling if embedding is blocked

## What to Expect

**Best case**: Full embedded Qwen interface in standalone PWA - amazing!

**Most likely**: Iframe blocked, but you get a quick-launch icon with custom branding that opens the site.

**Either way**: Better than typing the URL every time!

---

**Try it and see! 🚀**
