
import { useState } from 'react'
import './App.css'

const daftarMateri = [
  {
    judul: 'Bilangan Positif dan Negatif',
    ikon: '＋ −',
    warna: 'blue',
    deskripsi: 'Mengenal bilangan positif, negatif, dan nol.',
    contoh: 'Tentukan jenis bilangan -5, 0, dan 8.',
    langkah: [
      'Bilangan positif adalah bilangan yang nilainya lebih dari nol.',
      'Bilangan negatif adalah bilangan yang nilainya kurang dari nol.',
      'Angka nol bukan bilangan positif maupun negatif.'
    ],
    hasil: '-5 adalah negatif, 0 adalah nol, dan 8 adalah positif.'
  },
  {
    judul: 'Penjumlahan Bilangan Bulat',
    ikon: '＋',
    warna: 'yellow',
    deskripsi: 'Memahami penjumlahan bilangan positif dan negatif.',
    contoh: 'Hitunglah -5 + 8.',
    langkah: [
      'Perhatikan bilangan pertama, yaitu -5.',
      'Tambahkan dengan bilangan kedua, yaitu 8.',
      'Karena tandanya berbeda, kurangkan 8 dengan 5.',
      'Ambil tanda dari bilangan yang nilai mutlaknya lebih besar, yaitu positif.'
    ],
    hasil: '-5 + 8 = 3'
  },
  {
    judul: 'Pengurangan Bilangan Bulat',
    ikon: '−',
    warna: 'pink',
    deskripsi: 'Memahami pengurangan menggunakan aturan tanda.',
    contoh: 'Hitunglah 7 - 10.',
    langkah: [
      'Tuliskan operasi 7 - 10.',
      'Ubah pengurangan menjadi penjumlahan lawan bilangan: 7 + (-10).',
      'Kurangkan 10 dengan 7.',
      'Karena nilai mutlak 10 lebih besar dan bertanda negatif, hasilnya negatif.'
    ],
    hasil: '7 - 10 = -3'
  },
  {
    judul: 'Perkalian Bilangan Bulat',
    ikon: '×',
    warna: 'green',
    deskripsi: 'Memahami aturan tanda dalam perkalian.',
    contoh: 'Hitunglah (-4) × 3.',
    langkah: [
      'Perhatikan bilangan yang dikalikan, yaitu -4 dan 3.',
      'Kalikan nilai mutlaknya: 4 × 3 = 12.',
      'Tanda negatif dikali positif menghasilkan negatif.'
    ],
    hasil: '(-4) × 3 = -12'
  },
  {
    judul: 'Pembagian Bilangan Bulat',
    ikon: '÷',
    warna: 'purple',
    deskripsi: 'Memahami pembagian dengan aturan tanda.',
    contoh: 'Hitunglah (-20) ÷ 5.',
    langkah: [
      'Perhatikan bilangan -20 dan 5.',
      'Bagi nilai mutlaknya: 20 ÷ 5 = 4.',
      'Tanda negatif dibagi positif menghasilkan negatif.'
    ],
    hasil: '(-20) ÷ 5 = -4'
  }
]

function Doodle({ children, className = '' }) {
  return (
    <span aria-hidden="true" className={`doodle ${className}`}>
      {children}
    </span>
  )
}

function App() {
  const [halaman, setHalaman] = useState('beranda')
  const [materiAktif, setMateriAktif] = useState(null)
  const [langkahAktif, setLangkahAktif] = useState(0)

  const [suhu, setSuhu] = useState(3)
  const [perubahan, setPerubahan] = useState(5)
  const [arah, setArah] = useState('turun')
  const [hasilSuhu, setHasilSuhu] = useState(null)

  const [jawaban, setJawaban] = useState('')
  const [hasilLatihan, setHasilLatihan] = useState('')

  const [angkaAwal, setAngkaAwal] = useState(3)
  const [angkaKedua, setAngkaKedua] = useState(5)
  const [operasi, setOperasi] = useState('+')
  const [hasilGaris, setHasilGaris] = useState(null)

  const bukaMateri = (index) => {
    setMateriAktif(index)
    setLangkahAktif(0)
    setHalaman('detail')
  }

  const hasilAkhir = arah === 'naik'
    ? suhu + perubahan
    : suhu - perubahan

  return (
    <div className="app-shell">

      <header className="navbar">
        <button
          className="brand"
          onClick={() => setHalaman('beranda')}
        >
          <span className="brand-icon">±</span>
          <span>Belajar<span className="brand-yellow">Bulat</span></span>
        </button>

        <nav className="nav-links">
          {[
            ['beranda', 'Beranda'],
            ['materi', 'Materi'],
            ['simulasi', 'Simulasi'],
            ['garis', 'Garis Bilangan'],
            ['latihan', 'Latihan']
          ].map(([key, label]) => (
            <button
              key={key}
              className={halaman === key ? 'nav-active' : ''}
              onClick={() => setHalaman(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-content">

        {halaman === 'beranda' && (
          <>
            <section className="hero-panel">
              <Doodle className="doodle-star">✳</Doodle>
              <Doodle className="doodle-plus">＋</Doodle>
              <Doodle className="doodle-root">√</Doodle>

              <div className="hero-copy">
                <span className="eyebrow">
                  BELAJAR MATEMATIKA SMP
                </span>

                <h1>
                  Matematika jadi
                  <br />
                  <span>lebih seru!</span>
                </h1>

                <p>
                  Yuk, taklukkan bilangan positif dan negatif.
                  Belajar lewat materi, simulasi, dan permainan angka.
                </p>

                <button
                  className="button-primary"
                  onClick={() => setHalaman('materi')}
                >
                  Mulai Belajar →
                </button>

                <div className="hero-note">
                  ✎ Belajar santai, pasti bisa!
                </div>
              </div>

              <div className="hero-art">
                <div className="sun-doodle">☀</div>

                <div className="math-paper">
                  <div className="paper-equation">
                    − 3 <b>＋</b> 5
                  </div>
                  <div className="paper-line"></div>
                  <div className="paper-answer">
                    = 2 ✓
                  </div>
                  <div className="paper-scribble">
                    1  2  3  4  5
                  </div>
                </div>

                <div className="pencil-doodle">✎</div>
                <div className="bubble-number bubble-one">−8</div>
                <div className="bubble-number bubble-two">+6</div>
                <div className="bubble-number bubble-three">×</div>
              </div>
            </section>

            <section className="welcome-strip">
              <div>
                <span className="strip-icon">★</span>
                <div>
                  <strong>Belajar tanpa takut salah</strong>
                  <small>Kesalahan adalah bagian dari belajar.</small>
                </div>
              </div>

              <div>
                <span className="strip-icon">✎</span>
                <div>
                  <strong>Langkahnya mudah diikuti</strong>
                  <small>Pahami konsep dengan contoh sederhana.</small>
                </div>
              </div>

              <div>
                <span className="strip-icon">✓</span>
                <div>
                  <strong>Coba sendiri, yuk!</strong>
                  <small>Latih pemahamanmu dengan soal.</small>
                </div>
              </div>
            </section>

            <section className="home-next">
              <h2>Mau belajar apa hari ini?</h2>
              <p>Pilih kegiatan belajar yang kamu suka.</p>

              <div className="quick-actions">
                <button onClick={() => setHalaman('materi')}>
                  📚 Lihat Materi
                </button>
                <button onClick={() => setHalaman('garis')}>
                  📏 Coba Garis Bilangan
                </button>
                <button onClick={() => setHalaman('latihan')}>
                  ⭐ Kerjakan Latihan
                </button>
              </div>
            </section>
          </>
        )}

        {halaman === 'materi' && (
          <section className="page-section">
            <div className="page-heading">
              <span className="section-kicker">PETA BELAJAR</span>
              <h1>Materi Bilangan Bulat</h1>
              <p>Pilih materi yang ingin kamu pelajari.</p>
            </div>

            <div className="materi-grid">
              {daftarMateri.map((item, index) => (
                <article
                  className={`materi-card card-${item.warna}`}
                  key={item.judul}
                >
                  <div className="materi-card-top">
                    <span className="materi-icon">{item.ikon}</span>
                    <span>0{index + 1}</span>
                  </div>

                  <h3>{item.judul}</h3>
                  <p>{item.deskripsi}</p>

                  <button
                    className="card-link"
                    onClick={() => bukaMateri(index)}
                  >
                    Pelajari materi →
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {halaman === 'detail' && materiAktif !== null && (
          <section className="page-section">
            <button
              className="back-link"
              onClick={() => setHalaman('materi')}
            >
              ← Kembali ke materi
            </button>

            <div className="detail-panel">
              <span className="section-kicker">BELAJAR BERTAHAP</span>

              <h1>{daftarMateri[materiAktif].judul}</h1>
              <p>{daftarMateri[materiAktif].deskripsi}</p>

              <div className="example-box">
                <span>✏️ CONTOH SOAL</span>
                <h2>{daftarMateri[materiAktif].contoh}</h2>
              </div>

              <div className="step-box">
                <p>
                  LANGKAH {langkahAktif + 1} DARI{' '}
                  {daftarMateri[materiAktif].langkah.length}
                </p>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        ((langkahAktif + 1) /
                        daftarMateri[materiAktif].langkah.length) * 100
                      }%`
                    }}
                  />
                </div>

                <h3>Pembahasan bertahap</h3>

                <div className="step-card">
                  <span>Langkah {langkahAktif + 1}</span>
                  <p>
                    {daftarMateri[materiAktif].langkah[langkahAktif]}
                  </p>
                </div>

                <div className="step-buttons">
                  <button
                    className="button-secondary"
                    disabled={langkahAktif === 0}
                    onClick={() => setLangkahAktif(langkahAktif - 1)}
                  >
                    ← Sebelumnya
                  </button>

                  {langkahAktif <
                  daftarMateri[materiAktif].langkah.length - 1 ? (
                    <button
                      className="button-primary"
                      onClick={() => setLangkahAktif(langkahAktif + 1)}
                    >
                      Langkah berikutnya →
                    </button>
                  ) : (
                    <button
                      className="button-primary"
                      onClick={() => setLangkahAktif(0)}
                    >
                      Ulangi pembahasan ↻
                    </button>
                  )}
                </div>

                {langkahAktif ===
                  daftarMateri[materiAktif].langkah.length - 1 && (
                  <div className="result-box">
                    <strong>🎉 Kesimpulan</strong>
                    <p>{daftarMateri[materiAktif].hasil}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {halaman === 'garis' && (
          <section className="page-section">
            <div className="page-heading">
              <span className="section-kicker">COBA DAN AMATI</span>
              <h1>Petualangan Garis Bilangan</h1>
              <p>
                Masukkan angka, pilih operasi, lalu lihat hasilnya.
              </p>
            </div>

            <div className="tool-panel">
              <div className="input-row">
                <label>
                  Bilangan pertama
                  <input
                    type="number"
                    value={angkaAwal}
                    onChange={e => {
                      setAngkaAwal(Number(e.target.value))
                      setHasilGaris(null)
                    }}
                  />
                </label>

                <label>
                  Operasi
                  <select
                    value={operasi}
                    onChange={e => {
                      setOperasi(e.target.value)
                      setHasilGaris(null)
                    }}
                  >
                    <option value="+">Penjumlahan (+)</option>
                    <option value="-">Pengurangan (−)</option>
                  </select>
                </label>

                <label>
                  Bilangan kedua
                  <input
                    type="number"
                    value={angkaKedua}
                    onChange={e => {
                      setAngkaKedua(Number(e.target.value))
                      setHasilGaris(null)
                    }}
                  />
                </label>
              </div>

              <button
                className="button-primary"
                onClick={() => setHasilGaris(
                  operasi === '+'
                    ? angkaAwal + angkaKedua
                    : angkaAwal - angkaKedua
                )}
              >
                Tampilkan hasil →
              </button>

              {hasilGaris !== null && (
                <div className="result-box">
                  <h2>
                    {angkaAwal} {operasi} {angkaKedua} = {hasilGaris}
                  </h2>

                  <p>
                    {operasi === '+'
                      ? angkaKedua >= 0
                        ? `Mulai dari ${angkaAwal}, bergerak ${angkaKedua} langkah ke kanan.`
                        : `Mulai dari ${angkaAwal}, bergerak ${Math.abs(angkaKedua)} langkah ke kiri.`
                      : angkaKedua >= 0
                        ? `Mulai dari ${angkaAwal}, bergerak ${angkaKedua} langkah ke kiri.`
                        : `Mulai dari ${angkaAwal}, bergerak ${Math.abs(angkaKedua)} langkah ke kanan.`
                    }
                  </p>

                  <div className="number-line-wrap">
                    <div className="number-line">
                      {Array.from(
                        { length: 21 },
                        (_, i) => i - 10
                      ).map(n => (
                        <div className="number-tick" key={n}>
                          <span
                            className={`tick-dot ${
                              n === angkaAwal ? 'start-dot' : ''
                            } ${
                              n === hasilGaris ? 'end-dot' : ''
                            }`}
                          >
                            {n === angkaAwal
                              ? '●'
                              : n === hasilGaris
                                ? '★'
                                : '|'}
                          </span>
                          <small>{n}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p>● Titik awal &nbsp;&nbsp; ★ Hasil akhir</p>
                </div>
              )}
            </div>
          </section>
        )}

        {halaman === 'simulasi' && (
          <section className="page-section">
            <div className="page-heading">
              <span className="section-kicker">MATEMATIKA DI SEKITAR KITA</span>
              <h1>Simulasi Perubahan Suhu</h1>
              <p>Bayangkan suhu udara yang bisa naik dan turun.</p>
            </div>

            <div className="tool-panel">
              <div className="temperature-art">🌤️ °C</div>

              <div className="input-row">
                <label>
                  Suhu awal (°C)
                  <input
                    type="number"
                    value={suhu}
                    onChange={e => {
                      setSuhu(Number(e.target.value))
                      setHasilSuhu(null)
                    }}
                  />
                </label>

                <label>
                  Besar perubahan (°C)
                  <input
                    type="number"
                    min="0"
                    value={perubahan}
                    onChange={e => {
                      setPerubahan(Math.max(0, Number(e.target.value)))
                      setHasilSuhu(null)
                    }}
                  />
                </label>

                <label>
                  Arah perubahan
                  <select
                    value={arah}
                    onChange={e => {
                      setArah(e.target.value)
                      setHasilSuhu(null)
                    }}
                  >
                    <option value="naik">Suhu naik ↑</option>
                    <option value="turun">Suhu turun ↓</option>
                  </select>
                </label>
              </div>

              <button
                className="button-primary"
                onClick={() => setHasilSuhu(
                  `${suhu} ${arah === 'naik' ? '+' : '-'} ${perubahan} = ${hasilAkhir}°C`
                )}
              >
                Simulasikan perubahan →
              </button>

              {hasilSuhu !== null && (
                <div className="result-box">
                  <strong>🌡️ Hasil simulasi</strong>
                  <h2>{hasilSuhu}</h2>
                </div>
              )}
            </div>
          </section>
        )}

        {halaman === 'latihan' && (
          <section className="page-section">
            <div className="page-heading">
              <span className="section-kicker">UJI PEMAHAMANMU</span>
              <h1>Waktunya Berlatih!</h1>
              <p>Kerjakan soal berikut. Kamu pasti bisa!</p>
            </div>

            <div className="tool-panel exercise-panel">
              <div className="exercise-star">★</div>
              <span className="section-kicker">SOAL LATIHAN 01</span>

              <h2>Hitunglah hasil operasi berikut:</h2>
              <div className="exercise-question">−8 + 5 = ?</div>

              <label className="answer-label">
                Jawaban kamu
                <input
                  type="number"
                  placeholder="Tulis jawaban di sini"
                  value={jawaban}
                  onChange={e => {
                    setJawaban(e.target.value)
                    setHasilLatihan('')
                  }}
                />
              </label>

              <button
                className="button-primary"
                onClick={() => setHasilLatihan(
                  jawaban.trim() === '-3'
                    ? 'Benar! −8 + 5 = −3. Hebat, pertahankan!'
                    : 'Belum tepat. Coba ingat kembali aturan penjumlahan bilangan berbeda tanda, ya.'
                )}
              >
                Periksa jawaban ✓
              </button>

              {hasilLatihan && (
                <div className="result-box">{hasilLatihan}</div>
              )}
            </div>
          </section>
        )}

      </main>

      <footer className="footer">
        <div className="footer-brand">± BelajarBulat</div>
        <p>Belajar bilangan bulat dengan cara yang menyenangkan.</p>
        <span>© 2026 • Media Pembelajaran Matematika SMP</span>
      </footer>

    </div>
  )
}

export default App
