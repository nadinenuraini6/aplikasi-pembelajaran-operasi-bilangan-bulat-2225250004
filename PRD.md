# PRD.md
# Product Requirements Document
## Aplikasi Pembelajaran Operasi Bilangan Bulat

**Status:** Dokumen perencanaan awal  
**Versi:** 1.0  
**Target platform:** Web responsif (browser desktop dan smartphone)  
**Target pengguna awal:** Siswa SMP kelas VIII

---

## 1. Ringkasan produk
Aplikasi ini merupakan media pembelajaran matematika berbasis web untuk membantu siswa memahami operasi hitung bilangan bulat melalui penjelasan bertahap, visualisasi, simulasi kontekstual, dan latihan interaktif.

Aplikasi berangkat dari hasil wawancara siswa kelas VIII. Siswa menyampaikan bahwa ia masih sering bingung menentukan tanda positif dan negatif, kesulitan pada operasi campuran, membutuhkan penjelasan yang lebih pelan, serta terbantu oleh garis bilangan dan contoh kehidupan sehari-hari. Siswa juga mengusulkan simulasi perubahan suhu dengan angka yang dapat berubah dan tampilan yang sederhana.

## 2. Latar belakang masalah
Temuan wawancara menunjukkan beberapa kebutuhan belajar:
- **Kesulitan konsep:** aturan tanda positif dan negatif masih sering tertukar.
- **Kesulitan prosedural:** siswa ragu menentukan langkah dan urutan operasi campuran.
- **Beban penyajian:** beberapa aturan yang dijelaskan sekaligus dan tempo yang cepat menyulitkan siswa.
- **Kebutuhan representasi:** siswa membutuhkan garis bilangan, contoh konkret, dan soal cerita.
- **Kebutuhan antarmuka:** tampilan sederhana agar perhatian tetap pada materi.

Masalah produk yang hendak dijawab: bagaimana menyediakan pengalaman belajar operasi bilangan bulat yang terstruktur, mudah diikuti, dan memberi kesempatan kepada siswa untuk mengulang serta mencoba sendiri?

## 3. Tujuan produk
1. Membantu siswa memahami makna bilangan positif dan negatif.
2. Membantu siswa menggunakan aturan tanda pada empat operasi hitung.
3. Membantu siswa mengikuti urutan penyelesaian operasi campuran.
4. Menghubungkan operasi bilangan bulat dengan situasi sehari-hari.
5. Menyediakan pengalaman belajar yang sederhana, bertahap, dan dapat diulang.
6. Melatih literasi matematis melalui soal kontekstual: memahami informasi, menentukan operasi, menyelesaikan, dan menafsirkan hasil.

Tujuan terkait cognitive load diterapkan melalui pengurangan informasi yang tidak relevan, pemecahan materi menjadi bagian kecil, contoh bertahap, dan kontrol untuk mengulang. Efektivitasnya perlu diuji kepada pengguna; dokumen ini tidak menganggap dampaknya sudah terbukti.

## 4. Pengguna dan kebutuhan
### Persona utama
**Siswa SMP kelas VIII** yang sedang mempelajari operasi bilangan bulat dan membutuhkan bantuan untuk memahami aturan tanda serta operasi campuran.

### Kebutuhan pengguna
- Penjelasan singkat dan tidak terlalu cepat.
- Contoh yang dikerjakan tahap demi tahap.
- Visualisasi gerak bilangan pada garis bilangan.
- Simulasi perubahan suhu yang nilainya dapat diubah.
- Ringkasan aturan tanda yang mudah dilihat kembali.
- Latihan dari tingkat mudah ke lebih menantang.
- Umpan balik yang menjelaskan letak kesalahan.

## 5. Ruang lingkup MVP
MVP adalah versi pertama yang berfokus pada materi operasi bilangan bulat.

### Fitur prioritas
| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| F01 | Beranda dan navigasi | Menampilkan pengantar dan akses ke bagian aplikasi | Tinggi |
| F02 | Materi aturan tanda | Ringkasan aturan dan contoh penjumlahan, pengurangan, perkalian, pembagian | Tinggi |
| F03 | Garis bilangan interaktif | Menunjukkan perpindahan ke kanan/kiri untuk operasi yang sesuai | Tinggi |
| F04 | Simulasi suhu | Pengguna mengubah suhu awal dan perubahan; aplikasi menunjukkan operasi dan hasil | Tinggi |
| F05 | Pembahasan bertahap | Menampilkan satu langkah penyelesaian dalam satu waktu | Tinggi |
| F06 | Operasi campuran | Menjelaskan prioritas operasi dengan hasil sementara | Tinggi |
| F07 | Soal cerita | Konteks sehari-hari, termasuk perubahan suhu | Sedang |
| F08 | Latihan interaktif | Soal bertingkat, input jawaban, dan umpan balik | Tinggi |
| F09 | Ulangi penjelasan | Kontrol untuk melihat kembali materi atau langkah | Tinggi |

### Di luar ruang lingkup MVP
- Login, akun, dan sinkronisasi cloud.
- Dashboard guru dan pengelolaan kelas.
- Peringkat/leaderboard dan kompetisi.
- Integrasi LMS.
- Materi matematika di luar operasi bilangan bulat.
- Analitik pembelajaran tingkat lanjut.

Fitur tersebut dapat dipertimbangkan setelah MVP diuji.

## 6. Alur pengguna utama
1. Siswa membuka aplikasi melalui browser.
2. Siswa membaca pengantar singkat di Beranda.
3. Siswa memilih Materi atau langsung memilih Simulasi.
4. Siswa mempelajari konsep dan contoh.
5. Siswa mencoba visualisasi garis bilangan atau simulasi suhu.
6. Siswa mengikuti pembahasan bertahap.
7. Siswa mengerjakan latihan.
8. Aplikasi memberikan umpan balik dan kesempatan mengulang.

## 7. Persyaratan fungsional
### F01 — Beranda
- Menampilkan nama aplikasi, deskripsi singkat, dan navigasi utama.
- Menyediakan akses yang jelas ke Materi, Simulasi, dan Latihan.

### F02 — Materi aturan tanda
- Menampilkan aturan untuk penjumlahan, pengurangan, perkalian, dan pembagian.
- Menyertakan contoh yang benar dan ringkas.
- Memisahkan penjelasan berdasarkan jenis operasi.

### F03 — Garis bilangan
- Menampilkan bilangan pada garis bilangan dengan titik nol yang jelas.
- Memvisualisasikan perpindahan secara sederhana.
- Menampilkan kalimat operasi dan hasil.
- Tidak mengandalkan warna saja untuk menunjukkan arah atau tanda.

### F04 — Simulasi suhu
- Pengguna dapat mengubah suhu awal dan besar perubahan.
- Pengguna dapat memilih kenaikan atau penurunan suhu.
- Aplikasi menampilkan model operasi bilangan bulat, proses, dan hasil akhir.
- Nilai masukan dibatasi dan divalidasi agar mudah digunakan.

### F05/F06 — Pembahasan bertahap dan operasi campuran
- Menampilkan soal, langkah aktif, dan hasil sementara.
- Pengguna dapat memilih Lanjut, Kembali, dan Ulangi.
- Menjelaskan urutan operasi secara eksplisit.
- Tidak menampilkan semua langkah sekaligus sebagai paragraf panjang.

### F07 — Soal cerita
- Menggunakan konteks yang dekat dengan kehidupan sehari-hari.
- Meminta siswa mengenali informasi penting dan operasi yang tepat.
- Menampilkan pembahasan setelah siswa mencoba.

### F08 — Latihan
- Menyediakan soal dari mudah ke lebih menantang.
- Memvalidasi jawaban.
- Memberi umpan balik yang menjelaskan konsep atau langkah yang perlu diperiksa.
- Memberi kesempatan mencoba kembali.

### F09 — Ulangi penjelasan
- Tersedia pada materi atau pembahasan yang relevan.
- Mengembalikan siswa ke penjelasan tanpa kehilangan konteks secara membingungkan.

## 8. Persyaratan nonfungsional
- **Responsif:** dapat digunakan pada smartphone dan desktop.
- **Keterbacaan:** teks, simbol, dan angka mudah dibaca.
- **Aksesibilitas:** navigasi keyboard dasar, label kontrol jelas, kontras memadai.
- **Kinerja:** halaman dan interaksi utama terasa ringan.
- **Konsistensi:** pola tombol dan navigasi seragam.
- **Keandalan:** hasil perhitungan sesuai aturan matematika.
- **Privasi:** MVP tidak meminta data pribadi siswa yang tidak diperlukan.

## 9. Kriteria keberhasilan dan pengujian
Kriteria awal untuk uji coba:
1. Siswa dapat menemukan materi, simulasi, dan latihan tanpa bantuan besar.
2. Siswa dapat menjelaskan arti perpindahan pada garis bilangan.
3. Siswa dapat mengubah nilai simulasi suhu dan menghubungkannya dengan operasi bilangan bulat.
4. Siswa dapat mengikuti langkah penyelesaian operasi campuran.
5. Siswa memahami umpan balik ketika jawabannya salah.
6. Siswa menilai tampilan cukup jelas dan tidak terlalu ramai.

### Contoh skenario uji matematika
- `-8 + 5` menghasilkan `-3`.
- `12 - (-7)` menghasilkan `19`.
- `(-6) × 4 + 20 ÷ (-5)` dikerjakan menjadi `-24 + (-4)`, hasil `-28`.

### Metode evaluasi yang disarankan
Lakukan uji coba terbatas dengan siswa sasaran. Gunakan:
- Observasi apakah siswa dapat menyelesaikan tugas tanpa tersesat pada navigasi.
- Pertanyaan singkat tentang bagian yang membingungkan atau membantu.
- Perbandingan hasil latihan sebelum dan sesudah penggunaan sebagai indikasi awal, bukan bukti tunggal.
- Kuesioner sederhana tentang kejelasan tampilan, beban informasi, dan kemudahan mengulang materi.

## 10. Asumsi dan hal yang perlu dikonfirmasi
- Wawancara yang tersedia berasal dari satu siswa; kebutuhan pengguna lain mungkin berbeda.
- Perangkat utama siswa (jenis ponsel, ukuran layar, dan akses internet) belum diketahui.
- Belum ditentukan apakah aplikasi harus berjalan offline.
- Belum ditentukan teknologi implementasi; pilihan teknologi perlu mengikuti kondisi folder proyek dan kebutuhan perkuliahan.
- Materi dan contoh perlu ditinjau kembali agar sesuai dengan capaian pembelajaran yang digunakan.

## 11. Dasar kebutuhan dari wawancara
| Temuan wawancara | Implikasi produk |
|---|---|
| Bingung aturan tanda dan sering tertukar | Materi aturan tanda dengan contoh |
| Bingung pada operasi campuran | Pembahasan satu langkah per tampilan |
| Garis bilangan membantu tetapi arah masih membingungkan | Visualisasi garis bilangan dengan arah dan label yang jelas |
| Penjelasan terlalu cepat atau terlalu banyak sekaligus | Kontrol lanjut, kembali, dan ulangi |
| Membutuhkan contoh konkret | Simulasi suhu dan soal cerita |
| Menginginkan angka simulasi berubah | Input nilai suhu yang dapat diubah |
| Menginginkan tampilan sederhana | Antarmuka minimal dan fokus pada materi |

**Catatan:** kebutuhan di atas bersumber dari wawancara siswa dan merupakan dasar rancangan awal, bukan generalisasi untuk seluruh siswa SMP.
