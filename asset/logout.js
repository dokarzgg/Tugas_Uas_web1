
function logout() {
  if (confirm("Yakin ingin logout?")) {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userNama");
    localStorage.removeItem("userRole");

    window.location.href = "index.html";
  }
}

