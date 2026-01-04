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

  const today = new Date().toISOString().split("T")[0];

  // Pastikan semua transaksi punya status + auto terlambat
  data = data.map(trx => {
    if (!trx.status) trx.status = "Dipinjam";

    if (
      trx.status !== "Dikembalikan" &&
      trx.tglKembali < today
    ) {
      trx.status = "Terlambat";
    }

    return trx;
  });

  simpan();
  render();

  function render() {
    tabel.innerHTML = "";

    data.forEach((trx, index) => {
      const badge = getBadge(trx.status);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${trx.nama}</td>
        <td>${trx.buku}</td>
        <td>${trx.tglPinjam}</td>
        <td>${trx.tglKembali}</td>
        <td>
          <div class="d-flex flex-column gap-1 align-items-center">
            <span class="badge bg-${badge}">
              ${trx.status}
            </span>
            <select class="form-select form-select-sm status-select"
              data-index="${index}">
              <option value="Dipinjam">Dipinjam</option>
              <option value="Dikembalikan">Dikembalikan</option>
              <option value="Terlambat">Terlambat</option>
            </select>
          </div>
        </td>
      `;

      tabel.appendChild(row);

      row.querySelector(".status-select").value = trx.status;
    });

    pasangListener();
  }

  function pasangListener() {
    document.querySelectorAll(".status-select").forEach(select => {
      select.addEventListener("change", e => {
        const index = e.target.dataset.index;
        data[index].status = e.target.value;
        simpan();
        render();
      });
    });
  }

  function getBadge(status) {
    switch (status) {
      case "Dikembalikan":
        return "success";
      case "Terlambat":
        return "danger";
      default:
        return "primary";
    }
  }

  function simpan() {
    localStorage.setItem("transaksiBuku", JSON.stringify(data));
  }
});
