
import { useState, useRef } from "react";
import "./App.css";

const soalPretest = [
  { q: "Hasil dari 5 + (-3) adalah ...", a: ["2", "8", "-2", "-8"], k: 0, p: "5 + (-3) = 5 - 3 = 2." },
  { q: "Hasil dari -7 + (-4) adalah ...", a: ["-3", "11", "-11", "3"], k: 2, p: "Bilangan negatif ditambah negatif hasilnya negatif: -11." },
  { q: "Hasil dari 9 - 12 adalah ...", a: ["3", "-3", "21", "-21"], k: 1, p: "9 - 12 = -3." },
  { q: "Hasil dari (-4) × 3 adalah ...", a: ["12", "-12", "7", "-7"], k: 1, p: "Negatif dikali positif hasilnya negatif: -12." },
  { q: "Hasil dari (-20) ÷ (-5) adalah ...", a: ["-4", "4", "15", "-15"], k: 1, p: "Negatif dibagi negatif hasilnya positif: 4." }
];

const soalLatihan = [
  { q: "Hasil dari 8 + (-5) adalah ...", a: ["3", "13", "-3", "-13"], k: 0, p: "8 + (-5) = 8 - 5 = 3." },
  { q: "Hasil dari -6 + (-9) adalah ...", a: ["15", "-3", "-15", "3"], k: 2, p: "Keduanya negatif, jadi hasilnya -15." },
  { q: "Hasil dari 7 - 11 adalah ...", a: ["4", "-4", "18", "-18"], k: 1, p: "7 - 11 = -4." },
  { q: "Hasil dari (-6) × (-3) adalah ...", a: ["-18", "18", "-9", "9"], k: 1, p: "Negatif dikali negatif hasilnya positif: 18." },
  { q: "Hasil dari 36 ÷ (-6) adalah ...", a: ["6", "-6", "30", "-30"], k: 1, p: "Positif dibagi negatif hasilnya negatif: -6." }
];

const soalPosttest = [
  { q: "Hasil dari -12 + 8 adalah ...", a: ["20", "4", "-4", "-20"], k: 2, p: "-12 + 8 = -4." },
  { q: "Hasil dari 15 - (-5) adalah ...", a: ["10", "20", "-20", "-10"], k: 1, p: "15 - (-5) = 15 + 5 = 20." },
  { q: "Hasil dari (-7) × 4 adalah ...", a: ["28", "-28", "11", "-11"], k: 1, p: "Negatif dikali positif hasilnya -28." },
  { q: "Hasil dari (-48) ÷ (-8) adalah ...", a: ["-6", "6", "40", "-40"], k: 1, p: "Negatif dibagi negatif hasilnya positif: 6." },
  { q: "Suhu awal 2°C, kemudian turun 7°C. Suhu sekarang adalah ...", a: ["9°C", "5°C", "-5°C", "-9°C"], k: 2, p: "2 - 7 = -5°C." }
];

function Kuis({ judul, daftarSoal, onSelesai }) {
  const [jawaban, setJawaban] = useState({});
  const [selesai, setSelesai] = useState(false);

  const nilai = daftarSoal.reduce(
    (total, soal, i) => total + (jawaban[i] === soal.k ? 20 : 0),
    0
  );

  function kirimJawaban() {
    if (Object.keys(jawaban).length !== daftarSoal.length) return;
    setSelesai(true);
    onSelesai(nilai);
  }

  return (
    <section className="content-card">
      <h2>{judul}</h2>
      <p className="section-desc">Pilih satu jawaban yang paling tepat.</p>

      {daftarSoal.map((soal, i) => (
        <div className="question-card" key={i}>
          <h3>{i + 1}. {soal.q}</h3>
          <div className="answer-options">
            {soal.a.map((pilihan, j) => (
              <label
                className={`answer-option ${jawaban[i] === j ? "selected" : ""}`}
                key={j}
              >
                <input
                  type="radio"
                  name={`${judul}-${i}`}
                  checked={jawaban[i] === j}
                  disabled={selesai}
                  onChange={() => setJawaban({ ...jawaban, [i]: j })}
                />
                {String.fromCharCode(65 + j)}. {pilihan}
              </label>
            ))}
          </div>

          {selesai && (
            <div className={`answer-explanation ${jawaban[i] === soal.k ? "correct" : "incorrect"}`}>
              <strong>{jawaban[i] === soal.k ? "Benar!" : "Belum tepat."}</strong>
              <p>Jawaban: {soal.a[soal.k]}</p>
              <p>{soal.p}</p>
            </div>
          )}
        </div>
      ))}

      {!selesai ? (
        <button
          className="primary-btn"
          onClick={kirimJawaban}
          disabled={Object.keys(jawaban).length !== daftarSoal.length}
        >
          Selesai dan Lihat Nilai
        </button>
      ) : (
        <div className="score-result">
          <h3>Nilai Kamu</h3>
          <div className="score-number">{nilai}</div>
          <p>
            {nilai >= 80
              ? "Hebat! Pemahaman kamu sudah sangat baik."
              : nilai >= 60
              ? "Bagus! Terus berlatih agar semakin paham."
              : "Yuk, pelajari kembali materi dan coba lagi."}
          </p>
        </div>
      )}
    </section>
  );
}

/* =====================================================
   FUNGSI BANTU CHATBOT MATEMATIKA
   ===================================================== */

// Mengubah variasi simbol matematika menjadi bentuk standar.
function normalisasiSoal(teks) {
  return teks
    .toLowerCase()
    .replace(/[−–]/g, "-")
    .replace(/[＋]/g, "+")
    .replace(/[×✕]/g, "*")
    .replace(/[÷]/g, "/")
    .replace(/[xX]/g, "*")
    .replace(/,/g, ".")
    .replace(/\bdibagi dengan\b/g, "/")
    .replace(/\bdibagi\b/g, "/")
    .replace(/\bdikalikan dengan\b/g, "*")
    .replace(/\bdikalikan\b/g, "*")
    .replace(/\bkali\b/g, "*")
    .replace(/\bditambah dengan\b/g, "+")
    .replace(/\bditambah\b/g, "+")
    .replace(/\bditambahin\b/g, "+")
    .replace(/\bditambah\b/g, "+")
    .replace(/\bdikurangi dengan\b/g, "-")
    .replace(/\bdikurangi\b/g, "-")
    .replace(/\bkurangi\b/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

// Parser matematika sederhana. Mendukung kurung dan prioritas operasi.
function hitungEkspresi(teks) {
  const tokens = teks.match(/\d+(?:\.\d+)?|[()+\-*/]/g);

  if (!tokens || tokens.join("") !== teks.replace(/\s/g, "")) {
    return null;
  }

  let posisi = 0;

  function ekspresi() {
    let nilai = perkalian();

    while (tokens[posisi] === "+" || tokens[posisi] === "-") {
      const operator = tokens[posisi++];
      const kanan = perkalian();

      nilai = operator === "+" ? nilai + kanan : nilai - kanan;
    }

    return nilai;
  }

  function perkalian() {
    let nilai = faktor();

    while (tokens[posisi] === "*" || tokens[posisi] === "/") {
      const operator = tokens[posisi++];
      const kanan = faktor();

      if (operator === "/" && kanan === 0) {
        throw new Error("nol");
      }

      nilai = operator === "*" ? nilai * kanan : nilai / kanan;
    }

    return nilai;
  }

  function faktor() {
    const token = tokens[posisi];

    if (token === "+") {
      posisi++;
      return faktor();
    }

    if (token === "-") {
      posisi++;
      return -faktor();
    }

    if (token === "(") {
      posisi++;
      const nilai = ekspresi();

      if (tokens[posisi] !== ")") {
        throw new Error("kurung");
      }

      posisi++;
      return nilai;
    }

    if (token !== undefined && /^\d/.test(token)) {
      posisi++;
      return Number(token);
    }

    throw new Error("format");
  }

  try {
    const hasil = ekspresi();

    if (posisi !== tokens.length || !Number.isFinite(hasil)) {
      return null;
    }

    return hasil;
  } catch (error) {
    if (error.message === "nol") {
      return "PEMBAGIAN_NOL";
    }
    return null;
  }
}

// Mencari bagian soal hitungan di dalam kalimat siswa.
function ambilEkspresi(teks) {
  const normal = normalisasiSoal(teks);

  const pola = /[+-]?\d+(?:\.\d+)?(?:\s*[+\-*/]\s*[+-]?\d+(?:\.\d+)?|\s*[+\-*/]\s*\(?\s*[+-]?\d+(?:\.\d+)?\s*\)?|\s*\([^)]*\))+/g;
  const cocok = normal.match(pola);

  if (!cocok) return null;

  const kandidat = cocok
    .map((item) => item.trim())
    .filter((item) => /[+\-*/]/.test(item));

  if (!kandidat.length) return null;

  // Memilih ekspresi terpanjang agar soal operasi campuran ikut terbaca.
  kandidat.sort((a, b) => b.length - a.length);

  for (const item of kandidat) {
    const hasil = hitungEkspresi(item.replace(/\s+/g, ""));
    if (hasil !== null) {
      return {
        ekspresi: item.replace(/\s+/g, ""),
        hasil
      };
    }

    if (hasil === "PEMBAGIAN_NOL") {
      return {
        ekspresi: item.replace(/\s+/g, ""),
        hasil
      };
    }
  }

  return null;
}

function formatAngka(angka) {
  if (Number.isInteger(angka)) return String(angka);
  return String(Number(angka.toFixed(6)));
}

function jawabanHitungan(data) {
  const { ekspresi, hasil } = data;

  if (hasil === "PEMBAGIAN_NOL") {
    return `Soal: ${ekspresi}\n\nBilangan tidak dapat dibagi dengan nol. Pembagian dengan nol tidak memiliki hasil.\n\nCoba periksa kembali bilangan pembaginya, ya!`;
  }

  const hasilTeks = formatAngka(hasil);
  const adaKurung = ekspresi.includes("(");
  const operasi = ekspresi.includes("*") || ekspresi.includes("/")
    ? "perkalian atau pembagian"
    : "penjumlahan atau pengurangan";

  if (/^[+-]?\d+(?:\.\d+)?[+\-*/][+-]?\d+(?:\.\d+)?$/.test(ekspresi)) {
    const bagian = ekspresi.match(/^([+-]?\d+(?:\.\d+)?)([+\-*/])([+-]?\d+(?:\.\d+)?)$/);

    if (bagian) {
      const a = Number(bagian[1]);
      const op = bagian[2];
      const b = Number(bagian[3]);
      let penjelasan = "";

      if (op === "+") {
        if (a < 0 && b < 0) {
          penjelasan = "Kedua bilangan bertanda negatif. Jumlahkan nilai angkanya, lalu gunakan tanda negatif.";
        } else if (a >= 0 && b >= 0) {
          penjelasan = "Kedua bilangan positif. Jumlahkan seperti biasa.";
        } else {
          penjelasan = "Tanda kedua bilangan berbeda. Kurangkan nilai mutlaknya, lalu gunakan tanda bilangan yang nilai mutlaknya lebih besar.";
        }
      } else if (op === "-") {
        penjelasan = `Pengurangan dapat diubah menjadi penjumlahan dengan lawan bilangan:\n${formatAngka(a)} - (${formatAngka(b)}) = ${formatAngka(a)} + (${formatAngka(-b)}).`;
      } else if (op === "*") {
        penjelasan = `Kalikan nilai angkanya terlebih dahulu: ${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}. ${
          (a < 0) !== (b < 0)
            ? "Karena tandanya berbeda, hasilnya negatif."
            : "Karena tandanya sama, hasilnya positif."
        }`;
      } else if (op === "/") {
        penjelasan = `Bagi nilai angkanya terlebih dahulu: ${Math.abs(a)} ÷ ${Math.abs(b)} = ${Math.abs(a / b)}. ${
          (a < 0) !== (b < 0)
            ? "Karena tandanya berbeda, hasilnya negatif."
            : "Karena tandanya sama, hasilnya positif."
        }`;
      }

      return `Yuk, kita bahas langkah demi langkah! 😊\n\nSoal: ${ekspresi.replace(/\*/g, " × ").replace(/\//g, " ÷ ")}\n\nLangkah 1: Perhatikan operasi dan tanda bilangannya.\n${penjelasan}\n\nLangkah 2: Hitung hasilnya.\n${formatAngka(a)} ${op === "*" ? "×" : op === "/" ? "÷" : op} (${formatAngka(b)}) = ${hasilTeks}\n\nJadi, hasil akhirnya adalah ${hasilTeks}.`;
    }
  }

  return `Aku menemukan soal hitunganmu! 😊\n\nSoal: ${ekspresi.replace(/\*/g, " × ").replace(/\//g, " ÷ ")}\n\nLangkah 1: Kerjakan operasi yang ada di dalam tanda kurung terlebih dahulu.\nLangkah 2: Kerjakan perkalian atau pembagian sebelum penjumlahan atau pengurangan.\nLangkah 3: Hitung operasi yang tersisa dari kiri ke kanan.\n\nKarena soal ini memuat ${operasi}${adaKurung ? " dan tanda kurung" : ""}, perhatikan urutan pengerjaannya.\n\nHasil akhirnya adalah ${hasilTeks}.`;
}

/* CHATBOT AYO TANYAKAN */
function ChatbotMathFun() {
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState(false);

  const [riwayat, setRiwayat] = useState([
    {
      role: "assistant",
      content:
        "Halo! Aku Teman MathFun. 😊\n\nAku siap membantumu belajar operasi bilangan bulat kelas 7. Kamu bisa bertanya dengan bahasamu sendiri, meminta contoh soal, atau langsung menuliskan soal hitungan.\n\nYuk, belajar bersama!"
    }
  ]);

  const pertanyaanContoh = [
    "Apa yang dimaksud bilangan bulat?",
    "Kenapa negatif dikali negatif hasilnya positif?",
    "Tolong jelaskan 8 + (-5)",
    "Bagaimana cara menghitung 12 - (-4)?",
    "Hitung -6 + 3 × 4"
  ];

  function jawabPertanyaan(pertanyaan) {
    const q = pertanyaan.toLowerCase().trim();
    const normal = normalisasiSoal(q);

    // Menangani soal hitungan terlebih dahulu.
    const dataHitungan = ambilEkspresi(q);

    if (dataHitungan) {
      return jawabanHitungan(dataHitungan);
    }

    // Salam.
    if (
      /\b(halo|hai|hello|assalamualaikum|selamat pagi|selamat siang|selamat sore|selamat malam)\b/.test(q)
    ) {
      return "Halo juga! 👋😊\n\nSelamat datang di Teman MathFun. Aku siap membantu kamu memahami bilangan bulat.\n\nKamu bisa bertanya tentang penjumlahan, pengurangan, perkalian, pembagian, aturan tanda, atau garis bilangan.";
    }

    if (/terima kasih|makasih|thanks|thank you/.test(q)) {
      return "Sama-sama! 😊\n\nSenang bisa membantu proses belajarmu. Tetap semangat belajar matematika, ya! Kalau ada soal bilangan bulat lain, kamu boleh bertanya lagi.";
    }

    if (/siapa kamu|nama kamu|kamu siapa/.test(q)) {
      return "Aku Teman MathFun 🤖, teman belajar yang ada di aplikasi MathFun.\n\nAku dibuat untuk membantu siswa memahami materi operasi bilangan bulat, mulai dari konsep dasar sampai latihan soal.";
    }

    // Pengertian bilangan bulat.
    if (
      /apa itu bilangan bulat|pengertian bilangan bulat|maksud bilangan bulat|definisi bilangan bulat|bilangan bulat adalah/.test(q)
    ) {
      return "Bilangan bulat adalah kumpulan bilangan yang terdiri dari bilangan bulat negatif, nol, dan bilangan bulat positif.\n\nContohnya:\n• Bilangan negatif: -3, -2, -1.\n• Nol: 0.\n• Bilangan positif: 1, 2, 3.\n\nContoh dalam kehidupan sehari-hari:\n• Suhu -2°C menunjukkan suhu di bawah nol.\n• Lantai 3 menunjukkan posisi tiga tingkat di atas lantai dasar.\n• Utang Rp5.000 dapat diwakili dengan bilangan -5.000.\n\nJadi, bilangan bulat tidak memiliki bagian pecahan atau desimal.";
    }

    // Contoh penerapan.
    if (/contoh.*kehidupan|penerapan|dalam kehidupan sehari|manfaat bilangan bulat/.test(q)) {
      return "Bilangan bulat sering digunakan dalam kehidupan sehari-hari. Contohnya:\n\n1. Suhu: -5°C menunjukkan suhu lima derajat di bawah nol.\n2. Uang: memiliki uang Rp10.000 dapat dianggap positif, sedangkan utang Rp5.000 dapat dianggap negatif.\n3. Lantai gedung: lantai 2 berada di atas lantai dasar, sedangkan basement 1 dapat ditulis -1.\n4. Permainan: mendapatkan 10 poin dapat ditulis +10, sedangkan kehilangan 5 poin dapat ditulis -5.\n\nDengan bilangan bulat, kita dapat menyatakan keadaan yang nilainya di atas maupun di bawah nol.";
    }

    // Positif, negatif, nol, dan perbandingan.
    if (/bilangan positif|bilangan negatif|perbedaan.*positif.*negatif|positif.*negatif.*apa bedanya/.test(q)) {
      return "Perbedaannya terletak pada posisi dan nilainya terhadap nol.\n\n• Bilangan positif: nilainya lebih besar dari nol, contohnya 1, 2, 3, dan seterusnya.\n• Bilangan negatif: nilainya lebih kecil dari nol, contohnya -1, -2, -3, dan seterusnya.\n• Nol: bukan bilangan positif maupun negatif.\n\nPada garis bilangan, bilangan negatif berada di sebelah kiri nol, sedangkan bilangan positif berada di sebelah kanan nol.";
    }

    if (/nol.*positif|nol.*negatif|0.*positif|0.*negatif/.test(q)) {
      return "Nol (0) bukan bilangan positif dan bukan bilangan negatif.\n\nNol merupakan bilangan yang menjadi batas antara bilangan negatif dan bilangan positif pada garis bilangan.";
    }

    if (/lebih besar|lebih kecil|membandingkan|urutan bilangan|urutkan bilangan/.test(q)) {
      return "Untuk membandingkan bilangan bulat, kamu bisa menggunakan garis bilangan.\n\nIngat aturan berikut:\n• Bilangan yang posisinya lebih ke kanan nilainya lebih besar.\n• Bilangan yang posisinya lebih ke kiri nilainya lebih kecil.\n\nContoh:\n-2 lebih besar daripada -5, karena -2 berada lebih ke kanan daripada -5.\n\nUrutan dari terkecil ke terbesar: -5, -2, 0, 2, 5.";
    }

    // Penjumlahan.
    if (/penjumlahan|menjumlahkan|cara.*menjumlah|ditambah|penambahan|jumlah.*negatif/.test(q)) {
      return "Penjumlahan bilangan bulat memiliki dua aturan utama.\n\n1. Jika kedua bilangan memiliki tanda yang sama, jumlahkan nilai angkanya dan gunakan tanda yang sama.\nContoh:\n(-4) + (-3) = -7.\n\n2. Jika tandanya berbeda, kurangkan nilai mutlak yang lebih besar dengan yang lebih kecil. Gunakan tanda dari bilangan yang nilai mutlaknya lebih besar.\nContoh:\n8 + (-3) = 8 - 3 = 5.\n\nContoh lainnya:\n-9 + 4 = -5, karena 9 - 4 = 5 dan nilai mutlak 9 lebih besar.\n\nKunci penjumlahan adalah memperhatikan tanda dan nilai setiap bilangan.";
    }

    // Pengurangan.
    if (/pengurangan|mengurangi|cara.*mengurang|dikurangi|pengurangan.*negatif/.test(q)) {
      return "Cara mudah mengerjakan pengurangan bilangan bulat adalah mengubahnya menjadi penjumlahan dengan lawan bilangan.\n\nAturannya:\nMengurangi suatu bilangan sama dengan menambahkan lawan bilangan tersebut.\n\nContoh 1:\n7 - 3 = 7 + (-3) = 4.\n\nContoh 2:\n7 - (-3) = 7 + 3 = 10.\n\nContoh 3:\n-5 - 2 = -5 + (-2) = -7.\n\nIngat: jika mengurangi bilangan negatif, operasi berubah menjadi penjumlahan bilangan positif.";
    }

    // Perkalian dan alasan tanda.
    if (/mengapa|kenapa|mengapa.*negatif|kenapa.*negatif/.test(q) && /kali|perkalian|dikali/.test(q)) {
      return "Pertanyaan bagus! 😊\n\nMengapa negatif dikali negatif hasilnya positif?\n\nKita bisa memahaminya melalui pola berikut:\n\n3 × (-2) = -6\n2 × (-2) = -4\n1 × (-2) = -2\n0 × (-2) = 0\n-1 × (-2) = 2\n-2 × (-2) = 4\n\nPerhatikan hasilnya: setiap bilangan pertama berkurang 1, hasil perkaliannya bertambah 2. Karena pola tersebut harus tetap teratur, (-1) × (-2) = 2 dan (-2) × (-2) = 4.\n\nJadi, negatif dikali negatif menghasilkan positif.";
    }

    if (/perkalian|mengalikan|dikalikan|perkalian bilangan/.test(q)) {
      return "Aturan perkalian bilangan bulat:\n\n• Positif × positif = positif.\n• Positif × negatif = negatif.\n• Negatif × positif = negatif.\n• Negatif × negatif = positif.\n\nContoh:\n1. 4 × 3 = 12.\n2. 4 × (-3) = -12.\n3. (-4) × 3 = -12.\n4. (-4) × (-3) = 12.\n\nTips: tanda sama menghasilkan positif, sedangkan tanda berbeda menghasilkan negatif. Setelah menentukan tandanya, kalikan nilai angkanya.";
    }

    // Pembagian.
    if (/pembagian|membagi|dibagi|membagikan/.test(q)) {
      return "Aturan pembagian bilangan bulat sama seperti aturan tanda pada perkalian.\n\n• Positif ÷ positif = positif.\n• Positif ÷ negatif = negatif.\n• Negatif ÷ positif = negatif.\n• Negatif ÷ negatif = positif.\n\nContoh:\n1. 20 ÷ 5 = 4.\n2. 20 ÷ (-5) = -4.\n3. (-20) ÷ 5 = -4.\n4. (-20) ÷ (-5) = 4.\n\nIngat: tanda sama menghasilkan positif, sedangkan tanda berbeda menghasilkan negatif.\n\nCatatan: bilangan tidak dapat dibagi dengan nol.";
    }

    // Aturan tanda.
    if (/aturan tanda|tanda positif|tanda negatif|tanda sama|tanda berbeda|aturan perkalian/.test(q)) {
      return "Aturan tanda pada perkalian dan pembagian:\n\n| Tanda bilangan | Hasil |\n|---|---|\n| Positif dengan positif | Positif |\n| Positif dengan negatif | Negatif |\n| Negatif dengan positif | Negatif |\n| Negatif dengan negatif | Positif |\n\nCara mengingatnya:\n• Tanda sama menghasilkan positif.\n• Tanda berbeda menghasilkan negatif.\n\nPerlu diingat, aturan penjumlahan dan pengurangan tidak sama dengan aturan perkalian dan pembagian.";
    }

    // Garis bilangan.
    if (/garis bilangan|fungsi garis|kegunaan garis|arah kiri|arah kanan|bergerak ke kiri|bergerak ke kanan/.test(q)) {
      return "Garis bilangan adalah garis yang menunjukkan letak atau posisi bilangan secara berurutan.\n\nHal yang perlu diingat:\n• Bilangan negatif berada di sebelah kiri nol.\n• Nol berada di tengah.\n• Bilangan positif berada di sebelah kanan nol.\n• Semakin ke kanan, nilai bilangan semakin besar.\n• Semakin ke kiri, nilai bilangan semakin kecil.\n\nContoh 2 + (-3):\n1. Mulai dari angka 2.\n2. Karena ditambah -3, bergerak 3 langkah ke kiri.\n3. Kamu akan sampai di angka -1.\n\nJadi, 2 + (-3) = -1.";
    }

    // Nilai mutlak.
    if (/nilai mutlak|mutlak/.test(q)) {
      return "Nilai mutlak adalah jarak suatu bilangan dari angka nol pada garis bilangan. Nilai mutlak selalu bernilai positif atau nol.\n\nContoh:\n• |5| = 5.\n• |-5| = 5.\n• |0| = 0.\n\nMengapa |-5| = 5? Karena jarak angka -5 ke nol adalah 5 satuan.";
    }

    // Operasi campuran.
    if (/operasi campuran|urutan operasi|dikerjakan dulu|mana dulu|prioritas operasi/.test(q)) {
      return "Untuk mengerjakan operasi hitung campuran, perhatikan urutannya:\n\n1. Kerjakan operasi di dalam tanda kurung terlebih dahulu.\n2. Kerjakan perkalian dan pembagian dari kiri ke kanan.\n3. Kerjakan penjumlahan dan pengurangan dari kiri ke kanan.\n\nContoh:\n2 + 3 × 4\n\nLangkah 1: Kerjakan perkalian terlebih dahulu.\n3 × 4 = 12.\n\nLangkah 2: Kerjakan penjumlahan.\n2 + 12 = 14.\n\nJadi, hasilnya adalah 14, bukan 20.";
    }

    // Kesalahan umum.
    if (/salah|keliru|sering salah|kesalahan|bingung.*tanda/.test(q)) {
      return "Tidak apa-apa kalau masih sering keliru. 😊 Berikut beberapa hal yang perlu diperhatikan:\n\n1. Jangan mengabaikan tanda negatif di depan bilangan.\n2. Bedakan aturan penjumlahan dengan aturan perkalian.\n3. Pada pengurangan, ubah menjadi penjumlahan dengan lawan bilangan.\n4. Pada operasi campuran, kerjakan perkalian dan pembagian sebelum penjumlahan dan pengurangan.\n5. Periksa kembali hasil hitunganmu.\n\nKalau ada contoh soal yang membuatmu bingung, kirimkan soalnya agar kita bahas bersama.";
    }

    // Meminta contoh soal.
    if (/contoh soal|latihan soal|kasih soal|beri soal|soal latihan/.test(q)) {
      return "Tentu! Yuk, coba kerjakan lima soal berikut. 😊\n\n1. 7 + (-4) = ...\n2. -8 + (-5) = ...\n3. 9 - 12 = ...\n4. (-6) × (-3) = ...\n5. 24 ÷ (-4) = ...\n\nKamu bisa mengirim jawaban satu per satu. Aku akan membantu memeriksa dan menjelaskan cara menghitungnya.";
    }

    // Meminta penjelasan ulang.
    if (/tidak paham|belum paham|belum mengerti|jelaskan lagi|ulang|lebih sederhana|lebih mudah/.test(q)) {
      return "Tidak apa-apa, kita pelajari secara perlahan, ya! 😊\n\nBilangan bulat terdiri dari bilangan negatif, nol, dan positif.\n\nContoh sederhana:\n• 5 + 2 = 7, karena dua bilangan positif dijumlahkan.\n• 5 + (-2) = 3, karena tandanya berbeda sehingga 5 dikurangi 2.\n• (-5) + (-2) = -7, karena keduanya negatif sehingga hasilnya negatif.\n\nKamu bisa kirim satu soal yang belum dipahami. Nanti aku jelaskan langkah demi langkah.";
    }

    // Pertanyaan di luar topik.
    return "Terima kasih sudah bertanya! 😊\n\nAku Teman MathFun, dan materi utamaku adalah operasi bilangan bulat kelas 7 SMP.\n\nAku bisa membantu membahas:\n• Pengertian dan contoh bilangan bulat.\n• Penjumlahan dan pengurangan.\n• Perkalian dan pembagian.\n• Aturan tanda positif dan negatif.\n• Garis bilangan dan nilai mutlak.\n• Operasi hitung campuran.\n\nKamu juga bisa langsung menuliskan soal hitungan, misalnya:\n- 8 + (-5)\n- 12 - (-4)\n- (-6) × 3\n- -6 + 3 × 4\n\nCoba tanyakan kembali dengan topik bilangan bulat, ya!";
  }

  function kirimPesan(e) {
    e.preventDefault();
    const pertanyaan = pesan.trim();

    if (!pertanyaan || memuat) return;

    setMemuat(true);

    setRiwayat((sebelumnya) => [
      ...sebelumnya,
      { role: "user", content: pertanyaan }
    ]);

    setPesan("");

    setTimeout(() => {
      const jawaban = jawabPertanyaan(pertanyaan);

      setRiwayat((sebelumnya) => [
        ...sebelumnya,
        { role: "assistant", content: jawaban }
      ]);

      setMemuat(false);
    }, 350);
  }

  return (
    <section className="content-card chatbot-page">
      <div className="chatbot-heading">
        <div className="chatbot-avatar">🤖</div>
        <div>
          <h2>💬 Ayo Tanyakan!</h2>
          <p className="section-desc">
            Teman belajar operasi bilangan bulat. Tanyakan materi yang belum kamu pahami.
          </p>
        </div>
      </div>

      <div className="chatbot-guidance">
        <strong>🌟 Yuk, belajar bersama!</strong>
        <p>
          Tanyakan materi atau soal bilangan bulat dengan bahasamu sendiri.
          Teman MathFun akan membantu menjelaskan langkah-langkah penyelesaiannya.
        </p>
      </div>

      <div className="chatbot-suggestions">
        <strong>💡 Contoh pertanyaan:</strong>
        <div className="suggestion-list">
          {pertanyaanContoh.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setPesan(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="chatbot-messages" aria-live="polite">
        {riwayat.map((item, index) => (
          <div
            className={`chat-message ${item.role === "user" ? "user-message" : "bot-message"}`}
            key={index}
          >
            <div className="chat-message-name">
              {item.role === "user" ? "Kamu" : "Teman MathFun 🤖"}
            </div>
            <p style={{ whiteSpace: "pre-line" }}>{item.content}</p>
          </div>
        ))}

        {memuat && (
          <div className="chat-message bot-message">
            <div className="chat-message-name">Teman MathFun</div>
            <p>Sedang menyiapkan jawaban... ✨</p>
          </div>
        )}
      </div>

      <form className="chatbot-form" onSubmit={kirimPesan}>
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Contoh: Mengapa negatif dikali negatif hasilnya positif?"
          rows="2"
          disabled={memuat}
        />
        <button type="submit" disabled={memuat || !pesan.trim()}>
          {memuat ? "Menjawab..." : "Kirim Pertanyaan ➤"}
        </button>
      </form>

      <p className="chatbot-note">
        Teman MathFun membantu menjawab berdasarkan materi operasi bilangan
        bulat yang tersedia di dalam aplikasi. Periksa kembali langkah
        perhitungan jika kamu menemukan jawaban yang kurang tepat.
      </p>
    </section>
  );
}

export default function App() {
  const [halaman, setHalaman] = useState("Beranda");

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicError, setMusicError] = useState("");
  const [volume, setVolume] = useState(0.5);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) {
      setMusicError("Pemutar musik belum tersedia.");
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setMusicError("");
      audio.volume = volume;
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Musik gagal diputar:", error);
      setIsPlaying(false);
      setMusicError("Musik gagal diputar. Periksa file public/backsound.mp3 dan suara perangkat.");
    }
  }

  function ubahVolume(e) {
    const nilaiVolume = Number(e.target.value);
    setVolume(nilaiVolume);

    if (audioRef.current) {
      audioRef.current.volume = nilaiVolume;
    }
  }

  const [nilaiPretest, setNilaiPretest] = useState(null);
  const [nilaiLatihan, setNilaiLatihan] = useState(null);
  const [nilaiPosttest, setNilaiPosttest] = useState(null);

  const [angka1, setAngka1] = useState("8");
  const [angka2, setAngka2] = useState("-3");
  const [operasi, setOperasi] = useState("+");
  const [hasil, setHasil] = useState(null);

  const menu = [
    "Beranda",
    "Pretest",
    "Materi",
    "Kalkulator",
    "Garis Bilangan",
    "Latihan",
    "Posttest",
    "Evaluasi",
    "Ayo Tanyakan!"
  ];

  function hitung() {
    const a = Number(angka1);
    const b = Number(angka2);
    let hasilHitung;

    if (operasi === "+") hasilHitung = a + b;
    if (operasi === "-") hasilHitung = a - b;
    if (operasi === "×") hasilHitung = a * b;

    if (operasi === "÷") {
      hasilHitung = b === 0 ? "Tidak bisa dibagi 0" : a / b;
    }

    setHasil(hasilHitung);
  }

  return (
    <div className="app-container">
      <audio
        ref={audioRef}
        src="/backsound.mp3"
        loop
        preload="auto"
        onPlay={() => {
          setIsPlaying(true);
          setMusicError("");
        }}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setMusicError("File backsound.mp3 tidak ditemukan atau tidak dapat dibaca.");
        }}
      />

      <div className="music-control">
        <button type="button" className="music-button" onClick={toggleMusic}>
          {isPlaying ? "⏸ Jeda Musik" : "▶ Putar Musik"}
        </button>

        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={ubahVolume}
            aria-label="Atur volume musik"
          />
        </div>

        {musicError && (
          <div className="music-error" role="status">
            {musicError}
          </div>
        )}
      </div>

      <style>{`
        .music-control {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 9px;
        }
        .music-button {
          border: none;
          border-radius: 30px;
          padding: 13px 21px;
          background: #800020;
          color: white;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,.2);
          transition: .2s;
        }
        .music-button:hover {
          background: #D45060;
          transform: translateY(-2px);
        }
        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,.12);
        }
        .volume-control input {
          width: 95px;
          accent-color: #800020;
          cursor: pointer;
        }
        .music-error {
          background: white;
          color: #800020;
          padding: 10px 12px;
          border-radius: 10px;
          max-width: 270px;
          font-size: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,.15);
        }
        .mathfun-home {
          background: #FFF9F2;
          overflow: hidden;
        }
        .mathfun-hero {
          max-width: 1450px;
          min-height: 440px;
          margin: auto;
          padding: 45px 5% 70px;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 25px;
          position: relative;
          background: #FFF9F2;
        }
        .mathfun-copy {
          position: relative;
          z-index: 3;
        }
        .mathfun-label {
          display: inline-block;
          background: #F3E6D5;
          color: #800020;
          padding: 12px 20px;
          border-radius: 30px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .mathfun-copy h2 {
          font-size: clamp(36px, 5vw, 64px);
          line-height: 1.1;
          color: #800020;
          margin: 0 0 20px;
          font-weight: 800;
        }
        .mathfun-copy h2 span { color: #D45060; }
        .mathfun-copy p {
          max-width: 470px;
          color: #542C32;
          font-size: 18px;
          line-height: 1.7;
          margin-bottom: 25px;
        }
        .mathfun-start {
          border: none;
          border-radius: 35px;
          padding: 15px 28px;
          background: #D45060;
          color: white;
          font-size: 17px;
          font-weight: bold;
          cursor: pointer;
          transition: .3s;
        }
        .mathfun-start:hover {
          background: #800020;
          transform: translateY(-3px);
        }
        .mathfun-picture {
          min-height: 350px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(ellipse, #F3E6D5 0%, #FFF9F2 72%);
          border-radius: 50%;
        }
        .mathfun-picture::before {
          content: "";
          position: absolute;
          width: 85%;
          height: 85%;
          background: #F3E6D5;
          border-radius: 50%;
          z-index: 0;
        }
        .student-image {
          display: block;
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 550px;
          height: 350px;
          object-fit: contain;
          animation: studentImageFloat 3s ease-in-out infinite;
        }
        @keyframes studentImageFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .mathfun-doodle {
          position: absolute;
          z-index: 3;
          color: #800020;
          font-size: 43px;
          font-weight: bold;
          animation: mathfunDoodle 3s ease-in-out infinite;
        }
        .doodle-one { top: 12px; left: 8%; }
        .doodle-two { top: 45px; right: 7%; animation-delay: .5s; }
        .doodle-three { bottom: 35px; left: 12%; animation-delay: 1s; }
        .doodle-four { bottom: 45px; right: 12%; animation-delay: 1.5s; }
        .mathfun-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 48px;
          background: #800020;
          clip-path: polygon(0 55%, 12% 25%, 25% 75%, 40% 30%, 55% 70%, 70% 25%, 85% 65%, 100% 15%, 100% 100%, 0 100%);
        }
        .mathfun-cards {
          max-width: 1150px;
          margin: 35px auto;
          padding: 0 25px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .mathfun-card {
          background: white;
          border: 2px solid #F3E6D5;
          border-radius: 20px;
          padding: 25px 20px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(128, 0, 32, .07);
          transition: .3s;
        }
        .mathfun-card:hover {
          transform: translateY(-6px);
          border-color: #D45060;
        }
        .mathfun-card-icon { font-size: 42px; }
        .mathfun-card h3 {
          color: #800020;
          margin: 12px 0;
        }
        .mathfun-card p {
          color: #725C5C;
          margin-bottom: 15px;
        }
        .mathfun-card button {
          background: #D45060;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 10px 22px;
          cursor: pointer;
          font-weight: bold;
        }
        .mathfun-card button:hover { background: #800020; }
        @keyframes mathfunDoodle {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-13px) rotate(10deg); }
        }
        @media (max-width: 800px) {
          .mathfun-hero {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .mathfun-copy p {
            margin-left: auto;
            margin-right: auto;
          }
          .mathfun-picture { min-height: 300px; }
          .student-image { height: 290px; }
          .mathfun-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <header className="main-header">
        <div className="brand">
          <span className="brand-icon">✏️</span>
          <div>
            <h1>MathFun</h1>
            <p>Belajar Bilangan Bulat Jadi Seru!</p>
          </div>
        </div>

        <nav className="nav-links">
          {menu.map((item) => (
            <button
              key={item}
              className={halaman === item ? "nav-active" : ""}
              onClick={() => setHalaman(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {halaman === "Beranda" && (
          <div className="mathfun-home">
            <section className="mathfun-hero">
              <div className="mathfun-copy">
                <span className="mathfun-label">
                  Belajar Matematika Jadi Lebih Seru! ⭐
                </span>
                <h2>
                  Yuk, Belajar <br />
                  <span>Bilangan Bulat!</span>
                </h2>
                <p>
                  Ayo jelajahi dunia matematika bersama kami dengan cara yang mudah dan menyenangkan!
                </p>
                <button
                  className="mathfun-start"
                  onClick={() => setHalaman("Pretest")}
                >
                  Mulai Belajar ➜
                </button>
              </div>

              <div className="mathfun-picture">
                <span className="mathfun-doodle doodle-one">+</span>
                <span className="mathfun-doodle doodle-two">−</span>
                <span className="mathfun-doodle doodle-three">×</span>
                <span className="mathfun-doodle doodle-four">÷</span>
                <img
                  src="/mathfun-siswa.png"
                  alt="Dua siswa SMP berseragam putih biru"
                  className="student-image"
                />
              </div>
              <div className="mathfun-wave"></div>
            </section>

            <section className="mathfun-cards">
              <div className="mathfun-card">
                <div className="mathfun-card-icon">📖</div>
                <h3>Pelajari Materi</h3>
                <p>Pahami bilangan bulat dengan mudah.</p>
                <button onClick={() => setHalaman("Materi")}>Mulai</button>
              </div>

              <div className="mathfun-card">
                <div className="mathfun-card-icon">🧮</div>
                <h3>Gunakan Kalkulator</h3>
                <p>Hitung operasi bilangan bulat.</p>
                <button onClick={() => setHalaman("Kalkulator")}>Mulai</button>
              </div>

              <div className="mathfun-card">
                <div className="mathfun-card-icon">🏆</div>
                <h3>Kerjakan Latihan</h3>
                <p>Uji kemampuan matematika kamu.</p>
                <button onClick={() => setHalaman("Latihan")}>Mulai</button>
              </div>

              <div className="mathfun-card">
                <div className="mathfun-card-icon">🤖</div>
                <h3>Ayo Tanyakan!</h3>
                <p>Tanyakan hal yang belum kamu pahami kepada Teman MathFun.</p>
                <button onClick={() => setHalaman("Ayo Tanyakan!")}>
                  Mulai Bertanya
                </button>
              </div>
            </section>
          </div>
        )}

        {halaman === "Pretest" && (
          <Kuis judul="Pretest Bilangan Bulat" daftarSoal={soalPretest} onSelesai={setNilaiPretest} />
        )}

        {halaman === "Materi" && (
          <section className="content-card">
            <h2>📚 Materi Bilangan Bulat</h2>
            <p className="section-desc">Ayo pahami materi berikut sebelum mengerjakan latihan.</p>

            <div className="material-box">
              <h3>1. Mengenal Bilangan Bulat</h3>
              <p>Bilangan bulat terdiri dari bilangan negatif, nol, dan bilangan positif.</p>
              <div className="number-types">
                <span>Negatif: -3, -2, -1</span>
                <span>Nol: 0</span>
                <span>Positif: 1, 2, 3</span>
              </div>
            </div>

            <div className="material-box">
              <h3>2. Penjumlahan</h3>
              <p>Jika tandanya sama, jumlahkan angkanya dan gunakan tanda yang sama.</p>
              <p className="example-math">-4 + (-3) = -7</p>
              <p>Jika tandanya berbeda, kurangkan angka yang lebih besar dengan yang lebih kecil.</p>
              <p className="example-math">8 + (-3) = 5</p>
            </div>

            <div className="material-box">
              <h3>3. Pengurangan</h3>
              <p>Pengurangan dapat diubah menjadi penjumlahan dengan lawan bilangan.</p>
              <p className="example-math">5 - (-2) = 5 + 2 = 7</p>
            </div>

            <div className="material-box">
              <h3>4. Perkalian</h3>
              <p>Positif × Positif = Positif</p>
              <p>Negatif × Negatif = Positif</p>
              <p>Positif × Negatif = Negatif</p>
              <p>Negatif × Positif = Negatif</p>
            </div>

            <div className="material-box">
              <h3>5. Pembagian</h3>
              <p>Aturan tanda pembagian sama seperti perkalian.</p>
              <p className="example-math">(-20) ÷ 5 = -4</p>
              <p className="example-math">(-20) ÷ (-5) = 4</p>
            </div>
          </section>
        )}

        {halaman === "Kalkulator" && (
          <section className="content-card">
            <h2>🧮 Kalkulator Bilangan Bulat</h2>
            <p className="section-desc">Masukkan dua bilangan, pilih operasi, lalu hitung hasilnya.</p>

            <div className="calculator">
              <input
                type="number"
                value={angka1}
                onChange={(e) => {
                  setAngka1(e.target.value);
                  setHasil(null);
                }}
              />
              <select
                value={operasi}
                onChange={(e) => {
                  setOperasi(e.target.value);
                  setHasil(null);
                }}
              >
                <option>+</option>
                <option>-</option>
                <option>×</option>
                <option>÷</option>
              </select>
              <input
                type="number"
                value={angka2}
                onChange={(e) => {
                  setAngka2(e.target.value);
                  setHasil(null);
                }}
              />
              <button className="primary-btn" onClick={hitung}>Hitung</button>
            </div>

            {hasil !== null && (
              <div className="calculator-result">Hasil: {hasil}</div>
            )}
          </section>
        )}

        {halaman === "Garis Bilangan" && (
          <section className="content-card">
            <h2>📏 Garis Bilangan</h2>
            <p className="section-desc">Perhatikan posisi bilangan negatif, nol, dan positif.</p>

            <div className="number-line">
              <div className="line-track"></div>
              {Array.from({ length: 21 }, (_, i) => i - 10).map((n) => (
                <div className="line-point" key={n}>
                  <span className="line-tick"></span>
                  <span className={n < 0 ? "negative-number" : n > 0 ? "positive-number" : "zero-number"}>
                    {n}
                  </span>
                </div>
              ))}
            </div>
            <p className="line-note">
              Ke kiri dari 0 adalah bilangan negatif. Ke kanan dari 0 adalah bilangan positif.
            </p>
          </section>
        )}

        {halaman === "Latihan" && (
          <Kuis judul="Latihan Soal Bilangan Bulat" daftarSoal={soalLatihan} onSelesai={setNilaiLatihan} />
        )}

        {halaman === "Posttest" && (
          <Kuis judul="Posttest Bilangan Bulat" daftarSoal={soalPosttest} onSelesai={setNilaiPosttest} />
        )}

        {halaman === "Evaluasi" && (
          <section className="content-card">
            <h2>🏆 Evaluasi Hasil Belajar</h2>
            <p className="section-desc">Berikut ringkasan hasil belajar kamu di MathFun.</p>

            <div className="evaluation-grid">
              <div className="evaluation-item">
                <span>📝</span>
                <p>Nilai Pretest</p>
                <strong>{nilaiPretest === null ? "Belum dikerjakan" : nilaiPretest}</strong>
              </div>
              <div className="evaluation-item">
                <span>✏️</span>
                <p>Nilai Latihan</p>
                <strong>{nilaiLatihan === null ? "Belum dikerjakan" : nilaiLatihan}</strong>
              </div>
              <div className="evaluation-item">
                <span>🏆</span>
                <p>Nilai Posttest</p>
                <strong>{nilaiPosttest === null ? "Belum dikerjakan" : nilaiPosttest}</strong>
              </div>
            </div>

            {nilaiPretest !== null && nilaiPosttest !== null ? (
              <div className="evaluation-feedback">
                <h3>Hasil Perkembangan Belajar</h3>
                <p>
                  {nilaiPosttest > nilaiPretest
                    ? `Hebat! Nilai kamu meningkat ${nilaiPosttest - nilaiPretest} poin. Terus pertahankan semangat belajarmu!`
                    : nilaiPosttest === nilaiPretest
                    ? "Nilai kamu tetap. Terus berlatih agar pemahamanmu semakin baik."
                    : "Nilai posttest kamu masih lebih rendah. Coba pelajari kembali materi yang belum dipahami."}
                </p>
              </div>
            ) : (
              <div className="evaluation-feedback">
                <h3>Yuk, Lengkapi Kegiatan Belajarmu!</h3>
                <p>Selesaikan pretest dan posttest untuk melihat perkembangan hasil belajarmu.</p>
              </div>
            )}

            <div className="evaluation-feedback">
              <h3>💡 Saran Belajar</h3>
              <ul>
                <li>Pelajari kembali aturan tanda positif dan negatif.</li>
                <li>Gunakan garis bilangan untuk membantu memahami penjumlahan dan pengurangan.</li>
                <li>Kerjakan latihan secara bertahap dan periksa pembahasannya.</li>
              </ul>
            </div>
          </section>
        )}

        {halaman === "Ayo Tanyakan!" && <ChatbotMathFun />}
      </main>

      <footer className="main-footer">
        <p>© 2026 MathFun | Belajar Matematika Jadi Menyenangkan 💗</p>
      </footer>
    </div>
  );
}
