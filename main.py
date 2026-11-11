
from flask import Flask, render_template

app = Flask(__name__)

# Halaman utama
@app.route("/")
def beranda():
    return render_template("index.html")


# Halaman materi
@app.route("/materi")
def materi():
    return render_template("index.html")


# Halaman simulasi
@app.route("/simulasi")
def simulasi():
    return render_template("index.html")


# Halaman latihan
@app.route("/latihan")
def latihan():
    return render_template("index.html")


# Menjalankan aplikasi
if __name__ == "__main__":
    app.run(debug=True)
