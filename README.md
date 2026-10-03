# GANO EV Tembung — Company Profile (v7.4, SpeedSphere T18)

## Cara pasang
1. Ekstrak zip ke folder website kamu, pilih Replace/Timpa.
2. Folder gambar (products, store, logo, icons, backgrounds) tetap dipakai, tidak ikut di zip.
3. Buka `index.html` dengan Live Server.

## Yang berubah
- Pembaruan tampilan konten: kartu produk dua kolom, tombol sejajar, langkah pemesanan, dan filter galeri. Navigasi dan hero dipertahankan.
- `js/order-store.js` berbagi pesanan di semua halaman, memulihkan saat refresh/back, memvalidasi data, serta menyinkronkan tab pada origin yang sama. Untuk `file://`, jumlah produk diteruskan dalam tab yang sama.
- Nama, pengambilan, dan catatan disimpan di penyimpanan browser pada origin yang sama. Data pesanan tetap ada setelah membuka WhatsApp; pesanan baru dikirim ketika pengguna menekan Kirim di WhatsApp.
- Animasi filter galeri dan sorotan kartu menghormati preferensi reduced motion.
- `css/refinements.css` dan `js/refinements.js` memisahkan pemolesan konten dari hero.
- Galeri memakai empat kolom desktop, dua kolom tablet, dan satu kolom HP; semua filter mengisi baris sampai tepi kanan. Viewer mendukung tombol panah, keyboard, dan swipe.
- `js/motion.js` menambahkan sorotan mengikuti pointer, respons tekan tombol, animasi viewer, dan kemunculan konten. Reveal disusun per elemen supaya animasi induk/anak tidak saling menumpuk.
- CSS dan JS ditulis ulang: hero 3D (ikuti mouse), kartu produk tilt 3D, tumpukan foto Showroom (klik untuk ganti kartu depan), reveal saat scroll, hitung angka, progress bar, keranjang + modal baru.
- Produk jadi SPEEDSPHERE T18 (Black, Street, Silver Classic, Graffiti).

## Harga (SEMENTARA, ganti dengan harga asli)
- `P` di `build.py` (angka terakhir tiap baris) dan `PR` di `js/app.js` (field `p`).
- Setelah ubah `build.py`, jalankan `python build.py`.
- Generator menimpa HTML. Simpan perubahan konten manual di template `build.py` juga sebelum membangun ulang.

## Format kode
- HTML, CSS, dan JavaScript menggunakan indentasi dua spasi; aturan editor ada di `.editorconfig`.
- Pasang alat dengan `python -m pip install -r tools/format-requirements.txt`, lalu jalankan `python tools/format_site.py` setelah build.

## Pemeriksaan browser
- Jalankan `python -m http.server 4173 --bind 127.0.0.1`.
- Dengan paket `playwright` dan Microsoft Edge tersedia, jalankan `node tests/browser-check.cjs`.
- Mencakup perpindahan halaman, refresh/back, sinkronisasi tab, isian pesanan, data rusak, file lokal, filter/lightbox, animasi, dan overflow enam halaman pada tiga ukuran layar.

## Lain-lain
- Email: `ganoevtembung@gmail.com` di `js/app.js` (EM) dan `build.py` (EMAIL).
- WhatsApp: `WA` di `build.py` dan `js/app.js` (6282246020229).
- Video galeri: `assets/video/promo.mp4` (sudah disertakan).
