document.addEventListener("DOMContentLoaded", () => {
  const selectBuku = document.getElementById("buku");

  // Ambil data buku dari beranda
  const daftarBuku = JSON.parse(localStorage.getItem("daftarBuku")) || [];

  // Jika belum buka beranda
  if (daftarBuku.length === 0) {
    selectBuku.innerHTML =
      "<option value=''>Data buku belum tersedia</option>";
    return;
  }

  // Isi dropdown buku
  daftarBuku.forEach(buku => {
    const option = document.createElement("option");
    option.value = buku.judul;
    option.textContent = `${buku.judul} (${buku.kategori})`;
    selectBuku.appendChild(option);
  });

  // Simpan transaksi
  document.getElementById("formTransaksi").addEventListener("submit", e => {
    e.preventDefault();

    const transaksi = {
      nama: document.getElementById("nama").value,
      buku: selectBuku.value,
      tglPinjam: document.getElementById("tglPinjam").value,
      tglKembali: document.getElementById("tglKembali").value
    };
    

    const list =
      JSON.parse(localStorage.getItem("transaksiBuku")) || [];

    list.push(transaksi);
    localStorage.setItem("transaksiBuku", JSON.stringify(list));

    alert("Transaksi berhasil disimpan!");
    e.target.reset();
  });
});
