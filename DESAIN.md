# DESAIN.md
# Rancangan UI/UX Aplikasi Pembelajaran Operasi Bilangan Bulat

**Versi:** 1.0  
**Platform:** Web responsif untuk smartphone dan browser desktop  
**Arah desain:** sederhana, fokus, bertahap, dan mudah dipahami siswa SMP.

---

## 1. Prinsip desain
1. **Sederhana:** hindari dekorasi dan elemen yang tidak membantu belajar.
2. **Fokus:** satu layar memiliki satu tujuan utama.
3. **Bertahap:** informasi dan langkah penyelesaian ditampilkan sedikit demi sedikit.
4. **Konsisten:** tombol, ikon, istilah, dan navigasi memiliki pola yang sama.
5. **Responsif:** tata letak menyesuaikan layar ponsel maupun desktop.
6. **Jelas tanpa bergantung pada warna:** tanda positif/negatif dan label tetap ditampilkan.

## 2. Arah visual
- Latar: putih atau abu-abu sangat muda.
- Warna utama: biru tua atau biru sedang untuk navigasi dan tombol utama.
- Warna pendukung: hijau lembut untuk status benar dan merah lembut untuk peringatan/kesalahan.
- Warna digunakan secukupnya; jangan memberi warna berbeda pada terlalu banyak elemen.
- Teks utama berwarna gelap dengan kontras yang cukup.
- Gunakan font sans-serif yang mudah dibaca.
- Angka dan simbol operasi dibuat cukup besar agar jelas di smartphone.
- Sudut komponen sedikit membulat dan jarak antarelemen cukup lega.

Warna hanya sebagai penanda tambahan. Selalu sertakan teks, simbol, atau label.

## 3. Struktur navigasi
Navigasi utama:
- **Beranda**
- **Materi**
- **Simulasi**
- **Latihan**

Pada desktop, navigasi dapat tampil di bagian atas atau sisi halaman. Pada smartphone, gunakan navigasi ringkas yang tidak mengambil terlalu banyak ruang. Pastikan pengguna selalu mengetahui halaman yang sedang dibuka.

## 4. Peta halaman
```text
Beranda
├── Materi
│   ├── Mengenal Bilangan Positif dan Negatif
│   ├── Penjumlahan dan Pengurangan
│   ├── Perkalian dan Pembagian
│   └── Operasi Campuran
├── Simulasi
│   ├── Garis Bilangan
│   └── Simulasi Suhu
└── Latihan
    ├── Latihan Dasar
    ├── Latihan Operasi Campuran
    └── Soal Cerita
```

## 5. Rancangan setiap halaman

### A. Beranda
**Tujuan:** memberi orientasi dan mengarahkan siswa ke kegiatan belajar.

Komponen:
- Nama aplikasi dan deskripsi satu kalimat.
- Sapaan/pengantar singkat.
- Kartu atau tombol Materi, Simulasi, dan Latihan.
- Petunjuk singkat: mulai dari materi jika belum memahami konsep.

Sketsa:
```text
+----------------------------------+
|  BELAJAR BILANGAN BULAT          |
|  Pahami tanda, langkah, dan      |
|  penerapannya dalam kehidupan.  |
|                                  |
|  [ Mulai Belajar ]               |
|                                  |
|  Pilih kegiatan                  |
|  [ Materi ]    [ Simulasi ]      |
|  [ Latihan ]                     |
+----------------------------------+
```

### B. Halaman Materi
**Tujuan:** menyajikan konsep secara terstruktur.

Komponen:
- Judul topik.
- Penjelasan singkat.
- Aturan atau rumus inti.
- Satu contoh soal.
- Tombol Lihat Pembahasan.
- Tombol Kembali dan Lanjut.

Jangan menampilkan seluruh materi panjang dalam satu layar. Pisahkan berdasarkan jenis operasi.

### C. Visualisasi Garis Bilangan
**Tujuan:** membantu siswa melihat posisi bilangan dan arah perpindahan.

Komponen:
- Garis bilangan dengan titik nol dan angka yang terbaca.
- Soal yang sedang dipelajari.
- Penanda posisi awal.
- Penjelasan arah gerak dengan label seperti “ke kanan” atau “ke kiri”.
- Tombol langkah berikutnya dan ulangi.

Catatan pembelajaran:
- Tampilkan operasi dan arah gerak secara bersamaan.
- Jangan mengasumsikan siswa otomatis memahami arah; beri penjelasan singkat.
- Untuk versi awal, batasi rentang angka agar garis bilangan tidak terlalu padat.

### D. Simulasi Suhu
**Tujuan:** menghubungkan bilangan positif dan negatif dengan perubahan suhu.

Komponen:
- Nilai suhu awal yang dapat diubah.
- Pilihan suhu naik atau turun.
- Besar perubahan suhu yang dapat diubah.
- Tombol Simulasikan.
- Tampilan operasi matematika.
- Hasil suhu akhir.
- Pembahasan langkah demi langkah.

Contoh:
```text
SIMULASI PERUBAHAN SUHU

Suhu awal       [  3 ] °C
Perubahan       [ Turun v ]
Besar perubahan [  5 ] °C

             [ Simulasikan ]

Operasi: 3 - 5
Suhu akhir: -2 °C

Penjelasan:
Suhu awal 3°C turun 5°C.
Maka 3 - 5 = -2.
```

Validasi input:
- Pastikan kolom hanya menerima angka dalam rentang yang ditentukan.
- Tampilkan pesan yang mudah dipahami jika input tidak valid.
- Sediakan tombol Atur Ulang.

### E. Pembahasan Bertahap
**Tujuan:** mengurangi banyaknya informasi yang harus diproses sekaligus.

Komponen:
- Soal utama.
- Indikator langkah, misalnya “Langkah 1 dari 3”.
- Satu penjelasan untuk langkah aktif.
- Hasil sementara bila diperlukan.
- Tombol Kembali, Lanjut, dan Ulangi.

Contoh soal `(-6) × 4 + 20 ÷ (-5)`:
```text
Soal:
(-6) × 4 + 20 ÷ (-5)

Langkah 1 dari 3
Kerjakan perkalian dan pembagian terlebih dahulu.

[ Lanjut ]

Langkah 2 dari 3
(-6) × 4 = -24
20 ÷ (-5) = -4

Hasil sementara:
-24 + (-4)

[ Kembali ] [ Lanjut ]

Langkah 3 dari 3
-24 + (-4) = -28

Jawaban: -28
[ Ulangi Pembahasan ]
```
Teks di atas adalah contoh alur tampilan; jumlah langkah dapat menyesuaikan soal.

### F. Latihan
**Tujuan:** memberi kesempatan siswa menerapkan konsep.

Komponen:
- Satu soal dalam satu tampilan.
- Kolom jawaban atau pilihan jawaban.
- Tombol Periksa Jawaban.
- Umpan balik setelah jawaban diperiksa.
- Tombol Coba Lagi dan Lihat Pembahasan.

Contoh umpan balik:
- Benar: “Jawabanmu benar. Kamu sudah tepat menentukan tanda hasilnya.”
- Belum tepat: “Coba periksa kembali aturan tanda pada operasi ini. Kamu bisa melihat contoh pembahasan.”

Hindari umpan balik yang hanya menyebut “salah” tanpa bantuan.

### G. Soal Cerita
**Tujuan:** melatih literasi matematis melalui konteks.

Alur:
1. Siswa membaca cerita singkat.
2. Siswa mengidentifikasi informasi yang diketahui.
3. Siswa menentukan operasi yang sesuai.
4. Siswa memasukkan jawaban.
5. Aplikasi menampilkan pembahasan dan arti hasil dalam konteks cerita.

Gunakan konteks perubahan suhu sebagai salah satu contoh awal sesuai usulan siswa.

## 6. Komponen antarmuka yang digunakan berulang
- Header dan navigasi.
- Judul halaman dan deskripsi singkat.
- Kartu materi.
- Panel soal.
- Panel pembahasan.
- Input angka.
- Tombol utama dan tombol sekunder.
- Pesan umpan balik.
- Indikator langkah.

Semua komponen harus memiliki gaya dan perilaku yang konsisten.

## 7. Responsivitas
### Smartphone
- Gunakan satu kolom.
- Tombol utama lebar dan mudah disentuh.
- Hindari tabel lebar; ubah menjadi kartu atau daftar.
- Pastikan garis bilangan dapat digeser atau disesuaikan tanpa membuat angka terlalu kecil.
- Letakkan navigasi agar mudah dijangkau dan tidak menutupi konten.

### Desktop
- Konten dapat dibatasi pada lebar baca yang nyaman.
- Simulasi dapat menampilkan kontrol di satu sisi dan visualisasi di sisi lain.
- Jangan memperlebar teks pembahasan hingga sulit dibaca.

## 8. Aksesibilitas dan kenyamanan belajar
- Gunakan ukuran teks isi yang nyaman dibaca.
- Berikan label pada semua input.
- Pastikan fokus keyboard terlihat.
- Gunakan teks selain warna untuk status benar/salah.
- Hindari animasi cepat atau berlebihan.
- Jangan memutar suara otomatis.
- Berikan kontrol untuk mengulang dan melanjutkan.
- Pastikan simbol matematika tidak terpotong pada layar kecil.

## 9. Alur penggunaan yang direkomendasikan
```text
Beranda
  ↓
Pilih Materi
  ↓
Pelajari aturan dan contoh
  ↓
Coba Garis Bilangan / Simulasi Suhu
  ↓
Ikuti Pembahasan Bertahap
  ↓
Kerjakan Latihan
  ↓
Baca Umpan Balik
  ↓
Ulangi materi atau lanjut ke soal berikutnya
```

## 10. Hal yang belum ditetapkan
- Nama final aplikasi.
- Logo dan identitas visual final.
- Apakah aplikasi harus dapat digunakan tanpa internet.
- Teknologi frontend dan backend.
- Apakah progres belajar perlu disimpan.
- Rentang angka pada simulasi dan jumlah soal tiap tingkat.

Keputusan tersebut ditetapkan saat implementasi setelah memeriksa kondisi proyek dan kebutuhan tugas.
