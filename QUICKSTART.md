# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- daisyUI 4
- All required dev dependencies

### Step 2: Start the Backend

Make sure the AI Image Processing backend is running:

```bash
# In your backend directory
python start_web_service.py
```

The backend should be accessible at `http://localhost:5000`

### Step 3: Start the Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🎨 What You Get

### Features Ready to Use

✅ **Drag & Drop Upload**
- Drag images directly into the upload area
- Or click to browse your files
- Supports JPG, PNG, WEBP (max 10MB)

✅ **12 AI Services**
- Document processing (5 services)
- Intelligent matting (4 services)
- Watermark removal (3 services)

✅ **Real-time Processing**
- Live status updates
- Loading animations
- Error handling with user-friendly messages

✅ **Side-by-Side Preview**
- Compare original vs processed images
- Responsive layout (stacked on mobile, side-by-side on desktop)
- Transparent background support for matting results

✅ **Dark Mode**
- Toggle button in header
- Persists to localStorage
- Custom OKLCH color theme

✅ **Download Results**
- One-click download processed images
- Preserves original filename

---

## 📱 Test the Application

### Quick Test Flow

1. **Health Check**
   - Open the app
   - Look for green checkmark (service healthy)
   - If warning appears, check backend is running

2. **Upload an Image**
   - Drag a document photo into the upload area
   - Or click and select a file
   - See file info displayed

3. **Select a Service**
   - Choose "一键变清晰" (print_auto_hq) for documents
   - Or "人像宠物" (matting_person_pet) for portraits

4. **Process**
   - Click "Process Image" button
   - Watch the progress indicator
   - See results appear on the right

5. **Download**
   - Click "Download Result" button
   - File saves to your downloads folder

---

## 🎯 File Structure Overview

```
WEB-UI/
├── src/
│   ├── app/
│   │   ├── layout.tsx        → Root layout + header/footer
│   │   ├── page.tsx          → Main page (upload, process, preview)
│   │   └── globals.css       → Global styles + animations
│   ├── components/
│   │   └── ThemeToggle.tsx   → Light/dark mode switcher
│   ├── lib/
│   │   └── api.ts            → API functions + utilities
│   └── types/
│       └── api.ts            → TypeScript types
├── tailwind.config.ts         → Theme configuration (OKLCH colors)
├── package.json              → Dependencies
└── .env.local                → API URL configuration
```

---

## 🔧 Configuration

### Change Backend URL

Edit `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://your-backend-url:5000
```

### Customize Colors

Edit [tailwind.config.ts](tailwind.config.ts:11-33):

```typescript
{
  light: {
    "primary": "oklch(66% 0.295 322.15)",  // Change these
    "secondary": "oklch(68% 0.169 237.323)",
    // ... more colors
  }
}
```

---

## 🐛 Troubleshooting

### "Cannot connect to AI service"

**Problem**: Warning banner at top of page

**Solutions**:
1. Check backend is running: `curl http://localhost:5000/api/health`
2. Verify port 5000 is not blocked
3. Check `.env.local` has correct URL

### "Processing failed"

**Problem**: Error alert after clicking process

**Solutions**:
1. Check image file is valid (JPG/PNG/WEBP)
2. Verify file size is under 10MB
3. Try a different service
4. Check backend logs for errors

### Images not displaying

**Problem**: Blank preview areas

**Solutions**:
1. Check browser console for errors
2. Try different image format
3. Ensure file uploaded successfully
4. Clear browser cache

### Theme not saving

**Problem**: Theme resets on page reload

**Solutions**:
1. Check browser allows localStorage
2. Clear site data and try again
3. Check browser console for errors

---

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

Production build includes:
- Minified JavaScript
- Optimized images
- Server-side rendering
- Static optimization

---

## 🎓 Learn More

- **Next.js Docs**: https://nextjs.org/docs
- **daisyUI Components**: https://daisyui.com/components
- **Tailwind CSS**: https://tailwindcss.com/docs
- **API Reference**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 💡 Tips

1. **Performance**: Large images take longer to process (use <2MB for best experience)
2. **Browser**: Chrome/Edge recommended for best performance
3. **Network**: Keep frontend and backend on same network for faster uploads
4. **Testing**: Use the sample images from your test data for consistent results

---

**Need Help?** Check [README.md](README.md) for detailed documentation!
