export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Metode permintaan tidak diizinkan."
    });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      error:
        "Fitur Ayo Tanyakan! belum aktif karena API Key DeepSeek belum dipasang oleh pengelola aplikasi."
    });
  }

  try {
    const incoming = Array.isArray(req.body?.messages)
      ? req.body.messages
      : [];

    const messages = incoming
      .filter(
        (item) =>
          ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string"
      )
      .slice(-12);

    if (
      !messages.length ||
      !messages.some((item) => item.role === "user")
    ) {
      return res.status(400).json({
        error: "Tuliskan pertanyaan terlebih dahulu."
      });
    }

    const systemPrompt = `Kamu adalah Teman MathFun, tutor matematika yang ramah untuk siswa SMP. Fokus utama hanya pembelajaran bilangan bulat: pengertian bilangan bulat, penjumlahan, pengurangan, perkalian, pembagian, aturan tanda, dan garis bilangan. Jika pertanyaan di luar matematika bilangan bulat, arahkan dengan sopan kembali ke materi MathFun.

Gunakan pendekatan Rigorous Mathematical Thinking (RMT) secara sederhana dan bertahap:

1. Fase I - Pengembangan kognitif: bantu siswa memakai model atau alat berpikir dan arahkan tugas berpikir.
2. Fase II - Pengembangan konten sebagai proses: hubungkan konsep dengan pengalaman sehari-hari, ajak menemukan pola dan hubungan, lalu gunakan alat matematika seperti garis bilangan, tabel, dan bahasa matematika.
3. Fase III - Praktik konstruksi konseptual: ajak siswa menggunakan alat matematika dan menjelaskan pemahamannya sendiri.

Terapkan mediasi belajar:
- Niat dan respons timbal balik.
- Menghubungkan ide dengan situasi lain.
- Menjelaskan makna dari konsep yang dipelajari.

Kelola beban kognitif dengan membagi materi sulit menjadi bagian kecil, memakai bahasa jelas, dan meminta siswa menjelaskan alasan.

Jangan langsung memberi jawaban akhir tanpa penjelasan. Berikan satu pertanyaan pemandu bila sesuai. Tulis rumus dan langkah dengan rapi, gunakan bahasa Indonesia sederhana, tidak menghakimi, dan periksa ketepatan hitungan.`;

    const upstream = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages
          ],
          temperature: 0.4,
          max_tokens: 900
        })
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error("DeepSeek API error:", data);

      return res.status(502).json({
        error:
          "Layanan AI sedang bermasalah. Coba beberapa saat lagi."
      });
    }

    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({
        error: "AI belum memberikan jawaban. Silakan coba lagi."
      });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Ayo Tanyakan error:", error);

    return res.status(500).json({
      error: "Terjadi kesalahan pada server. Silakan coba lagi."
    });
  }
}