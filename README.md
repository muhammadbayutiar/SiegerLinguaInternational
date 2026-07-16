# Sieger Lingua International - Website

Website resmi Sieger Lingua International - Lembaga pelatihan bahasa Jerman profesional yang berstandar resmi dan bersertifikasi.

## 🚀 Fitur Website

- ✅ Design modern dan profesional
- ✅ Fully responsive (Desktop, Tablet, Mobile)
- ✅ SEO optimized
- ✅ Fast loading performance
- ✅ Interactive UI/UX
- ✅ WhatsApp integration
- ✅ Contact form dengan WhatsApp redirect
- ✅ FAQ accordion
- ✅ Smooth scrolling navigation
- ✅ Testimonials section
- ✅ Blog/Article section
- ✅ Program showcase
- ✅ Mentor profiles
- ✅ Social media integration

## 📋 Perbaikan dari Website Original

1. **SEO Enhancement**
   - Meta tags lengkap
   - Structured data
   - Alt text untuk gambar
   - Semantic HTML

2. **UX Improvements**
   - FAQ section untuk menjawab pertanyaan umum
   - Testimonial section dengan rating bintang
   - Contact form yang mudah digunakan
   - WhatsApp floating button untuk akses cepat

3. **Visual Design**
   - Color scheme profesional dengan gold accent
   - Consistent spacing dan typography
   - Smooth animations dan transitions
   - Modern gradient backgrounds

4. **Mobile Optimization**
   - Hamburger menu untuk mobile
   - Touch-friendly buttons
   - Optimized images
   - Responsive grid layouts

5. **Performance**
   - Minimal dependencies
   - Optimized CSS
   - Lazy loading untuk gambar
   - Fast page load

## 🛠️ Teknologi yang Digunakan

- HTML5
- CSS3 (dengan CSS Grid & Flexbox)
- Vanilla JavaScript (No framework dependencies)
- Font Awesome Icons
- Google Fonts (Inter)

## 📦 Deployment ke Vercel

### Opsi 1: Deploy via Vercel CLI

1. Install Vercel CLI (jika belum):
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy website:
```bash
vercel
```

4. Follow the prompts dan tunggu deployment selesai

### Opsi 2: Deploy via Vercel Dashboard

1. Buka https://vercel.com
2. Login atau Sign up
3. Click "New Project"
4. Import repository atau drag & drop folder project
5. Configure project settings:
   - Framework Preset: Other
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan atau `.`)
6. Click "Deploy"

### Opsi 3: Deploy via Git

1. Push code ke GitHub repository
2. Login ke Vercel
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

## 🔧 Kustomisasi

### Mengubah Konten

Edit file `index.html` untuk mengubah:
- Teks dan konten
- Link WhatsApp dan social media
- Informasi kontak
- Program details

### Mengubah Warna

Edit file `styles.css` di bagian `:root` variables:
```css
:root {
    --primary-color: #D4AF37;  /* Warna utama */
    --primary-dark: #B8941F;   /* Warna utama gelap */
    --accent-color: #C41E3A;   /* Warna aksen */
    /* ... */
}
```

### Menambahkan Gambar

1. Buat folder `images/` di root project
2. Upload gambar ke folder tersebut
3. Update `src` attribute di HTML:
```html
<img src="images/nama-file.jpg" alt="deskripsi">
```

## 📱 WhatsApp Integration

Website ini terintegrasi dengan WhatsApp:
- Floating button di kanan bawah
- Contact form redirect ke WhatsApp
- Multiple CTA buttons

Untuk mengubah nomor WhatsApp, replace `6281376412663` dengan nomor baru di:
- `index.html` (semua link WhatsApp)
- `script.js` (contact form handler)

## 🌐 Live Preview

Setelah deploy, website akan tersedia di:
- `https://your-project-name.vercel.app`
- Atau custom domain yang Anda setting

## 📞 Support

Untuk bantuan atau pertanyaan:
- Email: siegerlinguainternational25@gmail.com
- WhatsApp: 0813-7641-2663

## 📄 License

© 2026 Sieger Lingua International. All rights reserved.
