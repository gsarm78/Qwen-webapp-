# Qwen Chat - PWA Launcher

A simple Progressive Web App that provides a custom icon for accessing chat.qwen.ai on your iPhone.

## What This Does

This PWA wrapper allows you to:
- Install **chat.qwen.ai** on your iPhone home screen with a **custom icon**
- Access the **real Qwen chat interface** (no API key needed)
- Launch from a beautiful gradient "Q" icon
- Quick access to Qwen without typing the URL

## How It Works

1. You install this PWA on your iPhone
2. When you tap the icon, it redirects to chat.qwen.ai
3. You get the actual Qwen website with all its features
4. No API keys, no custom code - just the real chat.qwen.ai

## Installation on iPhone

### Step 1: Deploy

Deploy this to GitHub Pages or any static host:

**GitHub Pages:**
1. Go to your repo Settings → Pages
2. Deploy from your branch
3. Get your URL (e.g., `https://yourusername.github.io/qwen-webapp/`)

**Other Options:**
- Netlify
- Vercel
- Cloudflare Pages

### Step 2: Install on iPhone

1. Open **Safari** (must be Safari, not Chrome)
2. Navigate to your deployed URL
3. Tap the **Share** button (square with up arrow)
4. Scroll and tap **"Add to Home Screen"**
5. You'll see the custom purple gradient "Q" icon
6. Tap **"Add"**

### Step 3: Use It

1. Tap the Qwen Chat icon on your home screen
2. It will open chat.qwen.ai
3. Use the actual Qwen interface (no login needed on their side if they don't require it)

## What You Get

- ✅ Custom gradient "Q" icon on your home screen
- ✅ Direct access to chat.qwen.ai
- ✅ No API key required
- ✅ The real Qwen interface with all features
- ✅ Quick launcher instead of typing the URL

## Files

```
qwen-webapp/
├── index.html          # Simple redirect page
├── manifest.json       # PWA config with custom icons
├── sw.js              # Service worker
├── icons/             # Custom gradient Q icons
└── README.md          # This file
```

## Note

This is a simple launcher/wrapper. When you tap the icon:
- It shows a brief loading screen
- Then redirects to https://chat.qwen.ai
- You use their actual website

Think of this as a bookmark with a pretty icon that makes it feel like a native app.

## Customization

### Change Icon Colors

Edit `create_png_icons.py` and regenerate:
```python
r1, g1, b1 = 0x66, 0x7e, 0xea  # Start color
r2, g2, b2 = 0x76, 0x4b, 0xa2  # End color
```

### Change App Name

Edit `manifest.json`:
```json
{
  "name": "Your Name",
  "short_name": "Short"
}
```

## Troubleshooting

**App opens in Safari instead of standalone:**
- This is normal behavior when redirecting to an external URL
- iOS will open chat.qwen.ai in Safari even from the PWA
- The benefit is having a custom icon for quick access

**Icon doesn't show:**
- Make sure you're using Safari
- Clear Safari cache
- Try reinstalling

**Want true standalone mode?**
- Unfortunately, chat.qwen.ai blocks iframe embedding
- The only way to get their interface is to redirect, which opens Safari
- For true standalone PWA, you'd need to build a custom app with their API (requires API key)

## Alternative

If you want **true standalone full-screen mode** with the Qwen interface:
1. Open Safari and go directly to https://chat.qwen.ai
2. Tap Share → Add to Home Screen
3. This will use their own icon (if they have PWA support)

This wrapper is useful if you want a **custom icon** instead of their default one.

---

**Simple, clean access to Qwen Chat with your own branding!**
