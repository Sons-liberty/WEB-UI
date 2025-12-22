# AI Image Processing - Web UI

A modern, responsive web interface for AI-powered image processing services built with Next.js 14, TypeScript, daisyUI 4, and Tailwind CSS.

## Features

- **Multiple AI Services**: Document processing, intelligent matting, and watermark removal
- **Drag & Drop Upload**: Easy file upload with drag-and-drop support
- **Real-time Processing**: Live status updates during image processing
- **Side-by-Side Preview**: Compare original and processed images
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Optimized for mobile and desktop
- **Type-Safe**: Full TypeScript implementation
- **Modern UI**: Built with daisyUI components and custom OKLCH color theme

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + daisyUI 4
- **API Client**: Native Fetch API
- **State Management**: React Hooks

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- AI Image Processing Backend running on `http://localhost:5000`
  - See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for backend setup

## Installation

1. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Configure environment variables**:

The `.env.local` file is already configured with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Modify if your backend runs on a different port.

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
WEB-UI/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with theme toggle
│   │   ├── page.tsx            # Main homepage component
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── ThemeToggle.tsx     # Theme switcher component
│   ├── lib/
│   │   └── api.ts              # API utility functions
│   └── types/
│       └── api.ts              # TypeScript type definitions
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind & daisyUI configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
└── .env.local                  # Environment variables
```

## Available AI Services

### Document Processing (文档处理)
- **一键变清晰** (`print_auto_hq`): Full processing with correction, flattening, shadow/black removal
- **变清晰** (`print_auto_hq_no_dewarp`): Processing without correction
- **去阴影** (`print_deshadow`): Remove document shadows
- **去黑底** (`print_deblack`): Remove black backgrounds
- **美化增强** (`print_enhance`): Beautify and enhance text

### Intelligent Matting (智能抠图)
- **人像宠物** (`matting_person_pet`): People and pets
- **商品物品** (`matting_stuff`): Products and objects
- **图形Logo** (`matting_graphic_logo`): Graphics and logos
- **文字印章** (`matting_text_seal`): Text and seals

### Watermark Removal (去水印)
- **自动** (`watermark_auto`): Auto-detect and remove
- **自然** (`watermark_nature`): Natural scenes
- **文档** (`watermark_doc`): Document scenes

## Usage

1. **Select Service**: Choose an AI service from the dropdown
2. **Upload Image**: Drag & drop or click to browse (JPG, PNG, WEBP up to 10MB)
3. **Process**: Click "Process Image" button
4. **Download**: Download the processed result

## API Integration

The application connects to the Flask backend at `http://localhost:5000`.

Key API endpoints used:
- `GET /api/health` - Service health check
- `GET /api/services` - Get available services
- `POST /api/process` - Process single image

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## Customization

### Theme Colors

The custom light theme is configured in [tailwind.config.ts](tailwind.config.ts) using OKLCH color space:

```typescript
{
  light: {
    "primary": "oklch(66% 0.295 322.15)",
    "secondary": "oklch(68% 0.169 237.323)",
    "accent": "oklch(62% 0.214 259.815)",
    // ... more colors
  }
}
```

Dark mode uses daisyUI's built-in dark theme, toggled via `data-theme` attribute.

### Styling

Custom styles are in [src/app/globals.css](src/app/globals.css):
- `.alpha-background` - Checkerboard pattern for transparent images
- `.dropzone` - File upload area styling
- Custom scrollbar styles

## Error Handling

The application handles various error scenarios:
- **Service Unavailable**: Shows warning if backend is not running
- **Invalid File**: Validates file type and size
- **Processing Errors**: Displays error messages from API
- **Network Errors**: Catches and displays connection issues

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Considerations

- Images are converted to base64 for API transmission
- Large images (>10MB) may cause processing delays
- Results are cleared when uploading new images to save memory

## Troubleshooting

### Backend Connection Issues

If you see "Cannot connect to AI service":

1. Ensure the Flask backend is running on port 5000
2. Check CORS is enabled in the backend
3. Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`

### Build Errors

If TypeScript errors occur:

```bash
npm run lint
```

### Theme Not Persisting

Theme preference is saved to `localStorage`. Clear browser cache if issues persist.

## Contributing

This is a sample development project. For production use:

1. Add authentication/authorization
2. Implement rate limiting
3. Add image compression before upload
4. Implement caching strategies
5. Add comprehensive error logging

## License

This project is for demonstration purposes.

## Related Documentation

- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference
- [PLAN.md](PLAN.md) - Project plan and requirements

---

**Built with**: Next.js 14 | TypeScript | daisyUI 4 | Tailwind CSS
