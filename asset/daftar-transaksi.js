const tbody = document.getElementById("tabelTransaksi");
const data = JSON.parse(localStorage.getItem("transaksi")) || [];
const today = new Date().toISOString().split("T")[0];

if (data.length === 0) {
  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="text-muted">Belum ada transaksi</td>
    </tr>
  `;
}

data.forEach((t, i) => {
  let statusBadge;

  if (today > t.tglKembali) {
    statusBadge = `<span class="badge bg-danger">Terlambat</span>`;
  } else {
    statusBadge = `<span class="badge bg-warning text-dark">Dipinjam</span>`;
  }

  tbody.innerHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${t.nama}</td>
      <td>${t.buku}</td>
      <td>${t.tglPinjam}</td>
      <td>${t.tglKembali}</td>
      <td>${statusBadge}</td>
    </tr>
  `;
});