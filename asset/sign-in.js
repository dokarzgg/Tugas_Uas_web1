document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop submit default

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  // DATA LOGIN (contoh sederhana)
  const validUsername = "admin";
  const validPassword = "12345";

  if (username === validUsername && password === validPassword) {
    // SIMPAN STATUS LOGIN
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("userNama", "Admin");
    localStorage.setItem("userRole", "admin");

    // PINDAH KE BERANDA
    window.location.href = "beranda.html";
  } else {
    // LOGIN GAGAL
    errorMsg.classList.remove("d-none");
  }
});
