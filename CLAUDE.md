# CLAUDE.md
# Pedoman Pengembangan Aplikasi Pembelajaran Operasi Bilangan Bulat

## 1. Konteks proyek
Proyek ini adalah aplikasi pembelajaran matematika berbasis web yang dapat digunakan melalui browser desktop maupun smartphone. Sasaran awalnya adalah siswa SMP kelas VIII yang mempelajari operasi hitung bilangan bulat.

Aplikasi dirancang berdasarkan hasil wawancara seorang siswa kelas VIII. Temuan utama:
- Siswa masih sering tertukar aturan tanda positif dan negatif.
- Siswa kesulitan ketika beberapa operasi muncul dalam satu soal.
- Siswa membutuhkan penjelasan yang pelan, bertahap, dan dapat diulang.
- Garis bilangan dan contoh kehidupan sehari-hari dapat membantu pemahaman.
- Siswa mengusulkan contoh perubahan suhu dengan angka yang dapat berubah dan disertai penjelasan perhitungan.
- Tampilan yang terlalu ramai dan penggunaan terlalu banyak warna dapat mengganggu fokus.

Tujuan pembelajaran adalah membantu siswa memahami operasi bilangan bulat, mengelola beban kognitif yang tidak perlu, dan melatih literasi matematis. Jangan mengklaim aplikasi telah terbukti menurunkan cognitive load atau meningkatkan hasil belajar sebelum dilakukan pengujian.

## 2. Prinsip pengembangan
1. **Utamakan pemahaman, bukan sekadar jawaban.** Setiap latihan perlu memberi umpan balik dan alasan langkah penyelesaian.
2. **Satu fokus pada satu waktu.** Hindari menampilkan terlalu banyak informasi sekaligus.
3. **Bertahap.** Mulai dari konsep sederhana, lanjut ke operasi tunggal, kemudian operasi campuran dan soal cerita.
4. **Konsisten.** Gunakan istilah, simbol, warna, tombol, dan pola navigasi yang konsisten.
5. **Responsif.** Semua halaman harus nyaman digunakan pada layar ponsel dan desktop.
6. **Mudah diakses.** Pastikan teks terbaca, kontras cukup, tombol mudah disentuh, dan navigasi dapat digunakan dengan keyboard.
7. **Bahasa sederhana.** Gunakan Bahasa Indonesia yang jelas dan sesuai untuk siswa SMP.

## 3. Aturan sebelum mengubah kode
- Periksa struktur folder dan teknologi yang sudah digunakan sebelum membuat atau mengganti file.
- Pertahankan teknologi dan pola proyek yang sudah ada jika masih layak.
- Jangan mengganti konfigurasi, dependensi, atau struktur proyek secara besar-besaran tanpa alasan.
- Jika proyek masih kosong, jelaskan pilihan teknologi secara singkat sebelum implementasi.
- Jangan menghapus file pengguna yang sudah ada.
- Pisahkan struktur, tampilan, dan logika program secara wajar sesuai skala proyek.
- Gunakan nama file, variabel, dan fungsi yang jelas.

## 4. Kebutuhan fungsional utama
Implementasikan secara bertahap:
1. Beranda yang menjelaskan tujuan aplikasi dan menyediakan navigasi materi.
2. Materi aturan tanda positif dan negatif dengan contoh.
3. Visualisasi garis bilangan untuk membantu siswa melihat gerakan ke kanan dan kiri.
4. Simulasi suhu naik dan turun. Nilai awal dan perubahan dapat diubah pengguna, lalu aplikasi menampilkan operasi dan penjelasan hasilnya.
5. Pembahasan penjumlahan, pengurangan, perkalian, dan pembagian secara bertahap.
6. Materi operasi campuran dengan urutan pengerjaan yang dijelaskan satu langkah per tampilan.
7. Soal cerita kontekstual yang meminta siswa mengidentifikasi informasi dan memilih operasi yang sesuai.
8. Latihan bertingkat dengan umpan balik yang menjelaskan kesalahan, bukan hanya menyatakan benar atau salah.
9. Tombol untuk mengulang atau melihat kembali penjelasan.

## 5. Pedoman pembelajaran dan cognitive load
- Sajikan satu konsep atau satu langkah utama pada satu waktu.
- Berikan contoh yang sudah dikerjakan sebelum latihan mandiri.
- Hindari dekorasi, animasi, warna, dan teks yang tidak mendukung tujuan belajar.
- Jangan mengandalkan warna saja untuk membedakan bilangan positif dan negatif; sertakan tanda (+)/(-), label, atau keterangan.
- Pada operasi campuran, tampilkan ekspresi awal, langkah yang sedang dikerjakan, dan hasil sementara dengan jelas.
- Berikan kontrol kepada siswa untuk melanjutkan, kembali, atau mengulang penjelasan.
- Gunakan contoh kontekstual seperti perubahan suhu, tetapi pastikan konteks tidak menambah kerumitan yang tidak diperlukan.
- Jangan menampilkan seluruh pembahasan panjang sekaligus pada layar ponsel.

## 6. Akurasi matematika
Periksa semua contoh dan jawaban sebelum ditampilkan. Gunakan aturan:
- Penjumlahan: perhatikan tanda dan nilai mutlak bilangan.
- Pengurangan: ubah menjadi penjumlahan dengan lawan bilangan yang dikurangkan.
- Perkalian dan pembagian: tanda sama menghasilkan positif; tanda berbeda menghasilkan negatif.
- Operasi campuran: kerjakan tanda kurung, perkalian/pembagian, kemudian penjumlahan/pengurangan dari kiri ke kanan sesuai tingkat prioritas operasi.

Contoh acuan:
- -8 + 5 = -3
- 12 - (-7) = 19
- (-6) × 4 + 20 ÷ (-5) = -24 + (-4) = -28

Jangan mengubah hasil matematika demi menyesuaikan tampilan. Tambahkan pengujian untuk fungsi perhitungan jika logika dibuat dalam kode.

## 7. Pedoman antarmuka
- Gunakan desain bersih, sederhana, dan tidak ramai.
- Utamakan layout satu kolom pada smartphone.
- Gunakan ukuran tombol yang nyaman disentuh.
- Gunakan tipografi yang mudah dibaca dan hierarki judul yang jelas.
- Berikan status aktif/nonaktif dan pesan kesalahan yang mudah dipahami.
- Pastikan komponen tidak terpotong pada layar kecil.
- Sediakan navigasi yang konsisten untuk Beranda, Materi, Simulasi, dan Latihan.

## 8. Kriteria penerimaan
Sebuah fitur dianggap selesai jika:
- Berfungsi sesuai tujuan dan tidak hanya berupa tampilan statis.
- Dapat digunakan pada smartphone dan desktop.
- Penjelasan matematika benar.
- Alur penggunaan jelas dan dapat diulang.
- Tidak menampilkan terlalu banyak informasi dalam satu langkah.
- Tidak ada tombol yang tidak berfungsi.
- Tidak ada kesalahan tampilan utama pada ukuran layar kecil.
- Fitur dapat diuji dengan skenario yang ditulis.

## 9. Cara bekerja
Kerjakan dalam tahapan kecil:
1. Tinjau PRD.md dan DESAIN.md.
2. Periksa struktur proyek.
3. Buat kerangka aplikasi dan navigasi.
4. Implementasikan satu fitur pada satu waktu.
5. Uji fungsi matematika dan responsivitas.
6. Perbaiki masalah sebelum melanjutkan.
7. Perbarui dokumentasi jika keputusan implementasi berubah.

Sebelum menambahkan fitur di luar PRD, jelaskan manfaatnya dan pastikan tidak membuat antarmuka lebih rumit.
