# 📰 Daily Verse - Portal Berita Berbasis Web

**Daily Verse** adalah sebuah portal berita berbasis web yang dirancang untuk memberikan informasi aktual, relevan, dan terpercaya kepada masyarakat. Aplikasi ini memungkinkan pengguna untuk mengakses berita terkini dari berbagai kategori secara cepat, mudah, dan responsif melalui antarmuka web yang modern.
## 🚀 Fitur Utama

- 📋 **Manajemen Artikel**
  - Penulisan, pengeditan, dan publikasi berita.
  - Sistem kategori dan tagging artikel.

- 🧑‍💼 **Manajemen Pengguna**
  - Sistem otentikasi dan otorisasi berbasis peran (admin dan user) menggunakan Oauth google.

- 📊 **Dashboard Admin**
  - Monitoring artikel.
  - Monitoring pengguna.
  - iklan

- 💬 **Komentar & Moderasi**
  - Komentar pembaca dengan fitur moderasi admin.
  
- 📦 **Manajemen Iklan**
  - Pengaturan slot iklan untuk monetisasi portal.


- 🔍 **Pencarian & Filterisasi**
  - Fitur pencarian cepat berdasarkan judul.
  - Filterisasi berdasarkan kategori.

- 🖥️ **Antarmuka Responsif**
  - Desain UI/UX intuitif dan mendukung semua perangkat (desktop & mobile).

---


## 🚧 Teknologi yang Digunakan

Daily Verse dibangun menggunakan **stack MERN** (MongoDB, Express, React, Node.js) dengan penulisan kode berbasis **TypeScript** untuk meningkatkan maintainability dan keamanan kode. Selain itu, aplikasi ini menggunakan **Redis** sebagai sistem caching dan manajemen session/token untuk meningkatkan performa backend.

### Rincian Teknologi:

- **MongoDB**  
  Digunakan sebagai database NoSQL untuk menyimpan data berita, pengguna, dan komentar. Struktur fleksibel MongoDB cocok untuk kebutuhan dinamis konten berita.

- **Express.js**  
  Framework backend berbasis Node.js yang menangani routing, autentikasi, middleware, dan integrasi database. Ditulis dalam TypeScript untuk memanfaatkan fitur type-checking dan autocompletion.

- **React.js + Vite**  
  Digunakan pada sisi frontend untuk membangun antarmuka yang interaktif dan cepat. Vite memberikan waktu build dan hot reload yang sangat cepat untuk pengembangan modern.

- **Node.js**  
  Runtime JavaScript di sisi server yang menjadi fondasi backend REST API aplikasi ini.

- **TypeScript**  
  Memberikan penulisan kode yang lebih stabil dan terstruktur dengan pengetikan statis dan dokumentasi bawaan melalui interface/type alias.

- **Redis**  
  Dimanfaatkan untuk caching data yang sering diakses, penyimpanan sementara token autentikasi, dan manajemen session untuk efisiensi dan kecepatan sistem.

---

## ⚙️ Instalasi dan Setup Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

### Clone Repository

```bash
git clone https://github.com/mochamadryanhanafi/dailyverse.git
cd dailyverse
```

### build redis database in local
atau gunakan redis di vm dengan url yang dikomentar pada file env, tolong diperhatikan kalau di vm kadang redis tidak bisa digunakan redis ini penting untuk web bisa berjalan normal


```bash
docker run -d --name redis -p 6379:6379 redis:latest                           
```
### setup file .env, 

extract dan pindahkan file ke dalam folder fronend_portal berita untuk frontend.env dan backend_portalberita untuk backend.env dan rename menjadi .env 


### install backend

```bash
cd backend_portalberita
npm install
npm install npx
npx tsx server.ts
```

### install Frontend

```
cd frontend_portalberita
npm install --legacy-peer-deps
npm run dev
```


## Tampilan Aplikasi

![Home](https://res.cloudinary.com/dnvulh8wx/image/upload/v1749528628/a2c5fa02-d7b8-4f6e-93b2-a7a3e635534d.png)

![Hot news](https://res.cloudinary.com/dnvulh8wx/image/upload/v1749528848/Screenshot_20250610_111331_whyuxx.png)

![Detailed Page](https://res.cloudinary.com/dnvulh8wx/image/upload/v1749529188/Screenshot_20250610_111924_xg1qbv.png)
