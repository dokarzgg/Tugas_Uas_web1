// Batasi tanggal kembali
const pinjam = document.getElementById("tglPinjam");
const kembali = document.getElementById("tglKembali");

pinjam.addEventListener("change", () => {
  kembali.min = pinjam.value;
});

// SIMPAN KE LOCALSTORAGE
const form = document.getElementById("formTransaksi");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const transaksi = {
    id: Date.now(), // ID unik
    nama: document.getElementById("nama").value,
    buku: document.getElementById("buku").value,
    tglPinjam: pinjam.value,
    tglKembali: kembali.value
  };

  let data = JSON.parse(localStorage.getItem("transaksi")) || [];
  data.push(transaksi);

  localStorage.setItem("transaksi", JSON.stringify(data));

  alert("Transaksi berhasil disimpan!");
  form.reset();
});