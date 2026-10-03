import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
WA="6282246020229"
P=[("black","SPEEDSPHERE T18 BLACK","Minimalis · Sporty","Sepeda motor listrik serba hitam dengan aksen oranye. Tampilan bersih, cocok untuk harian.",6150000),
("street","SPEEDSPHERE T18 STREET EDITION","Hitam · Silver Graphic","Bodi hitam dengan grafis silver yang ekspresif. Terlihat beda di jalan.",6350000),
("silver","SPEEDSPHERE T18 SILVER CLASSIC","Retro · Modern","Bodi silver dengan jok coklat. Gaya klasik, tenaga listrik.",6450000),
("graffiti","SPEEDSPHERE T18 GRAFFITI EDITION","Hijau · Graffiti","Hijau-hitam dengan grafis graffiti yang berani. Untuk yang suka tampil mencolok.",6550000)]
IC={"wa":'<svg viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.9.7a3.5 3.5 0 0 1-1.6-1.6l.7-.9-1-2z"/></svg>',
"ar":'<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
"tel":'<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
"mail":'<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/></svg>',
"bag":'<svg viewBox="0 0 24 24"><path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
"plus":'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
"x":'<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
"pin":'<svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
"clock":'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
"ig":'<svg viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
"tt":'<svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>',
"fb":'<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'}
PAGES=[("index","Beranda"),("produk","Sepeda Motor Listrik"),("galeri","Galeri"),("tentang","Tentang"),("artikel","Artikel"),("kontak","Kontak")]
def head(t,d):
    return f'''<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{t}</title><meta name="description" content="{d}"><meta name="theme-color" content="#050a1c">
<meta property="og:title" content="{t}"><meta property="og:description" content="{d}"><meta property="og:image" content="assets/images/store/store-front.webp">
<link rel="icon" type="image/png" href="assets/icons/favicon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/refinements.css"><link rel="stylesheet" href="css/compact.css"></head>'''
def nav(cur):
    l="".join(f'<a href="{p}.html"{" class=on aria-current=page" if p==cur else ""}>{n}</a>' for p,n in PAGES)
    return f'''<body><a class="skip" href="#main">Lewati ke konten</a>
<header class="nav" data-nav><div class="nav-in">
<a class="brand" href="index.html" aria-label="GANO EV Tembung"><img src="assets/images/logo/logo.png" alt="" width="46" height="45"><span><b>GANO EV</b><small>Sepeda Motor Listrik · Tembung</small></span></a>
<nav id="menu" class="links" aria-label="Menu utama">{l}</nav>
<div class="nav-act"><button class="cart-btn" data-cart-open type="button" aria-label="Buka pesanan">{IC['bag']}<span>Pesanan</span><i data-cart-count>0</i></button>
<a class="btn btn-y btn-s" href="kontak.html"><span>Hubungi kami</span>{IC['ar']}</a>
<button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Buka menu"><i></i><i></i></button></div></div></header><main id="main">'''
MODAL=f'''<div class="modal" id="pmodal" aria-hidden="true" role="dialog" aria-modal="true"><div class="d-back" data-close></div><div class="m-card"><button class="m-x" type="button" data-close aria-label="Tutup">{IC['x']}</button><div class="m-img"><img alt="" src=""></div><div class="m-b"><span class="tag" data-m-cat></span><h3 data-m-name></h3><p data-m-desc></p>
<ul class="ticks"><li>Lampu depan LED dengan pelindung</li><li>Rem cakram depan dan belakang</li><li>Ban lebar bertapak untuk jalan kota</li><li>Jok gaya cafe racer dan suspensi belakang</li></ul>
<button class="btn btn-y" type="button" data-m-add>{IC['plus']} Tambah pesanan</button></div></div></div>'''
def foot():
    return f'''</main><footer class="foot"><div class="wrap fgrid">
<div><a class="brand" href="index.html"><img src="assets/images/logo/logo.png" alt="" width="46" height="45"><span><b>GANO EV</b><small>Sepeda Motor Listrik · Tembung</small></span></a>
<p>Dealer sepeda motor listrik di Tembung. Lihat langsung, coba, dan pesan lewat WhatsApp.</p></div>
<div><h4>Menu</h4>{"".join(f'<a href="{p}.html">{n}</a>' for p,n in PAGES)}</div>
<div><h4>Kunjungi kami</h4><p>Jl. Besar Tembung Pasar 7, Simpang Jodoh, sebelah Toko Emas Anugrah</p><p>Buka setiap hari 09.00–23.00</p><p><a data-wa href="#" target="_blank" rel="noopener">0822-4602-0229</a></p></div>
<div><h4>Ikuti kami</h4><div class="soc"><a href="https://www.instagram.com/ganotembung?stkn=MW5oaHBrNDlreWZkYQ==" target="_blank" rel="noopener" aria-label="Instagram">{IC['ig']}</a><a href="https://www.tiktok.com/@gano.tembung?_r=1&_t=ZS-9AExnEYd7w2" target="_blank" rel="noopener" aria-label="TikTok">{IC['tt']}</a><a href="https://www.facebook.com/share/1CnvmJAzoQ/" target="_blank" rel="noopener" aria-label="Facebook">{IC['fb']}</a><a data-wa href="#" target="_blank" rel="noopener" aria-label="WhatsApp">{IC['wa']}</a></div></div></div>
<div class="wrap fbot">© 2026 GANO EV Tembung. Semua hak dilindungi.</div></footer>
<a class="wa-float" data-wa href="#" target="_blank" rel="noopener" aria-label="Chat WhatsApp">{IC['wa']}</a>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Pesanan kamu"><div class="d-back" data-cart-close></div><div class="d-card">
<div class="d-head"><h3>Pesanan kamu</h3><button type="button" data-cart-close aria-label="Tutup">{IC['x']}</button></div>
<div class="d-list" data-cart-list></div>
<div class="d-form"><label>Nama<input id="o-nama" placeholder="Nama kamu" autocomplete="name"></label>
<label>Pengambilan<select id="o-ambil"><option>Ambil di showroom</option><option>Diantar ke alamat</option></select></label>
<label>Alamat / catatan<textarea id="o-cat" rows="2" placeholder="Warna, jadwal lihat unit, alamat antar…"></textarea></label>
<button class="btn btn-wa" type="button" data-cart-send>{IC['wa']} Kirim pesanan ke WhatsApp</button>
<small>Chat WhatsApp terbuka otomatis dengan isi pesanan. Harga &amp; ketersediaan dikonfirmasi tim kami.</small></div></div></aside>
{MODAL}<script src="js/order-store.js"></script><script src="js/app.js"></script><script src="js/fx.js"></script><script src="js/refinements.js"></script><script src="js/motion.js"></script></body></html>'''
def pcard(i,big=False):
    k,n,c,d,pr=P[i]
    return f'''<article class="pc" data-pid="{k}" data-tilt><div class="pc-img"><img src="assets/images/products/gano-ev-{k}.webp" alt="{n} — sepeda motor listrik" width="1536" height="1024" loading="lazy"></div>
<div class="pc-b"><span class="tag">{c}</span><h3>{n}</h3><p>{d}</p><div class="price"><small>Mulai dari</small><b>Rp {format(pr,",").replace(",",".")}</b></div><div class="pc-a"><button class="btn btn-y btn-s" type="button" data-add="{k}">{IC['plus']} Tambah pesanan</button><button class="btn btn-o btn-s" type="button" data-detail="{k}">Detail</button></div></div></article>'''
def page(name,t,d,body):
    open(name+".html","w",encoding="utf-8").write(head(t,d)+nav(name)+body+foot())
def hero(h,p,bg="black"):
    return f'<section class="phero"><div class="phbg" style="background-image:url(assets/images/backgrounds/bg-{bg}.jpg)"></div><div class="wrap"><nav class="crumbs"><a href="index.html">Beranda</a> / <span>{h}</span></nav><h1>{h}</h1><p>{p}</p></div></section>'

CTA=f'''<section class="wrap cta"><div><h2>Mau lihat sepeda motor listriknya langsung?</h2><p>Datang ke showroom kami di Tembung atau chat dulu untuk tanya stok dan harga.</p></div><div class="cta-a"><a class="btn btn-y" data-wa href="#" target="_blank" rel="noopener">{IC['wa']} Chat WhatsApp</a><a class="btn btn-o" href="kontak.html">Lokasi showroom</a></div></section>'''
def SR(h,body,extra,rev=False):
    return f'''<section class="sr wrap{" rev" if rev else ""}"><figure class="sr-img"><img src="assets/images/store/store-front.webp" alt="Showroom GANO EV Tembung saat senja" width="1277" height="952" loading="lazy"></figure>
<div class="sr-card"><h2>{h}</h2>{body}{extra}</div></section>'''
SRI=f'''<section class="section wrap show"><div class="stack" data-stack>
<figure class="sc"><img src="assets/images/store/showroom-depan-baru.jpeg" alt="Showroom GANO EV Tembung" loading="lazy"><figcaption><small>01</small>Showroom Tembung</figcaption></figure>
<figure class="sc"><img src="assets/images/store/showroom-koleksi-baru.jpeg" alt="Koleksi SpeedSphere T18 di showroom" loading="lazy"><figcaption><small>02</small>Koleksi SpeedSphere T18</figcaption></figure>
<figure class="sc"><img src="assets/images/store/showroom-suasana-baru.jpeg" alt="Suasana showroom GANO EV" loading="lazy"><figcaption><small>03</small>Suasana showroom</figcaption></figure></div>
<div class="show-t"><span class="eb">Kunjungi kami</span><h2>Showroom<br>GANO EV <i>Tembung.</i></h2>
<p>Datang langsung ke Jl. Besar Tembung Pasar 7, Simpang Jodoh, sebelah Toko Emas Anugrah. Sepeda dan motor listrik berbagai warna sudah terpajang.</p><p>Kamu bisa lihat, duduk, dan tanya-tanya dulu sebelum memutuskan.</p>
<div class="sr-facts"><div><b data-n="4">4</b><span>varian SpeedSphere T18</span></div><div><b data-n="7">7</b><span>hari buka tiap minggu</span></div><div><b data-n="14">14</b><span>jam layanan per hari</span></div></div>
<div class="sr-act"><a class="btn btn-y" href="https://www.google.com/maps/search/?api=1&query=GANO+EV+Tembung+Jl+Besar+Tembung+Pasar+7" target="_blank" rel="noopener">{IC['pin']} Petunjuk arah</a><a class="btn btn-o" href="galeri.html">Lihat galeri</a></div></div></section>'''
SRT=SR("Dealer sepeda motor listrik dari Tembung",'<p>GANO EV Tembung menyediakan sepeda motor listrik dengan beragam desain, dari yang minimalis sampai yang berani. Kami ingin kendaraan listrik terasa nyaman dipakai, enak dilihat, dan didampingi layanan yang ramah dari memilih sampai setelah pembelian.</p><p>Mampir ke Jl. Besar Tembung Pasar 7 dan lihat semua modelnya langsung.</p>',
f'''<div class="sr-act"><a class="btn btn-y" href="kontak.html">Kunjungi kami {IC['ar']}</a></div>''',True)

EMAIL="ganoevtembung@gmail.com"
def ic(p): return '<svg viewBox="0 0 24 24">'+p+'</svg>'
KEU_ITEMS=[(ic('<path d="M3 10l2-6h14l2 6"/><path d="M4 10v10h16V10"/><path d="M9 20v-6h6v6"/>'),"Lihat & coba langsung","Datang ke showroom, lihat unitnya, duduk, dan tanya-tanya dulu sebelum memutuskan."),
(ic('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),"4 varian berkarakter","Black, Street Edition, Silver Classic, dan Graffiti Edition. Tinggal pilih yang paling cocok."),
(IC['wa'],"Pesan mudah via WhatsApp","Pilih sepeda, kirim pesanan, dan tim kami membalas langsung lewat chat."),
(IC['clock'],"Buka setiap hari","Showroom buka 09.00–23.00, tujuh hari seminggu. Mampir kapan pun sempat."),
(ic('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'),"Servis & after sales","Didampingi dari memilih sampai setelah pembelian, termasuk perawatan."),
(ic('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>'),"Tim ramah & membantu","Kami senang menjelaskan kendaraan listrik, bahkan untuk yang baru pertama kali mencoba.")]
KEU='<section class="section wrap"><div class="sh"><h2>Kenapa pilih GANO EV Tembung</h2></div><div class="keu">'+"".join(f'<div><span class="ki">{i}</span><h3>{t}</h3><p>{d}</p></div>' for i,t,d in KEU_ITEMS)+'</div></section>'
PROF=f'''<section class="section wrap prof"><div class="prof-s"><span class="tag">Slogan kami</span><h2>Gaya klasik, <br>tenaga listrik.</h2></div><div class="prof-t"><h3>Ringkasan profil</h3><p>GANO EV Tembung adalah dealer sepeda motor listrik di Jl. Besar Tembung Pasar 7, Simpang Jodoh. Kami menyediakan sepeda motor listrik dengan beragam desain, dari yang minimalis sampai yang berani, dengan layanan ramah dari memilih sampai setelah pembelian.</p><a class="lnk" href="tentang.html">Baca profil lengkap {IC['ar']}</a></div></section>'''
SEJ_ITEMS=[("Awal mula","Berawal dari keyakinan bahwa kendaraan listrik akan jadi pilihan harian masyarakat Tembung dan sekitarnya: hemat, senyap, dan praktis."),
("Showroom dibuka","GANO EV Tembung membuka showroom di Jl. Besar Tembung Pasar 7, Simpang Jodoh, supaya calon pembeli bisa melihat dan mencoba unit langsung."),
("Varian bertambah","Koleksi berkembang menjadi empat varian sepeda motor listrik, yaitu Black, Street Edition, Silver Classic, dan Graffiti Edition, dengan berbagai warna lain di showroom."),
("Hari ini","Buka setiap hari 09.00–23.00, pemesanan mudah lewat WhatsApp, dan pendampingan dari sebelum sampai sesudah pembelian.")]
SEJ='<section class="section wrap"><div class="sh"><h2>Sejarah perusahaan</h2></div><ol class="tl">'+"".join(f'<li><small>{a}</small><p>{b}</p></li>' for a,b in SEJ_ITEMS)+'</ol></section>'
ORG='<section class="section wrap"><div class="sh"><h2>Struktur organisasi</h2></div><div class="org"><div class="on-node on-top"><b>Pimpinan</b><span>Mengarahkan usaha dan menjaga kualitas layanan</span></div><div class="org-kids"><div class="on-node"><b>Penjualan & Admin</b><span>Melayani pertanyaan, pesanan, dan pengantaran</span></div><div class="on-node"><b>Teknisi & Servis</b><span>Perawatan unit dan layanan after sales</span></div><div class="on-node"><b>Marketing & Konten</b><span>Media sosial, promosi, dan dokumentasi</span></div></div></div></section>'
# INDEX
V=[("black","Gelap & Sporty.","Sepeda motor listrik hitam minimalis dengan aksen oranye. Tampilan bersih, siap menemani harianmu."),
("street","Berani & Ekspresif.","Sepeda motor listrik hitam-silver dengan grafis street yang bikin orang menoleh."),
("silver","Retro Soul.","Sepeda motor listrik silver berjok coklat. Klasik di tampilan, listrik di jantungnya."),
("graffiti","Liar di Jalanan.","Sepeda motor listrik hijau-hitam dengan grafis graffiti. Untuk kamu yang suka tampil beda.")]
bgl="".join(f'<i data-s="{i}" class="{"on" if i==0 else ""}" style="background-image:url(assets/images/backgrounds/hero-{k}.png)"></i>' for i,(k,_,_) in enumerate(V))
bikes="".join(f'<div class="slide{" on" if i==0 else ""}" data-s="{i}"><img src="assets/images/products/gano-ev-{k}.webp" alt="{P[i][1]} — sepeda motor listrik" width="1536" height="1024"{"" if i==0 else " loading=lazy"}></div>' for i,(k,_,_) in enumerate(V))
txt="".join(f'<div class="ht{" on" if i==0 else ""}" data-s="{i}"><span class="pill"><i></i>{P[i][1]}</span><h1>Sepeda Motor Listrik.<br><em>{t}</em></h1><p>{d}</p></div>' for i,(k,t,d) in enumerate(V))
thumbs="".join(f'<button type="button" class="th{" on" if i==0 else ""}" data-go="{i}" data-s="{i}"><img src="assets/images/products/gano-ev-{k}.webp" alt="" width="120" height="80"><span><small>0{i+1}</small>{P[i][1]}</span><u></u></button>' for i,(k,_,_) in enumerate(V))
page("index","GANO EV Tembung — Dealer Sepeda Motor Listrik di Tembung","Dealer sepeda motor listrik GANO EV Tembung. Lihat 4 varian SpeedSphere T18, kunjungi showroom, dan pesan lewat WhatsApp.",f'''
<section class="hero" data-v="0" data-th="fire"><div class="bgl">{bgl}</div><div class="vig"></div>
<div class="wrap hero-in"><div class="hero-t">{txt}
<div class="hero-a"><a class="btn btn-y" href="produk.html">Lihat sepeda motor listrik {IC['ar']}</a><button class="btn btn-o" type="button" data-add-current>{IC['plus']} Tambah pesanan</button></div>
<ul class="facts"><li>{IC['clock']}Buka 09.00–23.00</li><li>{IC['pin']}Tembung, Simpang Jodoh</li></ul></div>
<div class="hero-v"><div class="slides">{bikes}</div><svg class="vines" viewBox="0 0 600 140" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><path pathLength="1" d="M0 140C60 90 40 60 110 40S200 90 260 100"/><path pathLength="1" d="M600 140C540 80 560 50 490 36S400 80 350 104"/><path pathLength="1" d="M170 140C200 112 250 122 310 108"/><ellipse cx="110" cy="40" rx="15" ry="7" transform="rotate(-35 110 40)"/><ellipse cx="60" cy="86" rx="13" ry="6" transform="rotate(25 60 86)"/><ellipse cx="490" cy="36" rx="15" ry="7" transform="rotate(35 490 36)"/><ellipse cx="545" cy="84" rx="13" ry="6" transform="rotate(-25 545 84)"/><ellipse cx="260" cy="100" rx="12" ry="6" transform="rotate(-20 260 100)"/></svg><button class="hit" type="button" data-detail-cur aria-label="Lihat detail sepeda"><span>Klik untuk detail</span></button><canvas class="fxc" aria-hidden="true"></canvas></div></div>
<div class="wrap explore"><div class="ex-h"><span>Pilih model sepeda motor listrik</span><i></i><b data-count>01</b><span>/ 04</span><button type="button" data-prev aria-label="Sebelumnya">{IC['ar']}</button><button type="button" data-next aria-label="Berikutnya">{IC['ar']}</button></div><div class="ths">{thumbs}</div></div></section>
<section class="strip" aria-hidden="true"><div class="mq"><span>Sepeda motor listrik</span><span>Showroom Tembung</span><span>Servis &amp; after sales</span><span>Pesan via WhatsApp</span><span>Sepeda motor listrik</span><span>Showroom Tembung</span><span>Servis &amp; after sales</span><span>Pesan via WhatsApp</span></div></section>
{PROF}
<section class="section wrap"><div class="sh"><h2>Pilih sepeda motor listrik kamu</h2><a class="lnk" href="produk.html">Semua produk {IC['ar']}</a></div><div class="pgrid">{"".join(pcard(i) for i in range(4))}</div></section>
{SRI}
{KEU}
<section class="section wrap"><div class="sh"><h2>Cara pesan, tiga langkah</h2></div><ol class="steps"><li><b>Pilih sepeda</b><span>Tekan “Tambah pesanan” di sepeda yang kamu suka.</span></li><li><b>Isi pesanan</b><span>Buka keranjang Pesanan, atur jumlah dan isi nama.</span></li><li><b>Lanjut ke WhatsApp</b><span>Pesanan jadi chat otomatis ke tim kami. Tinggal kirim.</span></li></ol></section>
{CTA}''')
# PRODUK
page("produk","Sepeda Motor Listrik SpeedSphere T18 — 4 Varian | GANO EV Tembung","Lihat varian SpeedSphere T18: Black, Street Edition, Silver Classic, dan Graffiti Edition.",
hero("Sepeda motor listrik SpeedSphere T18","Empat varian dengan karakter berbeda. Tambahkan ke pesanan, kirim ke WhatsApp, selesai.","street")+
f'<section class="section wrap"><div class="pgrid">{"".join(pcard(i) for i in range(4))}</div><p class="note">Harga mulai Rp 6 jutaan; warna dan stok bisa berubah. Tim kami akan mengonfirmasi setelah kamu kirim pesanan.</p></section>'+
CTA)
# GALERI
VID=f'''<section class="section wrap vid"><div class="vid-t"><h2>Video promosi</h2><p>Lihat sepeda motor listrik SpeedSphere T18 bergerak. Video lengkap juga ada di TikTok dan Instagram kami.</p><div class="vid-l"><a class="btn btn-o btn-s" href="https://www.tiktok.com/@gano.tembung?_r=1&_t=ZS-9AExnEYd7w2" target="_blank" rel="noopener">{IC['tt']} TikTok</a><a class="btn btn-o btn-s" href="https://www.instagram.com/ganotembung?stkn=MW5oaHBrNDlreWZkYQ==" target="_blank" rel="noopener">{IC['ig']} Instagram</a></div></div>
<div class="vid-b"><video controls playsinline preload="metadata" src="assets/video/promo.mp4"></video><div class="vid-fb" hidden><b>Video promosi segera hadir</b><span>Video belum dapat diputar. Lihat video kami di TikTok atau Instagram.</span></div></div></section>'''
TL=[("assets/images/store/koleksi-showroom.jpeg","Pilihan SpeedSphere T18 di showroom","50% 50%"),
("assets/images/store/suasana-showroom.jpeg","Suasana showroom GANO EV","50% 50%"),
("assets/images/store/pelanggan-street-baru.png","Pelanggan dengan SpeedSphere T18 Street Edition","50% 50%"),
("assets/images/store/pelanggan-black-baru.jpeg","Pelanggan dengan SpeedSphere T18 Black","50% 50%"),
("assets/images/products/galeri-black.jpeg","SpeedSphere T18 Black","50% 50%"),
("assets/images/products/galeri-street.jpeg","SpeedSphere T18 Street Edition","50% 50%"),
("assets/images/products/galeri-graffiti.jpeg","SpeedSphere T18 Graffiti Edition","50% 50%"),
("assets/images/products/galeri-silver.jpg","SpeedSphere T18 Silver Classic","50% 50%")]
def ct(f): return " gallery-photo"
tiles="".join(f'<button type="button" class="gi{ct(f)}" data-src="{f}" data-cap="{c}"><img src="{f}" alt="{c}" loading="lazy" style="object-position:{o}"><span>{c}</span></button>' for f,c,o in TL)
page("galeri","Galeri — Showroom & Video GANO EV Tembung","Foto showroom, pelanggan, empat varian sepeda motor listrik, dan video promosi GANO EV Tembung.",
hero("Galeri","Showroom kami, pelanggan yang sudah bawa pulang, semua varian sepeda motor listrik, dan video promosinya.","silver")+
f'''<section class="section wrap"><div class="tiles">{tiles}</div></section>
{VID}
<div class="lb" id="lb" aria-hidden="true" role="dialog" aria-modal="true"><button class="lb-x" type="button" aria-label="Tutup">{IC['x']}</button><figure><img alt=""><figcaption></figcaption></figure></div>'''+CTA)
# TENTANG
page("tentang","Tentang GANO EV Tembung — Dealer Sepeda Motor Listrik","Sejarah, visi, misi, dan struktur organisasi GANO EV Tembung, dealer sepeda motor listrik di Tembung.",
hero("Tentang GANO EV Tembung","Dealer sepeda motor listrik yang membantu orang Tembung dan sekitarnya beralih ke kendaraan listrik.","silver")+
SRT+SEJ+'''<section class="section wrap vm"><div><h3>Visi</h3><p>Jadi pilihan utama masyarakat untuk mobilitas listrik yang modern, praktis, dan relevan.</p></div>
<div><h3>Misi</h3><ul class="ticks"><li>Menyediakan sepeda motor listrik berkualitas.</li><li>Melayani setiap pelanggan dengan ramah.</li><li>Membantu masyarakat mengenal kendaraan listrik.</li><li>Membuat proses pembelian mudah.</li></ul></div></section>'''+ORG+CTA)
# ARTIKEL
A=[("Kenapa sepeda motor listrik cocok untuk harian","28 September 2026","articles/motor-harian.png","Biaya jalan rendah, tidak perlu BBM, dan senyap di jalan lingkungan.",["Biaya jalan sepeda motor listrik rendah karena tidak memakai BBM. Cukup isi daya di rumah, lalu siap dipakai untuk ke kerja, sekolah, atau belanja dekat rumah.","Suaranya senyap sehingga nyaman di jalan lingkungan, dan bodinya ringkas sehingga mudah diparkir. Untuk jarak dekat sehari-hari, sepeda motor listrik adalah pilihan yang praktis."]),
("Tips merawat sepeda motor listrik","15 September 2026","articles/tips-perawatan.png","Isi daya secukupnya, cek tekanan ban, dan bersihkan bodi secara rutin.",["Isi daya secukupnya dan gunakan pengisi daya bawaan. Hindari memarkir sepeda di bawah panas terik dalam waktu lama agar komponen tetap awet.","Cek tekanan ban dan kondisi rem secara berkala, lalu bersihkan bodi dengan lap lembap. Bila ada yang terasa tidak biasa, bawa ke showroom untuk dicek tim kami."]),
("Memilih varian sesuai gaya","2 September 2026","articles/pilihan-varian.png","Black, Street, Silver Classic, atau Graffiti: mana yang paling cocok denganmu?",["Black cocok untuk yang suka tampilan minimalis. Street punya grafis silver yang ekspresif, sedangkan Silver Classic membawa nuansa retro dengan jok coklat.","Graffiti Edition dengan warna hijau-hitam cocok untuk yang ingin tampil berani. Cara terbaik memilih adalah melihat dan mencoba langsung di showroom kami."]),
("Cara pesan sepeda motor listrik lewat WhatsApp","20 Agustus 2026","articles/pesan-whatsapp.png","Pilih sepeda, kirim pesanan, dan tim kami membalas lewat chat.",["Buka halaman Sepeda Motor Listrik, tekan Tambah pesanan di varian yang kamu suka, lalu buka keranjang Pesanan untuk mengatur jumlah dan mengisi nama.","Tekan kirim, dan WhatsApp terbuka otomatis dengan isi pesananmu. Harga, warna, dan ketersediaan akan dikonfirmasi oleh tim kami."])]
page("artikel","Artikel Sepeda Motor Listrik | GANO EV Tembung","Tips memilih, merawat, dan memakai sepeda motor listrik untuk harian.",hero("Artikel","Tips singkat seputar sepeda motor listrik.")+
'<section class="section wrap"><div class="pgrid agrid">'+"".join(f'<article class="pc"><div class="pc-img"><img src="assets/images/{im}" alt="{t}" width="1536" height="1024" loading="lazy"></div><div class="pc-b"><span class="tag">{dt}</span><h3>{t}</h3><p>{ex}</p><div class="art-full" hidden>{"".join("<p>"+x+"</p>" for x in fu)}</div><div class="pc-a"><button class="btn btn-o btn-s" type="button" data-read>Baca selengkapnya {IC["ar"]}</button></div></div></article>' for t,dt,im,ex,fu in A)+'</div></section>'+CTA)
# KONTAK
page("kontak","Kontak & Lokasi — GANO EV Tembung","Alamat, telepon, email, WhatsApp, dan peta lokasi GANO EV Tembung.",hero("Kontak & lokasi","Tanya stok, harga, atau jadwal lihat unit. Balasan tercepat lewat WhatsApp.","graffiti")+
f'''<section class="section wrap kgrid"><form class="panel" id="cf"><h2>Kirim pesan</h2><label>Nama<input name="n" required></label><label>Pesan<textarea name="p" rows="4" required placeholder="Mis. Info harga SpeedSphere T18 Black"></textarea></label><button class="btn btn-wa" type="submit">{IC['wa']} Kirim ke WhatsApp</button><button class="btn btn-o" type="button" data-mail>{IC['mail']} Kirim lewat Email</button></form>
<div class="panel"><h2>Informasi</h2><ul class="info"><li>{IC['pin']}<span>Jl. Besar Tembung Pasar 7, Simpang Jodoh, sebelah Toko Emas Anugrah</span></li><li>{IC['clock']}<span>Setiap hari, 09.00–23.00</span></li><li>{IC['tel']}<a href="tel:+6282246020229">Telepon 0822-4602-0229</a></li><li>{IC['mail']}<a href="mailto:{EMAIL}">{EMAIL}</a></li><li>{IC['wa']}<a data-wa href="#" target="_blank" rel="noopener">WhatsApp 0822-4602-0229</a></li><li>{IC['ig']}<a href="https://www.instagram.com/ganotembung?stkn=MW5oaHBrNDlreWZkYQ==" target="_blank" rel="noopener">@ganotembung</a></li><li>{IC['tt']}<a href="https://www.tiktok.com/@gano.tembung?_r=1&_t=ZS-9AExnEYd7w2" target="_blank" rel="noopener">@gano.tembung</a></li><li>{IC['fb']}<a href="https://www.facebook.com/share/1CnvmJAzoQ/" target="_blank" rel="noopener">Facebook GANO Tembung</a></li></ul>
<a class="btn btn-y" href="https://www.google.com/maps/search/?api=1&query=GANO+EV+Tembung+Jl+Besar+Tembung+Pasar+7" target="_blank" rel="noopener">{IC['pin']} Buka di Google Maps</a></div></section>
<section class="section wrap kgrid"><iframe class="map" title="Peta GANO EV Tembung" loading="lazy" src="https://www.google.com/maps?q=GANO+EV+Tembung+Jl+Besar+Tembung+Pasar+7&output=embed"></iframe><img class="poster" src="assets/images/store/info-buka.webp" alt="Poster jam buka GANO Electric Vehicle" loading="lazy" width="720" height="1271"></section>''')

