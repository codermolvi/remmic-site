# Luxury Countdown Landing Page

A premium, luxury-styled countdown landing page built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- ✨ Luxury gray + gold color scheme
- ⏰ Flip-style animated countdown timer
- 📧 Email subscription form with API integration
- 🎨 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🌟 Premium typography and design elements
- 🔄 Real-time countdown updates

## Getting Started

### Installation

1. Navigate to the countdown directory:
```bash
cd countdown
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
countdown/
├── components/
│   ├── FlipTimer.tsx      # Flip-style countdown timer
│   ├── Hero.tsx           # Hero section with headlines
│   ├── SubscribeForm.tsx  # Email subscription form
│   └── Footer.tsx         # Footer with social links
├── pages/
│   ├── api/
│   │   └── subscribe.ts   # Email subscription API endpoint
│   ├── _app.tsx          # Next.js app wrapper
│   ├── _document.tsx     # Document structure
│   └── index.tsx         # Main landing page
├── styles/
│   └── globals.css       # Global styles and animations
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies and scripts
```

## Customization

### Change Countdown Target Date

Edit the target date in `components/FlipTimer.tsx`:
```typescript
targetDate.current.setDate(targetDate.current.getDate() + 30) // Change 30 to desired days
```

### Update Brand Name

Replace "LUXE" with your brand name in:
- `components/Footer.tsx`
- `pages/_app.tsx` (meta tags)

### Modify Colors

Customize the color palette in `tailwind.config.js`:
```javascript
luxury: {
  gold: '#C9A74D',        // Main gold color
  charcoal: '#1A1A1A',    // Main dark color
  // Add more custom colors
}
```

### Email Service Integration

Update the API endpoint in `pages/api/subscribe.ts` to connect with your email service:
- Mailchimp
- SendGrid
- ConvertKit
- Custom database

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.