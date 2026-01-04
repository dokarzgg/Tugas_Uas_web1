document.addEventListener("DOMContentLoaded", () => {
  const tabel = document.getElementById("tabelTransaksi");
  let data = JSON.parse(localStorage.getItem("transaksiBuku")) || [];

  if (data.length === 0) {
    tabel.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">
          Belum ada transaksi peminjaman
        </td>
      </tr>
    `;
    return;
  }

  // pastikan semua transaksi punya status
  data = data.map(trx => ({
    ...trx,
    status: trx.status || "Dipinjam"
  }));

  renderTabel();

  function renderTabel() {
    tabel.innerHTML = "";

    data.forEach((trx, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${trx.nama}</td>
        <td>${trx.buku}</td>
        <td>${trx.tglPinjam}</td>
        <td>${trx.tglKembali}</td>
        <td>
          <select class="form-select form-select-sm status-select" data-index="${index}">
            <option value="Dipinjam">Dipinjam</option>
            <option value="Dikembalikan">Dikembalikan</option>
            <option value="Terlambat">Terlambat</option>
          </select>
        </td>
      `;

      tabel.appendChild(row);

      // set nilai status
      row.querySelector(".status-select").value = trx.status;
    });

    simpan();
    pasangListener();
  }

  function pasangListener() {
    document.querySelectorAll(".status-select").forEach(select => {
      select.addEventListener("change", e => {
        const index = e.target.dataset.index;
        data[index].status = e.target.value;
        simpan();
      });
    });
  }

  function simpan() {
    localStorage.setItem("transaksiBuku", JSON.stringify(data));
  }
});
