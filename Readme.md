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

### 1. Clone Repository

```bash
git clone https://github.com/mochamadryanhanafi/dailyverse.git
cd dailyverse
```

### 1. install backend

```bash
cd backend_portalberita
npm install
npm install npx
npx tsx server.ts
```

### 1. install Frontend

```
cd frontend_portalberita
npm install --legacy-peer-deps
npm run dev
```

## Tampilan Aplikasi

![Beranda](https://user-images.githubusercontent.com/12345678/abc123.png)
