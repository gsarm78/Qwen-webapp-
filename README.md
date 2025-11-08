# Qwen Chat - Standalone Progressive Web App

A fully-featured, standalone Progressive Web App (PWA) for Qwen AI Chat that runs natively on your iPhone without opening Safari. True full-screen experience with a custom chat interface powered by the Qwen API.

## Features

- **Full Standalone Mode**: Runs as an independent app, not in Safari
- **True Full-Screen**: No browser UI, just your chat interface
- **Custom Chat Interface**: Beautiful, iOS-optimized design
- **Offline-Ready**: PWA with service worker for fast loading
- **Message History**: Conversations saved locally
- **Custom Branding**: Gradient app icon with "Q" logo
- **Multiple Models**: Choose between Qwen Max, Plus, or Turbo
- **No App Store**: Install directly from Safari

## How It Works

Unlike simple redirects, this is a complete web application that:
1. Runs entirely standalone on your iPhone
2. Uses the official Qwen API (OpenAI-compatible)
3. Stores your conversations locally
4. Works in full-screen mode without Safari UI

## Installation on iPhone

### Step 1: Deploy the App

First, host these files on a web server with HTTPS:

**GitHub Pages (Recommended):**
1. Push this repository to GitHub
2. Go to Settings → Pages
3. Deploy from your branch
4. Get your URL: `https://yourusername.github.io/qwen-webapp/`

**Other Options:**
- Netlify: Drag & drop deployment
- Vercel: GitHub integration
- Cloudflare Pages

### Step 2: Get Your Qwen API Key

1. Go to [Alibaba Cloud DashScope](https://dashscope.console.aliyun.com/apiKey)
2. Sign up/login to Alibaba Cloud
3. Create an API key
4. Copy the key (you'll need it in the app)

**Pricing**: Qwen has a generous free tier and very competitive pricing (~$0.0016 per 1K input tokens).

### Step 3: Install on iPhone

1. Open Safari and navigate to your deployed app URL
2. Tap the **Share** button (square with up arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** to confirm

### Step 4: Configure the App

1. Tap the Qwen Chat icon on your home screen
2. The app will open in **full-screen mode** (no Safari UI!)
3. Tap the ⚙️ settings button
4. Paste your API key
5. Choose your preferred model (Qwen Max recommended)
6. Tap "Save Settings"

### Step 5: Start Chatting!

Type your message and start chatting with Qwen AI. Your conversations are saved locally on your device.

## Features Guide

### Chat Interface
- **Message Input**: Type or use voice-to-text (iOS feature)
- **Send Button**: Tap to send, or press Enter on keyboard
- **Message History**: Automatically saved and restored
- **Typing Indicator**: Shows when Qwen is thinking

### Settings
- **API Key**: Your Alibaba Cloud API key (stored locally)
- **Model Selection**:
  - Qwen Max: Most capable, best for complex tasks
  - Qwen Plus: Balanced performance and speed
  - Qwen Turbo: Fastest responses

### Models Comparison

| Model | Speed | Capability | Best For |
|-------|-------|------------|----------|
| Qwen Max | Slower | Highest | Complex reasoning, coding |
| Qwen Plus | Medium | High | General conversation |
| Qwen Turbo | Fastest | Good | Quick questions |

## Technical Details

### Architecture
- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks needed)
- **API**: Alibaba Cloud Qwen API (OpenAI-compatible)
- **Storage**: LocalStorage for messages and settings
- **PWA**: Service worker for offline shell and caching

### Files Structure
```
qwen-webapp/
├── index.html          # Main app interface
├── app.js             # Application logic & API calls
├── manifest.json      # PWA configuration
├── sw.js             # Service worker
├── icons/            # App icons (all sizes)
└── README.md         # This file
```

### Privacy & Security
- **API Key**: Stored locally in your browser (never sent to our servers)
- **Messages**: Saved only on your device
- **HTTPS Required**: All API calls are encrypted
- **No Tracking**: This app doesn't collect any analytics

### Browser Support
- **iOS Safari 11.3+**: Full PWA support
- **Android Chrome 76+**: Full support
- **Desktop Browsers**: Works but limited PWA features

## Troubleshooting

### App doesn't install
- Use Safari (not Chrome or other browsers)
- Verify site is served over HTTPS
- Check manifest.json is valid

### API Key error
- Verify key is from Alibaba Cloud DashScope
- Check you've activated the API service
- Ensure you have available credits

### Messages not sending
- Check internet connection
- Verify API key is correct in settings
- Try switching to a different model

### Not running in full-screen
- Make sure you installed via "Add to Home Screen"
- Reboot iPhone if needed
- Reinstall the PWA

### Clearing Data
Open the app and run these commands in console:
```javascript
// Clear all messages
window.clearChat()

// Export messages
window.exportMessages()

// Clear everything
localStorage.clear()
```

## Development

To modify and test locally:

```bash
# Clone the repository
git clone <your-repo-url>
cd qwen-webapp

# Serve with any static server (needs HTTPS for PWA features)
python3 -m http.server 8000

# Or use
npx serve
```

For HTTPS testing on iPhone:
```bash
# Use ngrok for HTTPS tunnel
ngrok http 8000
```

## API Documentation

The app uses Qwen's OpenAI-compatible API:
- **Endpoint**: `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`
- **Format**: Same as OpenAI Chat Completions API
- **Documentation**: [Alibaba Cloud Model Studio](https://www.alibabacloud.com/help/en/model-studio/use-qwen-by-calling-api)

## Customization

### Change Colors
Edit CSS variables in `index.html`:
```css
:root {
    --primary-color: #667eea;  /* Your primary color */
    --secondary-color: #764ba2; /* Your secondary color */
}
```

### Change App Name
Edit `manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "Short"
}
```

### Add More Models
Edit the model selector in `index.html` and update `app.js` accordingly.

## Credits

- **Qwen AI**: Powered by Alibaba Cloud Qwen models
- **API**: Alibaba Cloud DashScope
- **Icons**: Custom gradient design

## License

This is an open-source wrapper app. Qwen AI and its services are subject to Alibaba Cloud's terms of service.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Verify your API key and credits
3. Check Alibaba Cloud DashScope status
4. Review browser console for errors

## Updates

This PWA auto-updates when you deploy new versions. Users will get updates the next time they open the app.

---

**Enjoy chatting with Qwen AI in true full-screen native mode on your iPhone!** 🚀
