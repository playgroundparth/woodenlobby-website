# Woodenlobby - Complete Deployment Guide 🚀

This guide will walk you through setting up and deploying your Woodenlobby furniture website from scratch. No prior technical knowledge required!

## 📋 Table of Contents

1. [What You'll Need](#what-youll-need)
2. [Setting Up Google Sheets (Your Data Source)](#setting-up-google-sheets)
3. [Local Development Setup](#local-development-setup)
4. [Deploying to Vercel (Recommended)](#deploying-to-vercel)
5. [Alternative Deployment Options](#alternative-deployment-options)
6. [Managing Your Content](#managing-your-content)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance & Updates](#maintenance--updates)

---

## 🛠️ What You'll Need

Before we start, make sure you have:

- A computer (Windows, Mac, or Linux)
- Internet connection
- A Google account (for Google Sheets)
- A GitHub account (free to create)
- 30-60 minutes of your time

**You do NOT need:**
- Any programming knowledge
- Paid hosting (we'll use free options)
- Special software (everything we need is free)

---

## 📊 Setting Up Google Sheets (Your Data Source)

Your website gets its product information from Google Sheets. Let's set this up first:

### Step 1: Create Your Product Catalog Sheet

1. **Go to Google Sheets**: Open [sheets.google.com](https://sheets.google.com) in your browser
2. **Create a new sheet**: Click "Blank" to create a new spreadsheet
3. **Name your sheet**: Click "Untitled spreadsheet" at the top and rename it to "Woodenlobby Catalog"

4. **Set up the columns**: In row 1, add these exact column headers:
   ```
   category | product_name | price_display | mrp_optional | badge | short_desc | image1 | image2 | image3 | product_slug | status | specifications_content | overview_content
   ```

5. **Add sample data** (Row 2):
   ```
   Beds | Aurora Platform Bed (King) | ₹42,000 | ₹48,000 | New | Elegant king-size platform bed with modern design | https://example.com/bed1.jpg |  |  | aurora-platform-bed-king | Active | **Dimensions:** 6ft x 6.5ft | Premium solid wood construction with modern aesthetics
   ```

### Step 2: Create Your Generic Content Sheet

1. **Create another sheet**: Click the "+" at the bottom to add a new sheet
2. **Name it**: Rename this sheet to "Generic Content"
3. **Set up columns**: Add these headers in row 1:
   ```
   merchant_details | care_instructions | delivery_installation | warranty_info | return_policy | additional_info
   ```

4. **Add your business information** (Row 2):
   ```
   **Contact:** +91 9992221888<br/>**Address:** Your Business Address | Clean with soft cloth. Avoid harsh chemicals. | Free delivery within 15 days | 36 months manufacturer warranty | 7-day return policy | Custom designs available
   ```

### Step 3: Publish Your Sheets

**For Product Catalog Sheet:**
1. With your catalog sheet open, click **File** → **Share** → **Publish to web**
2. Choose **"Entire Document"** and **"Comma-separated values (.csv)"**
3. Click **Publish**
4. Copy the URL - it should look like: `https://docs.google.com/spreadsheets/d/e/2PACX-...../pub?output=csv`
5. **Save this URL** - you'll need it later!

**For Generic Content Sheet:**
1. Click on the **"Generic Content"** tab at the bottom
2. Click **File** → **Share** → **Publish to web**
3. Choose **"Generic Content"** sheet and **"Comma-separated values (.csv)"**
4. Click **Publish**
5. Copy this URL too and save it!

---

## 💻 Local Development Setup

Let's get the website running on your computer first:

### Step 1: Install Required Software

**Install Node.js:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the "LTS" version (recommended for most users)
3. Run the installer and follow the default options
4. To verify: Open Terminal/Command Prompt and type `node --version` (should show a version number)

**Install Git:**
1. Go to [git-scm.com](https://git-scm.com/downloads)
2. Download for your operating system
3. Install with default settings

### Step 2: Download the Project

1. **Download the project files**:
   - If you have the files as a ZIP, extract them to a folder like `Woodenlobby`
   - Or clone from GitHub: `git clone [your-repo-url]`

2. **Open Terminal/Command Prompt**:
   - **Windows**: Press `Windows + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter
   - **Linux**: Press `Ctrl + Alt + T`

3. **Navigate to your project folder**:
   ```bash
   cd path/to/your/Woodenlobby
   ```
   
   *Replace `path/to/your/` with the actual path to your folder*

### Step 3: Install Dependencies

```bash
npm install
```

This will download all the required packages. It might take a few minutes.

### Step 4: Configure Environment Variables

1. **Create a configuration file**:
   ```bash
   # Windows
   copy .env.example .env.local
   
   # Mac/Linux  
   cp .env.example .env.local
   ```
   
   If the file doesn't exist, create a new file called `.env.local` in your project folder.

2. **Edit the file** with these settings:
   ```env
   NEXT_PUBLIC_SHEET_CSV_URL=your_catalog_sheet_url_here
   NEXT_PUBLIC_GENERIC_CONTENT_CSV_URL=your_generic_content_sheet_url_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP=919992221888
   NEXT_PUBLIC_ADDRESS=Your Business Address Here
   NEXT_PUBLIC_PHONE_DISPLAY=+91 99922 21888
   ```

   **Replace the URLs** with the Google Sheets URLs you saved earlier!

### Step 5: Start the Development Server

```bash
npm run dev
```

🎉 **Success!** Your website should now be running at [http://localhost:3000](http://localhost:3000)

Open this URL in your browser to see your website!

---

## 🚀 Deploying to Vercel (Recommended)

Vercel is the easiest way to deploy your Next.js website. It's free and handles everything automatically.

### Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easier option)
4. If you don't have GitHub, create an account at [github.com](https://github.com) first

### Step 2: Upload Your Code to GitHub

1. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click the **"+"** button → **"New repository"**
   - Name it `woodenlobby-website`
   - Choose **"Public"** (free option)
   - Click **"Create repository"**

2. **Upload your files**:
   - Click **"uploading an existing file"**
   - Drag and drop ALL your project files (except `node_modules` folder if present)
   - Write commit message: "Initial website setup"
   - Click **"Commit changes"**

### Step 3: Deploy to Vercel

1. **Back on Vercel**, click **"New Project"**
2. **Import your GitHub repository**:
   - Find your `woodenlobby-website` repository
   - Click **"Import"**

3. **Configure the deployment**:
   - **Project Name**: `woodenlobby-website`
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**:
   Click **"Environment Variables"** and add each one:
   ```
   Name: NEXT_PUBLIC_SHEET_CSV_URL
   Value: [your catalog sheet URL]
   
   Name: NEXT_PUBLIC_GENERIC_CONTENT_CSV_URL  
   Value: [your generic content sheet URL]
   
   Name: NEXT_PUBLIC_WHATSAPP
   Value: 919992221888
   
   Name: NEXT_PUBLIC_ADDRESS
   Value: Your Business Address
   
   Name: NEXT_PUBLIC_PHONE_DISPLAY
   Value: +91 99922 21888
   ```

5. **Deploy**:
   - Click **"Deploy"**
   - Wait 2-3 minutes for deployment to complete
   - 🎉 **Your website is now live!**

You'll get a URL like `https://woodenlobby-website.vercel.app` - this is your live website!

### Step 4: Custom Domain (Optional)

To use your own domain (like `www.yourstore.com`):

1. **Buy a domain** from providers like:
   - Namecheap
   - GoDaddy
   - Google Domains

2. **In Vercel dashboard**:
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Add your domain
   - Follow the DNS configuration instructions

---

## 🌐 Alternative Deployment Options

### Option 1: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"New site from Git"**
4. Choose your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Add environment variables in **Site settings** → **Environment variables**
7. Deploy!

### Option 2: Digital Ocean App Platform

1. Go to [digitalocean.com](https://digitalocean.com)
2. Create account
3. Go to **Apps** → **Create App**
4. Connect your GitHub repository
5. Configure build settings
6. Add environment variables
7. Deploy!

---

## 📝 Managing Your Content

### Adding New Products

1. **Open your Google Sheet**
2. **Add a new row** with product information:
   - **category**: Beds, Sofas, Dining, Storage
   - **product_name**: Full product name
   - **price_display**: ₹25,000
   - **mrp_optional**: ₹30,000 (optional)
   - **badge**: New, Sale, Bestseller (optional)
   - **short_desc**: Brief description
   - **image1, image2, image3**: Image URLs
   - **product_slug**: URL-friendly name (aurora-platform-bed)
   - **status**: Active or Hidden
   - **specifications_content**: Markdown text with specs
   - **overview_content**: Product overview in markdown

3. **Save the sheet** - your website updates automatically!

### Updating Business Information

Edit the "Generic Content" sheet to update:
- Contact information
- Warranty details
- Return policies
- Care instructions

### Image Management

**Option 1: Use Google Drive**
1. Upload images to Google Drive
2. Right-click → "Get link" → "Anyone with the link"
3. Modify the URL format:
   - From: `https://drive.google.com/file/d/FILE_ID/view`
   - To: `https://drive.google.com/uc?id=FILE_ID`

**Option 2: Use Image Hosting Services**
- [Imgur](https://imgur.com)
- [Cloudinary](https://cloudinary.com)
- [ImageKit](https://imagekit.io)

---

## 🔧 Troubleshooting

### Common Issues

**❌ "Failed to parse URL from /api/catalog"**
- Check your Google Sheets URLs in environment variables
- Make sure sheets are published to web
- Verify URLs end with `&output=csv`

**❌ "Products not showing"**
- Check Google Sheets column names match exactly
- Ensure products have `status` set to "Active"
- Verify sheet is published and accessible

**❌ "Images not loading"**
- Use direct image URLs
- Test URLs in browser first
- Check image permissions (public access)

**❌ Build failing on Vercel**
- Check all environment variables are set
- Ensure no syntax errors in code
- Check build logs for specific errors

### Getting Help

1. **Check the browser console**:
   - Press F12 → Console tab
   - Look for red error messages

2. **Vercel deployment logs**:
   - Go to Vercel dashboard
   - Click on your project
   - Check **"Functions"** tab for errors

3. **Test Google Sheets URLs**:
   - Open the URL in browser
   - Should download a CSV file

---

## 🔄 Maintenance & Updates

### Regular Tasks

**Weekly:**
- Update product inventory
- Add new products
- Check for broken image links

**Monthly:**
- Review website performance
- Update business information
- Check contact form functionality

### Making Code Changes

1. **Edit files locally**
2. **Test changes**: `npm run dev`
3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
4. **Auto-deployment**: Vercel automatically updates your site!

### Backing Up Your Data

1. **Download Google Sheets** regularly:
   - File → Download → Excel (.xlsx)
   - Store backup locally

2. **Export GitHub repository**:
   - Go to repository settings
   - Scroll down to "Export repository"

---

## 🎯 Performance Tips

### Optimize Images
- Use WebP format when possible
- Compress images before uploading
- Recommended size: 800x600px for product images

### Monitor Site Speed
- Use [PageSpeed Insights](https://pagespeed.web.dev)
- Aim for score above 90

### SEO Best Practices
- Add alt text to all images
- Use descriptive product names
- Include relevant keywords in descriptions

---

## 📞 Support

If you encounter issues:

1. **Check this guide first** - most problems have solutions here
2. **Google Sheets Help**: [support.google.com/docs](https://support.google.com/docs)
3. **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
4. **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎉 Congratulations!

You now have a fully functional e-commerce website that:
- ✅ Loads product data from Google Sheets
- ✅ Displays beautiful product pages
- ✅ Works on mobile devices
- ✅ Updates automatically when you change data
- ✅ Costs $0 to host (with Vercel free plan)

**Your customers can now:**
- Browse your furniture collections
- View detailed product information
- Contact you via WhatsApp
- Experience a professional shopping interface

**Next steps:**
- Add your real product photos
- Fill in all your product details
- Share your website URL with customers
- Set up Google Analytics (optional)
- Configure a custom domain (optional)

Happy selling! 🪑✨

---

*This guide was created for the Woodenlobby furniture website. For technical questions, refer to the main README.md file.*
