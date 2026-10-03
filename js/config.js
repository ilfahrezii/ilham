/* =========================================================
   GANO EV TEMBUNG — config.js
   >>> FILE INI YANG PALING MUDAH DIEDIT <<<
   Ganti data kontak di bagian CONFIG. Semua halaman (navbar, footer,
   kontak, tombol WhatsApp) otomatis memakai data ini.
   ========================================================= */

window.GANO = {

  /* ---------- 1. DATA KONTAK (GANTI DI SINI) ---------- */
  config: {
    brand: 'GANO EV Tembung',
    // Nomor WhatsApp: format internasional TANPA tanda + / spasi / strip. Contoh: 6281234567890
    whatsapp: '6281200000000',
    // Tampilan nomor telepon / WhatsApp di website
    phoneDisplay: '+62 812-0000-0000',
    phoneTel: '+6281200000000',
    email: 'ganoevtembung@gmail.com',
    // Alamat showroom — silakan lengkapi dengan alamat sesuai Google Maps
    address: 'Tembung, Sumatera Utara',
    // Link Google Maps (tombol "Buka di Google Maps")
    mapsLink: 'https://share.google/B8ljNQvMUrb5rE7BH',
    // Kata kunci peta yang ditampilkan di halaman Kontak.
    // Tip: kalau pin kurang pas, buka Google Maps > Bagikan > "Sematkan peta" > salin isi src="..." ke mapEmbedUrl.
    mapQuery: 'Sepeda Listrik Gano EV Tembung',
    mapEmbedUrl: '',
    // Jam operasional (kosongkan '' jika tidak ingin ditampilkan)
    hours: 'Senin – Minggu · Hubungi kami untuk jam kunjungan',
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/'
  },

  /* ---------- 2. SLIDE HERO (halaman Home) ---------- */
  hero: [{
    id: 'black',
    acc: 'acc-black',
    label: 'GANO EV BLACK',
    pill: 'GANO EV SERIES',
    l1: 'Ride Electric.',
    l2: 'Move Different.',
    desc: 'Desain gelap minimalis dengan karakter sporty. Sepeda listrik yang siap menemani mobilitas harian kamu.'
  }, {
    id: 'street',
    acc: 'acc-street',
    label: 'GANO EV STREET',
    pill: 'STREET EDITION',
    l1: 'Street Ready.',
    l2: 'Born to Stand Out.',
    desc: 'Perpaduan black & silver dengan grafis ekspresif, dibuat untuk kamu yang ingin tampil beda di jalan.'
  }, {
    id: 'silver',
    acc: 'acc-silver',
    label: 'GANO EV SILVER',
    pill: 'SILVER CLASSIC',
    l1: 'Retro Soul.',
    l2: 'Electric Heart.',
    desc: 'Bodi silver dengan jok coklat bernuansa retro-modern. Klasik di tampilan, listrik di jantungnya.'
  }, {
    id: 'graffiti',
    acc: 'acc-graffiti',
    label: 'GANO EV GRAFFITI',
    pill: 'GRAFFITI EDITION',
    l1: 'Bold Lines.',
    l2: 'Zero Noise.',
    desc: 'Hijau & hitam dengan grafis graffiti yang berani. Tampil lebih percaya diri di setiap perjalanan.'
  }],

  /* ---------- 3. PRODUK ---------- */
  products: {
    black: {
      name: 'GANO EV BLACK',
      cat: 'Minimalist · Sporty',
      acc: 'acc-black',
      short: 'Desain minimalis gelap dengan karakter sporty dan aksen oranye.',
      overview: 'GANO EV Black tampil serba hitam dengan aksen oranye yang tegas. Siluetnya bergaya cafe-racer modern: bersih, sporty, dan mudah dipadukan dengan gaya berkendara harian.',
      design: 'Bodi hitam matte dengan garis aksen oranye pada rangka samping, jok hitam bergaris, dan lampu depan bulat berpelindung grill yang memberi kesan klasik-modern.',
      features: ['Lampu depan bulat dengan pelindung grill', 'Jok bergaya cafe-racer', 'Ban lebar bertapak besar', 'Rem cakram depan dan belakang', 'Windshield kecil di bagian depan', 'Panel samping pada rangka dengan aksen oranye']
    },
    street: {
      name: 'GANO EV STREET EDITION',
      cat: 'Black · Silver Graphic',
      acc: 'acc-street',
      short: 'Black/silver dengan graphic design yang lebih ekspresif.',
      overview: 'Street Edition membawa kombinasi hitam dan silver dengan stiker bergaya street art. Cocok untuk kamu yang ingin kendaraan listrik dengan karakter visual yang lebih ekspresif.',
      design: 'Tangki berwarna silver dengan strip hitam, grafis smiley dan mahkota pada panel samping, serta cetakan huruf putih pada ban yang menambah kesan sporty.',
      features: ['Livery black & silver dengan strip grafis', 'Grafis street art pada panel dan bodi', 'Lampu depan bulat dengan grill', 'Ban lebar dengan cetakan huruf putih', 'Rem cakram depan dan belakang', 'Jok bergaya cafe-racer']
    },
    silver: {
      name: 'GANO EV SILVER CLASSIC',
      cat: 'Retro · Modern',
      acc: 'acc-silver',
      short: 'Silver dengan jok coklat dan nuansa retro-modern.',
      overview: 'Silver Classic memadukan bodi silver dengan jok dan grip berwarna coklat. Hasilnya tampilan retro-modern yang elegan dan berbeda dari kendaraan listrik pada umumnya.',
      design: 'Bodi silver metalik dengan panel tangki hitam, jok coklat berjahit garis, serta grip setang coklat yang memberi sentuhan hangat dan klasik.',
      features: ['Bodi silver metalik', 'Jok dan grip setang berwarna coklat', 'Lampu depan bulat dengan pelindung grill', 'Ban lebar bertapak besar', 'Rem cakram depan dan belakang', 'Standar samping untuk parkir']
    },
    graffiti: {
      name: 'GANO EV GRAFFITI EDITION',
      cat: 'Green · Graffiti',
      acc: 'acc-graffiti',
      short: 'Hijau/black dengan graphic graffiti yang lebih berani.',
      overview: 'Graffiti Edition adalah varian paling berani di lini GANO EV. Warna hijau army berpadu hitam dan grafis graffiti yang menutupi tangki, panel samping hingga bodi belakang.',
      design: 'Hijau army dengan goresan graffiti putih dan hijau neon, ikon smiley dan mahkota, serta aksen hijau menyala pada ban.',
      features: ['Livery hijau & hitam dengan grafis graffiti', 'Aksen hijau neon pada ban dan panel', 'Lampu depan bulat dengan pelindung grill', 'Rem cakram depan dan belakang', 'Jok bergaya cafe-racer', 'Standar samping untuk parkir']
    }
  },

  /* ---------- 4. ARTIKEL ---------- */
  articles: {
    'kendaraan-listrik-mobilitas-harian': {
      title: 'Mengapa Kendaraan Listrik Semakin Menarik untuk Mobilitas Harian',
      date: '2026-09-28',
      dateLabel: '28 September 2026',
      tag: 'Wawasan',
      img: 'assets/images/gallery/gano-ev-lineup-scene.jpg',
      excerpt: 'Dari perjalanan singkat ke tempat kerja sampai urusan harian di sekitar rumah, kendaraan listrik menawarkan cara bergerak yang lebih praktis.',
      body: [
        'Semakin banyak orang mulai melirik kendaraan listrik sebagai teman perjalanan sehari-hari. Alasannya beragam: ingin cara bergerak yang praktis, ingin perawatan yang terasa lebih sederhana, atau sekadar tertarik dengan tampilan modern yang ditawarkan.',
        ['Praktis untuk rutinitas', 'Untuk jarak dekat seperti ke tempat kerja, pasar, atau kampus, kendaraan listrik terasa ringkas dan mudah digunakan. Tidak perlu mampir ke SPBU, cukup isi daya sesuai kebutuhan.'],
        ['Pengalaman berkendara yang tenang', 'Mesin listrik umumnya bekerja lebih senyap dibanding mesin pembakaran. Banyak pengguna merasakan perjalanan harian menjadi lebih nyaman dan tidak melelahkan.'],
        ['Desain yang makin beragam', 'Kini kendaraan listrik hadir dengan berbagai karakter, dari yang minimalis hingga yang ekspresif. Pilihan ini memudahkan setiap orang menemukan model yang sesuai dengan gayanya.'],
        'Jika kamu tertarik mencoba, langkah terbaik adalah melihat langsung unitnya dan berkonsultasi dengan tim kami tentang kebutuhan berkendara kamu.'
      ]
    },
    'tips-merawat-sepeda-listrik': {
      title: 'Tips Merawat Sepeda Listrik Agar Tetap Nyaman Digunakan',
      date: '2026-09-20',
      dateLabel: '20 September 2026',
      tag: 'Perawatan',
      img: 'assets/images/gallery/gano-ev-black-detail.jpg',
      excerpt: 'Perawatan sederhana yang rutin dilakukan membantu sepeda listrik tetap nyaman, aman, dan enak dipandang.',
      body: [
        'Sepeda listrik yang dirawat dengan baik akan terasa lebih nyaman dan aman digunakan. Berikut beberapa kebiasaan sederhana yang bisa kamu terapkan.',
        ['Bersihkan secara rutin', 'Lap bodi dengan kain lembut dan hindari semprotan air bertekanan tinggi langsung ke area komponen kelistrikan. Pastikan kondisi kering sebelum disimpan.'],
        ['Periksa ban dan rem', 'Cek kondisi ban, tekanan angin, serta kinerja rem secara berkala. Komponen ini sangat berpengaruh pada keselamatan.'],
        ['Isi daya sesuai anjuran', 'Gunakan charger bawaan dan ikuti panduan pengisian dari produsen. Hindari menyimpan unit dalam kondisi lembap atau terkena panas berlebih.'],
        ['Servis berkala', 'Jadwalkan pemeriksaan berkala agar masalah kecil bisa terdeteksi lebih awal. Tim after sales kami siap membantu kebutuhan kamu.']
      ]
    },
    'memilih-sepeda-listrik-sesuai-gaya': {
      title: 'Memilih Sepeda Listrik Sesuai Gaya Berkendara',
      date: '2026-09-12',
      dateLabel: '12 September 2026',
      tag: 'Panduan',
      img: 'assets/images/gallery/gano-ev-graffiti-scene.jpg',
      excerpt: 'Minimalis, ekspresif, retro, atau berani? Kenali karakter tiap varian agar pilihanmu terasa pas.',
      body: [
        'Memilih sepeda listrik bukan hanya soal tampilan, tapi juga soal kenyamanan dan karakter yang cocok dengan kamu. Beberapa hal berikut bisa jadi bahan pertimbangan.',
        ['Kenali kebutuhan harian', 'Pikirkan rute dan frekuensi pemakaian. Apakah untuk perjalanan singkat di sekitar rumah atau rutinitas ke tempat kerja? Dari sini kamu bisa lebih mudah menentukan prioritas.'],
        ['Pilih karakter visual', 'Black untuk kesan minimalis dan sporty, Street Edition untuk tampilan ekspresif, Silver Classic untuk nuansa retro-modern, dan Graffiti Edition untuk kamu yang berani tampil beda.'],
        ['Coba dan konsultasikan', 'Datang ke showroom, lihat langsung unitnya, dan tanyakan apa pun kepada tim kami. Pengalaman melihat dan mencoba akan membantu keputusan kamu.']
      ]
    }
  }
};
