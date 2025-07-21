# GitHub Pages Deployment Guide

This guide will help you deploy the Precisian Scientific website to GitHub Pages with custom domain precisianscientific.in.

## 🚀 Quick Deployment

### Step 1: GitHub Repository Setup

The repository is already created at: https://github.com/precisianscientific/website

1. Go to [GitHub](https://github.com/precisianscientific/website)
2. The repository should be **Public** (required for free GitHub Pages)
3. Clone the repository to your local machine

### Step 2: Upload Website Files

#### Option A: Using Git (Recommended)
```bash
# Clone the repository
git clone https://github.com/precisianscientific/website.git
cd website

# Copy all website files to this directory
# (index.html, style.css, assets/ folder, README.md, etc.)

# Add all files
git add .

# Commit changes
git commit -m "Initial website deployment"

# Push to GitHub
git push origin main
```

#### Option B: Using GitHub Web Interface
1. Go to https://github.com/precisianscientific/website
2. Click "Add file" → "Upload files"
3. Drag and drop all website files
4. Commit changes

> **Note**: This repository is public for GitHub Pages hosting but contains proprietary content. See LICENSE file for usage restrictions.

### Step 3: Enable GitHub Pages

1. Go to https://github.com/precisianscientific/website
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### Step 4: Configure Custom Domain

1. In the same Pages section, enter your custom domain: `precisianscientific.in`
2. Check "Enforce HTTPS" (recommended)
3. Click "Save"

The CNAME file is already included in the repository with the correct domain.

### Step 5: Configure DNS

Add these DNS records at your domain registrar (precisianscientific.in):

```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: precisianscientific.github.io
```

### Step 6: Wait for Deployment

- GitHub Pages will automatically build and deploy your site
- You'll see a green checkmark when deployment is complete
- Your site will be available at: `https://precisianscientific.in/`
- GitHub Pages URL will also work: `https://precisianscientific.github.io/website/`

## 📁 File Structure for GitHub Pages

Ensure your repository has this structure:
```
repository-root/
├── index.html              # Main page (required)
├── style.css               # Styles
├── README.md               # Documentation
├── LICENSE                 # Proprietary license
├── .gitignore              # Git ignore rules
├── DEPLOYMENT.md           # This file
├── CNAME                   # Custom domain configuration
└── assets/
    ├── logo.png
    ├── background.jpg
    ├── microscope.jpg
    ├── pipette.jpg
    ├── centrifuge.jpg
    └── favicon/
        ├── favicon.ico
        ├── apple-touch-icon.png
        ├── site.webmanifest
        └── web-app-manifest-*.png
```

## ⚡ Performance Optimization

- **Image Compression**: All images in the /assets folder have been compressed to ensure fast load times without sacrificing quality.

### Image Optimization (Optional)

For optimal performance, consider compressing large images:

- **Product images**: 800x600px, max 200KB
- **Background image**: 1920x1080px, max 500KB
- **Logo**: 200x100px, max 50KB

### Tools for Image Optimization:
- [TinyPNG](https://tinypng.com/) - Online compression
- [Squoosh](https://squoosh.app/) - Google's image optimization tool

## 🔧 Custom Domain Configuration

The website is configured for the domain `precisianscientific.in`:

1. **CNAME File**: Already included in repository with `precisianscientific.in`
2. **DNS Configuration**: Point your domain to GitHub Pages IP addresses
3. **SSL Certificate**: GitHub Pages automatically provides SSL certificates
4. **Redirects**: GitHub Pages handles www to non-www redirects automatically

## 📊 Monitoring

### Check Deployment Status
- Go to repository → Actions tab
- View deployment logs
- Check for any build errors
- Monitor custom domain status

### Performance Testing
- Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Test on mobile and desktop
- Check Core Web Vitals
- Monitor both GitHub Pages and custom domain URLs

## 🐛 Troubleshooting

**File Deletion Errors**
- If you have trouble deleting files locally using PowerShell due to permissions, use the `-Force` flag. For example: `Remove-Item -Path '.\unwanted-file.txt' -Force`.

### Common Issues:

**404 Error**
- Ensure `index.html` is in the root directory
- Check file paths are correct (use relative paths)

**Images Not Loading**
- Verify image files are in the correct folders
- Check file names match exactly (case-sensitive)

**Styling Issues**
- Ensure `style.css` is properly linked
- Check for CSS syntax errors

**Slow Loading**
- Optimize large images
- Check for broken external links
- Verify CDN resources are loading

## 🔒 Security Considerations

### HTTPS
- GitHub Pages automatically provides SSL certificates
- All traffic is encrypted by default
- HTTPS is enforced for custom domains

### External Resources
- Bootstrap and Font Awesome are loaded from CDN
- Ensure CDN links have integrity checks (already included)
- All external resources use HTTPS



## 🎯 Best Practices

1. **Keep files organized** in logical folders
2. **Use descriptive file names**
3. **Optimize images** before uploading
4. **Test locally** before deploying
5. **Monitor performance** regularly
6. **Keep dependencies updated**

## 🔒 Repository Restrictions

This repository is configured for public viewing but with strict usage restrictions:

- **No Contributions**: Pull requests, issues, and discussions are disabled
- **Viewing Only**: Code is for demonstration purposes only
- **Proprietary Content**: All rights reserved by Precisian Scientific
- **No Redistribution**: Copying or sharing is prohibited
- **No Modifications**: No derivatives or adaptations allowed

For business inquiries only, contact through the website.

## 📞 Support

If you encounter issues:
1. Check GitHub Pages documentation
2. Review deployment logs in Actions tab
3. Verify all files are properly uploaded
4. Test with a simple HTML file first

---

**Deployment Status**: ✅ Ready for GitHub Pages
**Target Domain**: precisianscientific.in
**Repository**: https://github.com/precisianscientific/website
**Last Updated**: January 2025 