# TMCI Website

A full-featured business website with blog, admin panel, WhatsApp integration, and Supabase backend.

**Developed by Sushanth**

---

## 🚀 Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste and run the contents of `supabase-schema.sql`
3. Go to **Authentication → Users → Add User** → create your admin account

### 3. Configure environment
```bash
cp .env.example .env
```
Fill in your `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_WHATSAPP_NUMBER=919876543210
VITE_WHATSAPP_MESSAGE=Hello! I'm interested in your workbench solutions.
VITE_SITE_NAME=TMCI
```

### 4. Run locally
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 🔑 Admin Access

Visit `/admin/login` and sign in with the credentials you created in Supabase Auth.

**Security features:**
- Supabase JWT authentication
- 5 failed login attempts → 15-minute lockout
- Row Level Security on all database tables
- XSS protection via DOMPurify on all HTML content
- Unauthenticated users cannot access any admin route

---

## 📦 Features

| Feature | Details |
|---|---|
| 🏠 Homepage | Hero, About, Products, Workbench Configurator, FAQ, Contact |
| 🔧 Sticky Workbench Widget | Floating button + navbar CTA |
| 💬 WhatsApp Button | Opens with pre-written message |
| 📝 Blog System | Search, tag filter, SEO per post |
| 🛠️ Admin Panel | Edit sections, manage blogs, FAQs, workbench options |
| ✍️ Rich Text Editor | Quill editor — bold, italic, links, images, headings |
| 🖼️ Image Support | Cloudinary URLs supported everywhere |
| ⚡ Caching | Memory + localStorage, 5-minute TTL |
| 🔍 SEO | Per-page titles, meta descriptions, OG tags |
| 📦 Code Splitting | Vendor, Supabase, editor chunks |
| 🗜️ Compression | Gzip + Brotli on build |

---

## 🌐 Deployment

Deploy to **Vercel** (recommended):
```bash
npm install -g vercel
vercel --prod
```
Add your environment variables in Vercel dashboard → Settings → Environment Variables.

Or deploy to **Netlify**:
- Build command: `npm run build`
- Publish directory: `dist`
- Add env vars in Netlify dashboard

---

## 📁 Project Structure

```
src/
├── components/     # Navbar, Footer, WhatsApp, Workbench widget
├── pages/          # Home, Blogs, BlogPost, NotFound
├── admin/          # Admin panel pages
├── lib/            # Supabase client, cache utility
├── store/          # Zustand admin auth store
└── styles/         # Tailwind CSS + blog content styles
```
