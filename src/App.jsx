
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

export default function App() {
  const [halaman, setHalaman] = useState("Beranda");

  // ==================================
  // PENGATURAN BACKSOUND
  // ==================================
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

      // Putar musik langsung dari klik pengguna.
      await audio.play();

      setIsPlaying(true);
    } catch (error) {
      console.error("Musik gagal diputar:", error);
      setIsPlaying(false);
      setMusicError(
        "Musik gagal diputar. Periksa file public/backsound.mp3 dan suara perangkat."
      );
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
    "Evaluasi"
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

      {/* AUDIO BACKSOUND */}
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
          setMusicError(
            "File backsound.mp3 tidak ditemukan atau tidak dapat dibaca."
          );
        }}
      />

      {/* TOMBOL DAN PENGATURAN MUSIK */}
      <div className="music-control">
        <button
          type="button"
          className="music-button"
          onClick={toggleMusic}
        >
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

        .mathfun-copy h2 span {
          color: #D45060;
        }

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
          clip-path: polygon(
            0 55%, 12% 25%, 25% 75%, 40% 30%,
            55% 70%, 70% 25%, 85% 65%,
            100% 15%, 100% 100%, 0 100%
          );
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

        .mathfun-card-icon {
          font-size: 42px;
        }

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

        .mathfun-card button:hover {
          background: #800020;
        }

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

          .mathfun-picture {
            min-height: 300px;
          }

          .student-image {
            height: 290px;
          }

          .mathfun-cards {
            grid-template-columns: 1fr;
          }
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
                  Ayo jelajahi dunia matematika bersama kami
                  dengan cara yang mudah dan menyenangkan!
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
            </section>
          </div>
        )}

        {halaman === "Pretest" && (
          <Kuis
            judul="Pretest Bilangan Bulat"
            daftarSoal={soalPretest}
            onSelesai={setNilaiPretest}
          />
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
          <Kuis
            judul="Latihan Soal Bilangan Bulat"
            daftarSoal={soalLatihan}
            onSelesai={setNilaiLatihan}
          />
        )}

        {halaman === "Posttest" && (
          <Kuis
            judul="Posttest Bilangan Bulat"
            daftarSoal={soalPosttest}
            onSelesai={setNilaiPosttest}
          />
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
      </main>

      <footer className="main-footer">
        <p>© 2026 MathFun | Belajar Matematika Jadi Menyenangkan 💗</p>
      </footer>
    </div>
  );
}
