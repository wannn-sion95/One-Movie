# OneMovie

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=E50914&height=180&section=header&text=OneMovie&fontSize=70&fontColor=fff&fontAlignY=38&desc=Modern%20Streaming%20Platform%20Inspired%20by%20Netflix&descAlignY=58&descAlign=50" width="100%" alt="Header Banner" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232A" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a2e" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white&labelColor=0f172a" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TMDB_API-Integrated-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white&labelColor=032541" alt="TMDB" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="License" />
</p>

Platform web streaming film dan serial TV berbasis antarmuka modern yang terintegrasi langsung dengan API TMDB (The Movie Database).

---

## Live Demo & Repository

- **Live Demo**: [onemovie.vercel.app](https://your-demo-link.vercel.app)
- **Repository**: [github.com/wannn-sion95/one-movie](https://github.com/wannn-sion95/one-movie)

---

## Deskripsi Project

OneMovie dirancang untuk menyajikan antarmuka pemutaran film yang cepat, responsif, dan dinamis. Fokus pengembangan proyek ini meliputi:

* **Komponen Terstruktur**: Arsitektur komponen React yang modular dan mudah dipelihara.
* **Integrasi API**: Konsumsi REST API TMDB secara asynchronous untuk menyajikan data film terkini.
* **Performa Tinggi**: Optimasi aset dan modul menggunakan bundler Vite.

---

## Fitur Utama

- **Trending & Popular**: Integrasi data real-time film dan serial TV populer dari TMDB.
- **Smart Search**: Fitur pencarian konten dengan kueri instan.
- **Detail Konten**: Informasi lengkap mencakup sinopsis, daftar pemeran, rating, genre, dan trailer.
- **Responsif**: Desain antarmuka yang teradaptasi untuk perangkat mobile, tablet, dan desktop.
- **Kategori & Genre**: Navigasi konten berdasarkan genre dan kategori rilisan.

---

## Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling** | Tailwind CSS |
| **Data Fetching** | Axios, TMDB REST API |
| **Package Manager** | npm |

---

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/1e7bd30c-0e33-4def-a2d4-d26cf536c08b" width="100%" alt="Homepage OneMovie" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/5c08bb3b-067a-4a3f-ab9f-d182f0b63f75" width="49%" alt="Movie List" />
  <img src="https://github.com/user-attachments/assets/53e3ad9e-8217-48e7-9ab4-56799d7a6aa6" width="49%" alt="Search Page" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ef4ef09f-a70b-4ad1-825b-bc2dc5e69343" width="100%" alt="Movie Detail" />
</p>

---

## Struktur Direktori

```text
one-movie/
├── public/                # Static assets
├── src/
│   ├── assets/            # Media dan ikon
│   ├── components/        # Komponen UI modular
│   ├── pages/             # Komponen halaman utama
│   ├── services/          # Konfigurasi dan API TMDB
│   ├── hooks/             # Custom React Hooks
│   ├── styles/            # Konfigurasi gaya global
│   ├── utils/             # Helper functions
│   ├── App.jsx            # Komponen root
│   └── main.jsx           # Entry point aplikasi
├── .env.example           # Template environment variable
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
