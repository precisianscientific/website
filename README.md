# Precisian Scientific Website

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-blue?style=flat-square)](https://precisianscientific.github.io/website/)
[![Website](https://img.shields.io/badge/Website-Live-green?style=flat-square)](https://precisianscientific.in/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952b3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.1-339af0?style=flat-square&logo=font-awesome)](https://fontawesome.com/)

A modern, responsive website for **Precisian Scientific** - a precision laboratory hardware supplier in West Bengal, India. Built with Bootstrap 5, featuring glassmorphism design and optimized for GitHub Pages deployment with custom domain.

> **Note**: This is a public repository for demonstration purposes only. This website and its contents are proprietary to Precisian Scientific.

## 🌐 Live Demo

**Website**: [https://precisianscientific.in/](https://precisianscientific.in/)

## ✨ Features

### 🎨 Design & UX
- **Glassmorphism Hero**: Beautiful backdrop blur effect with transparency
- **Material Design**: Consistent color scheme and typography
- **Responsive Layout**: Optimized for all devices (360px - 1440px)
- **Smooth Animations**: Hover effects and transitions throughout

### 🛠️ Technical Features
- **Bootstrap 5**: Modern responsive grid system and utilities
- **Font Awesome 6**: Professional icons for contact and features
- **Google Fonts**: Roboto typography for excellent readability
- **Performance Optimized**: Lazy loading, efficient CSS, and CDN resources

### 📱 Responsive Design
- **Mobile First**: Optimized for smartphones and tablets
- **Flexible Grid**: Bootstrap 5 responsive breakpoints
- **Touch Friendly**: Proper spacing and touch targets

### 100% Static: No JavaScript or dynamic dependencies. Works on any static host.

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Git (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/precisianscientific/website.git
   cd website
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000`

3. **Deploy to GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Set source to main branch

## 📁 Project Structure

```
website/
├── index.html              # Main HTML file
├── gallery.html            # Photo gallery page
├── services.html           # Consulting services page
├── style.css               # Custom CSS styles
├── README.md               # This documentation
├── DEPLOYMENT.md           # Deployment instructions
├── LICENSE                 # License and usage restrictions
├── sitemap.xml             # Sitemap for SEO
├── robots.txt              # Robots file for SEO
├── CNAME                   # Custom domain for GitHub Pages
├── .gitignore              # Git ignore rules
├── .github/                # GitHub workflows and config
└── assets/
    ├── logo.png            # Company logo
    ├── background.jpg      # Hero background image
    ├── microscope.jpg      # Product showcase image
    ├── pipette.jpg         # Product showcase image
    ├── centrifuge.jpg      # Product showcase image
    ├── agmark.png          # AGMARK logo
    ├── fssai.png           # FSSAI logo
    ├── nabl.png            # NABL logo
    ├── grass.png           # Grass overlay for AGMARK
    ├── photogallery/       # Work gallery images
    └── favicon/            # Favicon and app icons
        ├── favicon.ico
        ├── apple-touch-icon.png
        ├── site.webmanifest
        └── web-app-manifest-*.png
```

> **Note:** This site is fully static and does not require or use any JavaScript for layout, navigation, or interactivity. All navigation and layout is pure HTML/CSS and works on any static host (GitHub Pages, Netlify, Vercel, etc).

## 🎯 Website Sections

### 1. Header Navigation
- **Fixed Header**: Stays at top during scroll
- **Responsive Logo**: Scales appropriately on all devices
- **Smooth Navigation**: Internal links with smooth scrolling

### 2. Hero Section
- **Glassmorphism Effect**: Backdrop blur with transparency
- **Background Image**: Professional laboratory background
- **Call-to-Action**: Clear value proposition

### 3. About Section
- **Company Overview**: Mission and values
- **Professional Layout**: Centered content with proper spacing

### 4. Product Showcase
- **Responsive Grid**: 3 columns desktop, 2 tablet, 1 mobile
- **Product Cards**: Hover effects and elevation
- **Lazy Loading**: Optimized image loading

### 5. Why Choose Us
- **Feature List**: Key benefits with icons
- **Grid Layout**: Responsive feature display
- **Visual Hierarchy**: Clear information structure

### 6. Contact Section
- **Multiple Channels**: Email, phone, and WhatsApp
- **Icon Integration**: Font Awesome icons for each method
- **Accessibility**: Proper ARIA labels and semantic markup

## 🛠️ Technology Stack

### Frontend Framework
- **Bootstrap 5.3.2**: CSS framework with responsive grid
- **Custom CSS**: Material Design and glassmorphism effects

### External Libraries
- **Font Awesome 6.5.1**: Icon library
- **Google Fonts**: Roboto typography

### Performance & SEO
- **Meta Tags**: Open Graph and Twitter Card support
- **Favicon**: Complete favicon set for all devices
- **Accessibility**: ARIA labels and semantic HTML
- **Image Optimization**: Lazy loading and responsive images

## 📱 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|------------|---------|
| Mobile | < 576px | Single column, compact spacing |
| Tablet | 576px - 768px | Two column grid |
| Desktop | 768px - 992px | Three column grid |
| Large | > 992px | Full layout with maximum width |

## 🎨 Customization

### Colors
Edit CSS custom properties in `style.css`:
```css
:root {
  --primary-blue: #1976d2;    /* Main brand color */
  --surface: #ffffff;         /* Card backgrounds */
  --background: #fafafa;      /* Page background */
  --on-surface: #212121;      /* Text color */
}
```

### Content Updates
- **Contact Info**: Update in `index.html` contact section
- **Product Images**: Replace files in `assets/` folder
- **Company Info**: Modify text content as needed

### Styling Modifications
- **Glassmorphism**: Adjust in `.hero-content` class
- **Animations**: Modify transition properties
- **Layout**: Use Bootstrap utility classes

## 🔧 Development

### Local Development
```bash
# Start local server
python -m http.server 8000

# Or use Node.js
npx serve .

# Or use PHP
php -S localhost:8000
```

### Code Organization
- **HTML**: Semantic structure with Bootstrap classes
- **CSS**: Custom properties for theming
- **Assets**: Optimized images and icons

## 📊 Performance

### Optimization Features
- **CDN Resources**: Bootstrap and Font Awesome from CDN
- **Lazy Loading**: Images load as needed
- **Minified CSS**: Efficient stylesheet
- **Optimized Images**: Compressed product images

### Loading Speed
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |
| Chrome Mobile | 90+ | ✅ Full |

## 📞 Contact Information

**Precisian Scientific**
- **Email**: [precisianinstrument@gmail.com](mailto:precisianinstrument@gmail.com)
- **Phone**: [+91 7001796779](tel:+917001796779) | [+91 9832910263](tel:+919832910263)
- **WhatsApp**: [+91 7001796779](https://wa.me/917001796779)
- **Location**: West Bengal, India

## 📄 License

© 2025 Precisian Scientific. All rights reserved.

**PROPRIETARY AND CONFIDENTIAL**

This repository and its contents are the exclusive property of Precisian Scientific. All rights are reserved. This software and documentation are provided "AS IS" without warranty of any kind.

### Usage Restrictions:
- **No Redistribution**: This code may not be redistributed, copied, or shared
- **No Modifications**: No modifications, derivatives, or adaptations are permitted
- **No Commercial Use**: Commercial use by third parties is strictly prohibited
- **Viewing Only**: This repository is for viewing and demonstration purposes only

### Legal Notice:
Unauthorized copying, distribution, modification, public display, or public performance of this proprietary work is strictly prohibited and may result in legal action.

## 🤝 Contributing

**NO CONTRIBUTIONS ACCEPTED**

This is a proprietary business website. We do not accept:
- Pull requests
- Feature requests
- Bug reports
- Code contributions
- Issue submissions

For business inquiries only, please contact us directly through the website.

## 📈 Deployment Status

- **GitHub Pages**: ✅ Live at https://precisianscientific.github.io/website/
- **Custom Domain**: ✅ Live at https://precisianscientific.in/
- **SSL Certificate**: ✅ Active
- **Mobile Optimization**: ✅ Complete
- **SEO Optimization**: ✅ Implemented
- **Accessibility**: ✅ WCAG 2.1 Compliant
- **Repository**: Public (viewing only)

---

**Built with ❤️ for Precisian Scientific**

*Last updated: July 2025* 